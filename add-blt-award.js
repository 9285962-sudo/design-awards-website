const fs = require('fs');
const path = require('path');

// === BLT Built Design Awards 2026 数据 ===
const award_id = 'blt_built_design_awards_2026';

// 1. data/awards.json 基础数据
const baseEntry = {
  award_id: award_id,
  award_name_cn: "BLT建筑设计奖",
  award_name_en: "BLT Built Design Awards",
  award_name_short: "BLT建筑奖",
  category_main: "建筑设计",
  category_sub: ["建筑设计", "室内设计", "景观设计"],
  country: "瑞士",
  city: "",
  website: "https://bltawards.com/",
  prestige_level: "高",
  difficulty_level: "中",
  fee_currency: "CHF",
  fee_regular: 270,
  fee_final: 297, // 常规后+10%滞纳金
  submission_open: "2026-01-01",
  deadline_early: "2026-05-31", // 最终优惠截止
  deadline_regular: "2026-06-30",
  deadline_final: "2026-10-04", // 绝对最终截止
  annnouncement_date: "2026-10-15", // 秋季公布
  update_time: "2026-04-29"
};

// 2. website/data/awards.json 网站数据
const webEntry = {
  award_id: award_id,
  award_name: "BLT建筑设计奖 (BLT Built Design Awards)",
  short_name: "BLT建筑奖",
  logo_url: "/images/logos/blt-logo.png",
  organizer: "3C Awards (Farmani Group)",
  update_time: "2026-04-29"
};

// 合并基础字段到 webEntry
Object.keys(baseEntry).forEach(k => {
  if (!webEntry[k]) webEntry[k] = baseEntry[k];
});

