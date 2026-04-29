// 填充 Arch Design Award 到三个 JSON 文件
const fs = require('fs');
const path = require('path');

const baseDir = 'C:\\Users\\Administrator\\WorkBuddy\\国际设计大奖参赛咨询';

// ========== 1. data/awards.json ==========
const dataAwardsPath = path.join(baseDir, 'data', 'awards.json');
const dataAwards = JSON.parse(fs.readFileSync(dataAwardsPath, 'utf8'));

const archDataAward = {
  "award_id": "arch_design_award_2027",
  "award_name_cn": "Arch Design Award",
  "award_name_en": "Arch Design Award (建筑与设计奖)",
  "award_name_short": "Arch Design",
  "award_slogan": "Arch — The Bridge Between Past & Future",
  "organizer": "Design Award Agency (DAA)",
  "organizer_cn": "Design Award Agency (DAA)",
  "organizer_type": "商业机构",
  "country": "芬兰",
  "city": "赫尔辛基",
  "website": "https://www.archdesignaward.com",
  "logo_url": "https://www.archdesignaward.com/logo.png",
  "category_main": "建筑设计",
  "category_sub": ["建筑设计", "室内设计", "家具与产品设计", "照明设计", "包装设计", "平面设计"],
  "industry_focus": ["商业建筑", "文化建筑", "教育建筑", "医疗建筑", "酒店度假村", "住宅建筑", "室内空间"],
  "award_type": "建筑设计奖",
  "award_cycle": "年度",
  "edition_current": 2027,
  "prestige_level": "高",
  "difficulty_level": "中",
  "fee_currency": "EUR",
  "fee_early_bird": 200,
  "fee_regular": 300,
  "fee_final": 400,
  "submission_open": "2026-04-01",
  "update_time": "2026-04-29",
  "deadline_early": "2026-06-01",
  "deadline_regular": "2026-10-01",
  "deadline_final": "2027-01-01",
  "announcement_date": "2027-04-01"
};

// 插入到数组开头
dataAwards.unshift(archDataAward);
fs.writeFileSync(dataAwardsPath, JSON.stringify(dataAwards, null, 2), 'utf8');
console.log('✅ data/awards.json 已更新，共', dataAwards.length, '个奖项');

// ========== 2. website/data/awards.json ==========
const webAwardsPath = path.join(baseDir, 'website', 'data', 'awards.json');
const webAwards = JSON.parse(fs.readFileSync(webAwardsPath, 'utf8'));

const archWebAward = {
  "award_id": "arch_design_award_2027",
  "award_name": "Arch Design Award（建筑与设计奖）",
  "award_name_cn": "Arch Design Award",
  "award_name_en": "Arch Design Award (建筑与设计奖)",
  "short_name": "Arch Design",
  "category_main": "建筑设计",
  "category_sub": [
    "建筑设计",
    "室内设计",
    "家具与产品设计",
    "照明设计",
    "包装设计",
    "平面设计"
  ],
  "country": "芬兰",
  "city": "赫尔辛基",
  "organizer": "Design Award Agency (DAA)",
  "organizer_cn": "Design Award Agency (DAA)",
  "organizer_type": "商业机构",
  "website": "https://www.archdesignaward.com",
  "logo_url": "https://www.archdesignaward.com/logo.png",
  "prestige_level": "高",
  "difficulty_level": "中",
  "fee_currency": "EUR",
  "fee_regular": 300,
  "fee_final": 400,
  "submission_open": "2026-04-01",
  "update_time": "2026-04-29",
  "deadline_early": "2026-06-01",
  "deadline_regular": "2026-10-01",
  "deadline_final": "2027-01-01",
  "announcement_date": "2027-04-01"
};

webAwards.unshift(archWebAward);
fs.writeFileSync(webAwardsPath, JSON.stringify(webAwards, null, 2), 'utf8');
console.log('✅ website/data/awards.json 已更新，共', webAwards.length, '个奖项');

// ========== 3. website/data/award-details.json ==========
const detailsPath = path.join(baseDir, 'website', 'data', 'award-details.json');
const details = JSON.parse(fs.readFileSync(detailsPath, 'utf8'));

