#!/usr/bin/env node
/**
 * MUSE设计奖获奖者数据采集脚本
 * 支持按年份采集获奖者信息
 * 
 * 使用方法: node crawl-muse-winners.js [年份] [输出目录]
 * 示例: node crawl-muse-winners.js 2025 ../data/winners
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
  baseUrl: 'https://design.museaward.com/winners',
  defaultYear: '2025',
  outputDir: path.join(__dirname, '..', 'data', 'winners'),
  maxWinnersPerYear: 100, // 每最多采集数量
  requestDelay: 2000, // 请求间隔(ms)
  maxRetries: 3, // 最大重试次数
};

// 中国设计师/公司识别关键词
const CHINA_KEYWORDS = [
  'china', 'chinese', '中国', '北京', '上海', '深圳', '广州', '杭州', '成都', '香港', 'hong kong',
  'zhongguo', 'beijing', 'shanghai', 'shenzhen', 'guangzhou', 'hangzhou', 'chengdu'
];

// 延迟函数
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 创建浏览器实例
 */
async function createBrowser() {
  return await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
}

/**
 * 检查是否为中国设计师
 */
function isChineseDesigner(winner) {
  const textToCheck = [
    winner.designerName,
    winner.company,
    winner.country,
    winner.location
  ].join(' ').toLowerCase();
  
  // 检查是否包含中文字符
  const hasChineseChars = /[\u4e00-\u9fa5]/.test(textToCheck);
  
  // 检查是否包含中国相关关键词
  const hasChinaKeyword = CHINA_KEYWORDS.some(keyword => 
    textToCheck.includes(keyword.toLowerCase())
  );
  
  return hasChineseChars || hasChinaKeyword;
}

/**
 * 从详情页提取完整信息
 */
async function extractWinnerDetails(page, detailUrl) {
  try {
    await page.goto(detailUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await delay(2000);
    
    const details = await page.evaluate(() => {
      const result = {
        title: '',
        designerName: '',
        company: '',
        country: '',
        category: '',
        subCategory: '',
        awardLevel: '',
        description: '',
        credits: '',
        images: []
      };
      
      // 尝试多种选择器提取标题
      const titleSelectors = ['h1', '.project-title', '.winner-title', '[class*="title"]', 'h2'];
      for (const selector of titleSelectors) {
        const el = document.querySelector(selector);
        if (el && el.textContent.trim()) {
          result.title = el.textContent.trim();
          break;
        }
      }
      
      // 提取所有文本内容用于分析
      const allText = document.body.innerText;
      
      // 尝试提取设计师/公司信息
      const textLines = allText.split('\n').map(l => l.trim()).filter(l => l);
      
      // 查找包含 Design by / Designer / Company / Studio 的行
      for (let i = 0; i < textLines.length; i++) {
        const line = textLines[i].toLowerCase();
        
        if (line.includes('design by') || line.includes('designer')) {
          result.designerName = textLines[i + 1] || textLines[i].replace(/design by|designer/i, '').trim();
        }
        
        if (line.includes('company') || line.includes('studio') || line.includes('firm')) {
          result.company = textLines[i + 1] || textLines[i].replace(/company|studio|firm/i, '').trim();
        }
        
        if (line.includes('location') || line.includes('country')) {
          result.country = textLines[i + 1] || textLines[i].replace(/location|country/i, '').trim();
        }
        
        if (line.includes('category')) {
          result.category = textLines[i + 1] || textLines[i].replace(/category/i, '').trim();
        }
      }
      
      // 提取图片
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        const src = img.src || img.dataset.src;
        if (src && !src.includes('logo') && !src.includes('icon')) {
          result.images.push(src);
        }
      });
      
      // 提取描述
      const descSelectors = ['.description', '.project-description', '[class*="desc"]', 'p'];
      for (const selector of descSelectors) {
        const els = document.querySelectorAll(selector);
        if (els.length > 0) {
          result.description = Array.from(els).map(el => el.textContent.trim()).join(' ').slice(0, 500);
          break;
        }
      }
      
      return result;
    });
    
    return details;
  } catch (error) {
    console.error(`提取详情失败 ${detailUrl}:`, error.message);
    return null;
  }
}

/**
 * 采集单年份获奖者
 */
