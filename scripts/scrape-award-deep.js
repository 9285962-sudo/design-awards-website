/**
 * 奖项深度采集脚本
 * 策略：从首页文本中提取所有链接，智能匹配费用/参赛/FAQ等关键页面
 * 用法：node scripts/scrape-award-deep.js <award_id> "<url>"
 * 示例：node scripts/scrape-award-deep.js 伦敦创意大赛_2026 "https://licc.uk/"
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const awardId = process.argv[2];
const baseUrl = process.argv[3];

if (!awardId || !baseUrl) {
  console.log('用法: node scripts/scrape-award-deep.js <award_id> <url>');
  console.log('示例: node scripts/scrape-award-deep.js 伦敦创意大赛_2026 "https://licc.uk/"');
  process.exit(1);
}

const OUTPUT_DIR = path.join(__dirname, '..', '奖项数据', '_scrape_raw');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// 关键词匹配规则
const KEYWORD_PATTERNS = {
  '费用': /fee|pric|cost|entry\s*fee|payment|subscription/i,
  '参赛': /enter|entry|submit|how\s*to\s*enter|particip|apply|register|registration/i,
  '类别': /categor|class|discipline|sector/i,
  '规则': /rule|guideline|term|condition|eligib|requirement/i,
  '评审': /judg|jury|criteria|evaluation|assessment/i,
  'FAQ': /faq|question|frequently/i,
  '关于': /about|overview|introduction|mission/i,
  '时间': /deadline|date|schedule|timeline|calendar/i,
  '获奖者': /winner|past\s*winner|previous|gallery/i,
  '联系': /contact|reach/i,
};

async function scrapeDeep() {
  console.log('============================');
  console.log('深度采集:', awardId);
  console.log('官网:', baseUrl);
  console.log('============================\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    locale: 'en-US',
  });
  const page = await context.newPage();

  const results = {};

  // Step 1: 访问首页，提取所有链接
  console.log('[1] 访问首页，提取链接...');
  try {
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(1500);

    const { homeText, links } = await page.evaluate(function() {
      // 提取文本
      var removeSelectors = ['script', 'style', 'noscript', 'iframe'];
      removeSelectors.forEach(function(sel) {
        document.querySelectorAll(sel).forEach(function(el) { el.remove(); });
      });
      var text = document.body.innerText.trim();

      // 提取链接
      var anchors = document.querySelectorAll('a[href]');
      var linkList = [];
      anchors.forEach(function(a) {
        var href = a.getAttribute('href');
        var text = (a.innerText || a.textContent || '').trim().substring(0, 100);
        if (href && href.startsWith('http') && text) {
          linkList.push({ url: href, text: text });
        } else if (href && !href.startsWith('#') && !href.startsWith('javascript') && href !== '/' && text) {
          linkList.push({ url: href, text: text });
        }
      });

      return { homeText: text, links: linkList };
    });

    results['首页'] = { url: baseUrl, text: homeText.substring(0, 15000) };
    console.log(`  首页: ${homeText.length} 字符, ${links.length} 个链接`);

    // Step 2: 按关键词匹配链接
    console.log('[2] 智能匹配关键页面...');
    var matchedUrls = {};
    var domain = new URL(baseUrl).origin;

    links.forEach(function(link) {
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

    console.log('  匹配结果:');
    for (var label in matchedUrls) {
      console.log('    ' + label + ': ' + matchedUrls[label].text + ' → ' + matchedUrls[label].url);
    }

    // Step 3: 逐个访问匹配到的页面
    console.log('[3] 采集匹配页面...');
    var visited = new Set([baseUrl]);
    for (var label in matchedUrls) {
      var url = matchedUrls[label].url;
      if (visited.has(url)) continue;
      visited.add(url);

      try {
        console.log(`  采集: ${label} → ${url}`);
        var resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
        if (!resp || resp.status() !== 200) {
          console.log(`    跳过 (HTTP ${resp ? resp.status() : '无响应'})`);
          continue;
        }
        await page.waitForTimeout(1500);

        var pageText = await page.evaluate(function() {
          var removeSelectors = ['script', 'style', 'nav', 'footer', 'noscript', 'iframe'];
          removeSelectors.forEach(function(sel) {
            document.querySelectorAll(sel).forEach(function(el) { el.remove(); });
          });
          return document.body.innerText.trim();
        });

        if (pageText && pageText.length > 50) {
          results[label] = { url: url, text: pageText.substring(0, 15000) };
          console.log(`    ✅ ${pageText.length} 字符`);
        } else {
          console.log(`    内容太少`);
        }
      } catch (e) {
        console.log(`    失败: ${e.message.substring(0, 60)}`);
      }

      await new Promise(function(r) { setTimeout(r, 800); });
    }

    // Step 4: 尝试常见子页面路径（兜底）
    console.log('[4] 兜底尝试常见路径...');
    var fallbackPaths = ['/fees', '/enter', '/categories', '/faq', '/about', '/judging', '/rules', '/deadlines'];
    for (var i = 0; i < fallbackPaths.length; i++) {
      var p = fallbackPaths[i];
      var fUrl = domain + p;
      if (visited.has(fUrl)) continue;

      // 如果关键词匹配已经找到对应类型的页面，跳过
      var pathLabel = '';
      if (/fees|pric/.test(p)) pathLabel = '费用';
      else if (/enter|submit/.test(p)) pathLabel = '参赛';
      else if (/categor/.test(p)) pathLabel = '类别';
      else if (/faq/.test(p)) pathLabel = 'FAQ';
      else if (/about/.test(p)) pathLabel = '关于';
      else if (/judg/.test(p)) pathLabel = '评审';
      else if (/rule/.test(p)) pathLabel = '规则';
      else if (/deadline/.test(p)) pathLabel = '时间';

      if (pathLabel && results[pathLabel]) continue;

      try {
        var resp2 = await page.goto(fUrl, { waitUntil: 'domcontentloaded', timeout: 8000 });
        if (!resp2 || resp2.status() !== 200) continue;
        await page.waitForTimeout(800);

        var ft = await page.evaluate(function() {
          var sels = ['script', 'style', 'nav', 'footer', 'noscript', 'iframe'];
          sels.forEach(function(s) { document.querySelectorAll(s).forEach(function(e) { e.remove(); }); });
          return document.body.innerText.trim();
        });

        if (ft && ft.length > 80 && pathLabel) {
          results[pathLabel] = { url: fUrl, text: ft.substring(0, 15000) };
          visited.add(fUrl);
          console.log(`  兜底 ${pathLabel}: ✅ ${ft.length} 字符`);
        }
      } catch (e) {
        // 忽略
      }
    }

  } catch (e) {
    console.error('首页访问失败:', e.message);
  }

  await browser.close();

  // 保存
  var safeName = awardId.replace(/[^a-zA-Z0-9\u4e00-\u9fff_]/g, '_');
  var outputPath = path.join(OUTPUT_DIR, safeName + '_deep.json');
  var output = {
    award_id: awardId,
    base_url: baseUrl,
    scraped_at: new Date().toISOString(),
    pages: results,
    page_count: Object.keys(results).length
  };

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');

  console.log('\n============================');
  console.log('深度采集完成！');
  console.log('页面数:', Object.keys(results).length);
  Object.keys(results).forEach(function(label) {
    console.log('  ' + label + ': ' + results[label].url + ' (' + results[label].text.length + ' 字符)');
  });
  console.log('保存到:', outputPath);
  console.log('============================');
}

scrapeDeep().catch(function(err) {
  console.error('脚本错误:', err.message);
  process.exit(1);
});