const archDetail = {
  "award_id": "arch_design_award_2027",
  "name": "Arch Design Award（建筑与设计奖）",
  "name_en": "Arch Design Award",
  "award_intro": "Arch Design Award（建筑与设计奖）是一项备受瞩目的国际设计竞赛。奖项名称「Arch」（拱门）象征着这一经典建筑结构数千年来的核心地位，它既是历史与未来的视觉桥梁，也体现了设计在美学与功能之间的联结作用。该奖项的使命是发掘和表彰建筑与室内设计领域中，在创意、质量和前瞻性思维方面表现卓越的才华横溢的设计师和工作室，帮助他们提升在全球设计界的声誉和影响力。",
  "organizer": "Design Award Agency (DAA)",
  "organizer_intro": "Design Award Agency (DAA) 是一家在芬兰注册的营销机构。奖项与多家国际知名机构合作推广，其中包括中国的官方合作伙伴 DesignRe-explore 设计再探索。Arch Design Award 是年度奖项，多年来已成功举办多届，致力于推动全球设计行业的高质量发展。",
  "organizer_location": "芬兰 · 赫尔辛基",
  "description": "Arch Design Award 采用分阶段注册的滚动式报名系统，目前可参考2027年度报名周期进行规划。覆盖建筑设计与室内设计两大核心类别，以及家具与产品设计、照明设计、包装与平面设计等创意领域。",
  "established": "不详（已成功举办多届）",
  "history": "Arch Design Award 是一个年度奖项，多年来已成功举办多届，致力于推动全球设计行业的高质量发展。奖项采用严格的盲审（Blind Judging）机制，评审团成员无法获知参赛设计师的个人信息，以确保每位参赛者都能在公平的环境下竞争。所有参赛作品将根据其最终综合得分获得相应等级的奖项。",
  "category": [
    "建筑设计类（Architectural Design Category）",
    "室内设计类（Interior Design Category）",
    "家具与产品设计",
    "照明设计",
    "包装设计",
    "平面设计"
  ],
  "timeline": [
    { "阶段": "早鸟报名截止（Early Bird）", "时间": "2026年6月1日" },
    { "阶段": "常规报名截止（Standard）", "时间": "2026年10月1日" },
    { "阶段": "最终报名截止（Final）", "时间": "2027年1月1日" },
    { "阶段": "延期报名截止（Late）", "时间": "2027年3月5日" },
    { "阶段": "提名者/获奖名单公布", "时间": "2027年4月1日" }
  ],
  "fee_currency": "EUR",
  "fee_timeline": [
    { "period": "早鸟报名（Early Bird）", "price": 200, "currency": "EUR", "note": "每项目" },
    { "period": "常规报名（Standard）", "price": 300, "currency": "EUR", "note": "每项目" },
    { "period": "最终报名（Final）", "price": 400, "currency": "EUR", "note": "每项目" },
    { "period": "延期报名（Late）", "price": 500, "currency": "EUR", "note": "每项目" }
  ],
  "fee_note": "参赛费用取决于报名阶段，随阶段递增。以上为2027年度官方参考费用，实际费用以官网为准。部分授权代理机构可能提供增值服务包，总费用会高于官方指导价。奖项通常不设固定的颁奖典礼，没有大型的年度线下活动安排。",
  "judging_criteria": [
    { "维度": "设计（Design）— 权重35%", "说明": "评估作品的整体创意性和美学价值" },
    { "维度": "功能性（Functionality）— 权重20%", "说明": "评估作品在使用逻辑、用户体验上的合理性" },
    { "维度": "结构与材料（Structures & Materials）— 权重15%", "说明": "评估作品在结构逻辑和材料运用上的技巧" },
    { "维度": "介绍/展示（Presentation）— 权重15%", "说明": "评估项目说明、图像及视频的呈现质量" },
    { "维度": "创新与可持续性（Innovation & Sustainability）— 权重10%", "说明": "评估作品对环境、生态的友好度与创新解决方案" },
    { "维度": "市场价值（Market Value）— 权重5%", "说明": "评估作品在商业上的潜力与价值" }
  ],
  "judge_info": "评审团成员是在全球范围内严格筛选的国际公认专家，均来自建筑和室内设计领域的知名人士，拥有丰富的从业经验和获奖经历。评审过程采用严格的盲审（Blind Judging）机制，评审团成员无法获知参赛设计师的个人信息，确保公平竞争。",
  "award_levels": {
    "金奖（Golden）": "综合得分 9.0–10.0：授予在设计、功能性、材料与绿色技术的创新应用、艺术价值与市场价值等方面均表现出卓越水平的项目",
    "银奖（Silver）": "综合得分 8.0–8.9：授予具有出色的设计理念、功能性和创新解决方案，并具备优异整合性与市场价值的项目",
    "铜奖（Bronze）": "综合得分 7.0–7.9：授予除功能性外，还展现了优秀设计理念、对材料的恰当使用以及与环境的良好融合的项目"
  },
  "nomination_types": [
    "建筑设计类（商业及办公建筑、文化建筑、教育建筑、医疗保健建筑、酒店及度假村建筑、住宅建筑等）",
    "室内设计类"
  ],
  "preliminary_check": "评审过程采用严格的盲审（Blind Judging）机制，评审团成员无法获知参赛设计师的个人信息。参赛信息在评审阶段对评审团保密，确保公平。",
  "requirements": {
    "参赛资格": "面向全球年满18周岁的任何人（设计师、工作室等）开放，无国籍限制",
    "作品时效": "参赛作品需是在提交截止日期前10年内完成的设计（例如，至2027年，需是2017年1月1日之后完成的项目）",
    "作品类型": "接受实际项目和概念设计；同一项目可同时提交至建筑和室内设计类别",
    "提交数量": "对提交数量无限制，可提交多件作品",
    "提交材料": "必填项：项目及设计师信息、英文项目概述（1000-2000字符）、图像来源及版权信息；最多可上传11张图片，格式为JPEG或PNG，建议尺寸为2000x1200像素"
  },
  "benefits": [
    "获得由回收金属（黄铜/不锈钢/铜）精密加工而成的标志性拱门造型金属奖杯（免费国际配送）",
    "获得获奖证书",
    "获得独家水晶玻璃奖杯的购买权",
    "官方授权使用的获奖者标识（Logo）",
    "获奖作品在 Arch Design Award 官网获得专用展示页面",
    "通过官网、新闻通讯及社交媒体网络向国际观众展示，获得广泛的曝光和认可",
    "加入 DAA 会员计划，获得专属的权益及推广方案，提升在国际设计界的知名度和影响力",
    "获得官方独家采访机会，提升个人与工作室的品牌价值",
    "社会责任实践：每提交一次设计即可种一棵树，坚持绿色与可持续理念"
  ],
  "website": "https://www.archdesignaward.com"
};

details.unshift(archDetail);
fs.writeFileSync(detailsPath, JSON.stringify(details, null, 2), 'utf8');
console.log('✅ website/data/award-details.json 已更新，共', details.length, '个奖项详情');

console.log('\n🎉 所有文件填充完成！');
