/**
 * 批量深度采集脚本
 * 对所有已采集首页的奖项执行深度采集（智能匹配子页面）
 * 用法：node scripts/scrape-batch-deep.js
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const RAW_DIR = path.join(__dirname, '..', '奖项数据', '_scrape_raw');
const OUTPUT_DIR = RAW_DIR; // 同目录，用 _deep.json 后缀区分

// 关键词匹配规则
const KEYWORD_PATTERNS = {
  '费用': /fee|pric|cost|entry\s*fee|payment/i,
  '参赛': /enter|entry|submit|how\s*to\s*enter|particip|apply|register/i,
  '类别': /categor|class|discipline|sector/i,
  '规则': /rule|guideline|term|condition|eligib|requirement/i,
  '评审': /judg|jury|criteria|evaluation/i,
  'FAQ': /faq|question|frequently/i,
  '关于': /about|overview|introduction|mission/i,
  '时间': /deadline|date|schedule|timeline|calendar/i,
  '获奖者': /winner|past\s*winner|previous/i,
  '联系': /contact|reach/i,
};

// 读取已成功采集首页的奖项
const homeFiles = fs.readdirSync(RAW_DIR)
  .filter(function(f) { return f.endsWith('.json') && f.indexOf('_deep') === -1 && f !== '_progress.json'; });

console.log('============================');
console.log('批量深度采集');
console.log('待处理:', homeFiles.length, '个奖项');
console.log('============================\n');

async function scrapeDeepForAward(page, baseUrl, awardId) {
  var results = {};

  try {
    var resp = await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
    if (!resp || resp.status() !== 200) return results;
    await page.waitForTimeout(1500);

    var data = await page.evaluate(function() {
      var sels = ['script', 'style', 'noscript', 'iframe'];
      sels.forEach(function(s) { document.querySelectorAll(s).forEach(function(e) { e.remove(); }); });
      var text = document.body.innerText.trim();

      var anchors = document.querySelectorAll('a[href]');
      var linkList = [];
      anchors.forEach(function(a) {
        var href = a.getAttribute('href');
        var txt = (a.innerText || a.textContent || '').trim().substring(0, 100);
        if (href && !href.startsWith('#') && !href.startsWith('javascript') && txt) {
          linkList.push({ url: href, text: txt });
        }
      });

      return { text: text, links: linkList };
    });

    results['首页'] = { url: baseUrl, text: data.text.substring(0, 15000) };

    var domain;
    try { domain = new URL(baseUrl).origin; } catch(e) { domain = baseUrl; }

    // 匹配链接
    var matchedUrls = {};
    data.links.forEach(function(link) {
      var fullUrl = link.url;
      if (!fullUrl.startsWith('http')) {
        fullUrl = domain + (fullUrl.startsWith('/') ? '' : '/') + fullUrl;
      }
      var combined = (link.url + ' ' + link.text).toLowerCase();
      for (var label in KEYWORD_PATTERNS) {
        if (!matchedUrls[label] && KEYWORD_PATTERNS[label].test(combined)) {
          matchedUrls[label] = { url: fullUrl, text: link.text };
        }
      }
    });

    // 采集匹配到的页面
    var visited = new Set([baseUrl]);
    for (var label in matchedUrls) {
      var url = matchedUrls[label].url;
      if (visited.has(url)) continue;
      visited.add(url);

      try {
        var r = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
        if (!r || r.status() !== 200) continue;
        await page.waitForTimeout(1000);

        var pt = await page.evaluate(function() {
          var sels = ['script', 'style', 'nav', 'footer', 'noscript', 'iframe'];
          sels.forEach(function(s) { document.querySelectorAll(s).forEach(function(e) { e.remove(); }); });
          return document.body.innerText.trim();
        });

        if (pt && pt.length > 50) {
          results[label] = { url: url, text: pt.substring(0, 15000) };
        }
      } catch (e) { /* 忽略 */ }

      await new Promise(function(r) { setTimeout(r, 500); });
    }

    // 兜底路径
    var fbPaths = ['/fees', '/enter', '/categories', '/faq', '/about', '/judging', '/rules', '/deadlines'];
    for (var i = 0; i < fbPaths.length; i++) {
      var p = fbPaths[i];
      var fUrl = domain + p;
      if (visited.has(fUrl)) continue;

      var pl = '';
      if (/fees|pric/.test(p)) pl = '费用';
      else if (/enter|submit/.test(p)) pl = '参赛';
      else if (/categor/.test(p)) pl = '类别';
      else if (/faq/.test(p)) pl = 'FAQ';
      else if (/about/.test(p)) pl = '关于';
      else if (/judg/.test(p)) pl = '评审';
      else if (/rule/.test(p)) pl = '规则';
      else if (/deadline/.test(p)) pl = '时间';
      if (pl && results[pl]) continue;

      try {
        var r2 = await page.goto(fUrl, { waitUntil: 'domcontentloaded', timeout: 8000 });
        if (!r2 || r2.status() !== 200) continue;
        await page.waitForTimeout(800);
        var ft = await page.evaluate(function() {
          var sels = ['script', 'style', 'nav', 'footer', 'noscript', 'iframe'];
          sels.forEach(function(s) { document.querySelectorAll(s).forEach(function(e) { e.remove(); }); });
          return document.body.innerText.trim();
        });
        if (ft && ft.length > 80 && pl) {
          results[pl] = { url: fUrl, text: ft.substring(0, 15000) };
          visited.add(fUrl);
        }
      } catch(e) { /* 忽略 */ }
    }

  } catch(e) {
    console.error('  错误:', e.message.substring(0, 60));
  }

  return results;
}

