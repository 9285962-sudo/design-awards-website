#!/usr/bin/env node
/**
 * 奖项采集运行脚本
 * 永不停止，自动恢复，跳过问题奖项
 */

const { batchScrape } = require('./scrape-awards-batch');

console.log('========================================');
console.log('奖项官网信息采集系统');
console.log('启动时间:', new Date().toLocaleString());
console.log('特性: 自动恢复、永不停止、实时保存进度');
console.log('========================================\n');

let restartCount = 0;
const MAX_RESTARTS = 100; // 最大重启次数

// 设置全局错误处理 - 永不停止
process.on('uncaughtException', (err) => {
  console.error('\n❌ 未捕获的异常:', err.message);
  console.log('💪 自动恢复中...\n');
  // 不退出，让程序继续
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('\n❌ 未处理的Promise拒绝:', reason);
  console.log('💪 自动恢复中...\n');
  // 不退出，让程序继续
});

// 运行采集，带自动重启
async function runWithRestart() {
  while (restartCount < MAX_RESTARTS) {
    try {
      restartCount++;
      if (restartCount > 1) {
        console.log(`\n🔄 第 ${restartCount} 次重启运行...`);
      }
      
      await batchScrape();
      
      // 如果正常完成，退出循环
      console.log('\n========================================');
      console.log('✅ 所有奖项处理完成');
      console.log('结束时间:', new Date().toLocaleString());
      console.log('========================================');
      break;
      
    } catch (error) {
      console.error('\n❌ 采集过程出错:', error.message);
      console.log('💪 5秒后自动恢复...');
      
      // 等待5秒后继续
      await new Promise(resolve => setTimeout(resolve, 5000));
      console.log('🔄 继续运行...\n');
    }
  }
  
  if (restartCount >= MAX_RESTARTS) {
    console.log('\n⚠️ 达到最大重启次数，程序停止');
    console.log('请检查问题后手动重启');
  }
  
  process.exit(0);
}

// 启动
runWithRestart();