// 3. website/data/award-details.json 详情数据
const detailEntry = {
  award_id: award_id,
  name: "BLT建筑设计奖",
  name_en: "BLT Built Design Awards",
  award_intro: "BLT建筑设计奖是一项全球性的年度奖项，旨在表彰所有参与实现优秀建筑项目的专业人士的卓越才能——从建筑公司和室内设计专家，到建筑产品和项目管理。该奖项涵盖所有应对当今城市化挑战的建筑形式、项目和基础设施，旨在激发下一代专业人士的灵感，表彰那些超出预期、取得卓越成就的团队和个人。奖项特别关注具有创新性和可持续性的项目。作为与IDA国际设计大奖和LIT照明设计奖并列的全球知名设计奖项，BLT奖项旨在成为一个最具包容性的平台，向全球专业人士及学生开放。",
  organizer: "3C Awards (Farmani Group)",
  organizer_intro: "BLT建筑设计奖由知名设计奖项组织Farmani Group的子公司3C Awards管理和运营。Farmani Group也是享誉全球的国际设计大奖(IDA)、建筑大师奖(AMP)等知名奖项的主办方。BLT奖项以严格的评审流程和广泛的全球传播网络著称，为获奖者提供高度的专业认可和国际曝光。",
  organizer_location: "瑞士（Farmani Group / 3C Awards）",
  description: "2026年度BLT建筑设计奖正在全球征集作品，涵盖建筑设计、室内设计、景观建筑与建筑产品设计四大核心类别。本届赛事采用10-100分评分制，设置七大年度至高荣誉、类别大奖、评审团优选奖及荣誉提名奖等多个层级。参赛作品须为近5年内创作的概念设计、在建或已完工项目。",
  established: "2018年",
  history: "BLT Built Design Awards由Farmani Group旗下3C Awards创立并运营。Farmani Group作为国际设计奖项领域的重要机构，同时运营着IDA国际设计大奖、LIT照明设计奖、AMP建筑大师奖等众多知名赛事。BLT奖项继承了Farmani Group一贯的高标准评审传统和全球推广网络，自创立以来迅速成长为建筑与室内设计领域备受关注的国际性奖项平台。每年吸引来自全球数十个国家的建筑师、室内设计师、景观设计师及建筑产品企业参与角逐。",
  category: [
    "建筑设计 (Architecture)",
    "室内设计 (Interior Design)",
    "景观建筑 (Landscape Architecture)",
    "建筑产品设计 (Construction Product Design)"
  ],
  timeline: [
    { "阶段": "超级早鸟截止", "时间": "2026年3月31日" },
    { "阶段": "最终优惠截止", "时间": "2026年5月31日" },
    { "阶段": "常规报名截止", "时间": "2026年6月30日" },
    { "阶段": "最终报名截止（+10%滞纳金）", "时间": "2026年9月6日" },
    { "阶段": "绝对最终报名截止", "时间": "2026年10月4日" },
    { "阶段": "获奖名单公布", "时间": "2026年秋季" }
  ],
  fee_timeline: [
    { period: "专业组（常规）", price: 270, currency: "CHF", date: "常规截止前（6月30日）", note: "含税，单项目费用" },
    { period: "滞纳金期间", price: 297, currency: "CHF", date: "7月1日至10月4日", note: "常规费用基础上加收10%" },
    { period: "多类别优惠", price: 135, currency: "CHF", date: "全阶段适用", note: "同一作品提交至额外类别享受50%折扣" },
    { period: "学生组", price: 0, currency: "CHF", date: "需注册账户后确认", note: "请访问官网确定具体费率" }
  ],
  fee_note: "费用一经支付概不退款。常规截止日期（6月30日）后至最终截止（10月4日）期间报名将加收10%额外滞纳金。另可能涉及获奖后的奖杯购买等其他费用。",
  judging_criteria: [
    { "维度": "美学", "说明": "综合评估形式、形状、颜色、质感、表面处理和所用材料的视觉冲击力与艺术价值" },
    { "维度": "创新", "说明": "考察设计是否为市场提供了新的解决方案，或在现有结构上进行了显著的补充与改进" },
    { "维度": "实用性/功能性", "说明": "评估设计的易用性、安全性、维护便利性及功能性" },
    { "维度": "可持续性", "说明": "考量设计如何应对社会影响、环境友好性、能源利用等当今挑战" },
    { "维度": "细节关注", "说明": "综合评判设计在美学、环境、文化和背景考量上的融合程度" },
    { "维度": "整体原创性", "说明": "评估设计的整体创新性、创造性技术应用及解决方案" },
    { "维度": "社会价值", "说明": "项目对社区和更广泛社会环境的贡献也是重要的考量因素" }
  ],
  judge_info: "BLT奖项的评审团由每年动态更新的全球业界专家组成，通常包括38位以上来自全球的资深建筑师、设计师、开发商、学者和媒体代表。2026年度评委包括Matteo Cainer、Pal Pang等；历年评委包括Stanislas Helou（Thinking Luxury创始人）、Sonsoles Vela Navarro（studioVRA合伙人）、Eason Zhu（Fununit Design设计总监）、Serhii Makhno（MAKHNO Studio创始人）、Steffen Lehmann（si_architecture创始人）等。",
  judges: [
    { name: "Matteo Cainer", title: "2026年度评委", company: "" },
    { name: "Pal Pang", title: "2026年度评委", company: "" },
    { name: "Tran Ngoc Danh", title: "VMARK设计奖创始人 / 评委", company: "VMARK Awards" },
    { name: "Cas Esbach", title: "SCAD教授 / 评委", company: "Savannah College of Art & Design" },
    { name: "Muhammad Habsah", title: "U+A设计总监 / 评委", company: "U+A Design" },
    { name: "Christian Brendelberger", title: "Baumanagement AG管理委员会成员 / 评委", company: "Baumanagement AG" },
    { name: "Andreas Rupf", title: "ETH RAUM主管 / 评委", company: "ETH Zurich" },
    { name: "Stanislas Helou", title: "Thinking Luxury 创始人 / 评委", company: "Thinking Luxury" },
    { name: "Sonsoles Vela Navarro", title: "studioVRA 合伙人 / 评委", company: "studioVRA" },
    { name: "Eason Zhu", title: "Fununit Design 设计总监 / 评委", company: "Fununit Design" },
    { name: "Serhii Makhno", title: "MAKHNO Studio 创始人 / 评委", company: "MAKHNO Studio" },
    { name: "Steffen Lehmann", title: "si_architecture 创始人 / 教授 / 评委", company: "si_architecture" }
  ],
  award_levels: [
    { level: "年度建筑设计 (Architectural Design of the Year)", description: "七大年度至高荣誉之一，颁给在全球范围内表现最突出的建筑设计专业人士。" },
    { level: "年度新锐建筑师 (Emerging Architect of the Year)", description: "针对学生参赛者评选的年度至高荣誉，表彰最具潜力的年轻建筑人才。" },
    { level: "年度室内设计 (Interior Design of the Year)", description: "七大年度至高荣誉之一，颁给在全球范围内表现最突出的室内设计专业人士。" },
    { level: "年度新锐室内设计师 (Emerging Interior Designer of the Year)", description: "针对学生参赛者评选的年度至高荣誉，表彰最具潜力的年轻室内设计人才。" },
    { level: "年度建筑产品设计 (Construction Product of the Year)", description: "七大年度至高荣誉之一，颁给最优秀的建筑产品设计与创新方案。" },
    { level: "年度景观建筑设计 (Landscape Architectural Design of the Year)", description: "七大年度至高荣誉之一，颁给最卓越的景观建筑项目。" },
    { level: "类别大奖 (Category Winners)", description: "授予在四大主类别下各细分领域获得优胜的作品，如2025年有超过140个项目获得此类荣誉。" },
    { level: "评审团优选奖 (Jury's Top Pick)", description: "由评审团从所有参赛作品中特别甄选，表彰在多个维度表现卓越的项目。" },
    { level: "荣誉提名奖 (Honorable Mention)", description: "授予通过初审，在设计质量和创新性上表现优异的作品。" }
  ],
  award_stats_2025: "超过140个项目获得类别大奖，覆盖建筑设计、室内设计、景观建筑与建筑产品四大核心领域。",
  nomination_types: ["专业组 (Professional)", "学生组 (Student)"],
  preliminary_check: "所有参赛作品均采用10-100分评分制进行综合评定。曾在其他赛事获奖的作品也具有参赛资格。初审通过的作品方可进入后续评审环节。",
  requirements: {
    "参赛资格": "面向全球各地的专业人士和学生开放。专业组与学生在同一竞赛中进行评审，但学生作品可竞争年度新锐建筑师/室内设计师等奖项。",
    "作品时限": "参赛作品须是最近5年内创作的概念设计、在建项目或已完工项目。",
    "图片要求": "最多提交10张项目图片，格式为JPEG或PNG，单张大小不超过4MB，宽度至少为1000像素。",
    "文档要求": "可附上一份PDF文件用于补充项目说明。",
    "链接要求": "可提供一个项目网站链接。",
    "描述要求": "需提供项目名称、设计公司、主创设计师信息、项目说明等内容。",
    "知识产权": "参赛者须保证对参赛作品拥有独立的知识产权及影像版权，因版权问题产生的争议由参赛者自负。"
  },
  benefits: [
    "获得由业界权威评审团认可的国际顶级荣誉，获个性化成就证书和官方获奖者印章",
    "获奖作品通过官方渠道及合作媒体在全球进行广泛报道和宣传",
    "受邀参加在富有历史意义的地标建筑中举办的年度颁奖典礼及晚宴",
    "获奖作品被收录在BLT年度画册《BLT Book》中全球发行",
    "永久展示于官网在线优胜者画廊（Online Winners Gallery）",
    "独家获得BLT获奖标识的使用权，可用于各类营销材料、网站和产品包装",
    "职业生涯里程碑，向潜在客户和合作伙伴展示实力的权威背书"
  ],
  website: "https://bltawards.com/"
};

