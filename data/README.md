# 数据中台

## 目录结构

```
/data/
├── awards.json              # 所有奖项基础数据
├── awards-muse.json         # MUSE完整数据
├── awards-dandad.json       # D&AD完整数据
├── awards-newblood.json     # New Blood完整数据
├── awards-riba.json         # RIBA完整数据
├── awards-lia.json          # LIA完整数据
├── awards-andrewmartin.json # Andrew Martin完整数据
├── winners/                 # 获奖作品数据
│   ├── winners-muse-2025.json
│   ├── winners-muse-2024.json
│   └── ...
└── schema/                  # 数据字段定义
    └── fields-definition.json
```

## 使用方式

### 小程序
```javascript
const awards = require('/data/awards.json');
```

### 官网
```javascript
fetch('/data/awards.json')
  .then(res => res.json())
  .then(data => console.log(data));
```

## 数据更新流程

1. 采集脚本更新JSON文件
2. Git提交变更
3. 自动部署到官网
4. 小程序云开发数据库同步
