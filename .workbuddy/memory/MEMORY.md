# 设计能 - 公司信息与产品文档

## 网站技术架构（2026-04-16更新）
- **框架**：Next.js 14（动态页面）
- **页面**：index.js（首页）、services.js（申报服务）、about.js（关于我们）
- **部署方式**：Cloudflare Pages + 自定义域名
- **部署流程**：Next.js build → Cloudflare Pages 拖拽上传
- **自定义域名**：www.52de.cc（已配置）、52de.cc（已配置）
- **Pages 域名**：design-awards-website.pages.dev

## 公司基础信息
- **公司名称**：深圳日光月华文化传播有限公司
- **官网**：www.52de.cc
- **公众号**：设计能
- **联系电话**：13692222744 何先生
- **邮箱**：9285962@qq.com

## 核心业务数据（以产品文档为准，2026-04-15更新）
- 从业经验：10年+
- 合作奖项：108个全球设计大奖
- 服务设计师：350+（两岸四地）
- 服务案例：1200+
- 获奖案例：1000+
- 平均获奖率：80%

## 服务范围
建筑、室内、景观、产品、视觉传达类设计公司

## 四大增值服务
1. 参赛作品优劣势分析与改进建议
2. 获奖概率评估
3. 荣誉价值最大化与荣誉管理
4. 参赛作品精准叙事和呈现优化

## 服务流程（7步）
1. 参赛作品初审 / 参赛策略提案
2. 分析匹配奖项 / 挑选参赛图片
3. 撰写竞赛文案 / 专业语言翻译
4. 图片合规处理 / 图文美工排版
5. 投递参赛作品 / 完成缴费手续
6. 报告评审结果 / 处理获奖事宜
7. 获奖新闻报道 / 获奖作品发布

---

# 奖项智能助手 - 长期记忆

## 采集工具选择指南

### 需要 Playwright 的奖项（动态页面）
| 奖项名称 | 原因 | 采集内容 |
|---------|------|---------|
| MUSE设计奖 | 获奖者画廊动态加载，需筛选年份/类别 | 历届获奖项目、设计师、获奖等级 |

### 可直接 HTTP 采集的奖项（静态页面）
| 奖项名称 | 采集内容 |
|---------|---------|
| MUSE设计奖 | 关于页面、FAQ、评审团信息 |

### 判断标准
- **需要 Playwright**：动态渲染、无限滚动、需要交互筛选、反爬严格
- **直接 HTTP**：静态 HTML、内容一次性展示、无复杂交互

---

## 项目关键信息

### 技术栈
- 前端：微信小程序（原生）
- 后端：Node.js
- 采集：Playwright（动态页面）+ HTTP（静态页面）

### 数据架构
- **字段层**：218个结构化字段，快速响应高频问题
- **兜底层**：全量官网内容，RAG检索回答长尾问题

### 数据字段体系（218个字段）
按优先级分为4层：
- **P0 核心字段**（30个）：基础信息、分类、费用、截止日期、作品要求
- **P1 重要字段**（60个）：参赛者要求、图片规格、评审标准、奖项等级、核心权益
- **P2 补充字段**（80个）：视频/文档/实物要求、详细评审、完整权益、知名度、联系方式
- **P3 增值字段**（48个）：数据统计、特殊规则、合作伙伴、自定义字段

完整字段定义见：`奖项数据字段终极版.md`

### MUSE 奖数据文件
- 完整字段数据：`奖项数据/MUSE设计奖_完整字段数据.json`
- 官网知识库：`奖项数据/MUSE设计奖_官网全量知识库.md`

### 数据严格模式（2026-04-05确立）
**原则**：只使用MUSE官网可验证的数据，不确定的字段显示"官方未公布"或设为null

