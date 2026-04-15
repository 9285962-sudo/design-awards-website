# 设计能—国际设计大奖申报指南

官网地址: www.52de.cc

## 项目结构

```
website/
├── data/
│   └── awards.json          # 奖项数据
├── pages/
│   ├── _app.js              # 应用入口
│   ├── index.js             # 首页
│   └── awards/
│       └── [id].js          # 奖项详情页
├── styles/
│   └── globals.css          # 全局样式
├── next.config.js           # Next.js配置
└── package.json
```

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建输出在 `dist` 目录。

## 部署

腾讯云静态托管，配置见 `next.config.js`。
