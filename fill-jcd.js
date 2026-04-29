const fs = require('fs');
const path = require('path');

// ============================================================
// JCD Design Award (KUKAN DESIGN AWARD) 数据填充
// ============================================================

// 1. data/awards.json
const awardsPath = path.join(__dirname, 'data/awards.json');
let awardsData = JSON.parse(fs.readFileSync(awardsPath, 'utf8'));
awardsData = awardsData.filter(a => a.award_id !== 'jcd_design_award_2026');

const newAward = {
  award_id: 'jcd_design_award_2026',
  award_name_cn: 'JCD设计大奖',
  award_name_en: 'JCD Design Award (KUKAN DESIGN AWARD)',
  award_name_short: 'JCD Award / KDA',
  category_main: '室内设计',
  category_sub: ['室内设计', '建筑设计', '综合设计'],
  country: '日本',
  city: '东京',
  website: 'https://www.jcd.or.jp',
  prestige_level: '高',
  difficulty_level: '中',
  fee_currency: 'JPY',
  fee_regular: 37000,
  fee_final: 37000,
  submission_open: '2026-03-28',
  deadline_early: '2026-05-15',
  deadline_regular: '2026-05-15',
  deadline_final: '2026-05-15',
  annnouncement_date: '2026-11-01',
  update_time: '2026-04-29'
};

awardsData.unshift(newAward);
fs.writeFileSync(awardsPath, JSON.stringify(awardsData, null, 2), 'utf8');
console.log('✅ data/awards.json，总计', awardsData.length, '条');

// 2. website/data/awards.json
const webAwardsPath = path.join(__dirname, 'website/data/awards.json');
let webAwardsData = JSON.parse(fs.readFileSync(webAwardsPath, 'utf8'));
webAwardsData = webAwardsData.filter(a => a.award_id !== 'jcd_design_award_2026');

const newWebAward = {
  award_id: 'jcd_design_award_2026',
  award_name_cn: 'JCD设计大奖',
  award_name_en: 'JCD Design Award (KUKAN DESIGN AWARD)',
  award_name: 'JCD设计大奖 (JCD Design Award / KUKAN DESIGN AWARD)',
  short_name: 'JCD Award / KDA',
  logo_url: '/images/logos/jcd-logo.png',
  organizer: '日本商业环境设计协会 (JCD Association)',
  category_main: '室内设计',
  category_sub: ['室内设计', '建筑设计', '综合设计'],
  country: '日本',
  city: '东京',
  prestige_level: '高',
  difficulty_level: '中',
  fee_regular: 37000,
  fee_final: 37000,
  fee_currency: 'JPY',
  submission_open: '2026-03-28',
  deadline_early: '2026-05-15',
  deadline_regular: '2026-05-15',
  deadline_final: '2026-05-15',
  annnouncement_date: '2026-11-01',
  website: 'https://www.jcd.or.jp',
  update_time: '2026-04-29'
};

webAwardsData.unshift(newWebAward);
fs.writeFileSync(webAwardsPath, JSON.stringify(webAwardsData, null, 2), 'utf8');
console.log('✅ website/data/awards.json，总计', webAwardsData.length, '条');

// 3. website/data/award-details.json
const detailsPath = path.join(__dirname, 'website/data/award-details.json');
let detailsData = JSON.parse(fs.readFileSync(detailsPath, 'utf8'));
detailsData = detailsData.filter(a => a.award_id !== 'jcd_design_award_2026');

