const fs = require('fs');

// 读取awards.json
const awardsPath = './website/data/awards.json';
const awards = JSON.parse(fs.readFileSync(awardsPath, 'utf8'));

// 检查是否已存在iconic_awards
const existingIndex = awards.findIndex(a => a.award_id === 'iconic_awards_2026');

if (existingIndex !== -1) {
  console.log('已存在iconic_awards_2026，将更新');
  awards.splice(existingIndex, 1);
}

// 创建ICONIC AWARDS数据
const iconicAward = {
  "award_id": "iconic_awards_2026",
  "award_name_en": "ICONIC AWARDS",
  "award_name_cn": "德国ICONIC AWARDS标志性设计奖",
  "short_name": "ICONIC AWARDS",
  "category_main": "建筑设计",
  "category_sub": ["建筑设计", "室内设计", "产品设计", "视觉传达"],
  "organizer": "德国设计委员会（German Design Council）",
  "organizer_country": "德国",
  "official_url": "https://www.iconic-awards.com/",
  "fee_currency": "EUR",
  "fee_early_bird": 300,
  "fee_regular": 350,
  "deadline_early": "2026-03-27",
  "deadline_regular": "2026-05-15",
  "deadline_final": "2026-05-27",
  "eligibility": "全球建筑师、室内设计师、产品设计师、设计事务所、开发商、制造商等",
  "project_requirement": "已完成或在建的概念性方案；已建成项目须在报名截止前竣工",
  "submission_format": "在线提交：项目基本信息、英德双语描述、项目照片",
  "key_dates": [
    { "阶段": "征集启动", "日期": "2026-02-18" },
    { "阶段": "早鸟截止", "日期": "2026-03-27" },
    { "阶段": "常规截止", "日期": "2026-05-15" },
    { "阶段": "资料补传截止", "日期": "2026-05-27" },
    { "阶段": "评审会议", "日期": "2026-08-24" },
    { "阶段": "获奖公布", "日期": "2026-08-24" },
    { "阶段": "颁奖典礼", "日期": "2026-10-06" }
  ],
  "award_levels": [
    { "level": "至尊奖（Best of Best）", "description": "仅授予卓越性、创新性和设计品质均为非凡顶尖水平的项目，2025年度33个项目获奖" },
    { "level": "优胜奖（Winner）", "description": "年度杰出项目，代表当年度优秀设计水准" },
    { "level": "精选奖（Selection）", "description": "某一领域具有显著设计亮点的优质项目" },
    { "level": "特别奖项", "description": "年度建筑师、年度室内设计师、年度建筑师客户、年度首作奖等" }
  ],
  "benefits": [
    "全球媒体曝光：通过德国设计委员会官方渠道及DETAIL杂志全球专题报道",
    "在线名录永久收录：获奖作品收录于官方在线名录供全球检索",
    "官方年鉴出版：获奖作品收录于26.5cm×19.5cm精美年鉴，面向全球发行",
    "颁奖典礼邀请：受邀参加慕尼黑宝马世界颁奖典礼，与行业领袖面对面交流",
    "全年行业互动：专属行业展览、论坛演讲及专业交流平台机会",
    "市场营销授权：可使用获奖标识作为专业能力权威认证"
  ],
  "contact": {
    "官方提交": "submit.german-design-council.de",
    "大中华区": "设有授权执行机构，提供中文申报服务支持"
  },
  "update_time": "2026-04-27T21:00",
  "featured": false
};

// 添加到数组开头（自动排在第一位）
awards.unshift(iconicAward);

// 保存
fs.writeFileSync(awardsPath, JSON.stringify(awards, null, 2), 'utf8');
console.log('✅ awards.json已更新');
