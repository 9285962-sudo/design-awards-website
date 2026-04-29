/**
 * Markdown 转 HTML 脚本
 * 将 content/articles/ 下的 .md 文件转换为 website/out/news/articles/ 下的 HTML 页面
 * 
 * 使用方法:
 * node scripts/md-to-html.js              # 转换所有文章
 * node scripts/md-to-html.js 文章名.md     # 转换单篇文章
 */

const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
  contentDir: path.join(__dirname, '../content/articles'),
  imagesDir: path.join(__dirname, '../content/images'),
  outputDir: path.join(__dirname, '../website/out/news/articles'),
  outputImagesDir: path.join(__dirname, '../website/out/images/articles'),
  dataFile: path.join(__dirname, '../website/data/news-articles.json'),
};

/**
 * 简单的 Markdown 解析器
 */
function parseMarkdown(mdContent) {
  // 移除 BOM 和统一换行符
  mdContent = mdContent.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = mdContent.split('\n');
  const result = {
    title: '',
    meta: {},
    content: []
  };
  
  let inFrontMatter = false;
  let frontMatterEndLine = -1;
  let inCodeBlock = false;
  let codeLanguage = '';
  let codeContent = [];
  
  // 第一遍：检测 frontmatter 范围（只在文件开头）
  if (lines.length > 0 && lines[0].trim() === '---') {
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '---') {
        frontMatterEndLine = i;
        break;
      }
    }
  }
  
  // 解析 frontmatter
  if (frontMatterEndLine > 0) {
    inFrontMatter = true;
    for (let i = 1; i < frontMatterEndLine; i++) {
      const line = lines[i];
      // 使用正则匹配 key: value，支持 value 中包含冒号
      const match = line.match(/^([^:]+):\s*(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        result.meta[key] = value;
        if (key === 'title') {
          result.title = value;
        }
      }
    }
    inFrontMatter = false;
  }
  
  // 第二遍：解析正文（从 frontmatter 结束后开始）
  const startLine = frontMatterEndLine > 0 ? frontMatterEndLine + 1 : 0;
  
  for (let i = startLine; i < lines.length; i++) {
    const line = lines[i];
    
    if (inFrontMatter) {
      const match = line.match(/^(.+?):\s*(.+)$/);
      if (match) {
        result.meta[match[1].trim()] = match[2].trim();
      }
      continue;
    }
    
    // 代码块
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLanguage = line.slice(3).trim();
        codeContent = [];
      } else {
        inCodeBlock = false;
        result.content.push({
          type: 'code',
          language: codeLanguage,
          content: codeContent.join('\n')
        });
      }
      continue;
    }
    
    if (inCodeBlock) {
      codeContent.push(line);
      continue;
    }
    
    // 标题处理（支持 # ## ### 等级别）
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      // 只在 frontmatter 没有提供 title 时，用一级标题作为文章标题
      if (level === 1 && !result.title) {
        result.title = text;
      }
      // 所有标题都加入 content
      result.content.push({
        type: 'heading',
        level: level,
        content: parseInline(text)
      });
      continue;
    }
    
    // 图片 ![alt](url) - 支持行内图片
    const imgMatch = line.match(/!\[(.*?)\]\((.+?)\)/);
    if (imgMatch && line.trim().startsWith('![')) {
      // 整行都是图片
      result.content.push({
        type: 'image',
        alt: imgMatch[1],
        url: imgMatch[2]
      });
      continue;
    }
    
    // 有序列表 1. 2. 3.
    const olMatch = line.match(/^\d+\.\s+(.+)$/);
    if (olMatch) {
      result.content.push({
        type: 'list_item',
        ordered: true,
        content: parseInline(olMatch[1])
      });
      continue;
    }
    
    // 无序列表 - 或 *
    const ulMatch = line.match(/^[-*]\s+(.+)$/);
    if (ulMatch) {
      result.content.push({
        type: 'list_item',
        ordered: false,
        content: parseInline(ulMatch[1])
      });
      continue;
    }
    
    // 段落
    if (line.trim()) {
      result.content.push({
        type: 'paragraph',
        content: parseInline(line)
      });
    } else {
      // 空行，添加分隔
      if (result.content.length > 0 && result.content[result.content.length - 1].type !== 'empty') {
        result.content.push({ type: 'empty' });
      }
    }
  }
  
  return result;
}

