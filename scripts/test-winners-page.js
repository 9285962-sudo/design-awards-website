/**
 * 测试 MUSE 获奖者页面结构
 * 用于查看实际 HTML 结构，以便调整选择器
 */

const { chromium } = require('playwright');

async function testPage() {
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
    
    // 等待页面加载（获奖者画廊需要更长时间）
    await page.waitForTimeout(8000);
    
    // 尝试滚动触发加载
    console.log('滚动页面以触发内容加载...');
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(3000);
    
    // 获取页面结构信息
    const pageInfo = await page.evaluate(() => {
      // 查找常见的列表容器
      const containers = [];
      const listSelectors = [
        '.winner-item', '.winner-card', '.gallery-item', 
        '[class*="winner"]', '[class*="gallery"]', 
        '.row', '.col', '.grid-item', '.item', '.card'
      ];
      
      for (const selector of listSelectors) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          containers.push({
            selector: selector,
            count: elements.length,
            sample: elements[0]?.className?.slice(0, 100) || 'no class'
          });
        }
      }
      
      // 查找所有带图片的链接（可能是作品卡片）
      const imageLinks = document.querySelectorAll('a img');
      containers.push({
        selector: 'a img (图片链接)',
        count: imageLinks.length,
        sample: imageLinks[0]?.closest('a')?.href?.slice(0, 50) || 'no href'
      });
      
      // 查找可能的作品卡片
      const cards = [];
      document.querySelectorAll('a').forEach(a => {
        const img = a.querySelector('img');
        if (img && img.src && img.src.includes('museaward')) {
          cards.push({
            href: a.href,
            imgSrc: img.src.slice(0, 100),
            text: a.textContent?.slice(0, 100) || ''
          });
        }
      });
      
      return {
        title: document.title,
        containers: containers,
        sampleCards: cards.slice(0, 5),
        bodyClasses: document.body.className
      };
    });
    
    console.log('\n=== 页面信息 ===');
    console.log('标题:', pageInfo.title);
    console.log('Body classes:', pageInfo.bodyClasses);
    
    console.log('\n=== 可能的容器 ===');
    pageInfo.containers.forEach((c, i) => {
      console.log(`[${i+1}] ${c.selector}: ${c.count}个元素`);
      console.log(`   示例: ${c.sample}`);
    });
    
    console.log('\n=== 作品卡片示例 (前5个) ===');
    pageInfo.sampleCards.forEach((c, i) => {
      console.log(`\n[${i+1}]`);
      console.log(`   链接: ${c.href}`);
      console.log(`   图片: ${c.imgSrc}...`);
      console.log(`   文字: ${c.text.slice(0, 50)}...`);
    });
    
    // 截图保存
    await page.screenshot({ path: 'winners-page-test.png', fullPage: true });
    console.log('\n✅ 截图已保存: winners-page-test.png');
    
  } catch (error) {
    console.error('错误:', error.message);
  } finally {
    await browser.close();
  }
}

testPage();
