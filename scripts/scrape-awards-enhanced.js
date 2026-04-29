/**
 * 增强版奖项采集脚本
 * 特点：多页面采集、AI提取结构化数据、完整字段覆盖
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
  outputDir: path.join(__dirname, '..', '奖项数据'),
  delayBetweenRequests: 2000,
  maxPagesPerAward: 5, // 每个奖项最多采集5个页面
  timeout: 30000,
};

// 需要深入采集的页面路径
const IMPORTANT_PATHS = [
  '/about', '/about-us', '/enter', '/entry', '/how-to-enter',
  '/fees', '/pricing', '/cost', '/deadline', '/dates',
  '/categories', '/rules', '/guidelines', '/requirements',
  '/judging', '/criteria', '/faq', '/contact'
];

// 创建输出目录
if (!fs.existsSync(CONFIG.outputDir)) {
  fs.mkdirSync(CONFIG.outputDir, { recursive: true });
}

// 延迟函数
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// HTTP请求函数
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const options = {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'identity',
        'Connection': 'keep-alive',
      },
      timeout: CONFIG.timeout,
    };

    const req = client.get(url, options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // 重定向
        const redirectUrl = new URL(res.headers.location, url).toString();
        console.log(`  重定向到: ${redirectUrl}`);
        fetchUrl(redirectUrl).then(resolve).catch(reject);
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

// 从HTML中提取文本内容
function extractText(html) {
  // 移除script和style标签
  let text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, ' ');
  
  // 提取文本
  text = text
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8211;/g, '-')
    .replace(/&#8212;/g, '--')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#038;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
  
  return text;
}

// 从HTML中提取链接
function extractLinks(html, baseUrl) {
  const links = [];
  const linkRegex = /href=["']([^"']+)["']/gi;
  let match;
  
  while ((match = linkRegex.exec(html)) !== null) {
    try {
      const url = new URL(match[1], baseUrl).toString();
      if (url.startsWith(baseUrl) && !url.includes('#')) {
        links.push(url);
      }
    } catch (e) {
      // 忽略无效URL
    }
  }
  
  return [...new Set(links)];
}

// 从文本中提取结构化信息
function extractStructuredInfo(text, url) {
  const info = {
    fees: {},
    deadlines: {},
    requirements: [],
    categories: [],
    contact: {},
    description: '',
  };
  
  // 提取费用信息
  const feePatterns = [
    /early\s+bird[\s:]*\$?(\d[\d,]*)/i,
    /regular[\s:]*\$?(\d[\d,]*)/i,
    /late[\s:]*\$?(\d[\d,]*)/i,
    /entry\s+fee[\s:]*\$?(\d[\d,]*)/i,
    /cost[\s:]*\$?(\d[\d,]*)/i,
    /price[\s:]*\$?(\d[\d,]*)/i,
    /(\d[\d,]*)\s*(USD|EUR|GBP|\$|€|£)/i,
  ];
  
  feePatterns.forEach(pattern => {
    const match = text.match(pattern);
    if (match) {
      const amount = match[1].replace(/,/g, '');
      if (!info.fees.earlyBird && pattern.toString().includes('early')) {
        info.fees.earlyBird = `$${amount}`;
      } else if (!info.fees.regular && pattern.toString().includes('regular')) {
        info.fees.regular = `$${amount}`;
      } else if (!info.fees.late && pattern.toString().includes('late')) {
        info.fees.late = `$${amount}`;
      } else if (Object.keys(info.fees).length === 0) {
        info.fees.standard = `$${amount}`;
      }
    }
  });
  
  // 提取日期
  const datePatterns = [
    /deadline[\s:]*([A-Za-z]+\s+\d{1,2}[,.]?\s*\d{4})/i,
    /closes?[\s:]*([A-Za-z]+\s+\d{1,2}[,.]?\s*\d{4})/i,
    /open[\s:]*([A-Za-z]+\s+\d{1,2}[,.]?\s*\d{4})/i,
    /(\d{1,2}[\/\.]\d{1,2}[\/\.]\d{2,4})/,
    /(\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2})/,
  ];
  
  datePatterns.forEach(pattern => {
    const match = text.match(pattern);
    if (match) {
      if (pattern.toString().includes('deadline') || pattern.toString().includes('close')) {
        info.deadlines.entry = match[1];
      } else if (pattern.toString().includes('open')) {
        info.deadlines.open = match[1];
      }
    }
  });
  
  // 提取邮箱
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  if (emailMatch) {
    info.contact.email = emailMatch[0];
  }
  
  // 提取电话
  const phoneMatch = text.match(/[\+\d\(\)\-\s]{10,}/);
  if (phoneMatch) {
    info.contact.phone = phoneMatch[0].trim();
  }
  
  return info;
}

// 采集单个奖项
async function scrapeAward(awardInfo) {
  console.log(`\n========================================`);
  console.log(`开始采集: ${awardInfo.name}`);
  console.log(`网址: ${awardInfo.url}`);
  console.log(`========================================`);
  
  const result = {
    name: awardInfo.name,
    url: awardInfo.url,
    pages: {},
    structured: {},
    timestamp: new Date().toISOString(),
  };
  
  try {
    // 1. 采集首页
    console.log('[1/3] 采集首页...');
    const homepageHtml = await fetchUrl(awardInfo.url);
    result.pages.homepage = extractText(homepageHtml);
    console.log(`  ✓ 首页内容: ${result.pages.homepage.length} 字符`);
    
    // 2. 发现相关页面
    console.log('[2/3] 发现相关页面...');
    const allLinks = extractLinks(homepageHtml, awardInfo.url);
    const importantLinks = allLinks.filter(link => {
      const path = new URL(link).pathname.toLowerCase();
      return IMPORTANT_PATHS.some(p => path.includes(p));
    }).slice(0, CONFIG.maxPagesPerAward - 1);
    
    console.log(`  发现 ${importantLinks.length} 个重要页面`);
    
    // 3. 采集重要页面
    console.log('[3/3] 采集重要页面...');
    for (let i = 0; i < importantLinks.length; i++) {
      const link = importantLinks[i];
      const pageName = new URL(link).pathname.replace(/\//g, '_') || 'index';
      
      try {
        console.log(`  [${i + 1}/${importantLinks.length}] ${pageName}...`);
        const html = await fetchUrl(link);
        result.pages[pageName] = extractText(html);
        console.log(`    ✓ ${result.pages[pageName].length} 字符`);
        await delay(1000);
      } catch (error) {
        console.log(`    ✗ 失败: ${error.message}`);
      }
    }
    
    // 4. 提取结构化信息
    console.log('[4/4] 提取结构化信息...');
    const allText = Object.values(result.pages).join(' ');
    result.structured = extractStructuredInfo(allText, awardInfo.url);
    console.log(`  ✓ 提取完成`);
    
    // 5. 保存数据
    const safeName = awardInfo.name.replace(/[^\w\s-]/g, '').replace(/\s+/g, '_');
    
    // JSON格式
    const jsonPath = path.join(CONFIG.outputDir, `${safeName}_增强数据.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(result, null, 2), 'utf-8');
    console.log(`  ✓ 保存JSON: ${jsonPath}`);
    
    // Markdown格式
    const mdContent = generateMarkdown(result);
    const mdPath = path.join(CONFIG.outputDir, `${safeName}_增强知识库.md`);
    fs.writeFileSync(mdPath, mdContent, 'utf-8');
    console.log(`  ✓ 保存MD: ${mdPath}`);
    
    console.log(`\n✅ ${awardInfo.name} 采集完成`);
    return { success: true, data: result };
    
  } catch (error) {
    console.error(`\n❌ ${awardInfo.name} 采集失败: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// 生成Markdown
function generateMarkdown(result) {
  let md = `# ${result.name}\n\n`;
  md += `> 采集时间: ${result.timestamp}\n`;
  md += `> 官网: ${result.url}\n\n`;
  
  // 结构化信息
  md += `## 结构化信息\n\n`;
  
  if (Object.keys(result.structured.fees).length > 0) {
    md += `### 费用信息\n`;
    Object.entries(result.structured.fees).forEach(([key, value]) => {
      md += `- ${key}: ${value}\n`;
    });
    md += '\n';
  }
  
  if (Object.keys(result.structured.deadlines).length > 0) {
    md += `### 时间节点\n`;
    Object.entries(result.structured.deadlines).forEach(([key, value]) => {
      md += `- ${key}: ${value}\n`;
    });
    md += '\n';
  }
  
  if (Object.keys(result.structured.contact).length > 0) {
    md += `### 联系方式\n`;
    Object.entries(result.structured.contact).forEach(([key, value]) => {
      md += `- ${key}: ${value}\n`;
    });
    md += '\n';
  }
  
  // 页面内容
  md += `## 详细内容\n\n`;
  Object.entries(result.pages).forEach(([pageName, content]) => {
    md += `### ${pageName}\n\n`;
    md += content.substring(0, 5000); // 限制每个页面长度
    if (content.length > 5000) {
      md += '\n\n...(内容已截断)';
    }
    md += '\n\n---\n\n';
  });
  
  return md;
}

// 主函数
async function main() {
  // 读取奖项列表
  const listPath = path.join(__dirname, '..', '奖项数据', '采集进度.json');
  if (!fs.existsSync(listPath)) {
    console.error('找不到采集进度文件');
    return;
  }
  
  const progress = JSON.parse(fs.readFileSync(listPath, 'utf-8'));
  const awardsToScrape = progress.success.slice(0, 5); // 先测试5个
  
  console.log('========================================');
  console.log('增强版奖项采集系统');
  console.log(`待采集: ${awardsToScrape.length} 个奖项`);
  console.log('========================================\n');
  
  const results = [];
  
  for (let i = 0; i < awardsToScrape.length; i++) {
    const awardName = awardsToScrape[i];
    // 从名称推断URL（简化处理）
    const awardInfo = {
      name: awardName,
      url: `https://${awardName.toLowerCase().replace(/\s+/g, '')}.com/`,
    };
    
    const result = await scrapeAward(awardInfo);
    results.push(result);
    
    if (i < awardsToScrape.length - 1) {
      console.log(`\n等待 ${CONFIG.delayBetweenRequests}ms...`);
      await delay(CONFIG.delayBetweenRequests);
    }
  }
  
  console.log('\n========================================');
  console.log('采集完成');
  console.log(`成功: ${results.filter(r => r.success).length}`);
  console.log(`失败: ${results.filter(r => !r.success).length}`);
  console.log('========================================');
}

main().catch(console.error);
