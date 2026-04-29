const fs = require('fs');
const path = require('path');

const dir = './content/articles';
const files = fs.readdirSync(dir);
const f = files.find(n => n.includes('中国'));
const filePath = path.join(dir, f);

const content = fs.readFileSync(filePath, 'utf8');
const bodyStart = content.indexOf('---', 4);
const body = content.substring(bodyStart + 3);

const newHeader = `---
title: 中国正在尝试打造"对标红点iF的本土国际大奖"
date: 2026-04-23
category: 赛事新闻
author: 设计能
cover: /images/2026-04-23-中国正在尝试打造"对标红点iF的本土国际大奖"/cover.png
---`;

fs.writeFileSync(filePath, newHeader + body);
console.log('Fixed! New header:', newHeader);
