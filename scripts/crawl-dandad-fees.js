/**
 * D&AD Awards 费用信息采集脚本
 * 采集专业组和学生组的参赛费用
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', '奖项数据');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function crawlDandadFees() {
  console.log('🚀 开始采集 D&AD Awards 费用信息...\n');
  
  const browser = await chromium.launch({
    headless: false,
    slowMo: 100
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  
  const page = await context.newPage();
  
  const feeData = {
    professional: {
      fees: {},
      deadlines: {}
    },
    newblood: {
      fees: {},
      deadlines: {}
    },
    crawlDate: new Date().toISOString()
  };
  
  try {
    // 1. 采集 D&AD Awards 专业组费用
    console.log('📄 采集 D&AD Awards 专业组费用...');
    await page.goto('https://www.dandad.org/awards/d-ad-awards', { waitUntil: 'networkidle' });
    await delay(3000);
    
    // 查找费用相关信息
    const professionalInfo = await page.evaluate(() => {
      const result = {
        text: '',
        fees: {},
        deadlines: {}
      };
      
      // 获取页面文本
      result.text = document.body.innerText;
      
      // 查找所有包含价格/费用的元素
      const feeElements = document.querySelectorAll('*');
      feeElements.forEach(el => {
        const text = el.textContent || '';
        // 匹配英镑价格格式
        if (text.match(/£[\d,]+/)) {
          console.log('Found price:', text);
        }
      });
      
      // 查找关键日期
      const dateElements = document.querySelectorAll('time, [datetime], .date, .deadline');
      dateElements.forEach(el => {
        const text = el.textContent?.trim();
        if (text && text.match(/2026/)) {
          console.log('Found date:', text);
        }
      });
      
      return result;
    });
    
    console.log('专业组页面文本片段:', professionalInfo.text.substring(0, 2000));
    
    // 2. 尝试查找 Entry Kit 下载链接
    console.log('\n📄 查找 Entry Kit 下载链接...');
    const entryKitLinks = await page.evaluate(() => {
      const links = [];
      document.querySelectorAll('a[href*="Entry_Kit"], a[href*="entry-kit"], a[href*=".pdf"]').forEach(a => {
        links.push({
          text: a.textContent?.trim(),
          href: a.href
        });
      });
      return links;
    });
    console.log('找到的PDF链接:', entryKitLinks);
    
    // 3. 采集 New Blood Awards 学生组费用
    console.log('\n📄 采集 New Blood Awards 学生组费用...');
    await page.goto('https://www.dandad.org/awards/new-blood-awards', { waitUntil: 'networkidle' });
    await delay(3000);
    
    const newbloodInfo = await page.evaluate(() => {
      const result = {
        text: '',
        fees: {}
      };
      
      result.text = document.body.innerText;
      
      // 查找费用信息
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        const text = el.textContent || '';
        if (text.match(/£[\d,]+/) || text.match(/fee/i) || text.match(/cost/i) || text.match(/price/i)) {
          console.log('Found:', text);
        }
      });
      
      return result;
    });
    
    console.log('学生组页面文本片段:', newbloodInfo.text.substring(0, 2000));
    
    // 4. 尝试点击"How to Enter"或"Enter Now"按钮查看费用
    console.log('\n📄 尝试进入报名流程查看费用...');
    
    // 先回到专业组页面
    await page.goto('https://www.dandad.org/awards/d-ad-awards', { waitUntil: 'networkidle' });
    await delay(2000);
    
    // 查找并点击报名相关链接
    const enterLinks = await page.evaluate(() => {
      const links = [];
      document.querySelectorAll('a').forEach(a => {
        const text = a.textContent?.toLowerCase() || '';
        if (text.includes('enter') || text.includes('how to enter') || text.includes('pricing') || text.includes('fee')) {
          links.push({
            text: a.textContent?.trim(),
            href: a.href
          });
        }
      });
      return links;
    });
    console.log('找到的报名链接:', enterLinks);
    
    // 5. 尝试访问D&AD报名系统
    console.log('\n📄 尝试访问报名系统...');
    await page.goto('https://www.dandad.org/enter', { waitUntil: 'networkidle' });
    await delay(3000);
    
    const enterPageInfo = await page.evaluate(() => {
      return {
        url: window.location.href,
        title: document.title,
        text: document.body.innerText.substring(0, 3000)
      };
    });
    console.log('报名页面信息:', enterPageInfo);
    
    // 6. 查找FAQ页面
    console.log('\n📄 查找FAQ页面...');
    await page.goto('https://www.dandad.org/about/faq', { waitUntil: 'networkidle' });
    await delay(3000);
    
    const faqInfo = await page.evaluate(() => {
      const faqs = [];
      document.querySelectorAll('.faq-item, .accordion-item, [class*="faq"], details').forEach(item => {
        const question = item.querySelector('h3, h4, summary, .question')?.textContent?.trim();
        const answer = item.querySelector('p, .answer, .content')?.textContent?.trim();
        if (question && (question.toLowerCase().includes('fee') || question.toLowerCase().includes('cost') || question.toLowerCase().includes('price') || question.toLowerCase().includes('费用') || question.includes('£'))) {
          faqs.push({ question, answer });
        }
      });
      return {
        faqs: faqs,
        fullText: document.body.innerText
      };
    });
    
    console.log('FAQ中找到的费用相关问题:', faqInfo.faqs);
    
    // 保存采集结果
    feeData.professional.rawText = professionalInfo.text;
    feeData.newblood.rawText = newbloodInfo.text;
    feeData.faqInfo = faqInfo;
    
    const outputFile = path.join(OUTPUT_DIR, 'D&AD_费用信息采集.json');
    fs.writeFileSync(outputFile, JSON.stringify(feeData, null, 2));
    
    console.log('\n✅ 采集完成！');
    console.log(`📁 数据保存至: ${outputFile}`);
    
  } catch (error) {
    console.error('\n❌ 采集失败:', error.message);
  } finally {
    await browser.close();
  }
}

crawlDandadFees().catch(console.error);