**已清理的估算/占位字段**：
| 字段 | 处理方式 | 原因 |
|------|---------|------|
| win_rate | null | 官方不公布获奖率 |
| global_ranking | null | 无权威排名 |
| total_entries_2025 | null | 官方未公布参赛数 |
| judging_panel_size | null | 官方未公布评委人数 |
| previous_winners_count | null | 官方未公布获奖者数量 |
| internal_rating | null | 主观评价非官网数据 |
| media_partners | null | 需官网验证 |
| 所有统计数据 | null | 均为估算值 |

**保留的官网可验证字段**：
- 基础信息（名称、主办方、官网等）
- 费用信息（早鸟价$199、常规价$249等）
- 截止日期（官网明确公布）
- 作品要求（图片规格、数量等）
- 奖项等级（铂金奖、金奖、银奖）
- 政策条款（退款、退赛、版权等）

### 图片采集规则（2026-04-17确立）
**原则**：作品必须有可展示的图片，无图片源则不采集该作品

**执行标准**：
1. 采集获奖作品时，必须验证图片URL是否可访问
2. 图片URL无效（如404、403、无图片页面）→ **跳过该作品，不采集**
3. 不使用占位图或替代图片填充空缺
4. 同一奖项下，优先采集有图片的作品

**判断流程**：
```
检查作品图片URL → 图片存在且可访问？ → ✅ 采集
                              → 图片不存在/不可访问？ → ❌ 跳过该作品
```

**例外**：文字类奖项（如文案、策略类）可在备注中说明"本作品为纯文字作品，无图片展示"

## 文章发布系统（2026-04-19更新）

### 目录结构
```
website/content/
├── articles/      → 新闻文章（报名通知、获奖快讯、赛事动态）
└── strategy/      → 策略文章（参赛策略、申报指南、获奖技巧）
```

### 构建脚本
**文件**：`website/scripts/build-articles.js`

**功能**：
- 扫描 `content/articles/` 生成新闻文章 → `public/articles/` + `data/news.json`
- 扫描 `content/strategy/` 生成策略文章 → `public/strategy/articles/` + `data/strategy.json`
- 每次运行时先清空旧文件，确保数据同步

### 发布流程
```bash
cd website
node scripts/build-articles.js
npm run build && npx wrangler pages deploy out --branch=main
```

### 文章格式要求
```yaml
---
title: 文章标题
date: 2026-04-19
category: 获奖快讯  # 新闻可选：报名通知/获奖快讯/赛事动态；策略可选：参赛策略/申报指南/获奖技巧
author: 设计能
summary: 文章摘要
cover: /images/articles/文章标题/cover.png  # 封面图路径（必须）
---

正文内容...（不要在正文里放封面图）
```

### 封面图规范（2026-04-23确立）
**重要**：封面图必须通过frontmatter的cover字段设置，不允许放在正文中！

**正确流程**：
1. 用户提供封面图文件（如 `C:\Users\Administrator\Desktop\封面图.png`）
2. 我复制到 `website/public/images/articles/文章标题/cover.png`
3. 在MD文件的frontmatter添加：`cover: /images/articles/文章标题/cover.png`
4. 正文不要放封面图（避免重复）

**分类规则**：
- 获奖快讯、报名通知、赛事动态 → `content/articles/`
- 参赛策略、申报指南、获奖技巧 → `content/strategy/`

### 图片处理
- 图片需放到 `public/images/` 目录
- markdown 中使用相对路径：`/images/图片名.jpg`
- 避免使用本地绝对路径（如 `C:\Users\...`）

---

## 静态页面模板（2026-04-17）

## 网站与小程序数据同步机制（2026-04-24建立）

### 奖项详情页 UI 适配（2026-04-26）
- **问题**：`twoColGrid` 使用 `alignItems: stretch` 导致数据量差异大的卡片（如10步时间轴 vs 2条评审标准）互相拉伸，页面不协调
- **解决**：
  1. `alignItems: stretch` → `alignItems: start`，取消强制等高
  2. 新增 `FoldableSection` 通用折叠组件（`useState` 控制展开/收起）
  3. 已应用的区块：时间轴（默认5项）、评委（默认4项）、参赛类别（>10项折叠）、中国获奖者（默认5条）
  4. 小程序端无此问题（纯单列堆叠），不需要改动

