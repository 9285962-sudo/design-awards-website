# 设计作品图片自动采集工具

## 安装

```bash
cd scripts/image-crawler
npm install playwright
npx playwright install chromium
```

## 使用方法

### 1. 添加待采集文章

编辑 `urls/pending-articles.json`：

```json
[
  {
    "url": "https://mp.weixin.qq.com/s/xxx",
    "project": "项目名称",
    "award": "奖项名称",
    "priority": "high"
  }
]
```

### 2. 批量采集

```bash
node index.js --file urls/pending-articles.json
```

### 3. 单篇文章采集

```bash
node index.js --url "https://mp.weixin.qq.com/s/xxx" --project "项目名称" --award "奖项名称"
```

## 输出目录

```
output/
├── raw/                    # 原始截图
│   └── BLT建筑设计奖/
│       └── 南沙邮轮码头_01.jpg
├── processed/              # 处理后图片（压缩+水印）
├── thumbs/                 # 缩略图
└── report_xxx.json         # 采集报告
```

## 工作原理

1. **智能识别**：自动识别文章中的大尺寸图片（>400x300）
2. **自动滚动**：模拟滚动加载懒加载图片
3. **精准截图**：截取图片元素而非整页
4. **分类存储**：按奖项名称自动分类目录

## 注意事项

- 微信公众号文章需要完整URL
- 采集间隔2秒避免被封
- 单篇文章最多采集10张图片
- 需要安装 Chromium 浏览器
