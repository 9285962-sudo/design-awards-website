/**
 * 微信公众号文章采集脚本
 * 采集图文内容并生成网站文章页面
 * 
 * 使用方法:
 * node scripts/crawl-wechat-article.js <文章URL>
 * 
 * 示例:
 * node scripts/crawl-wechat-article.js "https://mp.weixin.qq.com/s/m9HtdScwXSqXEVJnNnANHw"
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
  outputDir: path.join(__dirname, '../website/preview/articles'),
  imagesDir: path.join(__dirname, '../website/preview/images/articles'),
  headless: false, // 设置为true可以隐藏浏览器窗口
  timeout: 60000,
};

/**
 * 清理文件名
 */
function sanitizeFilename(title) {
  return title
    .replace(/[\/\\:*?"<>|]/g, '_')
    .replace(/\s+/g, '_')
    .substring(0, 50);
}

/**
 * 下载图片
 */
async function downloadImage(page, imageUrl, outputPath) {
  try {
    const response = await page.evaluate(async (url) => {
      const res = await fetch(url);
      const blob = await res.blob();
      return Array.from(new Uint8Array(await blob.arrayBuffer()));
    }, imageUrl);
    
    fs.writeFileSync(outputPath, Buffer.from(response));
    return true;
  } catch (error) {
    console.error(`下载图片失败: ${imageUrl}`, error.message);
    return false;
  }
}

/**
 * 采集文章
 */
async function crawlArticle(url) {
  console.log(`开始采集: ${url}\n`);
  
  const browser = await chromium.launch({ 
    headless: CONFIG.headless,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 }
  });
  
  const page = await context.newPage();
  
  try {
    // 访问文章
    await page.goto(url, { waitUntil: 'networkidle', timeout: CONFIG.timeout });
    
    // 等待文章加载
    await page.waitForSelector('#js_content, .rich_media_content', { timeout: 10000 });
    
    // 提取文章数据
    const article = await page.evaluate(() => {
      // 标题
      const title = document.querySelector('#activity_name, .rich_media_title')?.textContent?.trim() || 
                    document.querySelector('h1')?.textContent?.trim() || 
                    '未命名文章';
      
      // 发布时间
      const publishTime = document.querySelector('#publish_time, .rich_media_meta_text')?.textContent?.trim() || '';
      
      // 公众号名称
      const accountName = document.querySelector('#js_name, .profile_nickname')?.textContent?.trim() || '';
      
      // 正文内容
      const contentElement = document.querySelector('#js_content, .rich_media_content');
      let content = '';
      let images = [];
      
      if (contentElement) {
        // 获取所有图片
        const imgElements = contentElement.querySelectorAll('img');
        imgElements.forEach((img, index) => {
          const src = img.getAttribute('data-src') || img.src;
          if (src && !src.includes('emoji')) {
            images.push({
              index: index,
              url: src,
              alt: img.alt || ''
            });
            // 替换图片路径为本地路径
            img.setAttribute('data-local-src', `images/articles/article_${index}.jpg`);
          }
        });
        
        // 获取HTML内容
        content = contentElement.innerHTML;
        
        // 清理内容
        content = content
          .replace(/data-src=/g, 'src=')
          .replace(/\s+style="[^"]*"/g, '')
          .replace(/\s+class="[^"]*"/g, '');
      }
      
      // 获取纯文本（用于摘要）
      const textContent = contentElement?.textContent?.trim() || '';
      const summary = textContent.substring(0, 200) + (textContent.length > 200 ? '...' : '');
      
      return {
        title,
        publishTime,
        accountName,
        content,
        textContent: summary,
        images,
        url: window.location.href
      };
    });
    
    console.log(`标题: ${article.title}`);
    console.log(`公众号: ${article.accountName}`);
    console.log(`发布时间: ${article.publishTime}`);
    console.log(`图片数量: ${article.images.length}`);
    console.log(`内容长度: ${article.textContent.length} 字符\n`);
    
    // 创建输出目录
    if (!fs.existsSync(CONFIG.outputDir)) {
      fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    }
    if (!fs.existsSync(CONFIG.imagesDir)) {
      fs.mkdirSync(CONFIG.imagesDir, { recursive: true });
    }
    
    // 下载图片
    const articleId = sanitizeFilename(article.title);
    const articleImagesDir = path.join(CONFIG.imagesDir, articleId);
    
    if (!fs.existsSync(articleImagesDir)) {
      fs.mkdirSync(articleImagesDir, { recursive: true });
    }
    
    console.log('开始下载图片...');
    const downloadedImages = [];
    
    for (let i = 0; i < article.images.length; i++) {
      const img = article.images[i];
      const ext = img.url.includes('.png') ? '.png' : '.jpg';
      const filename = `image_${String(i).padStart(2, '0')}${ext}`;
      const outputPath = path.join(articleImagesDir, filename);
      
      const success = await downloadImage(page, img.url, outputPath);
      if (success) {
        downloadedImages.push({
          originalUrl: img.url,
          localPath: `images/articles/${articleId}/${filename}`,
          alt: img.alt
        });
        console.log(`  ✓ 图片 ${i + 1}/${article.images.length}`);
      } else {
        console.log(`  ✗ 图片 ${i + 1}/${article.images.length} 下载失败`);
      }
      
      // 延迟一下，避免请求过快
      await page.waitForTimeout(500);
    }
    
    console.log(`\n成功下载 ${downloadedImages.length}/${article.images.length} 张图片\n`);
    
    // 生成文章HTML页面
    const htmlContent = generateArticleHTML(article, downloadedImages, articleId);
    const htmlPath = path.join(CONFIG.outputDir, `${articleId}.html`);
    fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
    
    console.log(`文章页面已生成: ${htmlPath}`);
    
    // 保存元数据JSON
    const metadata = {
      title: article.title,
      accountName: article.accountName,
      publishTime: article.publishTime,
      summary: article.textContent,
      url: article.url,
      localPath: `articles/${articleId}.html`,
      images: downloadedImages,
      crawledAt: new Date().toISOString()
    };
    
    const jsonPath = path.join(CONFIG.outputDir, `${articleId}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(metadata, null, 2), 'utf-8');
    
    console.log(`元数据已保存: ${jsonPath}\n`);
    console.log('=== 采集完成 ===');
    
    return metadata;
    
  } catch (error) {
    console.error('采集失败:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

/**
 * 生成文章HTML页面
 */
function generateArticleHTML(article, images, articleId) {
  // 替换内容中的图片路径
  let content = article.content;
  images.forEach((img, index) => {
    const originalPattern = new RegExp(`data-src="${img.originalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g');
    content = content.replace(originalPattern, `src="${img.localPath}"`);
  });
  
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${article.title} | 设计能</title>
  <meta name="description" content="${article.textContent.substring(0, 150)}">
  <link rel="stylesheet" href="../styles/main.css">
  <style>
    .article-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .article-header {
      margin-bottom: 40px;
      padding-bottom: 30px;
      border-bottom: 1px solid #e5e7eb;
    }
    .article-title {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 20px;
      line-height: 1.4;
    }
    .article-meta {
      display: flex;
      align-items: center;
      gap: 20px;
      color: #6b7280;
      font-size: 0.9rem;
    }
    .article-source {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .article-content {
      font-size: 1.1rem;
      line-height: 1.8;
      color: #374151;
    }
    .article-content img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 20px 0;
    }
    .article-content p {
      margin-bottom: 1.5em;
    }
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: #3b82f6;
      text-decoration: none;
      margin-bottom: 30px;
    }
    .back-link:hover {
      text-decoration: underline;
    }
    .original-link {
      margin-top: 40px;
      padding: 20px;
      background: #f3f4f6;
      border-radius: 8px;
    }
    .original-link a {
      color: #3b82f6;
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="container">
      <div class="logo">
        <span class="logo-text">设计能</span>
        <span class="logo-subtitle">国际设计大奖申报指南</span>
      </div>
      <nav class="nav">
        <a href="index.html">首页</a>
        <a href="index.html#awards">奖项库</a>
        <a href="compare.html">奖项对比</a>
        <a href="cases.html">成功案例</a>
        <a href="strategies.html">参赛策略</a>
        <a href="news.html">赛事新闻</a>
        <a href="index.html#contact">联系我们</a>
      </nav>
    </div>
  </header>

  <main class="article-container">
    <a href="news.html" class="back-link">← 返回赛事新闻</a>
    
    <article>
      <header class="article-header">
        <h1 class="article-title">${article.title}</h1>
        <div class="article-meta">
          <span class="article-source">
            <span>来源：${article.accountName || '微信公众号'}</span>
          </span>
          <span>${article.publishTime || ''}</span>
        </div>
      </header>
      
      <div class="article-content">
        ${content}
      </div>
      
      <div class="original-link">
        <p>原文链接：<a href="${article.url}" target="_blank" rel="noopener">${article.url}</a></p>
        <p style="font-size: 0.85rem; color: #6b7280; margin-top: 10px;">本文内容由系统自动采集，版权归原作者所有。</p>
      </div>
    </article>
  </main>

  <footer class="footer">
    <div class="container">
      <p>&copy; 2025 设计能 - 国际设计大奖申报指南</p>
    </div>
  </footer>
</body>
</html>`;
}

/**
 * 主函数
 */
async function main() {
  const url = process.argv[2];
  
  if (!url) {
    console.log('使用方法: node crawl-wechat-article.js <文章URL>');
    console.log('示例: node crawl-wechat-article.js "https://mp.weixin.qq.com/s/xxxxx"');
    process.exit(1);
  }
  
  try {
    await crawlArticle(url);
  } catch (error) {
    console.error('程序执行失败:', error);
    process.exit(1);
  }
}

// 运行
main();
