/**
 * AI 中文新闻稿生成器
 * 
 * 读取草稿 JSON → 调用 AI 生成中文新闻 → 输出 Markdown 文件
 * 
 * 用法：node ai-rewrite.js [--source draft.json] [--all]
 * 
 * 需要 OPENAI_API_KEY 环境变量（或修改 API 配置）
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// ===== 配置 =====
const DRAFT_DIR = path.join(__dirname, '../../website/content/articles/draft');
const OUTPUT_DIR = path.join(__dirname, '../../website/content/articles');

// AI API 配置 - 使用 DeepSeek（兼容 OpenAI 格式）
const AI_CONFIG = {
  baseUrl: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY || '',
  model: 'deepseek-chat',
};

// ===== 工具函数 =====
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function loadDrafts() {
  ensureDir(DRAFT_DIR);
  return fs.readdirSync(DRAFT_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(DRAFT_DIR, f), 'utf-8')));
}

function callAI(prompt) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      model: AI_CONFIG.model,
      messages: [
        {
          role: 'system',
          content: `你是"设计能"的资深编辑，专注于国际设计大奖资讯报道。
你的写作风格：
- 专业但不晦涩，面向设计师和企业决策者
- 善于把奖项动态与行业趋势联系起来
- 经常引用奖项名称的英文原名（如 iF Design Award、Red Dot Design Award）
- 注重 SEO：标题包含具体奖项名和关键事件，正文多次自然嵌入相关关键词
- 文章末尾有"如需奖项申报咨询，请联系设计能"的 CTA

输出格式要求：
- 直接输出 Markdown 格式文章
- 不需要 frontmatter，不需要标题前面加 #
- 标题单独一行
- 正文用 <p> 标签分段（因为会被转为 HTML）`
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 3000,
    });

    const options = {
      hostname: 'api.deepseek.com',
      path: '/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.choices && result.choices[0]) {
            resolve(result.choices[0].message.content);
          } else {
            reject(new Error('AI 返回格式异常: ' + data.substring(0, 200)));
          }
        } catch (e) {
          reject(new Error('AI 解析失败: ' + e.message));
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(60000, () => { req.destroy(); reject(new Error('AI 请求超时')); });
    req.write(postData);
    req.end();
  });
}

function buildPrompt(draft) {
  const newsTypeMap = {
    '获奖快讯': '获奖公布',
    '报名通知': '征稿/截止日期通知',
    '赛事新闻': '赛事动态',
  };
  const typeDesc = newsTypeMap[draft.category] || '赛事动态';
  
  return `请根据以下原始英文新闻信息，撰写一篇中文新闻稿。

## 新闻类型
${typeDesc}

## 原始信息
- 标题: ${draft.title}
- 来源: ${draft.sourceName}（${draft.country}）
- 原文链接: ${draft.sourceUrl}

## 要求
1. 标题要包含奖项中文名和关键事件，控制在 30 字以内
2. 正文 800-1500 字，分 3-5 段
3. 第一段概述新闻核心事实（谁、什么、什么时候）
4. 后续段落展开分析，联系行业趋势
5. 自然嵌入关键词：${draft.sourceName}、国际设计奖、设计大奖、参赛、申报
6. 如果是获奖新闻，分析获奖作品的设计特点和评审逻辑
7. 如果是征稿通知，明确写出报名截止日期、参赛费用、参赛类别
8. 最后一段加入 CTA：如需${draft.sourceName}参赛辅导或申报咨询，欢迎联系设计能。
9. 不要编造不确定的具体数据，如果原始信息不够详细，可以基于奖项常识合理推测`;
}

async function processDraft(draft) {
  console.log(`\n📝 处理: ${draft.title.substring(0, 40)}...`);
  console.log(`   来源: ${draft.sourceName} | 类型: ${draft.category}`);
  
  try {
    const prompt = buildPrompt(draft);
    console.log('   🤖 调用 AI 生成...');
    
    const aiContent = await callAI(prompt);
    
    // 提取标题（第一行）
    const lines = aiContent.split('\n').filter(l => l.trim());
    const titleLine = lines.find(l => l.trim().length > 5 && !l.startsWith('#') && !l.startsWith('<')) || draft.title;
    const content = aiContent;
    
    // 生成 Markdown 文件
    const date = draft.publishTime || new Date().toISOString().split('T')[0];
    const fileName = `${date}-${titleLine.trim().substring(0, 30).replace(/[\\/:*?"<>|]/g, '')}.md`;
    const filePath = path.join(OUTPUT_DIR, fileName);
    
    const md = `---
title: ${titleLine.trim()}
category: ${draft.category}
publishTime: ${date}
author: 设计能
summary: ${titleLine.trim().substring(0, 80)}
featured: false
sourceUrl: ${draft.sourceUrl}
sourceAward: ${draft.sourceName}
---

${content}
`;
    
    ensureDir(OUTPUT_DIR);
    fs.writeFileSync(filePath, md, 'utf-8');
    
    // 标记草稿为已处理
    const draftFile = path.join(DRAFT_DIR, `${draft.slug}.json`);
    if (fs.existsSync(draftFile)) {
      fs.unlinkSync(draftFile);
    }
    
    console.log(`   ✅ 已生成: ${fileName}`);
    return { success: true, file: fileName };
  } catch (err) {
    console.log(`   ❌ 失败: ${err.message}`);
    return { success: false, error: err.message };
  }
}

async function main() {
  console.log('========================================');
  console.log('🤖 AI 中文新闻稿生成器');
  console.log(`📅 ${new Date().toISOString()}`);
  console.log('========================================');
  
  if (!AI_CONFIG.apiKey) {
    console.log('⚠️  未设置 DEEPSEEK_API_KEY 环境变量');
    console.log('   请设置后重试: set DEEPSEEK_API_KEY=your_key');
    process.exit(1);
  }
  
  const sourceFile = process.argv.find(a => !a.startsWith('-') && a !== process.argv[0]);
  
  if (sourceFile) {
    // 处理单个文件
    const draft = JSON.parse(fs.readFileSync(sourceFile, 'utf-8'));
    await processDraft(draft);
  } else {
    // 处理所有草稿
    const drafts = loadDrafts();
    
    if (drafts.length === 0) {
      console.log('📭 没有待处理的草稿');
      console.log('   先运行 news-crawler.js 采集新闻');
      return;
    }
    
    console.log(`📂 发现 ${drafts.length} 篇待处理草稿`);
    
    const results = [];
    for (const draft of drafts) {
      // 每个请求间隔 2 秒，避免频率限制
      if (results.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      const result = await processDraft(draft);
      results.push(result);
    }
    
    console.log('\n========================================');
    console.log(`📊 处理完成: ${results.filter(r => r.success).length} 成功, ${results.filter(r => !r.success).length} 失败`);
    console.log(`📁 输出目录: ${OUTPUT_DIR}`);
    console.log('\n→ 下一步:');
    console.log('   1. 审核生成的 Markdown 文件');
    console.log('   2. 运行 build-articles.js 构建并发布');
  }
}

main().catch(console.error);
