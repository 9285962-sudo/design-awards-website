/**
 * 微信公众号文章批量采集脚本
 * 支持从文件读取多个URL批量处理，生成符合网站风格的文章页面
 * 
 * 使用方法:
 * node scripts/crawl-wechat-batch.js
 * 
 * URL列表文件: scripts/urls/wechat-articles.json
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 配置
const CONFIG = {
  urlFile: path.join(__dirname, 'urls/wechat-articles.json'),
  outputDir: path.join(__dirname, '../website/out/news/articles'),  // 改为 out 目录，静态 HTML
  imagesDir: path.join(__dirname, '../website/out/images/articles'), // 图片也放 out 目录
  dataFile: path.join(__dirname, '../website/data/news-articles.json'),
  headless: true,
  timeout: 60000,
  delayBetweenArticles: 2000,
  // 图片压缩配置
  imageCompression: {
    maxWidth: 800,        // 最大宽度
    quality: 80,          // JPEG质量
    maxFileSize: 200 * 1024, // 最大文件大小 200KB
  }
};

/**
 * 清理文件名
 */
function sanitizeFilename(title) {
  return title
    .replace(/[\\/:*?"<>|]/g, '_')
    .replace(/\s+/g, '_')
    .substring(0, 50);
}

/**
 * 生成文章ID
 */
function generateArticleId(title, index) {
  const timestamp = Date.now().toString(36).slice(-4);
  const safeTitle = sanitizeFilename(title).substring(0, 30);
  return `${safeTitle}_${timestamp}_${index}`;
}

/**
 * 下载并压缩图片
 */
async function downloadImage(page, imageUrl, outputPath) {
  try {
    const response = await page.evaluate(async (url) => {
      const res = await fetch(url);
      const blob = await res.blob();
      return Array.from(new Uint8Array(await blob.arrayBuffer()));
    }, imageUrl);
    
    const buffer = Buffer.from(response);
    
    // 使用 sharp 压缩图片
    try {
      const image = sharp(buffer);
      const metadata = await image.metadata();
      
      // 如果图片宽度超过最大宽度，进行缩放
      if (metadata.width > CONFIG.imageCompression.maxWidth) {
        image.resize(CONFIG.imageCompression.maxWidth, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        });
      }
      
      // 根据格式选择压缩方式
      let compressedBuffer;
      if (metadata.format === 'png') {
        compressedBuffer = await image.png({ quality: CONFIG.imageCompression.quality }).toBuffer();
      } else if (metadata.format === 'webp') {
        compressedBuffer = await image.webp({ quality: CONFIG.imageCompression.quality }).toBuffer();
      } else {
        // 默认转为 JPEG
        compressedBuffer = await image.jpeg({ 
          quality: CONFIG.imageCompression.quality,
          progressive: true,
          mozjpeg: true
        }).toBuffer();
      }
      
      fs.writeFileSync(outputPath, compressedBuffer);
      const originalSize = (buffer.length / 1024).toFixed(1);
      const compressedSize = (compressedBuffer.length / 1024).toFixed(1);
      console.log(`  ✓ 下载并压缩: ${originalSize}KB → ${compressedSize}KB`);
      return true;
    } catch (sharpError) {
      // 如果 sharp 处理失败，保存原图
      console.log(`  ⚠ sharp处理失败，保存原图: ${sharpError.message}`);
      fs.writeFileSync(outputPath, buffer);
      return true;
    }
  } catch (error) {
    console.error(`  ✗ 下载失败: ${imageUrl.substring(0, 60)}...`);
    console.error(`     错误详情: ${error.message}`);
    return false;
  }
}

/**
 * 采集单篇文章
 */
async function crawlArticle(page, url, category = '赛事动态') {
  console.log(`\n📄 正在采集: ${url.substring(0, 80)}...`);
  
  try {
    // 访问文章
    await page.goto(url, { waitUntil: 'networkidle', timeout: CONFIG.timeout });
    
    // 等待文章加载
    await page.waitForSelector('#js_content, .rich_media_content', { timeout: 10000 });
    
    // 自动滚动页面触发懒加载
    console.log('  📜 滚动页面触发懒加载...');
    await page.evaluate(async () => {
      const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
      
      // 多次滚动确保所有懒加载图片都被触发
      for (let round = 0; round < 3; round++) {
        const height = document.body.scrollHeight;
        const viewport = window.innerHeight;
        let current = 0;
        
        while (current < height) {
          window.scrollTo(0, current);
          await delay(500);
          current += viewport * 0.5;
        }
        
        // 滚动到底部后等待
        await delay(1000);
        
        // 滚动回顶部
        window.scrollTo(0, 0);
        await delay(500);
      }
      
      // 强制加载所有 data-src 图片
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.getAttribute('data-src');
      });
      
      // 强制加载所有 data-croporisrc 图片
      document.querySelectorAll('img[data-croporisrc]').forEach(img => {
        if (!img.src || img.src === window.location.href) {
          img.src = img.getAttribute('data-croporisrc');
        }
      });
      
      await delay(1000);
    });
    console.log('  ✓ 页面滚动完成');
    
    // 提取文章数据
    const article = await page.evaluate((cat) => {
      // 收集调试信息
      const debugInfo = [];
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
        // 克隆元素以避免修改原始DOM
        const clone = contentElement.cloneNode(true);
        
        // 获取所有图片
        const imgElements = clone.querySelectorAll('img');
        debugInfo.push(`🔍 发现 ${imgElements.length} 个图片元素`);
        
        imgElements.forEach((img, index) => {
          // 检查所有可能的图片属性
          const dataSrc = img.getAttribute('data-src');
          const src = img.src;
          const cropSrc = img.getAttribute('data-croporisrc');
          const dataRatio = img.getAttribute('data-ratio');
          
          debugInfo.push(`  [${index}] data-src=${dataSrc ? '有' : '无'}, src=${src ? '有' : '无'}, crop=${cropSrc ? '有' : '无'}, ratio=${dataRatio || '无'}`);
          
          const finalSrc = dataSrc || src || cropSrc;
          
          if (finalSrc && !finalSrc.includes('emoji') && !finalSrc.includes('svg')) {
            images.push({
              index: index,
              url: finalSrc,
              alt: img.alt || ''
            });
          }
        });
        
        // 清理内容中的样式和类名
        clone.querySelectorAll('*').forEach(el => {
          el.removeAttribute('style');
          el.removeAttribute('class');
          // 保留图片链接：优先 data-src，其次 data-croporisrc
          if (el.tagName === 'IMG') {
            const dataSrc = el.getAttribute('data-src') || el.getAttribute('data-croporisrc');
            if (dataSrc) {
              el.setAttribute('src', dataSrc);
            }
          }
        });
        
        content = clone.innerHTML;
      }
      
      // 获取纯文本（用于摘要）
      const textContent = contentElement?.textContent?.trim() || '';
      const summary = textContent.substring(0, 150) + (textContent.length > 150 ? '...' : '');
      
      return {
        title,
        publishTime,
        accountName,
        content,
        textContent: summary,
        images,
        category: cat,
        url: window.location.href,
        debugInfo
      };
    }, category);
    
    // 输出调试信息
    if (article.debugInfo) {
      article.debugInfo.forEach(info => console.log(`  ${info}`));
    }
    
    console.log(`  ✓ 标题: ${article.title.substring(0, 40)}...`);
    console.log(`  ✓ 公众号: ${article.accountName}`);
    console.log(`  ✓ 图片数量: ${article.images.length}`);
    
    return article;
    
  } catch (error) {
    console.error(`  ✗ 采集失败: ${error.message}`);
    return null;
  }
}

