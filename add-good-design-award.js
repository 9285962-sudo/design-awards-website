const fs = require('fs');
const path = require('path');

const award_id = 'good_design_award_2026';

var baseEntry = {
  award_id: award_id,
  award_name_cn: '优良设计奖',
  award_name_en: 'GOOD DESIGN AWARD (G Mark)',
  award_name_short: 'G Mark',
  category_main: '综合设计',
  category_sub: ['产品设计', '建筑设计', '室内设计', '视觉传达', '服务设计'],
  country: '日本',
  city: '东京',
  website: 'https://www.g-mark.org/zh-CN',
  prestige_level: '顶级',
  difficulty_level: '中',
  fee_currency: 'JPY',
  fee_regular: 181500,
  fee_final: 181500,
  submission_open: '2026-04-01',
  deadline_early: '2026-05-21',
  deadline_regular: '2026-09-29',
  deadline_final: '2026-09-29',
  annnouncement_date: '2026-10-15',
  update_time: '2026-04-29'
};

var webEntry = {
  award_id: award_id,
  award_name: '优良设计奖 (GOOD DESIGN AWARD / G Mark)',
  short_name: 'G Mark',
  logo_url: '/images/logos/g-mark-logo.png',
  organizer: '日本设计振兴会 (JDP)',
  update_time: '2026-04-29'
};
Object.keys(baseEntry).forEach(function(k) { if (!webEntry[k]) webEntry[k] = baseEntry[k]; });

