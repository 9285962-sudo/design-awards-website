@echo off
cd /d C:\Users\Administrator\WorkBuddy\国际设计大奖参赛咨询

:: 备份原文件
copy website\data\awards.json website\data\awards-backup.json

:: 使用Node.js过滤
node -e "
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('website/data/awards.json', 'utf8'));
const details = JSON.parse(fs.readFileSync('website/data/award-details.json', 'utf8'));

const keepIds = ['lia_awards_2026', 'muse_design_2026', 'if_design_2026', 'reddot_product_2026', 'reddot_concept_2026', 'reddot_communication_2026'];

const filtered = data.filter(a => keepIds.includes(a.award_id));
const filteredDetails = details.filter(d => keepIds.includes(d.award_id));

fs.writeFileSync('website/data/awards.json', JSON.stringify(filtered, null, 2));
fs.writeFileSync('website/data/award-details.json', JSON.stringify(filteredDetails, null, 2));

console.log('保留奖项:', filtered.length);
filtered.forEach(a => console.log(' -', a.award_name_cn));
"

echo.
echo 完成！
pause