// === 文件路径 ===
const baseDir = path.join(__dirname, 'data');
const webDir = path.join(__dirname, 'website', 'data');

// 读取现有数据
let baseData = JSON.parse(fs.readFileSync(path.join(baseDir, 'awards.json'), 'utf-8'));
let webData = JSON.parse(fs.readFileSync(path.join(webDir, 'awards.json'), 'utf-8'));
let detailData = JSON.parse(fs.readFileSync(path.join(webDir, 'award-details.json'), 'utf-8'));

// 检查是否已存在
const existingIdx = baseData.findIndex(a => a.award_id === award_id);
if (existingIdx >= 0) {
  console.log(`⚠️  ${award_id} 已存在，正在更新...`);
  baseData[existingIdx] = baseEntry;
  const webIdx = webData.findIndex(a => a.award_id === award_id);
  if (webIdx >= 0) webData[webIdx] = webEntry;
  const detailIdx = detailData.findIndex(a => a.award_id === award_id);
  if (detailIdx >= 0) detailData[detailIdx] = detailEntry;
} else {
  // 插入到第一位
  baseData.unshift(baseEntry);
  webData.unshift(webEntry);
  detailData.unshift(detailEntry);
}

// 写回文件
fs.writeFileSync(path.join(baseDir, 'awards.json'), JSON.stringify(baseData, null, 2), 'utf-8');
fs.writeFileSync(path.join(webDir, 'awards.json'), JSON.stringify(webData, null, 2), 'utf-8');
fs.writeFileSync(path.join(webDir, 'award-details.json'), JSON.stringify(detailData, null, 2), 'utf-8');

console.log(`✅ ${award_id} 数据写入成功！`);
console.log(`   data/awards.json 总数: ${baseData.length}`);
console.log(`   website/data/awards.json 总数: ${webData.length}`);
console.log(`   website/data/award-details.json 总数: ${detailData.length}`);
