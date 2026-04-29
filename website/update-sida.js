const fs = require('fs');
const path = 'C:/Users/Administrator/WorkBuddy/国际设计大奖参赛咨询/website/data';

// 1. Update awards.json
let awards = JSON.parse(fs.readFileSync(path + '/awards.json', 'utf8'));
awards[81] = {
  award_id: 'sida奖_新加坡室内设计师协会奖_2026',
  award_name_cn: 'SIDA奖（新加坡室内设计师协会奖）',
  award_name_en: 'Singapore Interior Design Awards (SIDA)',
  award_name_short: 'SIDA',
  award_slogan: 'The Pinnacle of Interior Design Excellence',
  organizer: '新加坡室内设计师协会 (SIDS)',
  organizer_cn: '新加坡室内设计师协会 (Society of Interior Designers Singapore)',
  organizer_type: '行业协会',
  country: '新加坡',
  city: '新加坡',
  website: 'https://sidawards.sg',
  logo_url: null,
  category_main: '室内设计',
  category_sub: ['住宅', '酒店/餐饮', '零售', '办公', '展览', '公共空间', '医疗保健', '学术空间', '可持续/产品专项'],
  industry_focus: ['住宅', '酒店', '餐饮', '零售', '办公', '展览', '公共空间', '医疗', '教育'],
  award_type: '协会奖',
  award_cycle: '年度',
  edition_current: 10,
  prestige_level: '知名',
  difficulty_level: '中',
  fee_currency: 'USD',
  notes: '2026年时间表为预测值，基于2025年（第9届）周期整理',
  id: '63',
  update_time: '2026-04-28'
};
fs.writeFileSync(path + '/awards.json', JSON.stringify(awards, null, 2), 'utf8');
console.log('awards.json updated');