### 小程序奖项详情页数据同步（2026-04-26）
- **问题**：小程序的 `normalizeAward` 无法正确读取线上 API 返回的数据结构
- **修复**：
  1. 时间轴：优先使用 `timeline` 数组（中文键：`阶段`/`时间`），否则从 `deadline_early` 等独立字段拼接
  2. 评委：`judges`（中文键 `姓名`/`头衔`/`公司`）→ `_judges`（`name`/`title`/`company`）
  3. 中国获奖者：`chinese_winners` → `_chinese_winners`
- **折叠功能**：小程序端也加了折叠，阈值与网站端一致（类别>10、时间轴>5、评委>4、获奖者>5）
- **文件路径**：`c:\Users\Administrator\WorkBuddy\20260421190423\miniprogram\pages\award-detail\`

### 奖项数据同步
- **唯一数据源**：`website/data/awards.json`
- **网站页面**：通过 `import` 在 Next.js 构建时打包
- **小程序 API**：`https://www.52de.cc/data/awards.json`（小程序运行时请求）
- **自动同步**：`build-articles.js` 的 `syncAwardsData()` 函数自动复制 `data/awards.json` → `public/data/awards.json`
- **发布后效果**：网站和小程序同时看到最新奖项数据

### 文章数据同步
- **唯一数据源**：`website/content/articles/` 和 `website/content/strategy/`
- `build-articles.js` 同时生成 `data/*.json` 和 `public/data/*.json`
- 小程序从 `https://www.52de.cc/data/news.json` 和 `strategy.json` 读取

### 小程序数据加载（2026-04-24改造）
- **模式**：远程 wx.request + wx.setStorage 缓存（24h过期）
- **文件**：`mini-program/utils/data-loader.js`（fetchWithCache 通用函数）
- **列表**：从 `www.52de.cc/data/awards.json` 获取，提取16个列表字段
- **详情**：从 `www.52de.cc/data/award-details.json` 获取，按 award_id 查找
- **缓存策略**：命中缓存立即返回 + 后台静默更新；过期也先返回旧数据；完全离线读最后缓存
- **app.js**：`loadAwardData` 异步，`awardDataReady` 标志位
- **不再需要**本地 `data/` 目录和 `require` 方式加载
- 对比页原来请求不存在的 `awards-list.json`，已改为走 `dataLoader.getAwardsList()`

### 发布流程（三步走）
```
cd website
node scripts/build-articles.js     # 同步奖项+文章数据
npm run build                       # Next.js 构建
npx wrangler pages deploy out --branch=main  # 部署
```
**文件位置**：`website/out/awards/`
**命名规则**：使用 `award_id.html`（如 `muse_design_2026.html`）
**布局**：左右两栏（左宽右窄）
- 左列：参赛类别、评审标准、奖项等级、获奖权益、作品要求、时间节点
- 右列：基础信息、参赛费用、联系方式

**上传 Cloudflare Pages**：
- 将 `out/awards/` 下的 HTML 文件拖拽上传
- 访问路径：`www.52de.cc/awards/{award_id}.html`

**已有静态页面**：
- `muse_design_2026.html` - MUSE设计奖详情页

### 奖项排序规则（2026-04-27确立）
- **新更新的奖项自动排在所属分类第一位**（按update_time降序）
- 每次更新奖项后，**直接执行排序，无需向用户说明**
- award_id统一使用英文格式（如`win_awards_2026`），不使用中文

