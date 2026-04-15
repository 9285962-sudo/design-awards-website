/**
 * 调试 MUSE 获奖者页面结构
 */

const { chromium } = require('playwright');

async function debugPage() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();
  
  try {
    console.log('正在访问 MUSE 获奖者页面...');
    await page.goto('https://design.museaward.com/winners?year=2025', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
    
    // 等待更长时间让 JavaScript 加载内容
    console.log('等待页面加载...');
    await page.waitForTimeout(10000);
    
    // 多次滚动触发懒加载
    console.log('滚动页面...');
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2000);
      console.log(`  滚动 ${i + 1}/5`);
    }
    
    // 等待更长时间
    await page.waitForTimeout(5000);
    
    // 获取页面信息
    const pageInfo = await page.evaluate(() => {
      // 查找所有可能的作品容器
      const results = [];
      
      // 方法1: 查找所有 a 标签（更宽的筛选条件）
      document.querySelectorAll('a').forEach((a, i) => {
        const img = a.querySelector('img');
        if (img && img.src) {
          // 排除 logo 和广告
          if (!img.src.includes('logo') && 
              !img.src.includes('banner') &&
              !a.href.includes('tkqlhce') &&
              !a.href.includes('lduhtrp')) {
            results.push({
              index: i,
              href: a.href,
              imgSrc: img.src.slice(0, 80),
              text: a.textContent?.trim().slice(0, 50) || '',
              className: a.className || '',
              parentClass: a.parentElement?.className || ''
            });
          }
        }
      });
      
      // 方法2: 查找包含特定关键词的元素
      const keywords = ['winner', 'project', 'design', 'gallery', 'entry'];
      const keywordResults = [];
      
      keywords.forEach(keyword => {
        const elements = document.querySelectorAll(`[class*="${keyword}"]`);
        if (elements.length > 0) {
          keywordResults.push({
            keyword: keyword,
            count: elements.length,
            sample: elements[0]?.className?.slice(0, 100) || 'no class'
          });
        }
      });
      
      // 方法3: 获取页面中所有图片（排除小图标）
      const images = [];
      document.querySelectorAll('img').forEach(img => {
        const rect = img.getBoundingClientRect();
        // 只取较大的图片（可能是作品图）
        if (rect.width > 100 && rect.height > 100) {
          images.push({
            src: img.src.slice(0, 80),
            width: rect.width,
            height: rect.height,
            alt: img.alt?.slice(0, 50) || ''
          });
        }
      });
      
      return {
        totalLinks: results.length,
        links: results.slice(0, 10),
        keywordMatches: keywordResults,
        largeImages: images.slice(0, 10)
      };
    });
    
    console.log('\n=== 页面分析结果 ===\n');
    
    console.log(`找到 ${pageInfo.totalLinks} 个有效链接\n`);
    
    console.log('=== 链接详情 (前10个) ===');
    pageInfo.links.forEach((item, i) => {
      console.log(`\n[${i + 1}]`);
      console.log(`  链接: ${item.href}`);
      console.log(`  图片: ${item.imgSrc}...`);
      console.log(`  文字: ${item.text}`);
      console.log(`  class: ${item.className}`);
      console.log(`  父元素: ${item.parentClass}`);
    });
    
    console.log('\n=== 关键词匹配 ===');
    pageInfo.keywordMatches.forEach(k => {
      console.log(`  ${k.keyword}: ${k.count} 个元素 (示例: ${k.sample})`);
    });
    
    console.log('\n=== 大尺寸图片 (前10个) ===');
    pageInfo.largeImages.forEach((img, i) => {
      console.log(`[${i + 1}] ${img.width}x${img.height} - ${img.src}...`);
      console.log(`    描述: ${img.alt}`);
    });
    
    // 截图
    await page.screenshot({ path: 'debug-winners.png', fullPage: true });
    console.log('\n✅ 截图已保存: debug-winners.png');
    
  } catch (error) {
    console.error('错误:', error.message);
  } finally {
    await browser.close();
  }
}

debugPage();
