# AI直接采集方案 - 可行性说明

---

## 你的需求

```
你 → AI工具（ChatGPT/Claude等）
    ├── 输入：奖项官网URL
    ├── 输入：需要采集的20个字段
    └── 输出：结构化数据
        ↓
        你审核 → 发给我
```

---

## 关键问题：AI能否直接访问网页？

### 答案：取决于你使用的AI工具

| AI工具 | 能否访问网页 | 说明 |
|--------|-------------|------|
| **ChatGPT（网页版）** | ❌ 不能 | 无法访问外部URL |
| **ChatGPT + Browse模式** | ⚠️ 有限支持 | 部分账号有联网功能，但不稳定 |
| **ChatGPT + 插件** | ✅ 可以 | 需要安装网页浏览插件 |
| **Claude（网页版）** | ❌ 不能 | 无法访问外部URL |
| **Claude + API + 工具** | ✅ 可以 | 需要开发接入 |
| **Perplexity AI** | ✅ 可以 | 原生支持网页访问 |
| **Gemini（Google）** | ⚠️ 有限支持 | 部分支持，效果不稳定 |
| **国内AI（文心/通义等）** | ❌ 不能 | 无法访问外部URL |

---

## 可行方案

### 方案1：使用支持联网的AI工具

**推荐工具：Perplexity AI**
- 网址：https://www.perplexity.ai
- 特点：原生支持网页访问和提取
- 费用：免费版够用，Pro版$20/月

**操作示例**：
```
请访问 https://www.museaward.com/entry-info
提取以下信息并以JSON格式返回：
{
  "award_name": "奖项名称",
  "entry_fee": "参赛费用",
  "deadline": "截止日期",
  "categories": ["类别1", "类别2"]
}
```

**优点**：
- 直接访问网页，无需你复制粘贴
- 结果结构化，便于处理

**缺点**：
- 复杂网页可能提取不全
- 需要逐个URL处理

---

### 方案2：使用ChatGPT + WebPilot插件

**步骤**：
1. 开通ChatGPT Plus（$20/月）
2. 在插件商店安装 WebPilot 或 Link Reader
3. 开启插件后对话

**操作示例**：
```
使用WebPilot访问 https://www.museaward.com/entry-info
提取以下字段：
- 参赛费用
- 截止日期
- 参赛类别

返回JSON格式
```

**优点**：
- ChatGPT能力强，理解力好
- 可以追问和修正

**缺点**：
- 需要Plus订阅
- 插件有时不稳定

---

### 方案3：使用AI爬虫工具（推荐）

**工具推荐**：

| 工具 | 网址 | 特点 |
|------|------|------|
| **ScrapeGraphAI** | https://scrapegraphai.com | 专为AI爬虫设计，输入URL和字段即可 |
| **Firecrawl** | https://www.firecrawl.dev | 开发者友好，API调用 |
| **SimpleScraper** | https://simplescraper.io | 可视化配置，无需代码 |

**ScrapeGraphAI示例**：
```python
from scrapegraphai.graphs import SmartScraperGraph

graph_config = {
    "llm": {
        "model": "gpt-4",
        "api_key": "your_key"
    },
}

smart_scraper_graph = SmartScraperGraph(
    prompt="提取奖项名称、参赛费用、截止日期",
    source="https://www.museaward.com/entry-info",
    config=graph_config
)

result = smart_scraper_graph.run()
print(result)
```

**优点**：
- 专为数据采集设计
- 批量处理能力强
- 结果准确度高

**缺点**：
- 需要一定技术门槛
- 部分工具收费

---

## 推荐方案（基于你的需求）

### 现阶段：Perplexity AI（零门槛）

**操作流程**：
```
1. 打开 https://www.perplexity.ai
2. 输入：
   "访问 [奖项官网URL]，提取以下信息：
   - 奖项名称（中英文）
   - 主办机构
   - 参赛费用
   - 截止日期（常规/最终）
   - 参赛类别
   - 作品年限要求
   
   以JSON格式返回"
   
3. 复制AI返回的结果
4. 发给我审核/处理
```

**批量处理技巧**：
```
请依次访问以下3个网址，分别提取信息：

1. https://www.museaward.com/entry-info
2. https://www.titanpropertyawards.com/entry
3. https://www.idesignawards.com/submit

提取字段：奖项名称、参赛费用、截止日期
返回格式：JSON数组
```

---

### 未来：ScrapeGraphAI（批量自动化）

当需要处理大量奖项时：
- 配置好提取字段模板
- 批量输入URL列表
- 一键生成所有数据

---

## 给你的建议

**立即可做**：
1. 注册 Perplexity AI（免费）
2. 测试3-5个你熟悉的奖项官网
3. 验证提取准确性
4. 把结果发给我，我们一起优化Prompt

**预期效果**：
- 每个奖项1-2分钟搞定
- 20个奖项半小时完成
- 数据结构化，便于后续使用

---

## 注意事项

1. **复杂网页**：如果官网是单页应用（SPA）或需要登录，AI可能无法访问
2. **数据验证**：AI提取后务必人工核对关键字段（费用、日期）
3. **格式统一**：不同AI返回的格式可能不同，需要标准化

---

*文档生成时间：2026年4月5日*