const newDetail = {
  award_id: 'jcd_design_award_2026',
  name: 'JCD设计大奖',
  name_en: 'JCD Design Award (KUKAN DESIGN AWARD)',
  award_intro: 'JCD设计大奖（JCD Design Award）是日本历史最悠久、最具权威性的空间设计奖项之一，由一般社团法人日本商业环境设计协会（Japanese Commercial Environment Designers Association，简称JCD）于1974年创立。奖项旨在表彰在"商业环境设计"领域中能够预见未来、展现卓越才华的优秀空间设计作品。2019年与日本空间设计协会（DSA）合并升级为"KUKAN DESIGN AWARD"（空间设计奖），现已成为亚洲最具分量的空间设计赛事之一，拥有50余年的行业积淀。',
  organizer: '一般社団法人 日本商環境デザイン協会 (JCD Association)',
  organizer_intro: '日本商业环境设计协会（JCD Association），成立于1961年，是日本商业环境设计领域最权威的专业组织。协会以推动空间设计的专业交流、提升社会文化价值为核心使命。1974年起创办JCD设计大奖，2003年起将征集范围扩大至整个亚洲地区。2019年与日本空间设计协会（DSA）合并后，正式升级为"KUKAN DESIGN AWARD"，进一步扩大了国际影响力。协会已故名誉会长杉浦康平（Kohei Sugiura）是日本著名平面设计大师，为奖项奠定了极高的美学标准。',
  organizer_location: '日本东京',
  description: '2026年度KUKAN DESIGN AWARD征稿正在进行中，报名截止时间为2026年5月15日。本届赛事覆盖9大空间类别，从店铺、餐饮到公共生活空间全方位涵盖。评审分为初审（一次审查）和终审两个阶段，经一次审查评选出年度Best 100优秀作品，再由终审评委从中评出各级荣誉。获奖名单将于2026年10月至11月公布，其中最高荣誉"KUKAN OF THE YEAR"将于11月初揭晓。颁奖典礼定于2026年11月在东京举行。',
  established: '1974年',
  history: 'JCD设计大奖由日本商业环境设计协会（JCD）于1974年创办，迄今已有50余年历史，是日本乃至亚洲历史最悠久的空间设计竞赛之一。奖项创立初期主要面向日本国内商业空间设计领域，2003年起将征集范围扩大至整个亚洲，成为区域性重要赛事。2019年，JCD与日本空间设计协会（DSA）完成战略合并，奖项正式升级更名为"KUKAN DESIGN AWARD"（日语"空间设计奖"之意），标志着从传统商业环境设计向更广泛的空间设计领域的拓展。50年来，JCD设计大奖见证了亚洲空间设计的演变历程，培养了无数优秀设计师，其Best 100年鉴已成为行业重要的设计参考档案。',
  category: [
    '店铺空间 (Shopping Space)：商店、专卖店、展销厅等零售类空间',
    '餐饮空间 (Food Space)：餐厅、咖啡馆、酒吧、美食广场等餐饮场所',
    '大型商业空间 (Public Commercial Space)：购物中心、百货商场、大型零售综合体等',
    '服务接待与娱乐空间 (Service & Entertainment Space)：酒店、度假村、婚礼会场、水疗中心、电影院、健身中心等',
    '公共交流空间 (Culture & Communication Space)：博物馆、剧院、音乐厅、车站、机场、图书馆等文化设施',
    '公共生活空间 (Public Living Space)：办公室、住宅公共空间、医疗机构、教育机构、仓库、工厂等',
    '展览与活动空间 (Exhibition & Event Space)：各类临时或永久性展览及活动空间',
    '居住空间 (Residential Space)：住宅及居住类空间设计',
    '办公空间 (Office Space)：企业办公空间及联合工作空间'
  ],
  timeline: [
    { '阶段': '报名开始', '时间': '2026年3月28日' },
    { '阶段': '报名截止', '时间': '2026年5月15日' },
    { '阶段': '一次审查 (Best 100)', '时间': '2026年中' },
    { '阶段': '终审评审', '时间': '2026年下半年' },
    { '阶段': '获奖名单公布', '时间': '2026年10月—11月' },
    { '阶段': 'KUKAN OF THE YEAR 公布', '时间': '2026年11月初（日经集团赞助）' },
    { '阶段': '颁奖典礼', '时间': '2026年11月（东京）' }
  ],
  fee_timeline: [
    { period: '参赛费', price: 37000, currency: 'JPY', date: '2026-05-15前', note: '每项目费用，统一价' },
    { period: '视频辅助资料上传费（可选）', price: 33000, currency: 'JPY', date: '2026-05-15前', note: '可选附加服务，非必须' }
  ],
  fee_note: '以上费用为参考值，基于代理机构发布信息整理，具体金额请以官网最终公布为准。参赛费用一经缴纳不予退还。',
  judging_criteria: [
    { '维度': '趋势 (Trend)', '说明': '评估作品是否反映社会趋势、引领时代的创新表达方向' },
    { '维度': '创造力 (Creativity)', '说明': '考察作品的创意含量、想象力以及原创性思维表现' },
    { '维度': '社会影响力 (Social Impact)', '说明': '关注作品对社区、地域的意义以及对环境平衡的考量' },
    { '维度': '文化 (Culture)', '说明': '评价作品对国家或地域历史文化内涵的捕捉与表达' },
    { '维度': '审美 (Aesthetics)', '说明': '以丰富的美学表现力、视觉品质作为核心衡量标准' },
    { '维度': '创新 (Innovation)', '说明': '考察是否体现全新的设计理念和创新思维模式' },
    { '维度': '设计质量 (Design Quality)', '说明': '综合评估设计的整体完成度、执行水准和专业规范度' }
  ],
  judge_info: '评审分为初审（一次审查）和终审两个阶段。初审评委与终审评委阵容有所区分，且每年动态更新。初审评委负责从全部参赛作品中评选出Best 100；终审评委则从Best 100中评出各级荣誉。评委包括资深设计师、建筑师及企业家，终审环节曾在线直播以确保透明度。名誉评委包括已故名誉会长杉浦康平（Kohei Sugiura）等业界泰斗级人物。',
  judges: [
    { name: '相羽 高德', title: '代表取缔役社长', company: 'AIBA DESIGN' },
    { name: '磯部 光章', title: '代表', company: 'ISOBE DESIGN OFFICE' },
    { name: '馆野 奈穂', title: '代表', company: 'Tateno Design Office' },
    { name: '橋本 夕纪夫', title: '代表', company: 'Hashimoto Yukio Design Institute' },
    { name: '畑 秀明', title: '代表', company: 'Hata Architectural Design Office' },
    { name: '宮坂 なつ子', title: '代表', company: 'Miyasaka Natsuko Design Office' },
    { name: '吉田 怜香', title: '代表', company: 'Yoshida Reika Design Office' },
    { name: '磯崎 健史', title: '代表', company: 'ISOZAKI + NODE' }
  ],
  award_levels: [
    { level: '大奖 (JCD GRAND AWARD)', description: '全场最高荣誉，仅1件获奖作品，奖金500,000日元。代表本年度最具突破性和影响力的空间设计作品。' },
    { level: '金奖 (JCD GOLD AWARD)', description: '共5件获奖作品，每件奖金100,000日元。表彰各领域中具有杰出设计水准的卓越作品。金奖作品中还将选出1-3件授予KUKAN OF THE YEAR特别荣誉。' },
    { level: '银奖 (JCD SILVER AWARD)', description: '共10件获奖作品，表彰在设计创意、执行品质等方面表现优秀的作品。' },
    { level: 'KUKAN OF THE YEAR', description: '从金奖作品中选出1-3件，由日经集团赞助的最高级别特别荣誉，是KUKAN DESIGN AWARD体系中的终极认可。' },
    { level: '评委奖 (Jury\'s Award)', description: '由评审团根据各自专业视角推荐的作品，数量不限。' },
    { level: '新人奖 (Rookie Award)', description: '专门面向新锐设计师设立，鼓励年轻创作者的独立评审通道。' },
    { level: 'Best 100', description: '经一次审查评选出的年度100件优秀作品，制成展板公开展示，并收录于JCD官方年鉴，是进入终审的基础门槛。' }
  ],
  award_stats_2025: '上一届(2025届)吸引来自亚洲各国数千件空间设计作品参与，涵盖9大类别。Best 100作品在东京展出并收录于官方年鉴。KUKAN OF THE YEAR由日经集团赞助，在11月初的特别活动中揭晓。',
  nomination_types: ['专业组 (Professionals)', '学生/新人组 (Rookies)'],
  preliminary_check: '参赛作品通过JCD官网在线系统提交。所有材料需匿名化处理——提交文件中禁止出现设计公司名称等可识别身份信息，视觉材料中的Logo需提前移除或遮挡。组委会进行材料完整性审查。评审分为两阶段：一次审查筛选出Best 100，终审评委团从中评定各级荣誉。',
  requirements: {
    '参赛资格': '面向全球设计师征集作品，不限国籍。2003年起征集范围扩大至整个亚洲，现为国际竞赛。主创负责设计师可同时申请担任评委。',
    '作品要求': '参赛作品须在指定时间区间内完成并仍在运营使用中。具体时限要求请以当年度官方公告为准。',
    '提交规格': '仅接受在线注册报名。提交内容包括：最多5张项目照片（JPG格式）、1张平面图（JPG格式）、设计说明（日文150字符以内或英文100字以内）。可选附加视频辅助资料（额外收费约JPY 33,000）。',
    '匿名化要求': '提交文件中禁止出现设计公司名称、设计师姓名等可识别身份的信息。视觉材料中若含公司Logo需提前处理。',
    '知识产权': '参赛者须确保对参赛作品拥有独立的知识产权及影像版权。因版权问题产生的任何争议由参赛者自行负责。'
  },
  benefits: [
    '奖金：大奖500,000日元，金奖100,000日元（日经集团赞助KUKAN OF THE YEAR另含特别奖励）',
    '全球媒体曝光：获奖作品通过JCD官网、合作媒体及社交平台广泛宣传推广',
    '年鉴收录：入选Best 100的作品制成展板公开展示，并收录于JCD官方年鉴（永久存档）',
    '受邀参加年度颁奖典礼（2026年11月，东京），与全球设计师、评委、行业领袖面对面交流',
    '获授权使用JCD设计大奖/KUKAN DESIGN AWARD获奖标识，用于网站、宣传册、简历等市场材料',
    '亚洲空间设计界的重要标杆认证，显著提升设计师/事务所的国际声誉与公信力',
    '终审环节在线直播保障透明度，获奖过程公开公正，增强获奖背书价值',
    '行业人脉网络：加入JCD协会会员体系，获得更多行业资源和合作机会'
  ],
  website: 'https://www.jcd.or.jp'
};

detailsData.unshift(newDetail);
fs.writeFileSync(detailsPath, JSON.stringify(detailsData, null, 2), 'utf8');
console.log('✅ website/data/award-details.json，总计', detailsData.length, '条');
console.log('\n全部完成！JCD设计大奖(KUKAN DESIGN AWARD)已添加至列表第一位');