/**
 * 下载文章图片
 */
async function downloadArticleImages(page, article, articleId) {
  const articleImagesDir = path.join(CONFIG.imagesDir, articleId);
  
  if (!fs.existsSync(articleImagesDir)) {
    fs.mkdirSync(articleImagesDir, { recursive: true });
  }
  
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
        localPath: `/images/articles/${articleId}/${filename}`,
        alt: img.alt
      });
      process.stdout.write(`  📥 ${i + 1}/${article.images.length}\r`);
    }
    
    // 延迟一下，避免请求过快
    await page.waitForTimeout(300);
  }
  
  console.log(`  ✓ 成功下载 ${downloadedImages.length}/${article.images.length} 张图片`);
  
  return downloadedImages;
}

/**
 * 替换内容中的图片路径
 */
function replaceImagePaths(content, images) {
  let newContent = content;
  
  images.forEach((img, index) => {
    // 获取原始URL（可能包含 &amp; 等HTML实体）
    let originalUrl = img.originalUrl;
    
    // 尝试多种可能的URL格式
    const urlsToReplace = [originalUrl];
    
    // 如果URL包含 &，也尝试替换 &amp; 版本
    if (originalUrl.includes('&')) {
      urlsToReplace.push(originalUrl.replace(/&/g, '&amp;'));
    }
    // 如果URL包含 &amp;，也尝试替换 & 版本
    if (originalUrl.includes('&amp;')) {
      urlsToReplace.push(originalUrl.replace(/&amp;/g, '&'));
    }
    
    // 去重
    const uniqueUrls = [...new Set(urlsToReplace)];
    
    uniqueUrls.forEach(url => {
      // 转义正则特殊字符
      const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      
      // 先替换 data-src="..." 为占位符，避免重复替换
      const dataSrcRegex = new RegExp(`data-src=["']${escapedUrl}["']`, 'g');
      newContent = newContent.replace(dataSrcRegex, 'data-src-replaced="true"');
      
      // 再替换 src="..."
      const srcRegex = new RegExp(`src=["']${escapedUrl}["']`, 'g');
      newContent = newContent.replace(srcRegex, `src="${img.localPath}"`);
    });
  });
  
  // 清理残留的 data-src-replaced 属性
  newContent = newContent.replace(/data-src-replaced="true"/g, '');
  
  // 修复可能出现的重复 src 属性（保留第一个）
  newContent = newContent.replace(/(<img[^>]*?)src="([^"]*)"([^>]*?)src="([^"]*)"/g, '$1src="$2"$3');
  
  return newContent;
}

