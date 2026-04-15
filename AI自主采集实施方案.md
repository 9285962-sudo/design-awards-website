# AI自主采集实施方案 - 现在可以实现了！

---

## 重大突破

我找到了 **Browser Automation Skill**！现在我可以直接访问网页并采集信息。

**工具**：`agent-browser` CLI
**能力**：
- ✅ 访问任何网页URL
- ✅ 提取页面文本内容
- ✅ 截图保存
- ✅ 点击、输入等交互操作
- ✅ 获取结构化数据

---

## 新的工作流程

```
你给我奖项官网URL
    ↓
我使用 agent-browser 访问网页
    ↓
我提取20个字段的信息
    ↓
我返回结构化数据（JSON/表格）
    ↓
你审核确认
```

**你不需要**：
- ❌ 访问Perplexity AI
- ❌ 复制粘贴内容
- ❌ 手动整理数据

**你只需要**：
- ✅ 给我URL列表
- ✅ 审核我返回的结果

---

## 我可以采集的20个字段

| 字段名 | 说明 | 示例 |
|--------|------|------|
| award_name_cn | 奖项中文名 | 缪斯设计奖 |
| award_name_en | 奖项英文名 | MUSE Design Awards |
| organizer | 主办机构 | International Awards Associate |
| country | 主办国家 | USA |
| website | 官网链接 | https://www.museaward.com |
| category_main | 主领域 | 产品设计 |
| category_sub | 细分类别 | ["产品设计", "包装设计", "概念设计"] |
| entry_fee | 参赛费用 | 299 |
| deadline_early | 早鸟截止日期 | 2026-03-15 |
| deadline_regular | 常规截止日期 | 2026-04-15 |
| deadline_final | 最终截止日期 | 2026-05-15 |
| project_year_limit | 作品年限要求 | 2年内 |
| project_status | 项目状态要求 | 建成/概念/不限 |
| judging_criteria | 评审标准 | 创新性、功能性、美观性... |
| judging_cycle | 评审周期 | 3个月 |
| announcement_date | 结果公布时间 | 2026-08-01 |
| difficulty_level | 获奖难度 | 中 |
| prestige_level | 知名度等级 | 知名 |
| winner_benefits | 获奖权益 | 奖杯、证书、媒体曝光... |
| special_notes | 特殊说明 | 早鸟价优惠30% |

---

## 操作步骤

### 第一步：给我一个奖项URL

比如：
```
请采集 https://www.museaward.com/entry-info 的信息
```

### 第二步：我执行采集

我会：
1. 使用 `agent-browser launch` 启动浏览器
2. 使用 `agent-browser open <url>` 访问网页
3. 使用 `agent-browser snapshot` 获取页面内容
4. 分析内容，提取20个字段
5. 返回结构化数据

### 第三步：你审核结果

检查：
- 字段是否完整
- 数据是否准确
- 格式是否符合要求

### 第四步：批量处理

你可以一次给我多个URL：
```
请采集以下奖项信息：
1. https://www.museaward.com/entry-info
2. https://www.titanpropertyawards.com/entry
3. https://www.idesignawards.com/submit
```

我会逐个访问并返回所有数据。

---

## 示例输出格式

```json
{
  "award_name_cn": "缪斯设计奖",
  "award_name_en": "MUSE Design Awards",
  "organizer": "International Awards Associate",
  "country": "USA",
  "website": "https://www.museaward.com",
  "category_main": "综合设计",
  "category_sub": ["建筑设计", "室内设计", "产品设计", "包装设计", "概念设计"],
  "entry_fee": 299,
  "deadline_early": "2026-03-15",
  "deadline_regular": "2026-04-15",
  "deadline_final": "2026-05-15",
  "project_year_limit": "5年内",
  "project_status": "不限",
  "judging_criteria": "设计创新、美学价值、功能性、可持续性",
  "judging_cycle": "2-3个月",
  "announcement_date": "2026-08-01",
  "difficulty_level": "中",
  "prestige_level": "知名",
  "winner_benefits": "奖杯、证书、官网展示、媒体发布",
  "special_notes": "早鸟价$199，常规价$299，延期价$399"
}
```

---

## 批量采集方案

### 方案A：逐个采集（推荐初期）

你给我一个URL，我采集一个，你审核一个。

**适合**：前10-20个奖项，验证流程

### 方案B：批量采集

你给我10-20个URL列表，我批量访问并返回Excel/JSON文件。

**适合**：流程跑通后，快速填充数据库

### 方案C：定期更新

建立更新机制：
- 每月我自动访问已采集的奖项官网
- 检测关键字段变更（费用、截止日期）
- 发送变更报告给你

**适合**：长期运营，保持数据新鲜

---

## 现在就可以开始！

请给我第一个奖项的官网URL，我现在就帮你采集。

推荐从你最熟悉的奖项开始，这样你可以验证我采集的准确性。

比如：
- MUSE Design Awards
- TITAN Property Awards
- IDA Design Awards
- 红点奖
- iF奖

给我一个URL，我马上开始！

---

*文档生成时间：2026年4月5日*
