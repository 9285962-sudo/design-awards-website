/**
 * 通用奖项采集脚本
 * 用途：抓取指定奖项官网多个页面，提取文本内容，保存为JSON
 * 用法：node scripts/scrape-award.js <award_id> <url>
 * 示例：node scripts/scrape-award.js d_ad奖_2026 "https://www.dandad.org/"
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const awardId = process.argv[2];
const baseUrl = process.argv[3];

if (!awardId || !baseUrl) {
  console.log('用法: node scripts/scrape-award.js <award_id> <url>');
  process.exit(1);
}

// 每个奖项尝试抓取的页面路径
const PAGES = [
  { path: '', label: '首页' },
  { path: '/about', label: '关于' },
  { path: '/about-us', label: '关于' },
  { path: '/enter', label: '参赛' },
  { path: '/entry', label: '参赛' },
  { path: '/how-to-enter', label: '参赛指南' },
  { path: '/fees', label: '费用' },
  { path: '/pricing', label: '费用' },
  { path: '/categories', label: '类别' },
  { path: '/judging', label: '评审' },
  { path: '/criteria', label: '评审标准' },
  { path: '/rules', label: '规则' },
  { path: '/guidelines', label: '指南' },
  { path: '/requirements', label: '要求' },
  { path: '/faq', label: 'FAQ' },
  { path: '/contact', label: '联系' },
  { path: '/deadlines', label: '截止日期' },
  { path: '/dates', label: '日期' },
  { path: '/jury', label: '评委' },
  { path: '/judges', label: '评委' },
  { path: '/winners', label: '获奖者' },
];

const OUTPUT_DIR = path.join(__dirname, '..', '奖项数据', '_scrape_raw');

async function scrape() {
  console.log('============================');
  console.log('奖项ID:', awardId);
  console.log('官网:', baseUrl);
  console.log('============================\n');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    locale: 'en-US',
  });
  const page = await context.newPage();

  const results = {};
  let successCount = 0;

  for (let i = 0; i < PAGES.length; i++) {
    const p = PAGES[i];
    const url = p.path ? (baseUrl.replace(/\/+$/, '') + p.path) : baseUrl.replace(/\/+$/, '') + '/';

    // 去重：同一个 label 只取第一个成功的
    if (results[p.label]) continue;

    try {
      console.log(`[${i + 1}/${PAGES.length}] 尝试: ${p.label} → ${url}`);
      const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });

      if (!resp || resp.status() !== 200) {
        console.log(`  ⏭ 跳过 (HTTP ${resp ? resp.status() : '无响应'})`);
        continue;
      }

      await page.waitForTimeout(1000);

      const text = await page.evaluate(() => {
        // 移除 script/style/nav/footer 等无关内容
        const removeSelectors = ['script', 'style', 'nav', 'footer', 'header', 'noscript', 'iframe'];
        removeSelectors.forEach(sel => {
          document.querySelectorAll(sel).forEach(el => el.remove());
        });
        return document.body.innerText.trim();
      });

      if (text && text.length > 50) {
        results[p.label] = {
          url: url,
          text: text.substring(0, 15000), // 限制长度避免太大
          length: text.length
        };
        successCount++;
        console.log(`  ✅ 成功 (${text.length} 字符)`);
      } else {
        console.log(`  ⏭ 内容太少 (${text ? text.length : 0} 字符)`);
      }

    } catch (e) {
      console.log(`  ⏭ 失败: ${e.message}`);
    }

    // 间隔 1 秒
    await new Promise(r => setTimeout(r, 1000));
  }

  await browser.close();

  // 保存结果
  const safeName = awardId.replace(/[^a-zA-Z0-9\u4e00-\u9fff_]/g, '_');
  const outputPath = path.join(OUTPUT_DIR, safeName + '.json');

  const output = {
    award_id: awardId,
    base_url: baseUrl,
    scraped_at: new Date().toISOString(),
    pages: results,
    page_count: successCount
  };

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');

  console.log('\n============================');
  console.log(`✅ 采集完成！成功 ${successCount} 个页面`);
  console.log(`📁 保存到: ${outputPath}`);
  console.log('============================');

  // 打印摘要
  Object.keys(results).forEach(label => {
    console.log(`  ${label}: ${results[label].url} (${results[label].length} 字符)`);
  });
}

scrape().catch(err => {
  console.error('❌ 脚本错误:', err.message);
  process.exit(1);
});
