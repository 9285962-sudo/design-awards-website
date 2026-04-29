#!/usr/bin/env node
/**
 * 奖项官网批量采集脚本
 * 支持混合采集方式：Playwright + HTTP
 * 自动跳过已采集奖项和需要登录/反爬的奖项
 */

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const https = require('https');
const http = require('http');

// 配置
const CONFIG = {
  outputDir: path.join(__dirname, '..', '奖项数据'),
  urlsFile: path.join(__dirname, '..', 'urls', 'awards-urls.txt'),
  delayBetweenRequests: 3000, // 3秒延迟
  timeout: 30000, // 30秒超时
  maxRetries: 2, // 最大重试次数
};

// 主要字段定义（10+核心字段）
const MAIN_FIELDS = {
  basic_info: {
    name: '奖项名称',
    name_en: '英文名称',
    organizer: '主办方',
    website: '官网',
    description: '奖项简介',
    category: '奖项类别',
    year: '当前届次',
  },
  timeline: {
    entry_start: '报名开始日期',
    entry_deadline: '报名截止日期',
    early_bird_deadline: '早鸟截止日期',
    regular_deadline: '常规截止日期',
    late_deadline: '晚期截止日期',
    announcement_date: '结果公布日期',
    ceremony_date: '颁奖典礼日期',
  },
  fees: {
    early_bird_fee: '早鸟费用',
    regular_fee: '常规费用',
    late_fee: '晚期费用',
    currency: '货币单位',
    fee_notes: '费用说明',
  },
  requirements: {
    entry_requirements: '参赛要求',
    eligible_works: '作品类型',
    submission_format: '提交格式',
    image_specs: '图片规格',
    video_specs: '视频规格',
    document_specs: '文档规格',
  },
  judging: {
    judging_criteria: '评审标准',
    judging_process: '评审流程',
    jury_info: '评审团信息',
  },
  awards: {
    award_levels: '奖项等级',
    award_benefits: '获奖权益',
    trophy_certificate: '奖杯证书',
    publicity: '宣传推广',
  },
  contact: {
    contact_email: '联系邮箱',
    contact_phone: '联系电话',
    contact_address: '联系地址',
    social_media: '社交媒体',
  },
  faq: {
    faq_content: '常见问题',
    refund_policy: '退款政策',
    copyright_policy: '版权政策',
  },
};

// 已采集的奖项（跳过）
const EXCLUDED_AWARDS = [
  'red-dot', 'reddot', '红点',
  'muse', '缪斯',
  'd&ad', 'dandad',
  'andrew-martin', 'andrewmartin',
  'lia', '伦敦国际',
  'riba', '英国皇家建筑师',
];

