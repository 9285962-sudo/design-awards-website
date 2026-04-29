const fs = require('fs');
const path = require('path');

// === Novum Design Award (NDA) 2026 数据 ===
const award_id = 'novum_design_award_2026';

// 1. data/awards.json 基础数据
const baseEntry = {
  award_id: award_id,
  award_name_cn: "Novum设计奖",
  award_name_en: "Novum Design Award (NDA)",
  award_name_short: "NDA设计奖",
  category_main: "综合设计",
  category_sub: ["建筑设计", "室内设计", "景观设计", "产品设计", "视觉传达"],
  country: "法国",
  city: "",
  website: "https://www.novumdesignaward.com/",
  prestige_level: "高",
  difficulty_level: "中",
  fee_currency: "EUR",
  fee_regular: 200,
  fee_final: 400,
  submission_open: "2026-01-01",
  deadline_early: "2026-06-15", // 常规截止
  deadline_regular: "2026-09-15", // 最后报名
  deadline_final: "2026-10-01", // 最后提交
  annnouncement_date: "2026-10-15",
  update_time: "2026-04-29"
};

// 2. website/data/awards.json 网站数据
const webEntry = {
  award_id: award_id,
  award_name: "Novum设计奖 (Novum Design Award / NDA)",
  short_name: "NDA设计奖",
  logo_url: "/images/logos/nda-logo.png",
  organizer: "NDA组委会",
  update_time: "2026-04-29"
};
Object.keys(baseEntry).forEach(k => { if (!webEntry[k]) webEntry[k] = baseEntry[k]; });

// 3. website/data/award-details.json 详情数据
const detailEntry = {
  award_id: award_id,
  name: "Novum设计奖",
  name_en: "Novum Design Award (NDA)",
  award_intro: "法国Novum Design Award（简称NDA）于2019年在法国首度创办，由NDA评审委员会组织评选。这是一个领先的国际设计奖，旨在表彰全球杰出设计师及其优秀作品。奖项涵盖建筑设计、室内设计、城市规划和景观设计、家具设计、照明设计、数字艺术与平面设计、包装设计、珠宝设计、时装和纺织品设计以及摄影等多个领域。NDA采用匿名盲审机制，为全球设计师带来国际曝光和认可度。",
  organizer: "NDA评审委员会（NDA Committee）",
  organizer_intro: "Novum Design Award由NDA组委会在法国组织运营，2019年创办。作为国际性设计奖项平台，NDA汇聚全球设计领域专家组成评审委员会，以匿名盲审机制确保评审公正性。",
  organizer_location: "法国",
  description: "2026年度Novum Design Award正在全球征集作品，涵盖建筑设计、室内设计、城市规划与景观设计、家具设计、照明设计等10大参赛类别。本届赛事采用10维度100分制评分体系，设置金/银/铜/NDA设计奖/优秀奖五级常规荣誉，另设年度设计师、年度可持续性设计及年度最受欢迎设计三项特别大奖。参赛作品须为2010年1月1日之后创作或完成的已完工、在建或概念项目。",
  established: "2019年",
  history: "Novum Design Award（NDA）于2019年在法国首次创办，是一个新兴但快速发展的国际综合性设计奖项。奖项以匿名盲审机制著称——评委无法接触参赛者的姓名、邮箱、地址、年龄或身份信息，所有评分由电脑制表取平均值以确保公平。自创立以来，NDA已从欧洲逐步扩展至全球影响力，覆盖建筑、室内、规划、家具、照明、平面、包装、珠宝、时装和摄影等广泛的设计领域，成为设计师获取国际认可的重要渠道之一。",
  category: [
    "建筑设计 (Architecture Design)",
    "室内设计 (Interior Design)",
    "城市规划与景观设计 (Urban Planning and Landscape Design)",
    "家具设计 (Furniture Design)",
    "照明设计 (Lighting Design)",
    "数字艺术与平面设计 (Digital Art and Graphic Design)",
    "包装设计 (Packaging Design)",
    "珠宝设计 (Jewelry Design)",
    "时装和纺织品设计 (Fashion and Textile Design)",
    "摄影和影像处理设计 (Photography and Photo Manipulation Design)"
  ],
  timeline: [
    { "阶段": "早鸟报名", "时间": "2026年2月15日" },
    { "阶段": "常规报名", "时间": "2026年2月16日－2026年6月15日" },
    { "阶段": "晚鸟报名", "时间": "2026年6月16日－2026年8月15日" },
    { "阶段": "最后报名", "时间": "2026年8月16日－2026年9月15日" },
    { "阶段": "最后提交截止日", "时间": "2026年10月1日" },
    { "阶段": "获奖公布日", "时间": "2026年10月15日" }
  ],
  fee_timeline: [
    { period: "早鸟报名", price: 100, currency: "EUR", date: "2月15日前", note: "Early Bird 阶段" },
    { period: "常规报名", price: 200, currency: "EUR", date: "2月16日至6月15日", note: "Standard 阶段" },
    { period: "晚鸟报名", price: 300, currency: "EUR", date: "6月16日至8月15日", note: "Late Bird 阶段" },
    { period: "最后报名", price: 400, currency: "EUR", date: "8月16日至9月15日", note: "Last Registration 阶段" }
  ],
  fee_note: "费用按项目计算。同一作品若提交至不同类别须额外付费。各国货币按当月1日汇率进行换算。",
  judging_criteria: [
    { "维度": "设计质量", "说明": "评估作品的整体设计水准、完成度和专业程度" },
    { "维度": "创新/创意", "说明": "考察设计的新颖性和创造性思维的应用" },
    { "维度": "美学", "说明": "评估形式美感、色彩运用、材质表现及视觉冲击力" },
    { "维度": "创意技术解决方案", "说明": "考量设计中所运用的技术创新和解决方案的独特性" },
    { "维度": "实用性/可用性", "说明": "评估设计的易用性和用户体验友好度" },
    { "维度": "功能性", "说明": "判断设计是否满足其预定功能和实际使用需求" },
    { "维度": "可持续性", "说明": "考量环境友好性、资源利用效率和社会责任" },
    { "维度": "整体环境考量", "说明": "综合评判设计与周边环境的协调融合程度" }
  ],
  judge_info: "NDA评审委员会由设计领域专家组成，依据提交作品的质量、技术充分性、设计认证和设计分数进行评估。评审团成员不公开逐一显示具体名单；评审决定具有约束力，设计师无权提出反对意见。评审采用严格的匿名盲审机制——评委无法接触参赛者姓名、邮箱、地址、年龄或身份信息，确保评分的绝对客观性。",
  judges: [
    { name: "NDA评审委员会", title: "匿名盲审专家团", company: "" }
  ],
  award_levels: [
    { level: "金奖 (Golden NDA)", description: "最终得分90-100分。获奖者可获得NDA官方设计的定制奖杯与证书。" },
    { level: "银奖 (Silver NDA)", description: "最终得分80-89分。获奖者可获NDA官方证书。" },
    { level: "铜奖 (Bronze NDA)", description: "最终得分70-79分。获奖者可获NDA官方证书。" },
    { level: "NDA设计奖", description: "最终得分60-69分。基础级别认可。" },
    { level: "优秀奖 (Honorable Mention)", description: "最终得分50-59分。表彰通过初审的优秀作品。" },
    { level: "年度设计师 (Designer of the Year)", description: "年度特别大奖之一，得分60-100分作品有机会获此殊荣。" },
    { level: "年度可持续性设计 (Sustainability Design of the Year)", description: "年度特别大奖之一，聚焦可持续发展领域的卓越设计。" },
    { level: "年度最受欢迎设计 (Most Loved Design of the Year)", description: "由NDA官方Facebook页面公众投票选出。" }
  ],
  award_stats_2025: "涵盖10大参赛类别，采用10维度100分制评分体系，五级常规荣誉加三项年度特别大奖。",
  nomination_types: ["专业组 (Professional)", "学生组 (Student)"],
  preliminary_check: "NDA采用匿名盲审机制：评委无法接触参赛者姓名、邮箱、地址、年龄或身份信息。所有评分由电脑制表取平均值。评审小组根据十个维度给出1-10分，设计总分100分。",
  requirements: {
    "参赛资格": "面向全球开放，不限民族、宗教、地域、国别。面向建筑、室内、规划、家具、照明、视觉、包装、产品、时装、摄影等领域的设计从业者及学生。",
    "作品时限": "项目或设计须在2010年1月1日之后设计或完成。",
    "作品状态": "接受已完工项目、在建项目以及概念类项目。",
    "提交数量": "没有提交数量限制。同一作品可提交至不同类别（须额外付费）。",
    "图片要求": "提供1-6张项目图片，格式为JPEG或PNG，单张大小不超过3MB，最短边不低于2000像素。",
    "表格填写": "需完整填写在线报名表格，提供项目名称、团队信息和项目描述等。",
    "知识产权": "参赛者须确保对参赛作品拥有独立的知识产权及影像版权，因版权问题产生的争议由参赛者自负。"
  },
  benefits: [
    "金奖/银奖/铜奖/年度大奖获奖者可获NDA官方设计的定制奖杯与证书",
    "获得\"NOVUM DESIGN AWARD Winner\"徽章使用权，可用于网站、宣传册、产品包装等各类营销材料",
    "获奖作品在NDA官网年度公布，并通过合作媒体、社交平台及年度新闻稿获得全球媒体曝光",
    "年度可持续性设计或年度设计师获得者享有更高层级的年度奖项报道和国际曝光"
  ],
  website: "https://www.novumdesignaward.com/"
};