var detailEntry = {
  award_id: award_id,
  name: '优良设计奖',
  name_en: 'GOOD DESIGN AWARD (G Mark)',
  award_intro: 'GOOD DESIGN AWARD（优良设计奖，俗称\u300CG Mark\u300D）是日本唯一的综合性设计评价和推广机制，由日本设计振兴会主办。奖项始于1957年，其前身是通商产业省创立的\u300CG Mark\u300D制度，是全球最具历史积淀与影响力的综合性国际设计大奖之一，素有\u300C东方设计奥斯卡奖\u300D之称。奖项旨在表彰通过设计让人们的生活和社会变得更加美好的优秀作品。其核心理念是：并非单纯评价物体的美丽与否，而是通过设计解决课题，注重设计背后的人、社会以及对未来的促进作用。截至2026年，奖项已累计诞生约56,000件获奖作品，在日本全国范围内的认知率高达83.6%。2026年为奖项设立以来的第70届。',
  organizer: '日本设计振兴会 (Japan Institute of Design Promotion, JDP)',
  organizer_intro: '日本设计振兴会（JDP）是日本唯一的综合性设计推广机构，负责GOOD DESIGN AWARD的运营与管理。其前身是成立于1969年的日本产业设计振兴会（JIDPO），1998年改组为日本设计振兴会（JDP）。历经近70年发展，已成为亚洲最具权威性和影响力的设计奖项之一。',
  organizer_location: '日本·东京',
  description: '2026年度为GOOD DESIGN AWARD设立第70届，由全新的评审领导体制推动。本届赛事采用绝对评价体系，涵盖20大主类别（约160个细分类群），覆盖有形产品、建筑空间、软件与服务、地域性创意等所有设计形态。奖项采用多阶段评审制：一次评审→二次评审→特别奖评选。参赛费用采用分阶段收费模式，全程约269,500日元/项目。',
  established: '1957年',
  history: 'GOOD DESIGN AWARD的前身是1957年日本通商产业省（现经济产业省）创设的\u300CG Mark\u300D制度，旨在表彰优秀设计、引导产业发展。1969年日本产业设计振兴会（JIDPO）成立并接管运营；1998年改组为日本设计振兴会（JDP）。历经近70年发展，已成长为亚洲最具权威性和影响力的设计奖项之一。截至2026年，累计约56,000件获奖作品，G Mark标志在日本消费者心目中与\u300C高品质、易用性强且值得信赖\u300D的设计产品直接关联，认知率高达83.6%，是设计师及企业获得市场认知和行业认可最有效的通行证之一。',
  category: [
    '1. 随身物品 (Accessories and Wearable)',
    '2. 个人护理产品 (Personal Care)',
    '3. 文具、兴趣产品 (Stationery and Hobby)',
    '4. 生活用品 (Household Goods)',
    '5. 生活家电 (Home Appliances)',
    '6. 影像、音响产品 (Audio, Video Equipment)',
    '7. 信息产品 (ICT Equipment)',
    '8. 产业、医疗设备 (Equipment for Manufacturing and Medical Care)',
    '9. 住宅设备 (Housing Fixtures)',
    '10. 家具及公共设备 (Furniture, Office and Public Space Equipment)',
    '11. 移动工具 (Mobility)',
    '12. 建筑（独栋住宅、小规模集合住宅）',
    '13. 建筑（中、大规模集合住宅）',
    '14. 建筑（产业、商业设施）',
    '15. 建筑（公共设施）、土木工程、景观',
    '16. 室内空间 (Interior Space)',
    '17. 媒体、内容 (Media and Contents)',
    '18. 系统、服务 (System and Service)',
    '19. 地域构想、活动 (Initiative and Activity for Regional)',
    '20. 一般构想、活动 (Initiative and Activity for the General Public)'
  ],
  timeline: [
    { '\u9636\u6BB5': '报名受理期间', '\u65F6\u95F4': '2026年4月1日13:00 JST \u2014 2026年5月21日13:00 JST' },
    { '\u9636\u6BB5': '一次评审费支付截止', '\u65F6\u95F4': '2026年5月31日' },
    { '\u9636\u6BB5': '一次评审结果通知', '\u65F6\u95F4': '2026年6月30日13:00起可查询' },
    { '\u9636\u6BB5': '二次评审资料登记', '\u65F6\u95F4': '2026年7月上旬 \u2014 8月下旬' },
    { '\u9636\u6BB5': '二次评审费支付截止', '\u65F6\u95F4': '2026年7月30日' },
    { '\u9636\u6BB5': '获奖推广费支付截止', '\u65F6\u95F4': '2026年9月29日' },
    { '\u9636\u6BB5': '获奖发表日', '\u65F6\u95F4': '2026年10月15日（当日起可对获奖作品进行宣传）' },
    { '\u9636\u6BB5': 'GOOD DESIGN EXHIBITION', '\u65F6\u95F4': '2026年10月中旬 \u2014 2027年3月' }
  ],
  fee_timeline: [
    { period: '1次评审费', price: 16500, currency: 'JPY', date: '5月31日截止', note: '含税，每件项目' },
    { period: '2次评审费', price: 71500, currency: 'JPY', date: '7月30日截止', note: '含税，通过一次评审后支付' },
    { period: '获奖推广费', price: 181500, currency: 'JPY', date: '9月29日截止', note: '含税，获奖者须支付方可使用G Mark标志' },
    { period: '全程合计', price: 269500, currency: 'JPY', date: '分阶段支付', note: '不含可选附加服务费用' }
  ],
  fee_note: '费用按项目分阶段收取。可选附加服务：非公开作品评审费110,000日元；G Mark使用费需另行按年支付；现场评审差旅费按实际费用结算。规定截止日前可申请退赛，否则即使中途退赛仍需支付相关费用。',
  judging_criteria: [
    { '\u7EF4\u5EA6': '人类视角（User Benefit）', '\u8BF4\u660E': '设计是否易用、具有亲和力，能否引发用户的共鸣；是否确保安全性、信赖度；能否获得用户的共鸣感与创造性启迪。' },
    { '\u7EF4\u5EA6': '产业视角（Business/Industry）', '\u8BF4\u660E': '设计是否巧妙运用新技术、新材料，促进新产业和新商业模式的创造；是否通过合理的设计与质量控制，带来新产业/商业的创建。' },
    { '\u7EF4\u5EA6': '社会视角（Social Context）', '\u8BF4\u660E': '设计是否实现了新文化的创造，是否推动了可持续发展社会的构建；是否为实现可持续社会做出贡献。' },
    { '\u7EF4\u5EA6': '时间视角（Time/Process）', '\u8BF4\u660E': '设计是否从中长期观点出发提出了可持续性解决方案；是否为社会提出了新价值/新概念/新风格；是否具有高可持续性。' }
  ],
  judge_info: '2026年第70届GOOD DESIGN AWARD采用全新评审团领导体制。评审主席为Jun Nakagawa（中川淳，VISION to STRUCTURE代表）；评审副主席包括Noriko Kawakami（川上典李子，记者/21_21 DESIGN SIGHT副馆长）、Gen Suzuki（铃木元，产品设计师/GEN SUZUKI STUDIO代表）、Yuma Harada（原田祐马，设计师/UMA/design farm代表）。评审团共有约100位来自多元背景的评审委员，其中包含国际评委成员。',
  judges: [
    { name: 'Jun Nakagawa（中川淳）', title: '评审主席', company: 'VISION to STRUCTURE' },
    { name: 'Noriko Kawakami（川上典李子）', title: '评审副主席', company: '21_21 DESIGN SIGHT' },
    { name: 'Gen Suzuki（铃木元）', title: '评审副主席', company: 'GEN SUZUKI STUDIO' },
    { name: 'Yuma Harada（原田祐马）', title: '评审副主席', company: 'UMA/design farm' },
    { name: '评审委员会', title: '约100位多元背景评审委员', company: 'JDP' }
  ],
  award_levels: [
    { level: 'GOOD DESIGN AWARD（G Mark授予）', description: '通过一次评审和二次评审后的全部获奖作品，授予G Mark标志使用权。2025年度共有5,225件作品参评，获奖1,619件，获奖率约31%。' },
    { level: 'GOOD DESIGN BEST 100（优良设计百佳奖）', description: '从所有获奖作品中选出评价最高的100件作品。' },
    { level: 'GOOD DESIGN GOLD AWARD（优良设计金奖）', description: '从BEST 100中遴选20件金奖（每类别1件），前身为经济产业大臣奖，是日本设计界官方最高荣誉之一。' },
    { level: 'GOOD DESIGN GRAND AWARD（优良设计大奖 / 全场大奖）', description: '从20件GOLD AWARD中选出全场最高荣誉——年度最优秀的1件作品。' },
    { level: 'GOOD FOCUS AWARD（专项奖）', description: '从所有获奖作品中选出在特定维度表现特别突出的作品，包括生态设计、交互设计、都市设计、长青设计奖等专项荣誉。' }
  ],
  award_stats_2025: '2025年度共有5,225件作品参评，获奖1,619件，获奖率约31%。',
  nomination_types: ['企业/设计机构', '个人设计师', '全球开放（不限国别）'],
  preliminary_check: '基于绝对评价体系，并非设定既定获奖数量，以评审各视角进行综合判断。多阶段评审：一次评审→二次评审→特别奖评选。',
  requirements: {
    '\u53C2\u8D5B\u8D44\u683C': '面向全球（日本及海外）所有企业、设计机构及个人开放，不限国别。参赛者可以是负责作品的事业主体（制造商等），也可以是设计事务所。可联名报名。',
    '\u4F5C\u54C1\u7C7B\u578B': '接受有形设计（产品、建筑、家电等）和无形设计（软件、服务、系统、商业模式、区域创生活动等）两大类作品。',
    '\u4F5C\u54C1\u72B6\u6001': '必须是设计已定型或已开始提供服务的状态；须确保在2026年10月15日前能够让公众知晓，并且最晚在2027年3月31日之前面向用户提供或销售。',
    '\u7C7B\u522B\u9650\u5236': '一件作品只允许选择一个类别报名，不可跨类别重复提交。评审委员会有权根据实际情况调整至其他评审组。',
    '\u63D0\u4EA4\u65B9\u5F0F': '通过官方专用报名网站在线提交，需先注册账号，再依次登记参评者和作品资料。',
    '\u56FE\u7247\u8981\u6C42': '提交主视觉图及辅助资料图，JPEG/PNG格式。',
    '\u77E5\u8BC6\u4EA7\u6743': '须确保拥有独立知识产权及影像版权，因版权争议由参赛者自行负责。',
    '\u9650\u5236\u4E8B\u9879': '成人用品、军用武器、违反国内外法律或常俗的作品不予受理。'
  },
  benefits: [
    'G Mark在日本消费者中认知率高达83.6%，近半数知晓G Mark的消费者表示更倾向于选择带有G Mark的商品',
    '获得G Mark的长期/年度使用许可，用于商品包装、宣传物料、官网及社交媒体等营销推广',
    '受邀参加年度大型获奖展GOOD DESIGN EXHIBITION，面向公众集中展示',
    '收录于GOOD DESIGN AWARD官方年鉴（纸质+数字版），全球发行',
    '永久收录于官方网站获奖作品库中',
    '主办方协助海外展览及商业推广活动，增加国际认知度与商业对接可能',
    '获得来自奖项官方、新闻合作伙伴及媒体的广泛报道',
    '受邀参加年度颁奖典礼及社交活动（每年10月至11月在东京举行）'
  ],
  website: 'https://www.g-mark.org/zh-CN'
};