// URL列表
const AWARD_URLS = [
  { name: 'D&AD', url: 'https://www.dandad.org/', status: 'done' },
  { name: 'RIBA International', url: 'https://www.riba.org/explore/awards/international-awards/', status: 'done' },
  { name: 'LIA', url: 'https://www.liaawards.com/', status: 'done' },
  { name: 'Andrew Martin', url: 'https://www.andrewmartin.co.uk/design-awards', status: 'done' },
  { name: 'Property Awards', url: 'https://propertyawards.net/' },
  { name: 'FX Design Awards', url: 'https://fxdesignawards.co.uk/2025/en/page/home' },
  { name: 'LICC', url: 'https://licc.uk/' },
  { name: 'World Interiors News Awards', url: 'https://www.worldinteriorsnewsawards.com/' },
  { name: 'LEAF Awards', url: 'https://www.leafawards.arena-international.com/' },
  { name: 'Landscape Institute Awards', url: 'https://landscapeinstitute.org/awards/' },
  { name: 'Premio Architettura', url: 'https://www.premioarchitettura.it/it/' },
  { name: 'International Hotel Property Awards', url: 'https://thedesignawards.co.uk/international-hotel-property-awards/home-2/' },
  { name: 'AHEAD Awards', url: 'https://www.aheadawards.com/' },
  { name: 'Restaurant & Bar Design Awards', url: 'https://restaurantandbardesignawards.com/' },
  { name: 'Dezeen Awards', url: 'https://www.dezeen.com/' },
  { name: 'BALI Awards', url: 'https://www.baliawards.co.uk/' },
  { name: 'World Architecture Festival', url: 'https://worldarchitecturefestival.com/worldarchitecturefestival2024/en/page/awards-page' },
  { name: 'Frame Awards', url: 'https://frameweb.com/about-frame-awards' },
  { name: 'SBID Awards', url: 'https://www.sbidawards.com/' },
  { name: 'WA 100', url: 'https://www.bdonline.co.uk/wa-100' },
  { name: 'Azure Awards', url: 'https://awards.azuremagazine.com/' },
  { name: 'Good Design', url: 'https://good-design.org/' },
  { name: 'Better Future Awards', url: 'https://betterfutureawards.com/d100/Default.asp' },
  { name: 'Grands Prix du Design', url: 'https://int.design/en/grands-prix-du-design/the-award/' },
  { name: 'Core77 Design Awards', url: 'https://designawards.core77.com/about' },
  { name: 'UIA Gold Medal', url: 'https://www.uia-architectes.org/en/awards/uia-gold-medal-triennial-prizes/' },
  { name: 'Red Dot', url: 'https://www.red-dot.org/zh/', status: 'skip' },
  { name: 'UX Design Awards', url: 'https://ux-design-awards.com/' },
  { name: 'Prix Versailles', url: 'https://www.prix-versailles.com/' },
  { name: 'Design Educates', url: 'https://www.designeducates.com/' },
  { name: 'EDIDA Awards', url: 'https://www.edida-awards.com/' },
  { name: 'InnoDesign', url: 'https://innodesign.fr/' },
  { name: 'Novum Design Award', url: 'https://www.novumdesignaward.com/' },
  { name: 'French Design Award', url: 'https://www.frenchdesignaward.com/' },
  { name: 'AKDN', url: 'https://the.akdn/en/home' },
  { name: 'LIV Awards', url: 'https://livawards.com/' },
  { name: 'SIT Award', url: 'https://www.sitaward.com/' },
  { name: 'Index Project', url: 'https://theindexproject.org/' },
  { name: 'Daylight Award', url: 'http://thedaylightaward.com/' },
  { name: 'Frame', url: 'https://frameweb.com/' },
  { name: 'Loop Design Awards', url: 'https://www.loopdesignawards.com/' },
  { name: 'BLT Awards', url: 'https://bltawards.com/' },
  { name: 'MIPIM Awards', url: 'https://mipimawards.com/mipimawards2026/en/page/homepage' },
  { name: 'DNA Paris', url: 'https://dna.paris/' },
  { name: 'The Plan Award', url: 'https://www.theplan.it/award' },
  { name: 'The Plan Real Estate Award', url: 'https://www.theplan.it/award/the-plan-real-estate-award' },
  { name: 'A Design Award', url: 'https://competition.adesignaward.com/' },
  { name: 'Iconic Awards', url: 'https://www.iconic-awards.com/de/' },
  { name: 'iF Design', url: 'https://ifdesign.com/en/', status: 'skip' },
  { name: 'LIT Awards', url: 'https://litawards.com/' },
  { name: 'Arch Design Award', url: 'https://www.archdesignaward.com/' },
  { name: 'Brick Award', url: 'https://www.brickaward.com/' },
  { name: 'JCD', url: 'https://www.jcd.or.jp/jp/' },
  { name: 'G-Mark', url: 'https://www.g-mark.org/zh-CN', status: 'skip' },
  { name: 'ARCASIA', url: 'http://www.arcasia.org/' },
  { name: 'ADP Awards', url: 'https://www.adpawards.com/' },
  { name: 'SG Mark', url: 'https://sgmark.org/' },
  { name: 'MIPIM Asia', url: 'https://www.mipim-asia.com/' },
  { name: 'Global Excellence Awards', url: 'https://www.globalexcellenceawards.org/' },
  { name: 'SID Awards', url: 'https://sidawards.sg/' },
  { name: 'Sustainable Building Awards', url: 'https://www.sustainablebuildingawards.com.au/' },
  { name: 'Golden Pin', url: 'https://www.goldenpin.org.tw/goldenpin/en' },
  { name: 'K-Design Award', url: 'https://kdesignaward.com/' },
  { name: 'IDPA Japan', url: 'https://idpa-japan.com/' },
  { name: 'Tokyo TDC', url: 'https://tokyotypedirectorsclub.org/en/entry/' },
  { name: 'IFI DDA', url: 'https://ifiworld.org/ifi-dda/' },
  { name: 'ASLA Awards', url: 'https://www.asla.org/awards-events-main-landing/honors-awards' },
  { name: 'Gold Key Awards', url: 'https://goldkeyawards.com/' },
  { name: 'I Design Awards', url: 'https://www.idesignawards.com/' },
  { name: 'One Show', url: 'https://oneshow.org/' },
  { name: 'International Architecture Awards', url: 'https://internationalarchitectureawards.com/' },
  { name: 'One Club', url: 'https://www.oneclub.org/' },
  { name: 'AIA International', url: 'https://www.aiainternational.org/awards' },
  { name: 'IES Illumination Awards', url: 'https://iesilluminationawards.secure-platform.com/a' },
  { name: 'Architizer A+Awards', url: 'https://awards.architizer.com/a' },
  { name: 'Interior Design', url: 'https://interiordesign.net/' },
  { name: 'MUSE Award', url: 'https://design.museaward.com/', status: 'skip' },
  { name: 'NY Design Awards', url: 'https://nydesignawards.com/' },
  { name: 'Spark Awards', url: 'https://www.sparkawards.com/' },
  { name: 'Hospitality Design', url: 'https://hospitalitydesign.com/' },
  { name: 'Architecture Prize', url: 'https://architectureprize.com/' },
  { name: 'IDSA Awards', url: 'https://www.idsa.org/awards-recognitions/' },
  { name: 'The Property Awards', url: 'https://thepropertyawards.com/' },
];