// === 文件路径 ===
const baseDir = path.join(__dirname, 'data');
const webDir = path.join(__dirname, 'website', 'data');

let baseData = JSON.parse(fs.readFileSync(path.join(baseDir, 'awards.json'), 'utf-8'));
let webData = JSON.parse(fs.readFileSync(path.join(webDir, 'awards.json'), 'utf-8'));
let detailData = JSON.parse(fs.readFileSync(path.join(webDir, 'award-details.json'), 'utf-8'));

const existingIdx = baseData.findIndex(a => a.award_id === award_id);
if (existingIdx >= 0) {
  console.log(`⚠️  ${award_id} 已存在，正在更新...`);
  baseData[existingIdx] = baseEntry;
  const wi = webData.findIndex(a => a.award_id === award_id); if (wi >= 0) webData[wi] = webEntry;
  const di = detailData.findIndex(a => a.award_id === award_id); if (di >= 0) detailData[di] = detailEntry;
} else {
  baseData.unshift(baseEntry);
  webData.unshift(webEntry);
  detailData.unshift(detailEntry);
}

fs.writeFileSync(path.join(baseDir, 'awards.json'), JSON.stringify(baseData, null, 2), 'utf-8');
fs.writeFileSync(path.join(webDir, 'awards.json'), JSON.stringify(webData, null, 2), 'utf-8');
fs.writeFileSync(path.join(webDir, 'award-details.json'), JSON.stringify(detailData, null, 2), 'utf-8');

console.log(`✅ ${award_id} 数据写入成功！`);
console.log(`   data/awards.json 总数: ${baseData.length}`);
console.log(`   website/data/awards.json 总数: ${webData.length}`);
console.log(`   website/data/award-details.json 总数: ${detailData.length}`);
