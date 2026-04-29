const fs = require('fs');

// ============================================================
// DNA Paris Design Awards (巴黎DNA设计大奖) 2026
// 主办: Farmani Group, Paris
// ============================================================

const DATA_AWARDS = 'C:\\Users\\Administrator\\WorkBuddy\\国际设计大奖参赛咨询\\data\\awards.json';
const WEBSITE_AWARDS = 'C:\\Users\\Administrator\\WorkBuddy\\国际设计大奖参赛咨询\\website\\data\\awards.json';
const AWARD_DETAILS = 'C:\\Users\\Administrator\\WorkBuddy\\国际设计大奖参赛咨询\\website\\data\\award-details.json';

// ---- 1. data/awards.json ----
const newAward = {
  award_id: "dna_paris_design_awards_2026",
  award_name_cn: "巴黎DNA设计大奖",
  award_name_en: "DNA Paris Design Awards",
  award_name_short: "DNA Paris Awards",
  category_main: "综合设计",
  category_sub: ["建筑设计", "室内设计", "景观设计", "产品设计", "平面设计"],
  country: "法国",
  city: "巴黎",
  website: "https://dna.paris",
  prestige_level: "高",
  difficulty_level: "中",
  fee_currency: "EUR",
  fee_regular: 350,
  fee_final: 385,
  submission_open: "2025-09-01",
  deadline_early: "2026-02-20",
  deadline_regular: "2026-05-08",
  deadline_final: "2026-05-22",
  annnouncement_date: "2026-07-01",
  update_time: "2026-04-29"
};

// ---- 2. website/data/awards.json ----
const newWebsiteAward = {
  award_id: "dna_paris_design_awards_2026",
  award_name_cn: "巴黎DNA设计大奖",
  award_name_en: "DNA Paris Design Awards",
  award_name: "巴黎DNA设计大奖 (DNA Paris Design Awards)",
  short_name: "DNA Paris",
  logo_url: "/images/logos/dna-paris-logo.png",
  organizer: "Farmani Group",
  category_main: "综合设计",
  category_sub: ["建筑设计", "室内设计", "景观设计", "产品设计", "平面设计"],
  country: "法国",
  city: "巴黎",
  prestige_level: "高",
  difficulty_level: "中",
  fee_regular: 350,
  fee_final: 385,
  fee_currency: "EUR",
  submission_open: "2025-09-01",
  deadline_early: "2026-02-20",
  deadline_regular: "2026-05-08",
  deadline_final: "2026-05-22",
  annnouncement_date: "2026-07-01",
  website: "https://dna.paris",
  update_time: "2026-04-29"
};

