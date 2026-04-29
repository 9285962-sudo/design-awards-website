const fs = require('fs');

// 读取数据
const awards = JSON.parse(fs.readFileSync('website/data/awards.json', 'utf8'));

// 找到Andrew Martin奖项
const index = awards.findIndex(a => a.award_id === 'andrew_martin国际室内设计大奖_2026');
if (index === -1) {
    console.log('未找到Andrew Martin奖项');
    process.exit(1);
}

// 移除并插入到数组开头
const [item] = awards.splice(index, 1);
awards.unshift(item);

// 保存
fs.writeFileSync('website/data/awards.json', JSON.stringify(awards, null, 2), 'utf8');

console.log(`已将 Andrew Martin 移到第一位`);
console.log(`当前前三位：`);
awards.slice(0, 3).forEach((a, i) => {
    console.log(`  ${i+1}. ${a.award_name_cn}`);
});