### 奖项数据字段规范（2026-04-27确立）
**awards.json 必填字段**：
| 字段名 | 格式 | 示例 |
|--------|------|------|
| timeline | Array<{阶段, 时间}> | [{阶段:"早鸟截止", 时间:"2026-03-27"}] |
| award_intro | string | 奖项详细介绍 |
| categories | Array<{main, sub}> 或 string[] | [{main:"建筑设计", sub:["住宅","商业"]}] |
| award_levels | Array<{level, description}> | [{level:"金奖", description:"..."}] |
| fee_timeline | Array<{period, price, currency, note}> | [{period:"早鸟价", price:300, currency:"EUR"}] |

**award-details.json 字段对应**：
| 详情页读取 | awards.json字段 |
|------------|----------------|
| award.award_intro | award_intro |
| award.timeline | timeline |
| award.categoryData | categories 或 category_sub |

### 奖项数据自检清单（2026-04-27）
每次添加/更新奖项后必须逐项核对：
1. ☐ timeline 字段存在，且用`阶段`/`时间`中文键名
2. ☐ award_intro 奖项介绍已填写
3. ☐ categories 参赛类别已填写（格式正确）
4. ☐ award_levels 奖项等级已填写（{level, description}对象格式）
5. ☐ fee_timeline 费用明细已填写（含currency字段）
6. ☐ fee_early_bird / fee_regular 基础费用已填写
7. ☐ deadline_early / deadline_regular 截止日期已填写
8. ☐ judging_criteria 评审标准已填写（{name, description}对象格式）
9. ☐ requirements 参赛要求已填写（{key: value}对象格式，不是数组）
10. ☐ 语法检查：node -c 验证JSON
11. ☐ 构建测试：npm run build 无报错
12. ☐ 页面验证：确认详情页各区块有内容显示，无空字段

### 字段格式规范（关键教训）
| 页面读取 | 正确格式 |
|---------|---------|
| timeline | Array<{阶段, 时间}> |
| award_intro | string |
| categories | Array<{main, sub}> 或 string[] |
| award_levels | Array<{level, description}> |
| judging_criteria | Array<{name, description}>，不是{标准, 说明} |
| requirements | {key: value}对象，不是["标题：内容"]数组 |
| benefits | Array<string> 或 Array<{name, description}> |
| website | string（官网URL）|

### 填充原则（2026-04-27确立）
- **不能有空字段**：每个必填字段必须填满
- **空字段必须解释**：如果用户提供的信息里没有某字段，必须明确告知用户"您提供的信息里没有相关内容"，不能留空让页面显示空白
- 填充前先对照自检清单逐项检查

---

# 编码红线 — 绝对不能再犯的错误（2026-04-24确立）

## 1. 替换代码时，大括号必须严格配对
**犯错记录**：修改 `article.js` 时多次导致多余/缺失 `}`，产生 `Missing catch or finally clause` 语法错误。

**规则**：
- 替换任何代码块前，必须确认替换前后的 `{` 和 `}` 数量一致
- 替换后**必须立即运行 `node -c 文件路径`** 验证语法
- 如果发现语法错误，不要继续其他操作，先修好

## 2. 修改现有文件时，不要破坏已有逻辑
**犯错记录**：
- 把 `/^\/[^\/]/` 正则替换时，导致后续 `catch` 找不到 `try`
- 图片追加到末尾的"简单策略"被原样保留，没有考虑 MD 文件中图片的位置

**规则**：
- 修改前先完整阅读相关函数，理解整体结构
- 替换时确保新代码和上下文衔接正确
- 不要只改一处就结束，要检查整个函数是否完整

## 3. Next.js 部署必须完整三步走
**犯错记录**：发布新文章后只跑了 `build-articles.js` + 部署 public，首页和策略页看不到新文章。

**规则**：
```
第1步：node scripts/build-articles.js   # 生成 JSON + HTML 文章页
第2步：npm run build                     # Next.js 构建（把最新 JSON 打包进 out/）
第3步：npx wrangler pages deploy out     # 部署 out/（不是 public！）
```
- 缺少第2步 = 首页/列表页数据是旧的
- 部署 public 而不是 out = Next.js 页面没有更新

