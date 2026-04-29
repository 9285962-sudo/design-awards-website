// ========== 填充 Restaurant & Bar Design Awards ==========
var fs = require('fs');
var path = require('path');
var baseDir = 'C:\\Users\\Administrator\\WorkBuddy\\国际设计大奖参赛咨询';

// ============================================================
// 1. data/awards.json（基础数据）
// ============================================================
var dataAwardsPath = path.join(baseDir, 'data', 'awards.json');
var dataAwards = JSON.parse(fs.readFileSync(dataAwardsPath, 'utf8'));

var rbaDataAward = {
  "award_id": "restaurant_bar_design_awards_2026",
  "award_name_cn": "Restaurant & Bar Design Awards",
  "award_name_en": "Restaurant & Bar Design Awards (RBDA)",
  "award_name_short": "R&B Design",
  "award_slogan": "The Oscars of Restaurant & Bar Design",
  "organizer": "Erbda Ltd",
  "organizer_cn": "Erbda Ltd（英国）",
  "organizer_type": "商业机构",
  "country": "英国",
  "city": "伦敦",
  "website": "https://www.restaurantandbardesignawards.com",
  "logo_url": "https://www.restaurantandbardesignawards.com/logo.png",
  "category_main": "室内设计",
  "category_sub": ["室内设计", "餐饮空间设计", "酒店空间设计", "酒吧设计"],
  "industry_focus": ["餐厅", "酒吧", "咖啡厅", "酒店餐饮", "快休闲餐厅", "游轮餐饮"],
  "award_type": "室内设计奖",
  "award_cycle": "年度",
  "edition_current": 2026,
  "prestige_level": "顶级",
  "difficulty_level": "高",
  "fee_currency": "GBP",
  "fee_early_bird": 355,
  "fee_regular": 380,
  "fee_final": 408,
  "submission_open": "2026-01-05",
  "update_time": "2026-04-29",
  "deadline_early": "2026-01-31",
  "deadline_regular": "2026-04-30",
  "deadline_final": "2026-05-31",
  "announcement_date": "2026-10-05"
};

dataAwards.unshift(rbaDataAward);
fs.writeFileSync(dataAwardsPath, JSON.stringify(dataAwards, null, 2), 'utf8');
console.log('OK: data/awards.json →', dataAwards.length);

// ============================================================
// 2. website/data/awards.json（网站构建数据）
// ============================================================
var webAwardsPath = path.join(baseDir, 'website', 'data', 'awards.json');
var webAwards = JSON.parse(fs.readFileSync(webAwardsPath, 'utf8'));

var rbaWebAward = {
  "award_id": "restaurant_bar_design_awards_2026",
  "award_name": "Restaurant & Bar Design Awards（餐厅与酒吧设计奖）",
  "award_name_cn": "Restaurant & Bar Design Awards",
  "award_name_en": "Restaurant & Bar Design Awards (RBDA)",
  "short_name": "R&B Design",
  "category_main": "室内设计",
  "category_sub": [
    "室内设计",
    "餐饮空间设计",
    "酒店空间设计",
    "酒吧设计"
  ],
  "country": "英国",
  "city": "伦敦",
  "organizer": "Erbda Ltd",
  "organizer_cn": "Erbda Ltd（英国）",
  "organizer_type": "商业机构",
  "website": "https://www.restaurantandbardesignawards.com",
  "logo_url": "https://www.restaurantandbardesignawards.com/logo.png",
  "prestige_level": "顶级",
  "difficulty_level": "高",
  "fee_currency": "GBP",
  "fee_regular": 380,
  "fee_final": 420,
  "submission_open": "2026-01-05",
  "update_time": "2026-04-29",
  "deadline_early": "2026-01-31",
  "deadline_regular": "2026-04-30",
  "deadline_final": "2026-05-31",
  "announcement_date": "2026-10-05"
};

webAwards.unshift(rbaWebAward);
fs.writeFileSync(webAwardsPath, JSON.stringify(webAwards, null, 2), 'utf8');
console.log('OK: website/data/awards.json →', webAwards.length);

// ============================================================
// 3. website/data/award-details.json（详情数据）
// ============================================================
var detailsPath = path.join(baseDir, 'website', 'data', 'award-details.json');
var details = JSON.parse(fs.readFileSync(detailsPath, 'utf8'));

