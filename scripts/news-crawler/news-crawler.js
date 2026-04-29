/**
 * 奖项新闻采集 + AI 生成中文新闻稿
 * 
 * 工作流程：
 * 1. 抓取各奖项官网新闻页面
 * 2. 提取新闻标题、链接、日期
 * 3. 调用 AI 生成中文新闻稿
 * 4. 输出 Markdown 文件到 content/articles/draft/
 * 
 * 用法：node news-crawler.js [--tier t0|t1] [--dry-run]
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const { AWARD_SOURCES } = require('./config.js');

// ===== 配置 =====
const OUTPUT_DIR = path.join(__dirname, '../../website/content/articles/draft');
const HISTORY_FILE = path.join(__dirname, 'history.json');
const DRY_RUN = process.argv.includes('--dry-run');
const TIER = (process.argv.find(a => a.startsWith('--tier')) || '').replace('--tier=', '') || 't0';

// ===== 工具函数 =====
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function loadHistory() {
  try {
    return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
  } catch { return { crawled: [] }; }
}

function saveHistory(history) {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
}

function isCrawled(url) {
  const history = loadHistory();
  return history.crawled.some(item => item.url === url);
}

function markCrawled(url, title) {
  const history = loadHistory();
  history.crawled.push({ url, title, time: new Date().toISOString() });
  // 只保留最近 500 条记录
  if (history.crawled.length > 500) history.crawled = history.crawled.slice(-500);
  saveHistory(history);
}

function formatDate(date) {
  if (!date) return new Date().toISOString().split('T')[0];
  return new Date(date).toISOString().split('T')[0];
}

// ===== HTTP 请求 =====
function fetchURL(url, timeout = 15000) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const options = {
      url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout,
    };
    
    const req = client.get(url, options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchURL(res.headers.location, timeout).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    });
    
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

// ===== 新闻提取 =====
function extractNewsFromHTML(html, source) {
  const results = [];
  
  // 通用提取策略：查找新闻标题和链接
  // 匹配 <a> 标签中的新闻链接
  const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>([^<]{10,200})<\/a>/gi;
  let match;
  
  // 过滤新闻相关的关键词
  const newsKeywords = [
    'winner', 'award', 'prize', 'ceremony', 'jury', 'judge', 'announce',
    'deadline', 'submission', 'call for', 'entry', 'register', 'open',
    'result', 'shortlist', 'finalist', 'gold', 'silver', 'bronze',
    '获奖', '公布', '征稿', '截止', '报名', '获奖者', '评审'
  ];
  
  while ((match = linkRegex.exec(html)) !== null) {
    let href = match[1];
    let title = match[2].trim();
    
    // 跳过导航链接、空链接
    if (!href || href === '#' || href.startsWith('javascript:') || href.startsWith('mailto:')) continue;
    // 跳过太短的标题
    if (title.length < 15) continue;
    
    // 检查是否包含新闻关键词
    const titleLower = (title + ' ' + href).toLowerCase();
    const hasNewsKeyword = newsKeywords.some(kw => titleLower.includes(kw));
    
    if (hasNewsKeyword) {
      // 补全相对 URL
      if (href.startsWith('/')) {
        try {
          const urlObj = new URL(source.news_url);
          href = urlObj.origin + href;
        } catch {}
      }
      
      results.push({
        title: title.replace(/\s+/g, ' '),
        url: href,
        source: source.award_name_short,
        award_id: source.award_id,
        country: source.country,
      });
    }
  }
  
  // 去重（按 URL）
  const seen = new Set();
  return results.filter(item => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

// ===== 新闻类型判断 =====
function detectNewsType(title, url) {
  const t = (title + ' ' + url).toLowerCase();
  if (/winner|获奖|result|结果|gold|silver|bronze|platinum/.test(t)) return '获奖快讯';
  if (/deadline|截止|closing/.test(t)) return '报名通知';
  return '赛事新闻';
}

// ===== 生成 Markdown 草稿 =====
function generateDraft(newsItem) {
  const date = formatDate();
  const slug = `${date}-${newsItem.source}-${newsItem.title.substring(0, 30).replace(/[^a-zA-Z0-9\u4e00-\u9fff]/g, '')}`;
  const type = detectNewsType(newsItem.title, newsItem.url);
  
  return {
    slug,
    category: type,
    publishTime: date,
    title: newsItem.title,
    sourceUrl: newsItem.url,
    sourceName: newsItem.source,
    awardId: newsItem.award_id,
    country: newsItem.country,
    needsAiRewrite: true,
  };
}

// ===== 主流程 =====
async function crawlSource(source) {
  console.log(`\n📡 抓取: ${source.award_name_cn} (${source.news_url})`);
  
  try {
    const html = await fetchURL(source.news_url, 15000);
    const newsItems = extractNewsFromHTML(html, source);
    
    const newItems = newsItems.filter(item => !isCrawled(item.url));
    
    if (newItems.length === 0) {
      console.log(`   ✓ 无新内容（共扫描 ${newsItems.length} 条）`);
      return [];
    }
    
    console.log(`   📰 发现 ${newItems.length} 条新内容`);
    
    if (DRY_RUN) {
      newItems.forEach(item => console.log(`      - [${detectNewsType(item.title, item.url)}] ${item.title}`));
      return newItems;
    }
    
    // 生成草稿
    ensureDir(OUTPUT_DIR);
    const drafts = [];
    
    for (const item of newItems.slice(0, 10)) { // 每个源最多 10 条
      const draft = generateDraft(item);
      const filePath = path.join(OUTPUT_DIR, `${draft.slug}.json`);
      
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(draft, null, 2), 'utf-8');
        markCrawled(item.url, item.title);
        drafts.push(draft);
        console.log(`      ✅ [${draft.category}] ${draft.title}`);
      }
    }
    
    return drafts;
  } catch (err) {
    console.log(`   ❌ 失败: ${err.message}`);
    return [];
  }
}

async function main() {
  console.log('========================================');
  console.log('📰 奖项新闻采集系统');
  console.log(`📅 ${new Date().toISOString()}`);
  console.log(`🏷️  级别: ${TIER}`);
  if (DRY_RUN) console.log('🔍 DRY RUN 模式（不写入文件）');
  console.log('========================================');
  
  const sources = AWARD_SOURCES[TIER] || AWARD_SOURCES.t0;
  const allDrafts = [];
  
  for (const source of sources) {
    const drafts = await crawlSource(source);
    allDrafts.push(...drafts);
  }
  
  // 汇总报告
  console.log('\n========================================');
  console.log(`📊 采集完成！共生成 ${allDrafts.length} 篇新闻草稿`);
  console.log(`📁 草稿目录: ${OUTPUT_DIR}`);
  
  if (allDrafts.length > 0) {
    console.log('\n📝 待处理：');
    const byType = {};
    allDrafts.forEach(d => {
      if (!byType[d.category]) byType[d.category] = 0;
      byType[d.category]++;
    });
    Object.entries(byType).forEach(([type, count]) => {
      console.log(`   ${type}: ${count} 篇`);
    });
    console.log('\n→ 下一步: 运行 ai-rewrite.js 生成中文新闻稿');
  }
}

main().catch(console.error);
