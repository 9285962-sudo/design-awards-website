/**
 * 奖项新闻批量生成器（手动驱动版）
 * 
 * 由于很多国外网站从国内服务器访问超时，
 * 本脚本采用"手动输入 + AI 生成"的模式：
 * 
 * 用法：
 * 1. 从浏览器访问奖项官网新闻页，复制新闻标题和链接
 * 2. 添加到 news-queue.json
 * 3. 运行 node batch-generate.js
 * 
 * 或者直接运行交互模式，逐条输入
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const OUTPUT_DIR = path.join(__dirname, '../../website/content/articles');
const QUEUE_FILE = path.join(__dirname, 'news-queue.json');

// AI 配置
const AI_CONFIG = {
  baseUrl: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY || '',
  model: 'deepseek-chat',
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function loadQueue() {
  try {
    return JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf-8'));
  } catch { return []; }
}

function saveQueue(queue) {
  fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2));
}

function callAI(prompt) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      model: AI_CONFIG.model,
      messages: [
        {
          role: 'system',
          content: `你是"设计能"（52de.cc）的资深编辑，专注于国际设计大奖资讯报道。

写作要求：
1. 直接输出 Markdown 文章（不含 frontmatter）
2. 标题 20-35 字，包含奖项中英文名和关键事件
3. 正文 1000-2000 字，3-6 段
4. 第一段直接说核心事实（什么奖、什么事件、什么时间）
5. 后续段落展开分析：获奖作品特点、评审趋势、行业影响
6. 自然嵌入 SEO 关键词（奖项名、国际设计奖、参赛、申报、获奖）
7. 引用具体数据（参赛数量、获奖比例、截止日期等）
8. 最后加 CTA：如需该奖项参赛辅导，欢迎联系设计能（13692222744）
9. 不要用"据悉""记者了解到"等新闻报道腔调，用专业分析口吻
10. 用 <p> 标签包裹段落，<h2> 标签包裹小标题`
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const options = {
      hostname: 'api.deepseek.com',
      path: '/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.choices && result.choices[0]) {
            resolve(result.choices[0].message.content);
          } else if (result.error) {
            reject(new Error(result.error.message));
          } else {
            reject(new Error('AI 返回异常: ' + data.substring(0, 200)));
          }
        } catch (e) {
          reject(new Error('解析失败: ' + e.message));
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(90000, () => { req.destroy(); reject(new Error('AI 请求超时（90秒）')); });
    req.write(postData);
    req.end();
  });
}

function buildPrompt(item) {
  return `请根据以下信息，撰写一篇中文新闻稿发布到设计能（52de.cc）网站。

## 基本信息
- 奖项: ${item.award_name_cn}（${item.award_name_en || ''}）
- 简称: ${item.award_short || ''}
- 主办方: ${item.organizer || ''}
- 国家: ${item.country || ''}
- 类别: ${item.category_main || '综合设计'}

## 新闻内容
- 标题: ${item.title}
- 详情: ${item.detail || '请根据标题和奖项常识补充内容'}
${item.url ? `- 原文链接: ${item.url}` : ''}

## 新闻类型
${item.news_type || '赛事新闻'}

## 额外信息（如果有）
${item.extra || '无'}
${item.deadline ? `- 截止日期: ${item.deadline}` : ''}
${item.fee ? `- 参赛费用: ${item.fee}` : ''}
${item.winners_count ? `- 获奖数量: ${item.winners_count}` : ''}`;
}

async function processItem(item, index, total) {
  console.log(`\n[${index + 1}/${total}] 📝 ${item.title}`);
  console.log(`   奖项: ${item.award_name_cn} | 类型: ${item.news_type || '赛事新闻'}`);
  
  try {
    const prompt = buildPrompt(item);
    console.log('   🤖 AI 生成中...');
    
    const content = await callAI(prompt);
    
    // 提取第一行作为标题
    const lines = content.trim().split('\n').filter(l => l.trim());
    const titleLine = lines[0] || item.title;
    
    // 生成文件名
    const today = new Date().toISOString().split('T')[0];
    const safeTitle = item.title.replace(/[\\/:*?"<>|]/g, '').substring(0, 30);
    const fileName = `${today}-${safeTitle}.md`;
    const filePath = path.join(OUTPUT_DIR, fileName);
    
    const md = `---
title: ${titleLine}
category: ${item.news_type || '赛事新闻'}
publishTime: ${item.publishTime || today}
author: 设计能
summary: ${item.title.substring(0, 100)}
featured: false
${item.url ? `sourceUrl: ${item.url}` : ''}
${item.award_name_cn ? `sourceAward: ${item.award_name_cn}` : ''}
---

${content}
`;
    
    ensureDir(OUTPUT_DIR);
    fs.writeFileSync(filePath, md, 'utf-8');
    console.log(`   ✅ 已生成: ${fileName}`);
    return { success: true, file: fileName };
  } catch (err) {
    console.log(`   ❌ 失败: ${err.message}`);
    return { success: false, error: err.message };
  }
}

async function main() {
  console.log('========================================');
  console.log('📰 奖项新闻批量生成器');
  console.log(`📅 ${new Date().toISOString()}`);
  console.log('========================================');
  
  if (!AI_CONFIG.apiKey) {
    console.log('');
    console.log('⚠️  未设置 DEEPSEEK_API_KEY 环境变量');
    console.log('   运行: $env:DEEPSEEK_API_KEY="your_key"');
    console.log('   然后重新运行此脚本');
    process.exit(1);
  }
  
  const queue = loadQueue();
  
  if (queue.length === 0) {
    console.log('');
    console.log('📭 队列为空。请先添加新闻到 news-queue.json');
    console.log('');
    console.log('格式示例：');
    console.log(JSON.stringify([
      {
        award_name_cn: 'MUSE设计奖',
        award_name_en: 'MUSE Design Awards',
        award_short: 'MUSE',
        organizer: 'International Awards Associate',
        country: '美国',
        category_main: '综合设计',
        title: '2026 MUSE设计奖获奖名单公布，中国设计团队斩获多项大奖',
        detail: '2026年MUSE设计奖公布获奖名单，来自中国的多个设计团队在建筑设计、产品设计等类别中获得铂金奖和金奖。',
        url: 'https://design.museaward.com/winners',
        news_type: '获奖快讯',
        winners_count: '超过100个中国项目获奖',
      }
    ], null, 2));
    return;
  }
  
  console.log(`\n📂 队列中有 ${queue.length} 条新闻待处理\n`);
  
  const results = [];
  for (let i = 0; i < queue.length; i++) {
    if (results.length > 0) {
      // 间隔 3 秒避免频率限制
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    const result = await processItem(queue[i], i, queue.length);
    results.push(result);
  }
  
  // 汇总
  const successCount = results.filter(r => r.success).length;
  const failCount = results.filter(r => !r.success).length;
  
  console.log('\n========================================');
  console.log(`📊 完成！成功 ${successCount} 篇，失败 ${failCount} 篇`);
  console.log(`📁 文章目录: ${OUTPUT_DIR}`);
  console.log('\n→ 下一步:');
  if (successCount > 0) {
    console.log('   1. 审核生成的 Markdown 文件');
    console.log('   2. 如需修改，编辑后直接保存');
    console.log('   3. 运行: cd website && node scripts/build-articles.js');
    console.log('   4. 运行: cd website && npx wrangler pages deploy out --branch=main');
  }
  
  // 清空已处理的队列
  if (successCount > 0) {
    const failed = queue.filter((_, i) => !results[i].success);
    saveQueue(failed);
    if (failed.length > 0) {
      console.log(`\n⚠️  ${failed.length} 条失败项保留在队列中`);
    } else {
      console.log('\n✅ 队列已清空');
    }
  }
}

main().catch(console.error);