// 文件路径
var baseDir = path.join(__dirname, 'data');
var webDir = path.join(__dirname, 'website', 'data');

var baseData = JSON.parse(fs.readFileSync(path.join(baseDir, 'awards.json'), 'utf-8'));
var webData = JSON.parse(fs.readFileSync(path.join(webDir, 'awards.json'), 'utf-8'));
var detailData = JSON.parse(fs.readFileSync(path.join(webDir, 'award-details.json'), 'utf-8'));

var existingIdx = baseData.findIndex(function(a) { return a.award_id === award_id; });
if (existingIdx >= 0) {
  console.log('已存在，正在更新...');
  baseData[existingIdx] = baseEntry;
  var wi = webData.findIndex(function(a) { return a.award_id === award_id; }); if (wi >= 0) webData[wi] = webEntry;
  var di = detailData.findIndex(function(a) { return a.award_id === award_id; }); if (di >= 0) detailData[di] = detailEntry;
} else {
  baseData.unshift(baseEntry);
  webData.unshift(webEntry);
  detailData.unshift(detailEntry);
}

fs.writeFileSync(path.join(baseDir, 'awards.json'), JSON.stringify(baseData, null, 2), 'utf-8');
fs.writeFileSync(path.join(webDir, 'awards.json'), JSON.stringify(webData, null, 2), 'utf-8');
fs.writeFileSync(path.join(webDir, 'award-details.json'), JSON.stringify(detailData, null, 2), 'utf-8');

console.log(award_id + ' 数据写入成功！');
console.log('   data/awards.json 总数: ' + baseData.length);
console.log('   website/data/awards.json 总数: ' + webData.length);
console.log('   website/data/award-details.json 总数: ' + detailData.length);
