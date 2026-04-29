/**
 * 批量奖项首页采集脚本
 * 用途：一次性抓取所有待采集奖项的官网首页文本，快速建立基础数据
 * 输出：每个奖项一个JSON文件，包含首页文本
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const awards = require(path.join(__dirname, '..', 'website', 'data', 'awards.json'));
const detailIds = new Set(
  require(path.join(__dirname, '..', 'website', 'data', 'award-details.json'))
    .map(function(a) { return a.award_id; })
);

// 过滤出无详细数据的奖项
const toScrape = awards.filter(function(a) {
  return !detailIds.has(a.award_id) && a.website;
}).map(function(a) {
  return {
    id: a.id,
    award_id: a.award_id,
    name: a.award_name_cn || a.award_name_en || 'Unknown',
    url: a.website
  };
});

console.log('============================');
console.log('批量首页采集');
console.log('总奖项:', awards.length);
console.log('已有详细数据:', detailIds.size);
console.log('待采集:', toScrape.length);
console.log('============================\n');

const OUTPUT_DIR = path.join(__dirname, '..', '奖项数据', '_scrape_raw');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function scrapeAll() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    locale: 'en-US',
  });

  const results = [];
  let successCount = 0;
  let failCount = 0;

  // 每次用新页面，避免状态污染
  for (let i = 0; i < toScrape.length; i++) {
    const award = toScrape[i];
    const page = await context.newPage();

    console.log(`[${i + 1}/${toScrape.length}] ${award.name} → ${award.url}`);

    try {
      const resp = await page.goto(award.url, {
        waitUntil: 'domcontentloaded',
        timeout: 20000
      });

      if (!resp || (resp.status() !== 200 && resp.status() !== 301 && resp.status() !== 302)) {
        console.log(`  ⏭ HTTP ${resp ? resp.status() : '无响应'}`);
        results.push({ award_id: award.award_id, name: award.name, status: 'http_error', url: award.url });
        failCount++;
        await page.close();
        continue;
      }

      await page.waitForTimeout(1500);

      const text = await page.evaluate(function() {
        var removeSelectors = ['script', 'style', 'nav', 'footer', 'noscript', 'iframe'];
        removeSelectors.forEach(function(sel) {
          document.querySelectorAll(sel).forEach(function(el) { el.remove(); });
        });
        return document.body.innerText.trim();
      });

      if (text && text.length > 30) {
        // 保存文件
        var safeName = award.award_id.replace(/[^a-zA-Z0-9\u4e00-\u9fff_]/g, '_');
        var filePath = path.join(OUTPUT_DIR, safeName + '.json');
        var output = {
          award_id: award.award_id,
          name: award.name,
          url: award.url,
          scraped_at: new Date().toISOString(),
          home_text: text.substring(0, 20000),
          char_count: text.length
        };
        fs.writeFileSync(filePath, JSON.stringify(output, null, 2), 'utf-8');
        console.log(`  ✅ ${text.length} 字符 → ${safeName}.json`);
        results.push({ award_id: award.award_id, name: award.name, status: 'ok', chars: text.length });
        successCount++;
      } else {
        console.log(`  ⏭ 内容太少`);
        results.push({ award_id: award.award_id, name: award.name, status: 'empty', url: award.url });
        failCount++;
      }

    } catch (e) {
      console.log(`  ⏭ ${e.message.substring(0, 60)}`);
      results.push({ award_id: award.award_id, name: award.name, status: 'error', error: e.message, url: award.url });
      failCount++;
    }

    await page.close();

    // 每10个奖项保存一次进度
    if ((i + 1) % 10 === 0 || i === toScrape.length - 1) {
      var progressPath = path.join(OUTPUT_DIR, '_progress.json');
      fs.writeFileSync(progressPath, JSON.stringify(results, null, 2), 'utf-8');
      console.log(`  📊 进度: ${successCount} 成功 / ${failCount} 失败\n`);
    }

    // 短暂间隔
    await new Promise(function(r) { setTimeout(r, 500); });
  }

  await browser.close();

  // 最终报告
  console.log('\n============================');
  console.log(`采集完成！`);
  console.log(`  ✅ 成功: ${successCount}`);
  console.log(`  ❌ 失败: ${failCount}`);
  console.log(`  📁 保存到: ${OUTPUT_DIR}`);
  console.log('============================');
}

scrapeAll().catch(function(err) {
  console.error('脚本错误:', err.message);
  process.exit(1);
});