// 2. Add SIDA to award-details.json
let details = JSON.parse(fs.readFileSync(path + '/award-details.json', 'utf8'));
const sida = {
  award_id: 'sida奖_新加坡室内设计师协会奖_2026',
  award_name: 'SIDA奖（新加坡室内设计师协会奖）',
  award_name_en: 'Singapore Interior Design Awards (SIDA)',
  award_name_cn: 'SIDA奖（新加坡室内设计师协会奖）',
  organizer: '新加坡室内设计师协会 (Society of Interior Designers Singapore, SIDS)',
  organizer_intro: '新加坡室内设计师协会（SIDS）是新加坡最活跃、最强大的室内设计团体，受新加坡法律管辖，致力于提升室内设计专业水准、解决行业问题，并推动新加坡设计走向世界。协会与国际室内建筑师/设计师联盟（IFI）及新加坡设计理事会（DSG）深度合作，确保奖项标准的权威性与国际影响力。',
  established: '2017年',
  history: 'SIDA由新加坡室内设计师协会（SIDS）于2017年创办，是新加坡唯一获得国际认可的室内设计奖项，深受国际室内建筑师/设计师联盟（IFI）及新加坡设计理事会（DSG）双重权威认证。奖项旨在表彰区域及全球范围内在室内设计领域作出卓越贡献的设计师、优秀作品和行业新秀。',
  description: '新加坡室内设计奖（SIDA）是新加坡最成熟的室内设计奖，旨在通过严谨的评选标准提升行业水平与公众认知。作为新加坡唯一获得IFI及DSG双重认证的室内设计奖项，SIDA以激发行业潜能为己任，既为资深从业者提供展示舞台，也为青年设计师搭建了通往国际的职业桥梁。',
  categories: [
    {
      main: '已建成项目（SIDA COMPLETED）',
      sub: ['住宅 (Residential)', '酒店/餐饮 (Hospitality / F&B)', '零售 (Retail)', '办公 (Workspace)', '展览 (Exhibition)', '公共空间 (Public Space)', '医疗保健 (Healthcare)', '学术空间 (Academia)', '可持续/产品专项']
    },
    {
      main: '概念性项目（SIDA CONCEPT）',
      sub: ['住宅', '酒店/餐饮', '零售', '办公', '展览', '公共空间', '医疗保健', '学术空间', '可持续/产品专项']
    },
    {
      main: '青年学生组（SIDA YOUTH）',
      sub: ['设计院校在读学生作品']
    }
  ],
  deadlines: [
    { 阶段: '早鸟报名启动', 日期: '2026年4月-5月间（预测）' },
    { 阶段: '早鸟优惠截止', 日期: '2026年6月底（预测）' },
    { 阶段: '最终报名截止', 日期: '2026年8月初（预测）' },
    { 阶段: '获奖公布', 日期: '2026年10月-11月（预测）' },
    { 阶段: '颁奖典礼暨年度晚宴', 日期: '2026年11月（预测）' }
  ],
  fees: [
    { 阶段: 'SIDS会员', 金额: '$400起/件', 备注: '每件作品约400美元起' },
    { 阶段: '非会员', 金额: '$500起/件', 备注: '每件作品约500美元起' },
    { 阶段: '批量优惠', 金额: '阶梯折扣', 备注: '提交多件作品（如5件）可享受阶梯折扣' }
  ],
  award_levels: [
    { level: '金奖（Gold）', description: '每个细分类别最高荣誉，授予卓越设计作品' },
    { level: '银奖（Silver）', description: '授予设计品质突出的优秀作品' },
    { level: '铜奖（Bronze）', description: '授予具有显著设计亮点的优质作品' },
    { level: '荣誉奖（Honorable Mention）', description: '授予值得表彰的优秀设计作品' }
  ],
  level_note: '特别奖项包括：成就奖（Luminary/Lifetime Achievement）、年度设计师（Designer of the Year）、年度青年设计师（Young Designer of the Year）、年度设计公司（Best Design Firm of the Year）、年度设计教育家（Design Educator of the Year）、ADMIRA创新与可持续性大奖、Hansgrohe+Axor最佳浴室设计奖等。',
  judging_criteria: [
    { name: '设计影响力（Design Impact）', description: '作品是否能对最终用户及环境产生积极而深远的影响' },
    { name: '创造力与创新（Creativity & Innovation）', description: '是否具备独特的原创性和突破性的设计手法' },
    { name: '空间规划与利用（Spatial Planning & Utilization）', description: '是否通过巧妙的战略规划，高效解决了功能需求' },
    { name: '美学价值（Aesthetic Value）', description: '是否呈现出强大的设计理念与视觉感染力' }
  ],
  judging_note: '评审格外青睐那些敢于挑战常规、引入新材料创新并将人类体验置于首位的作品。评审团由来自全球设计、建筑及酒店业领域的顶尖专家、创意总监与行业领袖组成，通过严谨的集体评议确保评选的国际化视野与专业性。完整评委名单通常在报名开启后于官网公布。',
  requirements: {
    开放对象: '面向全球室内设计师、室内建筑师及相关专业学生',
    作品时效: '参赛作品须为最近3年内完成或提出',
    提交方式: '通过官网 sidawards.sg 完成线上注册、资料上传及缴费',
    材料要求: '详细要求以当届参赛指南（Entry Kit）为准'
  },
  benefits: [
    '奖杯与证书：金、银、铜奖得主获特质奖杯；荣誉奖得主获纸质证书',
    '全球媒体曝光：作品与设计师将在国际及新加坡主流设计媒体、合作媒体平台及SIDA官方网站上获得广泛宣传',
    '颁奖盛典：受邀参加年度颁奖晚宴，与行业领袖和全球同行面对面交流，拓展商业与人脉机遇',
    '年终年鉴收录：获奖作品将被收录于SIDA官方年度出版物，作为权威背书',
    '专属荣誉标识：终身享有使用SIDA获奖标志的权利，可用于个人履历、宣传材料及官网，提升市场竞争力'
  ],
  judges_note: 'SIDA的评审阵容由来自全球设计、建筑及酒店业领域的顶尖专家、创意总监与行业领袖组成。近期评委来自中西文化背景，涵盖知名设计事务所创始人、设计院校教授及高端生活方式品牌主理人，确保评价维度的多元与公正。',
  other_info: [
    '以上信息基于2025年度（第9届）整理，2026年确切日程以官网 www.sidawards.sg 公布为准',
    '最终收费标准以当届官网公布的参赛指引（Entry Kit）为准',
    'SIDA受IFI及DSG双重认证，是新加坡唯一获得国际认可的室内设计奖项'
  ],
  official_url: 'https://sidawards.sg',
  contact: 'sida@sid-singapore.org'
};
details.push(sida);
fs.writeFileSync(path + '/award-details.json', JSON.stringify(details, null, 2), 'utf8');
console.log('award-details.json updated, total:', details.length);

