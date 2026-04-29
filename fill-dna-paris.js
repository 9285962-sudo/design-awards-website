const fs = require('fs');
const path = require('path');

// ===== 1. data/awards.json 基础数据 =====
const awardsPath = path.join(__dirname, 'data/awards.json');
let awardsData = JSON.parse(fs.readFileSync(awardsPath, 'utf8'));

const existingIdx = awardsData.findIndex(a => a.award_id === 'dna_paris_design_awards_2026');
if (existingIdx >= 0) { awardsData.splice(existingIdx, 1); }

const newAward = {
  award_id: 'dna_paris_design_awards_2026',
  award_name_cn: '巴黎DNA设计大奖',
  award_name_en: 'DNA Paris Design Awards',
  award_name_short: 'DNA Paris',
  category_main: '综合设计',
  category_sub: ['建筑设计', '室内设计', '景观设计', '产品设计', '平面设计'],
  country: '法国',
  city: '巴黎',
  website: 'https://dna.paris',
  prestige_level: '高',
  difficulty_level: '中',
  fee_currency: 'EUR',
  fee_regular: 350,
  fee_final: 385,
  submission_open: '2025-11-01',
  deadline_early: '2026-02-20',
  deadline_regular: '2026-05-08',
  deadline_final: '2026-05-22',
  annnouncement_date: '2026-07-01',
  update_time: '2026-04-29'
};

awardsData.unshift(newAward);
fs.writeFileSync(awardsPath, JSON.stringify(awardsData, null, 2), 'utf8');
console.log('✅ data/awards.json，总计', awardsData.length, '条');

// ===== 2. website/data/awards.json 网站构建数据 =====
const webAwardsPath = path.join(__dirname, 'website/data/awards.json');
let webAwardsData = JSON.parse(fs.readFileSync(webAwardsPath, 'utf8'));
const existingWebIdx = webAwardsData.findIndex(a => a.award_id === 'dna_paris_design_awards_2026');
if (existingWebIdx >= 0) { webAwardsData.splice(existingWebIdx, 1); }

const newWebAward = {
  award_id: 'dna_paris_design_awards_2026',
  award_name_cn: '巴黎DNA设计大奖',
  award_name_en: 'DNA Paris Design Awards',
  award_name: '巴黎DNA设计大奖 (DNA Paris Design Awards)',
  short_name: 'DNA Paris',
  logo_url: '/images/logos/dna-paris-logo.png',
  organizer: 'Farmani Group',
  category_main: '综合设计',
  category_sub: ['建筑设计', '室内设计', '景观设计', '产品设计', '平面设计'],
  country: '法国',
  city: '巴黎',
  prestige_level: '高',
  difficulty_level: '中',
  fee_regular: 350,
  fee_final: 385,
  fee_currency: 'EUR',
  submission_open: '2025-11-01',
  deadline_early: '2026-02-20',
  deadline_regular: '2026-05-08',
  deadline_final: '2026-05-22',
  annnouncement_date: '2026-07-01',
  website: 'https://dna.paris',
  update_time: '2026-04-29'
};

webAwardsData.unshift(newWebAward);
fs.writeFileSync(webAwardsPath, JSON.stringify(webAwardsData, null, 2), 'utf8');
console.log('✅ website/data/awards.json，总计', webAwardsData.length, '条');

// ===== 3. website/data/award-details.json 详情数据 =====
const detailsPath = path.join(__dirname, 'website/data/award-details.json');
let detailsData = JSON.parse(fs.readFileSync(detailsPath, 'utf8'));
const existingDetailIdx = detailsData.findIndex(a => a.award_id === 'dna_paris_design_awards_2026');
if (existingDetailIdx >= 0) { detailsData.splice(existingDetailIdx, 1); }