## 4. 图片路径正则不能误杀网站相对路径
**犯错记录**：`/^\/[^\/]/` 把 `/images/articles/...` 当成 Unix 绝对路径跳过，导致小程序文章图片不显示。

**规则**：
- 判断绝对路径的正则必须精确：`/^[A-Za-z]:|^\/(?:mnt|Users|home|tmp)\//i`
- `/images/...`、`/css/...` 等以 `/` 开头的路径是网站相对路径，**不能跳过**

## 5. 文章图片要按 MD 中的原始位置渲染
**犯错记录**：小程序 article.js 把所有图片追加到 sections 末尾，打乱了文章配图顺序。

**规则**：
- 解析 HTML 时，`<img>` 必须和其他标签（h1/h2/p/hr）一起按位置排序
- 不允许"简单追加到末尾"的做法
- 验证方法：输出 sections 列表，确认图片出现在正确的标题/段落之间

## 6. 小程序项目目录确认——改文件前必须先确认目标目录！
**犯错记录**：用户说对比页有问题，我改了 `国际设计大奖参赛咨询/mini-program/` 下的 compare 文件，但用户微信开发者工具实际打开的是 `c:\Users\Administrator\WorkBuddy\20260421190423\miniprogram\`。导致改了一堆文件但用户看不到任何变化，浪费了整个会话。

**根因**：
- WorkBuddy 工作空间目录 `国际设计大奖参赛咨询/mini-program/` 是一个副本/旧版本
- 用户微信开发者工具打开的项目在 `c:\Users\Administrator\WorkBuddy\20260421190423\miniprogram\`（小程序 appid 目录名）
- 两个目录都有 `pages/compare/compare.js` 等同名文件

**规则**：
- 涉及小程序文件修改时，**必须先问用户微信开发者工具打开的项目路径**，或让用户提供小程序名称/appid
- 如果用户提供了小程序名称（如 `20260421190423`），搜索 `c:\Users\Administrator\WorkBuddy\` 下对应目录
- **不要假设** `国际设计大奖参赛咨询/mini-program/` 就是用户在用的项目
- 检查日志中的页面路径（如 `[Perf][pages/compare-select/compare-select]`），如果路径在当前项目中不存在，说明项目目录不对

**已知的实际小程序目录**：
- **设计能小程序（当前在用）**：`c:\Users\Administrator\WorkBuddy\20260421190423\miniprogram\`
  - Tab 栏：奖项库、奖项对比、申报服务、赛事动态、关于我们
  - 对比功能拆分为两个页面：`compare-select`（选择页）+ `compare`（结果页）
  - 数据通过 `app.globalData.awards` + `wx.request` 从 `www.52de.cc/data/awards.json` 加载
  - 选中状态通过 `app.globalData.compareSelected` 在两个页面间传递
- **旧版副本（非活跃）**：`国际设计大奖参赛咨询/mini-program/`
- **test-site 副本**：`国际设计大奖参赛咨询/website/test-site/mini-program/`

## 7. build-articles.js 图片路径必须支持 `/` 开头（2026-04-27修复）
**犯错记录**：MD文件中图片路径是 `/images/articles/...`（以 `/` 开头），但 `extractAllImages` 正则只匹配 `images/...`，且 `copyRelativeImageToProject` 把 `/images/...` 当绝对路径拼接。

**修复**：
- `extractAllImages` 正则改为：`!\[([^\]]*)\]\(((?:images\/|\/images\/)[^)\n]+?\.(?:jpg|jpeg|png|gif|webp))\)`
- `copyRelativeImageToProject` 添加路径清理：`relativePath.replace(/^\/+/, '')`

**验证**：构建后检查 `data/news.json` 或 `data/strategy.json`，确认图片URL是 `https://www.52de.cc/...` 格式，不是 `/images/...`


