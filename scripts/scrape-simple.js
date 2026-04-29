#!/usr/bin/env node
/**
 * 简化版奖项采集脚本
 * 最基础的实现，确保能运行
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// 奖项列表（简化版，先测试前5个）
const AWARDS = [
  { name: 'Property Awards', url: 'https://propertyawards.net/' },
  { name: 'FX Design Awards', url: 'https://fxdesignawards.co.uk/2025/en/page/home' },
  { name: 'LICC', url: 'https://licc.uk/' },
  { name: 'World Interiors News Awards', url: 'https://www.worldinteriorsnewsawards.com/' },
  { name: 'LEAF Awards', url: 'https://www.leafawards.arena-international.com/' },
];

// 输出目录
const OUTPUT_DIR = path.join(__dirname, '..', '奖项数据');

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 日志函数
function log(msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${msg}`);
}

// HTTP请求
function fetch(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { timeout: 15000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetch(res.headers.location));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

// 清理HTML
function cleanHtml(html) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 5000);
}

// 保存数据
function saveData(name, data) {
  const safeName = name.replace(/[^a-zA-Z0-9]/g, '_');
  const filePath = path.join(OUTPUT_DIR, `${safeName}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  log(`已保存: ${safeName}.json`);
}

// 主函数
async function main() {
  log('========== 简化版奖项采集启动 ==========');
  log(`输出目录: ${OUTPUT_DIR}`);
  log(`共 ${AWARDS.length} 个奖项`);
  log('');

  for (let i = 0; i < AWARDS.length; i++) {
    const award = AWARDS[i];
    log(`[${i + 1}/${AWARDS.length}] 采集: ${award.name}`);
    
    try {
      const html = await fetch(award.url);
      
      // 提取标题
      const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : '';
      
      // 提取描述
      const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)/i);
      const description = descMatch ? descMatch[1].trim() : '';
      
      // 清理内容
      const content = cleanHtml(html);
      
      // 保存
      const data = {
        name: award.name,
        url: award.url,
        title: title,
        description: description,
        content: content,
        collected_at: new Date().toISOString()
      };
      
      saveData(award.name, data);
      log(`✅ ${award.name} 完成`);
      
    } catch (error) {
      log(`❌ ${award.name} 失败: ${error.message}`);
      
      // 保存错误信息
      saveData(award.name + '_error', {
        name: award.name,
        url: award.url,
        error: error.message,
        collected_at: new Date().toISOString()
      });
    }
    
    // 延迟2秒
    if (i < AWARDS.length - 1) {
      log('等待 2 秒...');
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  log('');
  log('========== 采集完成 ==========');
  log(`数据保存在: ${OUTPUT_DIR}`);
}

// 运行
main().catch(err => {
  console.error('程序错误:', err);
  process.exit(1);
});