// 3. Update SID_Awards 完整字段数据.json
const sidFull = {
  award_id: 'sida_awards_2026',
  award_name_cn: 'SIDA奖（新加坡室内设计师协会奖）',
  award_name_en: 'Singapore Interior Design Awards (SIDA)',
  award_name_short: 'SIDA',
  award_slogan: 'The Pinnacle of Interior Design Excellence',
  organizer: 'Singapore Interior Designers Singapore (SIDS)',
  organizer_cn: '新加坡室内设计师协会',
  organizer_type: '行业协会',
  country: '新加坡',
  city: '新加坡',
  website: 'https://sidawards.sg',
  logo_url: null,
  category_main: '室内设计',
  category_sub: ['住宅', '酒店/餐饮', '零售', '办公', '展览', '公共空间', '医疗保健', '学术空间', '可持续/产品专项'],
  industry_focus: ['住宅', '酒店', '餐饮', '零售', '办公', '展览', '公共空间', '医疗', '教育'],
  award_type: '协会奖',
  award_cycle: '年度',
  edition_current: 10,
  prestige_level: '知名',
  difficulty_level: '中',
  fee_currency: 'USD',
  fee_early_bird: 400,
  fee_regular: null,
  fee_final: null,
  fee_student: null,
  fee_notes: 'SIDS会员$400起/件，非会员$500起/件，批量提交可享阶梯折扣',
  submission_open: '2026年4月-5月间（预测）',
  deadline_early: '2026年6月底（预测）',
  deadline_regular: null,
  deadline_final: '2026年8月初（预测）',
  announcement_date: '2026年10月-11月（预测）',
  ceremony_date: '2026年11月（预测）',
  ceremony_location: '新加坡',
  project_year_limit: '3年内',
  project_status: '不限',
  project_stage_accepted: ['已建成', '概念设计'],
  entrant_type: ['独立设计师', '设计公司', '学生'],
  judging_criteria: '设计影响力、创造力与创新、空间规划与利用、美学价值',
  evaluation_dimensions: ['设计影响力', '创造力与创新', '空间规划与利用', '美学价值'],
  award_levels: ['金奖', '银奖', '铜奖', '荣誉奖'],
  grand_prize: false,
  special_awards: ['成就奖（Luminary/Lifetime Achievement）', '年度设计师（Designer of the Year）', '年度青年设计师（Young Designer of the Year）', '年度设计公司（Best Design Firm of the Year）', '年度设计教育家（Design Educator of the Year）', 'ADMIRA创新与可持续性大奖', 'Hansgrohe+Axor最佳浴室设计奖'],
  honorable_mention: true,
  trophy: true,
  certificate: true,
  digital_badge: true,
  logo_usage_rights: true,
  logo_usage_duration: '终身',
  website_feature: true,
  media_publicity: true,
  yearbook_included: true,
  networking_events: true,
  contact_email: 'sida@sid-singapore.org',
  media_partners: ['IFI', 'DSG'],
  custom_tags: ['室内设计热门', '亚太地区推荐'],
  internal_notes: '受IFI及DSG双重认证，新加坡唯一国际认可室内设计奖'
};
const fullDataPath = 'C:/Users/Administrator/WorkBuddy/国际设计大奖参赛咨询/奖项数据/SID_Awards_完整字段数据.json';
fs.writeFileSync(fullDataPath, JSON.stringify(sidFull, null, 2), 'utf8');
console.log('SID_Awards_完整字段数据.json updated');

console.log('\nAll 3 files updated successfully!');