// ---- 3. award-details.json ----
const newDetail = {
  award_id: "dna_paris_design_awards_2026",
  name: "巴黎DNA设计大奖",
  name_en: "DNA Paris Design Awards",
  award_intro: "巴黎DNA设计大奖（DNA Paris Design Awards）是一项国际性设计竞赛，旨在表彰那些通过实用、美观和创新的设计作品提升人们日常生活品质的建筑师和设计师。奖项涵盖建筑、室内、景观、产品和平面设计五大领域，致力于发现和推广全球最具创意和前瞻性的设计人才。该奖项由Farmani Group主办，该集团同时也是国际设计奖(IDA)、美国建筑奖(AMP)等知名奖项的创立者，在奖项运营方面拥有丰富经验。",
  organizer: "Farmani Group",
  organizer_intro: "巴黎DNA设计大奖由Farmani Group主办，总部位于美国洛杉矶（奖项运营中心位于巴黎）。Farmani Group是全球知名的设计奖项运营机构，同时运营国际设计奖(IDA)、美国建筑奖(AMP)、Lucie Awards（露西摄影奖）等多个国际性艺术与设计奖项，在奖项运营方面拥有丰富经验与行业资源。DNA Paris强调全球性和多元文化包容性，旨在为全球设计思考者和创造者提供一个展示与交流的平台。",
  organizer_location: "法国巴黎（Paris, France）",
  description: "2026年度巴黎DNA设计大奖常规报名正在进行中。本届赛事覆盖建筑、室内、景观、产品、平面五大设计领域，采用匿名评审制度确保公正。赛事设超早鸟（优惠20%）、延期早鸟（10%）、常规报名及最终延迟报名（附加10%）四个阶段。获奖名单预计于7月初公布，颁奖典礼将于2026年10月在巴黎举行，包含夏季设计大会(Summer Design Conference)和颁奖晚宴(Gala Night)。目前常规报名将于5月8日截止。",
  established: "2016年左右（具体年份待官网确认）",
  history: "巴黎DNA设计大奖由Farmani Group创办，作为其旗下核心设计奖项品牌之一，与IDA（国际设计奖）、AMP（美国建筑奖）同属一个集团体系。该奖项以表彰实用、美观和创新的设计作品为宗旨，在全球设计界建立了良好声誉。凭借Farmani Group丰富的评奖经验和广泛的媒体合作网络，DNA Paris迅速成长为备受设计师关注的重要国际竞赛平台。每年吸引来自全球各地的建筑师、设计师和学生参与，涵盖已完工项目、在建项目和概念方案等多种作品类型。颁奖典礼每年10月在巴黎举行，是设计界的重要社交与展示活动之一。",
  category: [
    "建筑设计（Architecture）：商业建筑、文化建筑、住宅建筑、可持续/绿色建筑、办公空间等细分类别",
    "室内设计（Interior Design）：住宅室内、办公空间、零售与商业、酒店餐饮、公共空间等细分类别",
    "景观设计（Landscape Design）：城市公园、私人花园、公共广场、屋顶花园等细分类别",
    "产品设计（Product Design）：消费电子、家具照明、家居用品、交通工具配件、材料应用、概念设计等",
    "平面设计（Graphic Design）：品牌标识、包装设计、印刷出版、字体排版、数字媒介、信息图表等"
  ],
  timeline: [
    { "阶段": "超早鸟截止（20%折扣）", "时间": "2025年12月19日" },
    { "阶段": "延期早鸟截止（10%折扣）", "时间": "2026年2月20日" },
    { "阶段": "常规报名截止（原价）", "时间": "2026年5月8日" },
    { "阶段": "最终延迟报名（附加10%）", "时间": "2026年5月22日" },
    { "阶段": "获奖名单公布", "时间": "2026年7月初" },
    { "阶段": "颁奖典礼（巴黎）", "时间": "2026年10月" }
  ],
  fee_timeline: [
    { "period": "专业组-建筑/室内/景观/产品（超早鸟）", "price": 280, "currency": "EUR", "date": "2025.12.19前", "note": "原价350欧元享20%优惠" },
    { "period": "专业组-建筑/室内/景观/产品（早鸟）", "price": 315, "currency": "EUR", "date": "2026.2.20前", "note": "原价350欧元享10%优惠" },
    { "period": "专业组-建筑/室内/景观/产品（常规）", "price": 350, "currency": "EUR", "date": "2026.5.8前", "note": "标准报名费" },
    { "period": "专业组-建筑/室内/景观/产品（最终延迟）", "price": 385, "currency": "EUR", "date": "2026.5.22前", "note": "原价基础上附加10%" },
    { "period": "专业组-平面设计（常规）", "price": 100, "currency": "EUR", "date": "各阶段适用", "note": "平面设计类别独立定价" },
    { "period": "学生组（常规）", "price": 75, "currency": "EUR", "date": "各阶段适用", "note": "学生组统一价75欧元" },
    { "period": "多类别额外提交", "price": null, "currency": "EUR", "date": "每类另付", "note": "额外类别可享受50%费用折扣" }
  ],
  fee_note: "参赛费用根据参赛者身份和所选类别而定。专业组建筑/室内/景观/产品类为350欧元/项目（超早鸟20%off / 早鸟10%off），平面设计100欧元/项目；学生组75欧元/项目。同一项目可提交至多个类别，额外类别享受50%费用折扣。常规报名截止(5月8日)后报名费将上涨10%。所有获奖后的相关权益（除差旅住宿外）均已包含在报名费中，无隐藏费用。",
  judging_criteria: [
    { "维度": "细节关注", "说明": "评估作品在美学、环境、文化及背景考量上的表现" },
    { "维度": "整体原创", "说明": "考察作品的创新性、创造性技术应用等综合水平" },
    { "维度": "可用性与功能性", "说明": "考察设计在实际应用中的效果和用户体验" },
    { "维度": "社会与环境责任", "说明": "关注设计在更广泛的社会和环境方面的影响" },
    { "维度": "匿名评审机制", "说明": "为确保公正，评审过程中设计师的身份信息对评委隐藏" }
  ],
  judge_info: "评审团由全球来自不同设计领域的专家组成，包括设计师、创意总监、编辑等创意专业人士。评审过程采用匿名评审制以确保公正。例如日本设计师Daisuke Kitagawa创立了DESIGN FOR INDUSTRY INC.，在消费品、家具及先进技术研发等领域有丰富国际设计经验。完整评委名单可访问官网 dna.paris/jury 页面查阅。",
  judges: [
    { "name": "Daisuke Kitagawa", "title": "设计师 / 创始人", "company": "DESIGN FOR INDUSTRY INC." }
  ],
  award_levels: [
    { "level": "优胜奖（Winner）", "description": "授予各细分类别评选出的获胜者，是DNA巴黎设计大奖的官方认可" },
    { "level": "荣誉提名（Honorable Mention）", "description": "部分优秀作品获得的额外认可" },
    { "level": "年度设计师（Designer Of The Year）", "description": "赢得五大主类别中任何一个的最高个人荣誉，将在巴黎大会进行作品展示" }
  ],
  award_stats_2025: "2025赛季吸引了来自全球各地大量优秀设计作品参与角逐，优胜者和荣誉提名者均获得官方认证标识及媒体推广权益。",
  nomination_types: ["专业组（Professional）", "学生组（Student）"],
  preliminary_check: "提交材料不完整或未成功缴纳报名费的团队将被判定为无效参赛资格。",
  requirements: {
    "参赛资格": "面向全球各地的创意人士、设计师、团队及公司开放，不限国籍。接受已完工、在建以及概念类的项目，对作品年限没有限制。",
    "数量限制": "同一项目可提交至多个参赛类别，每增加一个类别需缴纳相应费用（额外类别50%折扣）。",
    "提交方式": "所有材料通过官网在线提交，无需寄送实物。",
    "知识产权": "参赛者须确保对参赛作品拥有独立的知识产权及影像版权，因版权问题产生的争议由参赛者自行负责。"
  },
  benefits: [
    "颁奖典礼与年会特权：获奖者可获邀参加在巴黎举行的夏季设计大会(Summer Design Conference)与颁奖晚宴(Gala Night)，并可携带一位同行者",
    "VIP展示资格：若赢得主类别大奖即年度 Designer of The Year，将获得在巴黎大会上进行作品展示的资格",
    "新闻稿与媒体推广：年度设计师获奖者获得个性化新闻稿，全年通过邮件向12万名创意及设计专业人士数据库推广",
    "媒体关系网络：主办方与全球主要设计媒体建立合作关系，有效提升获奖者PR曝光度",
    "奖杯与证书：年度设计师获奖者在巴黎领奖台获颁奖杯和证书；细分类别优胜者可额外付费购买奖杯",
    "Winner Seal认证标识：所有获奖者获得官方Winner Seal授权用于网站、宣传册、邮件签名等市场材料",
    "线上荣誉展示：获奖作品在官网DNA Wall of Fame荣誉墙展示并获专属精彩片段",
    "市场营销支持包：主办方免费提供宣传物料包用于推广获奖成就",
    "无隐藏费用：除差旅住宿外，所有获奖后权益均已包含在报名费中"
  ],
  website: "https://dna.paris",
  entry_url: "https://dna.paris/register/",
  contact_address: "Farmani Group, DNA Paris Design Awards, Paris, France",
  official_media: "DNA Paris官网及全球合作设计媒体网络",
  disclaimer: "以上信息基于2026年4月公开资料整理。以上时间节点和费用数据综合自官网及多个平台交叉核校。具体细分类别、最新费用细则及完整评委名单请以官网 dna.paris 实时公布为准。当前常规报名进行中，5月8日截止。"
};

