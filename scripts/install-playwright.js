/**
 * Playwright 安装脚本
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 检查 Playwright 安装状态...\n');

try {
  // 检查 playwright 是否已安装
  try {
    require.resolve('playwright');
    console.log('✅ playwright 包已安装');
  } catch (e) {
    console.log('📦 正在安装 playwright...');
    execSync('npm install playwright', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  }
  
  // 检查浏览器是否已安装
  console.log('\n🌐 检查浏览器...');
  const { chromium } = require('playwright');
  
  // 尝试启动浏览器检查
  (async () => {
    try {
      const browser = await chromium.launch();
      await browser.close();
      console.log('✅ Chromium 浏览器已就绪');
    } catch (e) {
      console.log('📥 需要安装浏览器...');
      console.log('请运行: npx playwright install chromium');
    }
  })();
  
} catch (error) {
  console.error('❌ 安装失败:', error.message);
  process.exit(1);
}