/**
 * 生成静态 HTML 页面（适配 Cloudflare Pages）
 */
function generateArticlePage(article, images, articleId) {
  const content = replaceImagePaths(article.content, images);
  const publishDate = article.publishTime || new Date().toISOString().split('T')[0];
  
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${article.title} | 设计能</title>
  <meta name="description" content="${article.textContent.substring(0, 150)}">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa; }
    a { text-decoration: none; }
    
    /* Header */
    .header { background-color: #1A1A1A; padding: 16px 0; position: sticky; top: 0; z-index: 100; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
    .header-inner { display: flex; justify-content: space-between; align-items: center; }
    .logo { display: flex; align-items: center; }
    .logo img { height: 40px; width: auto; }
    .logo-sub { font-size: 18px; font-weight: bold; color: #D4AF37; margin-left: 12px; }
    .nav { display: flex; gap: 20px; }
    .nav a { color: #fff; font-size: 14px; opacity: 0.9; }
    .nav a:hover { opacity: 1; }
    
    /* Hero */
    .hero { background: linear-gradient(135deg, #1E3A5F 0%, #2d4a6f 100%); padding: 30px 0; color: #fff; }
    .breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 14px; }
    .breadcrumb a { color: #fff; opacity: 0.8; }
    .breadcrumb span { opacity: 0.6; }
    
    /* Content */
    .section { padding: 40px 0; }
    .article { background-color: #fff; border-radius: 12px; padding: 40px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); max-width: 800px; margin: 0 auto; }
    .article-header { margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid #e5e7eb; }
    .category { display: inline-block; background-color: #E3F2FD; color: #1565C0; padding: 4px 12px; border-radius: 12px; font-size: 12px; margin-bottom: 16px; }
    .article-title { font-size: 28px; font-weight: bold; color: #1E3A5F; margin-bottom: 16px; line-height: 1.4; }
    .article-meta { display: flex; gap: 20px; color: #666; font-size: 14px; }
    
    /* Article Content */
    .article-content { 
      font-size: 16px; 
      line-height: 1.8; 
      color: #333;
    }
    .article-content img { 
      width: 100%; 
      max-width: 100%;
      height: auto; 
      border-radius: 8px; 
      margin: 24px 0; 
      display: block;
    }
    .article-content p { 
      margin-bottom: 1.5em;
    }
    .article-content p { margin-bottom: 1.5em; }
    .article-content h1, .article-content h2, .article-content h3 { margin: 1.5em 0 0.8em; color: #1E3A5F; }
    .article-content h1 { font-size: 24px; }
    .article-content h2 { font-size: 20px; }
    .article-content h3 { font-size: 18px; }
    .article-content strong { color: #1E3A5F; }
    
    /* Original Link */
    .original-link { margin-top: 40px; padding: 20px; background-color: #f3f4f6; border-radius: 8px; }
    .original-link a { color: #1565C0; word-break: break-all; }
    .original-link .disclaimer { font-size: 12px; color: #999; margin-top: 10px; }
    
    /* Footer */
    .footer { background-color: #1A1A1A; padding: 32px 0; color: #fff; }
    .footer-text { font-size: 14px; text-align: center; opacity: 0.7; }
    
    /* Responsive */
    @media (max-width: 768px) {
      .nav { display: none; }
      .article { padding: 24px; }
      .article-title { font-size: 22px; }
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="container">
      <div class="header-inner">
        <div class="logo">
          <a href="/">
            <img src="/设计能LOGO透明文件.png" alt="设计能">
          </a>
          <span class="logo-sub">国际设计大奖策略咨询平台</span>
        </div>
        <nav class="nav">
          <a href="/">首页</a>
          <a href="/awards">奖项库</a>
          <a href="/compare">奖项对比</a>
          <a href="/services">申报服务</a>
          <a href="/cases">获奖作品</a>
          <a href="/strategy">参赛策略</a>
          <a href="/news">赛事新闻</a>
          <a href="/about">关于我们</a>
        </nav>
      </div>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="container">
        <div class="breadcrumb">
          <a href="/">首页</a>
          <span>/</span>
          <a href="/news">赛事新闻</a>
          <span>/</span>
          <span>文章详情</span>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <article class="article">
          <header class="article-header">
            <span class="category">${article.category}</span>
            <h1 class="article-title">${article.title}</h1>
            <div class="article-meta">
              <span>来源：${article.accountName || '微信公众号'}</span>
              <span>${publishDate}</span>
            </div>
          </header>
          
          <div class="article-content">
            ${content}
          </div>
          
          <div class="original-link">
            <p>原文链接：<a href="${article.url}" target="_blank" rel="noopener">${article.url}</a></p>
            <p class="disclaimer">本文内容由系统自动采集，版权归原作者所有。</p>
          </div>
        </article>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <p class="footer-text">© 2026 设计能 | 电话：136-9222-2744 | 邮箱：9285962@qq.com</p>
    </div>
  </footer>
</body>
</html>`;
}

/**
 * 保存文章数据到JSON
 */
function saveArticleData(article, images, articleId) {
  const data = {
    id: articleId,
    title: article.title,
    category: article.category,
    publishTime: article.publishTime,
    accountName: article.accountName,
    summary: article.textContent,
    url: article.url,
    pagePath: `/news/articles/${articleId}.html`,
    images: images.map(img => img.localPath),
    crawledAt: new Date().toISOString()
  };
  
  // 读取现有数据
  let articlesData = [];
  if (fs.existsSync(CONFIG.dataFile)) {
    articlesData = JSON.parse(fs.readFileSync(CONFIG.dataFile, 'utf-8'));
  }
  
  // 检查是否已存在
  const existingIndex = articlesData.findIndex(a => a.url === article.url);
  if (existingIndex >= 0) {
    articlesData[existingIndex] = data;
    console.log('  📝 更新现有文章数据');
  } else {
    articlesData.unshift(data); // 新文章放前面
    console.log('  📝 添加新文章数据');
  }
  
  // 保存
  fs.writeFileSync(CONFIG.dataFile, JSON.stringify(articlesData, null, 2), 'utf-8');
}

/**
 * 读取URL列表
 */
function readUrlList() {
  if (!fs.existsSync(CONFIG.urlFile)) {
    console.error(`❌ URL列表文件不存在: ${CONFIG.urlFile}`);
    console.log('\n请创建URL列表文件，格式如下:');
    console.log(JSON.stringify([
      { url: 'https://mp.weixin.qq.com/s/xxxxx', category: '赛事动态' },
      { url: 'https://mp.weixin.qq.com/s/yyyyy', category: '获奖快讯' }
    ], null, 2));
    return [];
  }
  
  try {
    const data = JSON.parse(fs.readFileSync(CONFIG.urlFile, 'utf-8'));
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`❌ 读取URL列表失败: ${error.message}`);
    return [];
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('=== 微信公众号文章批量采集 [V2-DEBUG] ===\n');
  
  // 读取URL列表
  const urlList = readUrlList();
  if (urlList.length === 0) {
    console.log('没有需要采集的文章。');
    process.exit(0);
  }
  
  console.log(`📋 共 ${urlList.length} 篇文章待采集\n`);
  
  // 创建输出目录
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }
  if (!fs.existsSync(CONFIG.imagesDir)) {
    fs.mkdirSync(CONFIG.imagesDir, { recursive: true });
  }
  
  // 启动浏览器
  const browser = await chromium.launch({ 
    headless: CONFIG.headless,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 }
  });
  
  const page = await context.newPage();
  
  // 统计
  const stats = { success: 0, failed: 0, totalImages: 0 };
  
  // 批量采集
  for (let i = 0; i < urlList.length; i++) {
    const { url, category = '赛事动态' } = urlList[i];
    
    console.log(`\n[${i + 1}/${urlList.length}]`);
    
    // 采集文章
    const article = await crawlArticle(page, url, category);
    if (!article) {
      stats.failed++;
      continue;
    }
    
    // 生成文章ID
    const articleId = generateArticleId(article.title, i);
    
    // 下载图片
    const images = await downloadArticleImages(page, article, articleId);
    stats.totalImages += images.length;
    
    // 生成静态 HTML 页面文件
    const pageContent = generateArticlePage(article, images, articleId);
    const pagePath = path.join(CONFIG.outputDir, `${articleId}.html`);
    fs.writeFileSync(pagePath, pageContent, 'utf-8');
    console.log(`  ✓ 页面已生成: ${pagePath}`);
    
    // 保存数据
    saveArticleData(article, images, articleId);
    
    stats.success++;
    
    // 文章间延迟
    if (i < urlList.length - 1) {
      await page.waitForTimeout(CONFIG.delayBetweenArticles);
    }
  }
  
  await browser.close();
  
  // 输出统计
  console.log('\n=== 采集完成 ===');
  console.log(`✓ 成功: ${stats.success} 篇`);
  console.log(`✗ 失败: ${stats.failed} 篇`);
  console.log(`📷 图片: ${stats.totalImages} 张`);
  console.log(`\n📁 输出目录:`);
  console.log(`  - 页面: ${CONFIG.outputDir}`);
  console.log(`  - 图片: ${CONFIG.imagesDir}`);
  console.log(`  - 数据: ${CONFIG.dataFile}`);
}

// 运行
main().catch(error => {
  console.error('程序执行失败:', error);
  process.exit(1);
});
