# 数据采集脚本

## 安装依赖

```bash
cd scripts
npm install
```

## 安装Playwright浏览器

```bash
npx playwright install chromium
```

## 使用方式

### 采集MUSE获奖作品

```bash
# 采集当年数据
npm run crawl:muse

# 采集指定年份
npm run crawl:muse:2025
npm run crawl:muse:2024
```

### 直接运行

```bash
node crawl-muse-winners.js 2025
```

## 输出文件

采集结果保存在 `../data/winners/` 目录：
- `winners-muse-2025.json`
- `winners-muse-2024.json`

## 数据格式

```json
{
  "award_name": "MUSE Design Awards",
  "year": 2025,
  "total_collected": 150,
  "chinese_winners_count": 45,
  "collected_at": "2026-04-13T10:00:00.000Z",
  "winners": [
    {
      "project_name": "项目名称",
      "designer_name": "设计师姓名",
      "designer_location": "深圳, 中国",
      "award_level": "铂金奖",
      "category": "建筑设计-住宅",
      "year": 2025,
      "project_image": "https://...",
      "is_chinese": true
    }
  ]
}
```

## 注意事项

1. 采集前请确保网络可以访问 MUSE 官网
2. 首次运行需要下载浏览器（约100MB）
3. 采集过程约需5-10分钟（取决于作品数量）
4. 建议定期运行（每月一次）更新数据