const newDetail = {
  award_id: 'dna_paris_design_awards_2026',
  name: '巴黎DNA设计大奖',
  name_en: 'DNA Paris Design Awards',
  award_intro: '巴黎DNA设计大奖（DNA Paris Design Awards）是一项国际性设计竞赛，旨在表彰那些通过实用、美观和创新的设计作品提升人们日常生活品质的建筑师和设计师。奖项涵盖建筑、室内、景观、产品和平面设计五大领域，致力于发现和推广全球最具创意和前瞻性的设计人才。DNA Paris强调设计的全球化视野和多元文化包容性，为全球设计思考者和创造者提供一个展示与交流的权威平台。',
  organizer: 'Farmani Group',
  organizer_intro: 'Farmani Group是国际知名的设计奖项运营集团，总部位于美国洛杉矶。该集团创立并运营多个国际顶级设计奖项，包括国际设计奖(IDA)、美国建筑奖(AMP)、伦敦设计奖(LDA)等，在全球设计奖项运营领域拥有丰富经验和广泛影响力。Farmani Group旗下各奖项以专业评审、全球覆盖和媒体推广著称，每年吸引来自100多个国家的数万件参赛作品。',
  organizer_location: '法国巴黎（主办方Farmani Group总部位于美国洛杉矶）',
  description: '2026年度巴黎DNA设计大奖现已开放报名，常规报名将于5月8日截止。本届赛事涵盖建筑设计、室内设计、景观设计、产品设计和平面设计五大核心领域，各领域下设多个细分类别以精准评估不同类型作品。采用多阶段报名费制度（超早鸟/早鸟/常规/最终延迟），获奖名单预计于2026年7月初公布，颁奖典礼将于10月在巴黎举行。获奖者将受邀参加夏季设计大会(Summer Design Conference)和颁奖典礼晚宴(Gala Night)，并获得全球媒体推广和官方认证标识等全面权益。',
  established: '2017年',
  history: '巴黎DNA设计大奖由Farmani Group于2017年创办。Farmani Group作为国际设计奖项运营领域的领军者，此前已成功创立国际设计奖(IDA)、美国建筑奖(AMP)等多个知名设计竞赛。DNA Paris自创办以来，凭借其全球化视野、多元文化包容性和专业评审机制迅速崛起，成为欧洲最具影响力的国际综合性设计奖项之一。奖项名称中的"DNA"寓意着对设计本质的探索——发掘每件作品的独特基因与创新内核。每年吸引来自全球100多个国家的建筑师、设计师和创意团队参与角逐，获奖作品在巴黎举行的颁奖典礼上接受荣誉表彰，并通过Farmani Group的全球媒体网络获得广泛曝光。',
  category: [
    '建筑设计 (Architecture)：商业建筑、文化建筑、住宅建筑、可持续发展建筑、办公建筑、再利用与翻新、小型建筑、概念性建筑',
    '室内设计 (Interior Design)：商业空间、居住空间、酒店空间、办公空间、零售空间、餐饮空间、健康与康养空间、休闲空间、展示空间',
    '景观设计 (Landscape Design)：私人花园、公共景观、城市设计、可持续景观、概念性景观',
    '产品设计 (Product Design)：家具、灯具、消费电子产品、厨卫产品、家居装饰、时尚配件、交通工具、概念性产品',
    '平面设计 (Graphic Design)：品牌识别系统、包装设计、出版物与编辑设计、海报设计、数字体验设计、字体排印'
  ],
  timeline: [
    { '阶段': '超早鸟报名截止', '时间': '2025年12月19日' },
    { '阶段': '延期早鸟报名截止', '时间': '2026年2月20日' },
    { '阶段': '常规报名截止', '时间': '2026年5月8日' },
    { '阶段': '最终延迟报名截止', '时间': '2026年5月22日' },
    { '阶段': '获奖名单公布', '时间': '2026年7月初' },
    { '阶段': '颁奖典礼', '时间': '2026年10月（法国巴黎）' }
  ],
  fee_timeline: [
    { period: '超早鸟价', price: 280, currency: 'EUR', date: '2025-12-19前', note: '优惠20%' },
    { period: '早鸟价', price: 315, currency: 'EUR', date: '2026-02-20前', note: '优惠10%' },
    { period: '常规价（专业组-建筑/室内/景观/产品）', price: 350, currency: 'EUR', date: '2026-05-08前', note: '原价' },
    { period: '常规价（平面设计专业组）', price: 100, currency: 'EUR', date: '2026-05-22前', note: '平面类别专用价格' },
    { period: '最终延迟价（专业组）', price: 385, currency: 'EUR', date: '2026-05-22前', note: '附加10%费用' },
    { period: '学生组（全类别）', price: 75, currency: 'EUR', date: '2026-05-22前', note: '统一价格' }
  ],
  fee_note: '以上费用为单个项目单类别的报名费。同一项目提交至多个额外类别可享受50%折扣。专业组建筑/室内/景观/产品设计每额外类别175欧元，平面设计每额外类别50欧元。所有费用均不含税及可能的支付手续费。',
  judging_criteria: [
    { '维度': '细节关注', '说明': '评估作品在美学品质、环境融合、文化表达及背景语境考量上的表现水平' },
    { '维度': '整体原创性', '说明': '考察作品的创新性、创造性技术运用以及设计理念的综合原创程度' },
    { '维度': '可用性与功能性', '说明': '考察设计在实际应用场景中的效果、用户体验和功能实现质量' },
    { '维度': '社会与环境责任', '说明': '关注设计在更广泛的社会价值层面和环境保护方面的影响与贡献' },
    { '维度': '匿名评审', '说明': '为确保评审公正性，整个评审过程中设计师的身份信息会对评委完全隐藏' }
  ],
  judge_info: '评审团由来自全球不同设计领域的专家组成，包括设计师、创意总监、编辑及其他创意专业人士。评委成员涵盖建筑、室内、景观、产品和平面设计五大领域，确保每个参赛类别都能获得该领域的专业评估。知名评委包括日本设计师Daisuke Kitagawa（DESIGN FOR INDUSTRY INC.创始人，消费品、家具及先进技术领域资深专家），以及来自欧洲各顶尖设计工作室的领军人物。完整评委名单请访问官网 dna.paris/jury 页面查阅。',
  judges: [
    { name: 'Daisuke Kitagawa', title: '创始人 & 设计总监', company: 'DESIGN FOR INDUSTRY INC.' },
    { name: 'Valentina Baroni', title: '创意总监', company: 'Baroni Architects' },
    { name: 'Tatiana Bilbao', title: '创始人', company: 'Tatiana Bilbao ESTUDIO' },
    { name: 'Patrick Norguet', title: '设计师', company: 'Patrick Norguet Studio' },
    { name: 'Pierre-Yves Rochon', title: '创始人 & 首席设计师', company: 'PYR Design' },
    { name: 'Christophe Pillet', title: '设计师 & 建筑师', company: 'Christophe Pillet Studio' },
    { name: 'Michele De Lucchi', title: '建筑师 & 创始人', company: 'aMDL Studio' },
    { name: 'Matali Crasset', title: '设计师 & 创始人', company: 'Matali Crasset Studio' },
    { name: 'Inga Sempé', title: '产品设计师', company: 'Inga Sempé Studio' },
    { name: 'Ronan Bouroullec', title: '设计师', company: 'Bouroullec Studio' },
    { name: 'Eyal Nir', title: '设计总监', company: 'Eyal Nir Design' },
    { name: 'Sarah Lavoine', title: '设计师 & 创始人', company: 'Sarah Lavoine Studio' }
  ],
  award_levels: [
    { level: '优胜奖 (Winner)', description: '授予各细分类别评选出的获胜者，代表DNA巴黎设计大奖对该类别的官方认可。所有Winners均可使用官方Winner Seal认证标识，作品将在官网荣誉墙(DNA Wall of Fame)上永久展示。' },
    { level: '年度设计师 (Designer Of The Year)', description: '最高个人荣誉称号。若赢得五大主类别（建筑/室内/景观/产品/平面）中任一主类的优胜奖，将被授予此称号。获奖者将在巴黎大会进行作品展示，并获得定制新闻稿和面向12万专业人士的邮件推广。' },
    { level: '荣誉提名 (Honorable Mention)', description: '部分优秀作品除获奖外，还可能被授予荣誉提名资格，是对作品质量的高度认可。' }
  ],
  award_stats_2025: '上一届(2025届)吸引了来自全球100多个国家和地区的数千件作品参与，涵盖五大设计领域的数十个细分类别。获奖者在巴黎接受了荣誉表彰，并通过Farmani Group全球媒体网络获得广泛曝光。',
  nomination_types: ['专业组 (Professionals)', '学生组 (Students)'],
  preliminary_check: '参赛作品通过官网在线提交平台完成注册和材料上传。所有材料需为英文或法文格式。组委会对提交材料的完整性进行初步审查，不完整的申请将被退回补充。评审过程全程匿名——设计师身份信息对评委隐藏以确保公正性。',
  requirements: {
    '参赛资格': '面向全球各地的创意人士、设计师、设计团队及公司开放，不限国籍和地域。分为专业组和学生组两个组别。',
    '作品要求': '接受已完成、在建以及概念类项目，对作品完成年限无限制。所有材料通过官网在线提交，无需寄送实物。',
    '提交规格': '需提交项目描述、高清图片（不少于5张，格式为JPEG/PNG，分辨率不低于300dpi）、相关图纸或渲染图等支撑材料。材料需为英文或法文格式。',
    '知识产权': '参赛者须确保对参赛作品拥有独立的知识产权及影像版权。因版权问题产生的任何争议由参赛者自行负责。',
    '多类别提交': '同一项目可同时提交至多个参赛类别，但每增加一个类别需缴纳相应费用（额外类别享受50%折扣）。'
  },
  benefits: [
    '受邀参加在巴黎举行的夏季设计大会(Summer Design Conference)与颁奖典礼晚宴(Gala Night)，可携带一位同行者（Winner资格）',
    '年度设计师得主获得巴黎大会作品展示资格和VIP席位，以及定制新闻稿全球推广',
    '官方新闻稿 + 面向12万名创意及设计专业人士数据库的全年度邮件推广',
    'Farmani Group全球媒体合作网络PR曝光提升机会',
    '奖杯与证书（年度设计师在巴黎现场领取；细分类别Winner可额外付费购买奖杯）',
    '官方认证Winner Seal标识授权，可用于网站、宣传册、邮件签名等市场材料',
    '获奖作品在官网荣誉墙(DNA Wall of Fame)上永久展示，并获得专属精彩片段展示页面',
    '免费宣传物料包用于推广获奖成就',
    '无隐藏费用：除差旅住宿外，获奖后所有权益均已包含在报名费中，无需额外支付'
  ],
  website: 'https://dna.paris'
};

detailsData.unshift(newDetail);
fs.writeFileSync(detailsPath, JSON.stringify(detailsData, null, 2), 'utf8');
console.log('✅ website/data/award-details.json，总计', detailsData.length, '条');
console.log('\n全部完成！');
