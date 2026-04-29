const fs = require('fs');

// 读取数据
const awards = JSON.parse(fs.readFileSync('website/data/awards.json', 'utf8'));

// 找到WAF奖项
const wafIndex = awards.findIndex(a => a.award_id === '世界建筑节奖_2026');
if (wafIndex === -1) {
    console.log('未找到WAF世界建筑节奖项');
    process.exit(1);
}

// 移除WAF并插入到数组开头
const [waf] = awards.splice(wafIndex, 1);
awards.unshift(waf);

// 保存
fs.writeFileSync('website/data/awards.json', JSON.stringify(awards, null, 2), 'utf8');

console.log(`已将WAF世界建筑节移到第一位`);
console.log(`当前前三位：`);
awards.slice(0, 3).forEach((a, i) => {
    console.log(`  ${i+1}. ${a.award_name_cn} (${a.award_id})`);
});