try {
  let awardsData = JSON.parse(fs.readFileSync(DATA_AWARDS, 'utf8'));
  const existingIdx = awardsData.findIndex(a => a.award_id === newAward.award_id);
  if (existingIdx >= 0) { awardsData[existingIdx] = newAward; }
  else { awardsData.unshift(newAward); }
  fs.writeFileSync(DATA_AWARDS, JSON.stringify(awardsData, null, 2), 'utf8');
  console.log('OK: data/awards.json (' + awardsData.length + ' entries), first=' + awardsData[0].award_id);

  let webAwards = JSON.parse(fs.readFileSync(WEBSITE_AWARDS, 'utf8'));
  const webIdx = webAwards.findIndex(a => a.award_id === newWebsiteAward.award_id);
  if (webIdx >= 0) { webAwards[webIdx] = newWebsiteAward; }
  else { webAwards.unshift(newWebsiteAward); }
  fs.writeFileSync(WEBSITE_AWARDS, JSON.stringify(webAwards, null, 2), 'utf8');
  console.log('OK: website/data/awards.json (' + webAwards.length + ' entries), first=' + webAwards[0].award_id + ', cn=' + webAwards[0].award_name_cn);

  let details = JSON.parse(fs.readFileSync(AWARD_DETAILS, 'utf8'));
  const detIdx = details.findIndex(d => d.award_id === newDetail.award_id);
  if (detIdx >= 0) { details[detIdx] = newDetail; }
  else { details.unshift(newDetail); }
  fs.writeFileSync(AWARD_DETAILS, JSON.stringify(details, null, 2), 'utf8');
  console.log('OK: award-details.json (' + details.length + ' entries), first=' + details[0].award_id);
} catch(e) {
  console.error('ERROR:', e.message);
}