async function crawlWinnersByYear(year, outputDir) {
  console.log(`\n🎯 开始采集 ${year} 年获奖者数据...`);
  
  const browser = await createBrowser();
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  
  const winners = [];
  let retries = 0;
  
  try {
    // 访问获奖者页面
    const url = `${CONFIG.baseUrl}?year=${year}`;
    console.log(`📄 访问页面: ${url}`);
    
    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 60000
    });
    
    // 等待页面加载
    console.log('⏳ 等待页面加载...');
    await delay(10000);
    
    // 滚动页面触发懒加载
    console.log('📜 滚动页面加载更多内容...');
    let previousHeight = 0;
    let scrollCount = 0;
    const maxScrolls = 30;
    
    while (scrollCount < maxScrolls) {
      const currentHeight = await page.evaluate(() => document.body.scrollHeight);
      if (currentHeight === previousHeight && scrollCount > 5) {
        break;
      }
      
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await delay(3000);
      
      previousHeight = currentHeight;
      scrollCount++;
      process.stdout.write(`\r  滚动进度: ${scrollCount}/${maxScrolls}`);
    }
    console.log('\n✅ 滚动完成');
    
    // 提取获奖者列表
    console.log('🔍 提取获奖者数据...');
    
    const winnerData = await page.evaluate(() => {
      const results = [];
      
      // 尝试多种选择器
      const selectors = [
        '.gallery-highlight',
        '.gallery-item',
        '.winner-item',
        '.winner-card',
        '[class*="gallery"]',
        '[class*="winner"]'
      ];
      
      for (const selector of selectors) {
        const elements = document.querySelectorAll(selector);
        console.log(`选择器 ${selector}: 找到 ${elements.length} 个元素`);
        
        if (elements.length > 0) {
          elements.forEach((el, index) => {
            try {
              // 查找链接
              const link = el.querySelector('a') || el.closest('a');
              const href = link?.href || '';
              
              // 查找图片
              const img = el.querySelector('img');
              const imageUrl = img?.src || img?.dataset?.src || '';
              
              // 查找标题
              const titleEl = el.querySelector('h3, h4, .title, [class*="title"]');
              const title = titleEl?.textContent?.trim() || 
                           img?.alt || 
                           el.textContent?.slice(0, 50)?.trim() || 
                           '';
              
              // 查找类别
              const categoryEl = el.querySelector('.category, [class*="category"]');
              const category = categoryEl?.textContent?.trim() || '';
              
              // 查找奖项等级
              const awardEl = el.querySelector('.award, [class*="award"], [class*="platinum"], [class*="gold"], [class*="silver"]');
              const awardLevel = awardEl?.textContent?.trim() || '';
              
              if (title || imageUrl) {
                results.push({
                  id: `muse-${Date.now()}-${index}`,
                  title,
                  imageUrl,
                  detailUrl: href,
                  category,
                  awardLevel,
                  year: '',
                  designerName: '',
                  company: '',
                  country: '',
                  isChinese: false,
                  extractedAt: new Date().toISOString()
                });
              }
            } catch (e) {
              console.error('提取元素失败:', e);
            }
          });
          
          if (results.length > 0) {
            console.log(`使用选择器 ${selector} 提取了 ${results.length} 个作品`);
            break;
          }
        }
      }
      
      return results;
    });
    
    console.log(`✅ 找到 ${winnerData.length} 个获奖者卡片`);
    
    // 显示前5个作品的预览
    if (winnerData.length > 0) {
      console.log('\n📋 前5个作品预览:');
      winnerData.slice(0, 5).forEach((w, i) => {
        console.log(`  ${i + 1}. ${w.title || '无标题'}`);
        console.log(`     链接: ${w.detailUrl || '无'}`);
        console.log(`     图片: ${w.imageUrl ? '有' : '无'}`);
      });
    }
    
    // 限制数量
    const limitedWinners = winnerData.slice(0, CONFIG.maxWinnersPerYear);
    
    // 提取详情
    console.log(`\n🔍 提取 ${limitedWinners.length} 个作品的详细信息...`);
    
    for (let i = 0; i < limitedWinners.length; i++) {
      const winner = limitedWinners[i];
      
      if (winner.detailUrl) {
        process.stdout.write(`\r  进度: ${i + 1}/${limitedWinners.length} - ${winner.title.slice(0, 30)}...`);
        
        const details = await extractWinnerDetails(page, winner.detailUrl);
        
        if (details) {
          winner.title = details.title || winner.title;
          winner.designerName = details.designerName;
          winner.company = details.company;
          winner.country = details.country;
          winner.category = details.category || winner.category;
          winner.awardLevel = details.awardLevel || winner.awardLevel;
          winner.description = details.description;
          winner.credits = details.credits;
          winner.images = details.images;
          winner.isChinese = isChineseDesigner(winner);
        }
        
        await delay(CONFIG.requestDelay);
      }
    }
    
    console.log('\n✅ 详情提取完成');
    
    // 保存数据
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputFile = path.join(outputDir, `muse-winners-${year}-${timestamp}.json`);
    
    const outputData = {
      awardName: 'MUSE Design Awards',
      year,
      crawlDate: new Date().toISOString(),
      totalCount: limitedWinners.length,
      chineseWinners: limitedWinners.filter(w => w.isChinese).length,
      winners: limitedWinners
    };
    
    fs.writeFileSync(outputFile, JSON.stringify(outputData, null, 2), 'utf8');
    console.log(`\n💾 数据已保存: ${outputFile}`);
    console.log(`📊 总计: ${limitedWinners.length} 个获奖者`);
    console.log(`🇨🇳 中国设计师: ${limitedWinners.filter(w => w.isChinese).length} 个`);
    
    return limitedWinners;
    
  } catch (error) {
    console.error(`\n❌ 采集 ${year} 年数据失败:`, error.message);
    if (retries < CONFIG.maxRetries) {
      retries++;
      console.log(`🔄 重试 ${retries}/${CONFIG.maxRetries}...`);
      await delay(5000);
      return crawlWinnersByYear(year, outputDir);
    }
    throw error;
  } finally {
    await browser.close();
  }
}

/**
 * 主函数
 */
async function main() {
  // 解析命令行参数
  const year = process.argv[2] || CONFIG.defaultYear;
  const outputDir = process.argv[3] || CONFIG.outputDir;
  
  console.log('🚀 MUSE设计奖获奖者数据采集工具');
  console.log(`📅 目标年份: ${year}`);
  console.log(`📁 输出目录: ${outputDir}`);
  
  // 创建输出目录
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`📂 创建目录: ${outputDir}`);
  }
  
  try {
    await crawlWinnersByYear(year, outputDir);
    console.log('\n✨ 采集完成!');
    process.exit(0);
  } catch (error) {
    console.error('\n💥 程序执行失败:', error);
    process.exit(1);
  }
}

// 运行
main();