var rbaDetail = {
  "award_id": "restaurant_bar_design_awards_2026",
  "name": "Restaurant & Bar Design Awards（餐厅与酒吧设计奖）",
  "name_en": "Restaurant & Bar Design Awards (RBDA)",
  "award_intro": "Restaurant & Bar Design Awards 是全球公认的、专注于餐饮空间设计的领先国际竞赛，被誉为\"餐饮设计界的奥斯卡\"。该奖项旨在表彰全球最具创意的餐饮空间及其背后的设计师与机构，覆盖从游轮、机场、博物馆中的餐饮空间，到街头汉堡车、米其林星级餐厅和快闪店等所有可以想象得到的领域。每年吸引来自全球100多个国家的参赛作品，深受全球超过40,000位最具影响力的建筑师、设计师、酒店专业人士和生活方式媒体的关注。",
  "organizer": "Erbda Ltd",
  "organizer_intro": "由 Marco Rebora 于2008年在英国创立，是一个独立奖项系统。由 Erbda Ltd 运营管理。首届奖项的设立得到了包括《Wallpaper*》时任主编 Tony Chambers 在内的评审团的大力鼓励和支持。国际知名出版社 Taschen 曾专门出版了一本关于该奖项的书籍《Restaurant & Bar Design》，进一步巩固了其权威地位。",
  "organizer_location": "英国 · 伦敦",
  "description": "Restaurant & Bar Design Awards 采用年度赛程制，2026年度报名已截止（最终截止：2026年5月31日）。该奖项覆盖全球类别+区域类别的双重评选体系，是全球餐饮空间设计领域影响力最高、含金量最受公认的奖项之一。",
  "established": "2008年",
  "history": "由 Marco Rebora 于2008年在英国创立，自2009年首次颁发以来，吸引了全球成千上万名参赛者。首届时仅面向英国征稿，到2010年已拓展为国际性赛事，并增设年度国际餐厅（International Restaurant）和年度国际酒吧（International Bar）两大最高荣誉。近年来每年产生约37个类别大奖以及系列地区荣誉。2025年的颁奖典礼在迪拜 EPIK Dubai 举行。",
  "category": [
    "独立餐厅/酒吧（Standalone）",
    "酒店内餐饮空间（Hotel）",
    "快休闲餐厅（Fast Casual）",
    "咖啡厅（Cafe）",
    "色彩运用奖（Colour）",
    "天花板设计奖（Ceiling）",
    "表面内饰奖（Surface Interiors）",
    "小型空间奖（Small Space）",
    "其他空间（In Another Space）（机场、博物馆、零售等）",
    "区域优胜奖（美洲/亚洲/澳大/欧洲/中东非洲）",
    "全球最佳餐厅设计大奖（Best Overall Restaurant）",
    "全球最佳酒吧设计大奖（Best Overall Bar）"
  ],
  "timeline": [
    { "阶段": "开始报名", "时间": "2026年1月5日" },
    { "阶段": "早鸟报名截止（Earlybird）", "时间": "2026年1月31日" },
    { "阶段": "常规报名截止（Standard）", "时间": "2026年4月30日" },
    { "阶段": "最终报名截止（Late/Closing）", "时间": "2026年5月31日" },
    { "阶段": "入围名单公布（Shortlist）", "时间": "2026年8月10日起当周" },
    { "阶段": "获奖名单公布（Winners）", "时间": "2026年10月5日起当周" }
  ],
  "fee_currency": "GBP",
  "fee_timeline": [
    { "period": "注册费（每位参赛者一次性）", "price": 50, "currency": "GBP", "note": "必缴" },
    { "period": "早鸟报名费（单项目单类别）", "price": 330, "currency": "GBP", "note": "至2026年1月31日；+VAT" },
    { "period": "常规报名费（单项目单类别）", "price": 350, "currency": "GBP", "note": "至2026年4月30日；+VAT" },
    { "period": "最终报名费（单项目单类别）", "price": 395, "currency": "GBP", "note": "至2026年5月31日；+VAT" }
  ],
  "fee_note": "费用由两部分构成：注册费（£50/人）+ 报名费（按阶段递增）。以上为综合搜索信息，具体以官方提交页面为准。获奖后需自行付费购买奖杯（£900 + 邮费），设计师和业主各一个。",
  "judging_criteria": [
    { "维度": "设计简报（Design Brief）", "说明": "评估设计师如何理解客户需求、品牌理念及项目背景与场地机遇" },
    { "维度": "设计挑战（Design Challenges）", "说明": "评估在空间布局、材料策略、预算等方面遇到的困难及创造性解决方案" },
    { "维度": "设计成果（Design Results）", "说明": "评估最终设计如何达成客户目标、提升空间实用性和用户体验" }
  ],
  "judge_info": "历届评委由来自全球设计、建筑、酒店业和生活方式媒体的领军人物组成，规模约40人。知名评委曾包括 Zaha Hadid（已故建筑大师）、Thomas Heatherwick（英国鬼才设计师）、隈研吾（Kengo Kuma）、Gordon Ramsay（世界顶级厨神）、Foster + Partners（全球顶级建筑事务所）、Alberto Alessi（Alessi品牌掌门人）。2026年度部分评委代表：Andy Wenlock（Gordon Ramsay 餐饮全球CEO）、Diana Martinez（洲际酒店集团美洲区设计总监）、Michael Doneff（四季酒店集团全球餐饮概念副总裁）、Noatchanok Wattananupong（安缦集团全球室内设计总监）。",
  "award_levels": {
    "类别奖（Category Winners）": "针对所有参赛类别评选出的优胜者，包括全球类别和区域性类别",
    "区域优胜奖（Regional Winners）": "五大区域（美洲/亚洲/澳大利亚与大洋洲/欧洲/中东与非洲）各自评选出的最佳餐厅/酒吧",
    "全球最高荣誉（Overall Winners）": "两项终极荣誉：全球最佳餐厅设计大奖（Best Overall Restaurant）和全球最佳酒吧设计大奖（Best Overall Bar）"
  },
  "nomination_types": [
    "全球类别（14+个，不限地区）：独立餐厅/酒吧、酒店餐饮、快休闲、咖啡厅、色彩、天花板、小型空间等",
    "区域类别（5大区域 × 多类型）：美洲、亚洲、澳大利亚与大洋洲、欧洲、中东与非洲"
  ],
  "preliminary_check": "入围名单于2026年8月10日起当周公布；获奖名单于10月5日起当周公布。入围作品将在官网展示并接受公众投票。",
  "requirements": {
    "参赛资格": "面向全球专业人士开放，包括室内设计师、建筑师、餐饮空间运营方等",
    "合作提交要求": "所有参赛作品必须是设计师与餐饮或酒店运营商合作提交，需同时体现设计和业主方信息",
    "作品年限": "参赛项目须在2025年1月1日至2026年3月31日之间开业或完成大规模翻新",
    "重复参赛限制": "曾提交过往届的项目不能再次参赛，除非经过了大规模翻新",
    "多类别提交": "单个项目可提交至多个参赛类别，但需为每个类别支付报名费",
    "语言要求": "所有提交资料（文字简介、设计说明等）必须使用英文",
    "图片要求": "必须使用实景照片，严禁使用CGI效果图和可视化渲染图；参赛者须确保拥有全部版权并同意主办方全球范围宣传使用"
  },
  "benefits": [
    "获得奖杯（需自行付费购买：£900 + 邮费，设计师和业主各一个）",
    "获奖作品在官网和官方Instagram账号上公布展示",
    "被全球超过100个国家的媒体广泛报道和宣传",
    "受邀参加年度颁奖典礼（如2025年在迪拜 EPIK Dubai 举行），与全球设计大咖、酒店业领袖和媒体精英交流",
    "所有获奖项目和入围项目在奖项官网上进行长期展示",
    "通过主办方媒体网络宣传，部分杰出项目有机会获得专题报道或媒体采访",
    "在全球顶级酒店品牌和设计同行面前建立声誉的绝佳机会"
  ],
  "website": "https://www.restaurantandbardesignawards.com"
};

details.unshift(rbaDetail);
fs.writeFileSync(detailsPath, JSON.stringify(details, null, 2), 'utf8');
console.log('OK: website/data/award-details.json →', details.length);

console.log('\nDone! Restaurant & Bar Design Awards filled successfully.');