async function main() {
  var browser = await chromium.launch({ headless: true });
  var context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    locale: 'en-US',
  });

  var successCount = 0;
  var totalChars = 0;
  var startTime = Date.now();

  for (var i = 0; i < homeFiles.length; i++) {
    var fileName = homeFiles[i];
    var filePath = path.join(RAW_DIR, fileName);

    // 跳过已深度采集的
    var deepFileName = fileName.replace('.json', '_deep.json');
    if (fs.existsSync(path.join(OUTPUT_DIR, deepFileName))) {
      console.log('[' + (i+1) + '/' + homeFiles.length + '] 跳过(已有): ' + fileName);
      continue;
    }

    var data;
    try {
      data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch(e) {
      console.log('[' + (i+1) + '/' + homeFiles.length + '] 跳过(解析失败): ' + fileName);
      continue;
    }

    var page = await context.newPage();
    console.log('[' + (i+1) + '/' + homeFiles.length + '] ' + data.name + ' → ' + data.url);

    var results = await scrapeDeepForAward(page, data.url, data.award_id);
    await page.close();

    if (Object.keys(results).length > 0) {
      var output = {
        award_id: data.award_id,
        name: data.name,
        base_url: data.url,
        scraped_at: new Date().toISOString(),
        pages: results,
        page_count: Object.keys(results).length
      };

      var safeName = data.award_id.replace(/[^a-zA-Z0-9\u4e00-\u9fff_]/g, '_');
      var outPath = path.join(OUTPUT_DIR, safeName + '_deep.json');
      fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf-8');

      var chars = 0;
      for (var k in results) chars += results[k].text.length;
      totalChars += chars;

      console.log('  ✅ ' + Object.keys(results).length + ' 页, ' + chars + ' 字符');
      successCount++;
    } else {
      console.log('  ❌ 无内容');
    }

    // 进度报告
    if ((i + 1) % 10 === 0) {
      var elapsed = Math.round((Date.now() - startTime) / 1000);
      console.log('  📊 进度: ' + successCount + ' 成功, ' + Math.round(elapsed/60) + ' 分钟\n');
    }
  }

  await browser.close();

  var totalTime = Math.round((Date.now() - startTime) / 1000);
  console.log('\n============================');
  console.log('批量深度采集完成！');
  console.log('  ✅ 成功: ' + successCount);
  console.log('  📊 总字符: ' + totalChars.toLocaleString());
  console.log('  ⏱ 用时: ' + Math.round(totalTime/60) + ' 分钟');
  console.log('============================');
}

main().catch(function(err) {
  console.error('脚本错误:', err.message);
  process.exit(1);
});