// 日志记录
function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️';
  console.log(`[${timestamp}] ${prefix} ${message}`);
}

// 延迟函数
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// HTTP请求
function httpGet(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { timeout: CONFIG.timeout }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // 跟随重定向
        return resolve(httpGet(res.headers.location));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// 提取域名作为文件名
function getDomainName(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, '').replace(/\./g, '_');
  } catch {
    return 'unknown';
  }
}

// 清理HTML标签
function cleanHtml(html) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// 使用Playwright采集
async function scrapeWithPlaywright(url, awardName) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  });
  const page = await context.newPage();
  
  const result = {
    basic_info: {},
    timeline: {},
    fees: {},
    requirements: {},
    judging: {},
    awards: {},
    contact: {},
    faq: {},
    raw_content: {},
  };

  try {
    log(`正在访问: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: CONFIG.timeout });
    
    // 等待页面加载
    await delay(2000);
    
    // 采集页面标题
    const title = await page.title().catch(() => '');
    result.basic_info.name = title;
    result.basic_info.website = url;
    
    // 尝试提取描述
    const description = await page.$eval('meta[name="description"]', el => el.content).catch(() => '');
    if (description) {
      result.basic_info.description = description;
    }
    
    // 尝试查找关于页面链接
    const aboutLinks = await page.$$eval('a[href*="about"], a[href*="about-us"], a[href*="关于"]', links => 
      links.map(l => ({ text: l.textContent.trim(), href: l.href }))
    );
    
    // 尝试查找参赛指南链接
    const entryLinks = await page.$$eval('a[href*="entry"], a[href*="submit"], a[href*="参赛"], a[href*="报名"]', links => 
      links.map(l => ({ text: l.textContent.trim(), href: l.href }))
    );
    
    // 尝试查找费用信息
    const feeLinks = await page.$$eval('a[href*="fee"], a[href*="price"], a[href*="cost"], a[href*="费用"], a[href*="价格"]', links => 
      links.map(l => ({ text: l.textContent.trim(), href: l.href }))
    );
    
    // 采集当前页面内容
    const pageContent = await page.content();
    result.raw_content.homepage = cleanHtml(pageContent).substring(0, 10000);
    
    // 尝试访问关于页面
    if (aboutLinks.length > 0) {
      try {
        log(`访问关于页面: ${aboutLinks[0].href}`);
        await page.goto(aboutLinks[0].href, { waitUntil: 'networkidle', timeout: 20000 });
        await delay(1500);
        const aboutContent = await page.content();
        result.raw_content.about = cleanHtml(aboutContent).substring(0, 10000);
      } catch (e) {
        log(`关于页面访问失败: ${e.message}`, 'warning');
      }
    }
    
    // 尝试访问参赛页面
    if (entryLinks.length > 0) {
      try {
        log(`访问参赛页面: ${entryLinks[0].href}`);
        await page.goto(entryLinks[0].href, { waitUntil: 'networkidle', timeout: 20000 });
        await delay(1500);
        const entryContent = await page.content();
        result.raw_content.entry = cleanHtml(entryContent).substring(0, 10000);
      } catch (e) {
        log(`参赛页面访问失败: ${e.message}`, 'warning');
      }
    }
    
    // 尝试访问费用页面
    if (feeLinks.length > 0) {
      try {
        log(`访问费用页面: ${feeLinks[0].href}`);
        await page.goto(feeLinks[0].href, { waitUntil: 'networkidle', timeout: 20000 });
        await delay(1500);
        const feeContent = await page.content();
        result.raw_content.fees = cleanHtml(feeContent).substring(0, 10000);
      } catch (e) {
        log(`费用页面访问失败: ${e.message}`, 'warning');
      }
    }
    
    // 提取联系信息
    const emails = pageContent.match(/[\w.-]+@[\w.-]+\.\w+/g) || [];
    if (emails.length > 0) {
      result.contact.contact_email = [...new Set(emails)].slice(0, 3).join(', ');
    }
    
    log(`${awardName} 采集完成`, 'success');
    
  } catch (error) {
    log(`${awardName} 采集失败: ${error.message}`, 'error');
    result.error = error.message;
  } finally {
    await browser.close();
  }
  
  return result;
}

// 使用HTTP采集（静态页面）
async function scrapeWithHttp(url, awardName) {
  const result = {
    basic_info: { website: url },
    raw_content: {},
  };

  try {
    log(`使用HTTP采集: ${url}`);
    const html = await httpGet(url);
    
    // 提取标题
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    if (titleMatch) {
      result.basic_info.name = titleMatch[1].trim();
    }
    
    // 提取描述
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)/i) ||
                       html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
    if (descMatch) {
      result.basic_info.description = descMatch[1].trim();
    }
    
    // 清理并保存内容
    result.raw_content.homepage = cleanHtml(html).substring(0, 15000);
    
    // 提取邮箱
    const emails = html.match(/[\w.-]+@[\w.-]+\.\w+/g) || [];
    if (emails.length > 0) {
      result.contact = { contact_email: [...new Set(emails)].slice(0, 3).join(', ') };
    }
    
    log(`${awardName} HTTP采集完成`, 'success');
    
  } catch (error) {
    log(`${awardName} HTTP采集失败: ${error.message}`, 'error');
    result.error = error.message;
    throw error; // 让上层知道失败，尝试Playwright
  }
  
  return result;
}

// 保存数据
function saveData(awardName, data) {
  const safeName = awardName.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '_');
  
  // 保存JSON
  const jsonPath = path.join(CONFIG.outputDir, `${safeName}_完整字段数据.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8');
  
  // 保存Markdown知识库
  const mdContent = generateMarkdown(awardName, data);
  const mdPath = path.join(CONFIG.outputDir, `${safeName}_官网全量知识库.md`);
  fs.writeFileSync(mdPath, mdContent, 'utf-8');
  
  log(`数据已保存: ${safeName}`, 'success');
}

// 生成Markdown
function generateMarkdown(awardName, data) {
  let md = `# ${awardName} - 官网信息\n\n`;
  md += `> 采集时间: ${new Date().toISOString()}\n\n`;
  
  // 基础信息
  md += `## 基础信息\n\n`;
  for (const [key, value] of Object.entries(data.basic_info || {})) {
    if (value) md += `- **${key}**: ${value}\n`;
  }
  md += '\n';
  
  // 原始内容
  if (data.raw_content) {
    md += `## 官网内容\n\n`;
    for (const [page, content] of Object.entries(data.raw_content)) {
      if (content) {
        md += `### ${page}\n\n${content}\n\n`;
      }
    }
  }
  
  // 错误信息
  if (data.error) {
    md += `## 采集异常\n\n${data.error}\n\n`;
  }
  
  return md;
}

// 主采集函数
async function scrapeAward(awardInfo) {
  const { name, url, status } = awardInfo;
  
  if (status === 'done') {
    log(`${name} 已采集，跳过`, 'warning');
    return { skipped: true, reason: 'already_done' };
  }
  
  if (status === 'skip') {
    log(`${name} 标记为跳过`, 'warning');
    return { skipped: true, reason: 'marked_skip' };
  }
  
  log(`\n========== 开始采集: ${name} ==========`);
  
  let result = null;
  let usePlaywright = false;
  
  // 先尝试HTTP采集
  try {
    result = await scrapeWithHttp(url, name);
    // 如果内容很少，可能需要Playwright
    if (!result.raw_content.homepage || result.raw_content.homepage.length < 500) {
      usePlaywright = true;
    }
  } catch (error) {
    log(`HTTP采集失败，切换到Playwright: ${error.message}`, 'warning');
    usePlaywright = true;
  }
  
  // 需要时使用Playwright
  if (usePlaywright) {
    try {
      result = await scrapeWithPlaywright(url, name);
    } catch (error) {
      log(`Playwright采集也失败: ${error.message}`, 'error');
      return { skipped: true, reason: 'scrape_failed', error: error.message };
    }
  }
  
  // 保存数据
  if (result) {
    saveData(name, result);
    return { success: true, name };
  }
  
  return { skipped: true, reason: 'no_data' };
}

// 批量采集
async function batchScrape() {
  log('========== 开始批量采集奖项信息 ==========');
  log(`总计: ${AWARD_URLS.length} 个奖项`);
  
  const results = {
    success: [],
    skipped: [],
    failed: [],
  };
  
  for (let i = 0; i < AWARD_URLS.length; i++) {
    const award = AWARD_URLS[i];
    log(`\n进度: ${i + 1}/${AWARD_URLS.length}`);
    
    try {
      const result = await scrapeAward(award);
      
      if (result.success) {
        results.success.push(award.name);
      } else if (result.skipped) {
        results.skipped.push({ name: award.name, reason: result.reason });
      }
    } catch (error) {
      log(`未捕获的错误: ${error.message}`, 'error');
      results.failed.push({ name: award.name, error: error.message });
      // 保存进度，继续下一个
      log(`跳过 ${award.name}，继续下一个...`, 'warning');
    }
    
    // 每5个奖项保存一次进度
    if (i > 0 && i % 5 === 0) {
      saveProgress(results, i);
    }
    
    // 延迟，避免请求过快
    if (i < AWARD_URLS.length - 1) {
      log(`等待 ${CONFIG.delayBetweenRequests}ms...`);
      await delay(CONFIG.delayBetweenRequests);
    }
  }
  
  // 保存汇总报告
  saveProgress(results, AWARD_URLS.length, true);
  
  log('\n========== 采集完成 ==========');
  log(`成功: ${results.success.length} 个`);
  log(`跳过: ${results.skipped.length} 个`);
  log(`失败: ${results.failed.length} 个`);
  
  return results;
}

// 保存进度
function saveProgress(results, currentIndex, isFinal = false) {
  try {
    const progress = {
      timestamp: new Date().toISOString(),
      currentIndex: currentIndex,
      total: AWARD_URLS.length,
      progress: `${currentIndex}/${AWARD_URLS.length} (${Math.round(currentIndex/AWARD_URLS.length*100)}%)`,
      ...results
    };
    
    const filename = isFinal ? '采集报告_最终.json' : '采集进度.json';
    const reportPath = path.join(CONFIG.outputDir, filename);
    fs.writeFileSync(reportPath, JSON.stringify(progress, null, 2), 'utf-8');
    
    if (!isFinal) {
      log(`进度已保存: ${progress.progress}`, 'info');
    } else {
      log(`最终报告已保存: ${reportPath}`);
    }
  } catch (e) {
    log(`保存进度失败: ${e.message}`, 'warning');
  }
}

// 运行
if (require.main === module) {
  batchScrape().catch(error => {
    log(`程序异常: ${error.message}`, 'error');
    process.exit(1);
  });
}

module.exports = { batchScrape, scrapeAward };