/**
 * 解析行内元素（粗体、斜体、链接等）
 */
function parseInline(text) {
  // 粗体 **text**
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // 斜体 *text*
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // 链接 [text](url)
  text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>');
  return text;
}

/**
 * 生成 HTML
 */
function generateHTML(parsed, articleId, imageFolder) {
  const publishDate = parsed.meta.date || new Date().toISOString().split('T')[0];
  const category = parsed.meta.category || '赛事动态';
  const author = parsed.meta.author || '设计能';
  
  let contentHTML = '';
  
  let inOrderedList = false;
  let inUnorderedList = false;
  
  for (let i = 0; i < parsed.content.length; i++) {
    const block = parsed.content[i];
    const nextBlock = parsed.content[i + 1];
    
    switch (block.type) {
      case 'heading':
        // 关闭未闭合的列表
        if (inOrderedList) {
          contentHTML += '</ol>\n';
          inOrderedList = false;
        }
        if (inUnorderedList) {
          contentHTML += '</ul>\n';
          inUnorderedList = false;
        }
        contentHTML += `<h${block.level}>${block.content}</h${block.level}>\n`;
        break;
      case 'paragraph':
        // 关闭未闭合的列表
        if (inOrderedList) {
          contentHTML += '</ol>\n';
          inOrderedList = false;
        }
        if (inUnorderedList) {
          contentHTML += '</ul>\n';
          inUnorderedList = false;
        }
        contentHTML += `<p>${block.content}</p>\n`;
        break;
      case 'image':
        // 关闭未闭合的列表
        if (inOrderedList) {
          contentHTML += '</ol>\n';
          inOrderedList = false;
        }
        if (inUnorderedList) {
          contentHTML += '</ul>\n';
          inUnorderedList = false;
        }
        const imgSrc = block.url.startsWith('http') ? block.url : `/images/articles/${imageFolder}/${block.url}`;
        contentHTML += `<p><img src="${imgSrc}" alt="${block.alt}" loading="lazy"></p>\n`;
        break;
      case 'code':
        // 关闭未闭合的列表
        if (inOrderedList) {
          contentHTML += '</ol>\n';
          inOrderedList = false;
        }
        if (inUnorderedList) {
          contentHTML += '</ul>\n';
          inUnorderedList = false;
        }
        contentHTML += `<pre><code class="language-${block.language}">${escapeHtml(block.content)}</code></pre>\n`;
        break;
      case 'list_item':
        if (block.ordered && !inOrderedList) {
          // 开始有序列表
          if (inUnorderedList) {
            contentHTML += '</ul>\n';
            inUnorderedList = false;
          }
          contentHTML += '<ol>\n';
          inOrderedList = true;
        } else if (!block.ordered && !inUnorderedList) {
          // 开始无序列表
          if (inOrderedList) {
            contentHTML += '</ol>\n';
            inOrderedList = false;
          }
          contentHTML += '<ul>\n';
          inUnorderedList = true;
        }
        contentHTML += `<li>${block.content}</li>\n`;
        // 检查下一个块是否还是列表项
        if (!nextBlock || nextBlock.type !== 'list_item') {
          if (inOrderedList) {
            contentHTML += '</ol>\n';
            inOrderedList = false;
          }
          if (inUnorderedList) {
            contentHTML += '</ul>\n';
            inUnorderedList = false;
          }
        }
        break;
      case 'empty':
        // 空行不输出
        break;
    }
  }
  
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${parsed.title} | 设计能</title>
  <meta name="description" content="${parsed.meta.description || parsed.title}">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa; line-height: 1.8; color: #333; }
    a { text-decoration: none; color: #1565C0; }
    
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
    .article-meta { display: flex; gap: 20px; color: #666; font-size: 14px; flex-wrap: wrap; }
    
    /* Article Content */
    .article-content { font-size: 16px; line-height: 1.8; color: #333; }
    .article-content p { margin-bottom: 1.5em; text-align: justify; }
    .article-content img { width: 100%; max-width: 100%; height: auto; border-radius: 8px; margin: 24px 0; display: block; }
    .article-content strong { font-weight: 600; color: #1a1a1a; }
    .article-content a:hover { text-decoration: underline; }
    .article-content pre { background: #f5f5f5; padding: 16px; border-radius: 8px; overflow-x: auto; margin: 16px 0; }
    .article-content code { font-family: 'Monaco', 'Consolas', monospace; font-size: 14px; }
    
    /* Footer */
    .footer { background-color: #1A1A1A; color: #fff; padding: 40px 0; margin-top: 60px; text-align: center; }
    .footer p { opacity: 0.8; font-size: 14px; }
    
    /* Mobile */
    @media (max-width: 768px) {
      .article { padding: 24px; }
      .article-title { font-size: 22px; }
      .nav { display: none; }
    }
  </style>
</head>
<body>
  <!-- Header -->
  <header class="header">
    <div class="container">
      <div class="header-inner">
        <a href="/" class="logo">
          <span class="logo-sub">设计能</span>
        </a>
        <nav class="nav">
          <a href="/">首页</a>
          <a href="/services.html">申报服务</a>
          <a href="/awards.html">奖项推荐</a>
          <a href="/cases.html">获奖案例</a>
          <a href="/about.html">关于我们</a>
        </nav>
      </div>
    </div>
  </header>

  <!-- Hero -->
  <section class="hero">
    <div class="container">
      <div class="breadcrumb">
        <a href="/">首页</a>
        <span>/</span>
        <a href="/news">赛事新闻</a>
        <span>/</span>
        <span>${category}</span>
      </div>
    </div>
  </section>

  <!-- Content -->
  <section class="section">
    <div class="container">
      <article class="article">
        <header class="article-header">
          <span class="category">${category}</span>
          <h1 class="article-title">${parsed.title}</h1>
          <div class="article-meta">
            <span>📅 ${publishDate}</span>
            <span>✍️ ${author}</span>
          </div>
        </header>
        <div class="article-content">
          ${contentHTML}
        </div>
      </article>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <p>© 2026 设计能 Design Energy. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>`;
}

/**
 * HTML 转义
 */
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * 清理文件名
 */
function sanitizeFilename(name) {
  return name
    .replace(/[\\/:*?"<>|]/g, '_')
    .replace(/\s+/g, '_')
    .substring(0, 50);
}

/**
 * 更新文章数据
 */
function updateArticleData(articleInfo) {
  let articles = [];
  if (fs.existsSync(CONFIG.dataFile)) {
    articles = JSON.parse(fs.readFileSync(CONFIG.dataFile, 'utf-8'));
  }
  
  const existingIndex = articles.findIndex(a => a.id === articleInfo.id);
  if (existingIndex >= 0) {
    articles[existingIndex] = articleInfo;
  } else {
    articles.push(articleInfo);
  }
  
  fs.writeFileSync(CONFIG.dataFile, JSON.stringify(articles, null, 2));
}

/**
 * 处理单篇文章
 */
async function processArticle(mdFile) {
  const mdPath = path.join(CONFIG.contentDir, mdFile);
  const mdContent = fs.readFileSync(mdPath, 'utf-8');
  
  // 解析 Markdown
  const parsed = parseMarkdown(mdContent);
  
  if (!parsed.title) {
    console.error(`✗ ${mdFile}: 未找到标题`);
    return false;
  }
  
  // 生成文章ID
  const articleId = sanitizeFilename(parsed.title) + '_' + Date.now().toString(36).slice(-4);
  const imageFolder = articleId;
  
  // 确保输出目录存在
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }
  if (!fs.existsSync(CONFIG.outputImagesDir)) {
    fs.mkdirSync(CONFIG.outputImagesDir, { recursive: true });
  }
  
  // 复制图片
  const articleImagesDir = path.join(CONFIG.outputImagesDir, imageFolder);
  if (!fs.existsSync(articleImagesDir)) {
    fs.mkdirSync(articleImagesDir, { recursive: true });
  }
  
  // 复制本地图片（支持绝对路径和相对路径）
  let copiedImages = 0;
  for (const block of parsed.content) {
    if (block.type === 'image' && !block.url.startsWith('http')) {
      let srcPath;
      let destFileName;
      
      // 判断是绝对路径还是相对路径
      if (path.isAbsolute(block.url)) {
        // 绝对路径（如 C:\Users\...\image.jpg）
        srcPath = block.url;
        // 从路径中提取文件名
        destFileName = path.basename(block.url);
      } else {
        // 相对路径（如 images/pic.jpg）
        srcPath = path.join(CONFIG.imagesDir, block.url);
        destFileName = block.url;
      }
      
      const destPath = path.join(articleImagesDir, destFileName);
      
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`  📷 复制图片: ${destFileName}`);
        copiedImages++;
        
        // 更新 block.url 为相对路径，用于 HTML 生成
        block.url = destFileName;
      } else {
        console.warn(`  ⚠ 图片不存在: ${srcPath}`);
      }
    }
  }
  
  // 生成 HTML
  const html = generateHTML(parsed, articleId, imageFolder);
  const htmlPath = path.join(CONFIG.outputDir, `${articleId}.html`);
  fs.writeFileSync(htmlPath, html);
  
  // 更新数据
  const articleInfo = {
    id: articleId,
    title: parsed.title,
    category: parsed.meta.category || '赛事动态',
    publishTime: parsed.meta.date || new Date().toISOString().split('T')[0],
    author: parsed.meta.author || '设计能',
    summary: parsed.meta.description || parsed.content.slice(0, 3).map(b => b.content || '').join(' ').slice(0, 150),
    pagePath: `/news/articles/${articleId}.html`,
    imageFolder: imageFolder,
    sourceFile: mdFile
  };
  updateArticleData(articleInfo);
  
  console.log(`✓ ${mdFile} → ${articleId}.html`);
  console.log(`  📝 ${parsed.title}`);
  console.log(`  📁 图片: ${parsed.content.filter(b => b.type === 'image').length} 张`);
  
  return articleInfo;
}

/**
 * 主函数
 */
async function main() {
  console.log('=== Markdown 转 HTML ===\n');
  
  // 确保目录存在
  if (!fs.existsSync(CONFIG.contentDir)) {
    fs.mkdirSync(CONFIG.contentDir, { recursive: true });
    console.log(`✓ 创建目录: ${CONFIG.contentDir}`);
  }
  if (!fs.existsSync(CONFIG.imagesDir)) {
    fs.mkdirSync(CONFIG.imagesDir, { recursive: true });
    console.log(`✓ 创建目录: ${CONFIG.imagesDir}`);
  }
  
  // 获取要处理的文件
  const targetFile = process.argv[2];
  let mdFiles;
  
  if (targetFile) {
    mdFiles = [targetFile];
  } else {
    mdFiles = fs.readdirSync(CONFIG.contentDir)
      .filter(f => f.endsWith('.md') && !f.endsWith('.lnk'))
      .sort();
  }
  
  if (mdFiles.length === 0) {
    console.log('没有找到 Markdown 文件');
    console.log(`\n提示: 将 .md 文件放入 ${CONFIG.contentDir}`);
    console.log(`     将图片放入 ${CONFIG.imagesDir}`);
    return;
  }
  
  console.log(`📄 共 ${mdFiles.length} 篇文章待处理\n`);
  
  // 处理文章
  let successCount = 0;
  for (const mdFile of mdFiles) {
    try {
      await processArticle(mdFile);
      successCount++;
      console.log('');
    } catch (error) {
      console.error(`✗ ${mdFile}: ${error.message}\n`);
    }
  }
  
  console.log('=== 完成 ===');
  console.log(`✓ 成功: ${successCount}/${mdFiles.length}`);
  console.log(`\n📁 输出目录:`);
  console.log(`  - HTML: ${CONFIG.outputDir}`);
  console.log(`  - 图片: ${CONFIG.outputImagesDir}`);
  console.log(`  - 数据: ${CONFIG.dataFile}`);
}

main().catch(console.error);
