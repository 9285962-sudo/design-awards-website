const fs = require('fs');
const path = require('path');

// ==================== 1. awards.json 列表数据 ====================
const awardsPath = 'C:/Users/Administrator/WorkBuddy/国际设计大奖参赛咨询/website/data/awards.json';
const awards = JSON.parse(fs.readFileSync(awardsPath, 'utf8'));

const idsaAward = {
  award_id: 'idsa奖_美国工业设计师协会奖_2026',
  award_name: 'IDEA奖（国际设计卓越大奖）',
  award_name_cn: 'IDEA奖（国际设计卓越大奖）',
  award_name_en: 'IDEA (International Design Excellence Awards)',
  short_name: 'IDEA',
  category_main: '产品设计',
  category_sub: ['工业设计', '产品设计', '概念设计', '服务设计', '品牌设计', '数字交互'],
  update_time: '2026-04-28',
  organizer: '美国工业设计师协会（IDSA）',
  organizer_cn: '美国工业设计师协会（Industrial Designers Society of America）',
  organizer_type: '行业协会',
  organizer_country: '美国',
  country: '美国',
  city: '弗吉尼亚州赫恩登',
  website: 'https://www.idsa.org',
  award_intro: '美国工业设计师协会（IDSA）的核心奖项，1980年创立，与德国红点奖、iF奖并称"世界三大设计奖"。旨在表彰工业设计及设计战略、品牌塑造、数字交互、环境设计、社会影响等多学科的卓越成就。2026年第46届。',
  award_slogan: 'One of the longest running and most prestigious design awards',
  award_type: '协会奖',
  award_cycle: '年度',
  edition_current: 46,
  prestige_level: '顶级',
  difficulty_level: '高',
  fee_currency: 'USD',
  deadline_early: '2026-02-13',
  deadline_regular: '2026-03-11',
  deadline_final: '2026-05-04',
  fee_early_bird: 415,
  fee_regular: 655,
  fee_student: 145,
  fee_notes: '会员价$415起，非会员$655起；学生$145起',
  timeline: [
    { '阶段': '第一轮标准报名', '时间': '2026-01-05 至 2026-02-13' },
    { '阶段': '第一轮延迟报名', '时间': '2026-02-14 至 2026-03-11' },
    { '阶段': '第一轮入围通知', '时间': '2026年4月13日当周' },
    { '阶段': '第二轮报名（入围作品）', '时间': '2026-04-17 至 2026-05-04' },
    { '阶段': '最终获奖公布', '时间': '2026-06-08' }
  ],
  fee_timeline: [
    { period: 'IDSA会员专业（标准）', price: 415, currency: 'USD' },
    { period: 'IDSA会员专业（延迟）', price: 630, currency: 'USD' },
    { period: 'IDSA会员学生（标准）', price: 145, currency: 'USD' },
    { period: 'IDSA会员学生（延迟）', price: 290, currency: 'USD' },
    { period: '非会员专业（标准）', price: 655, currency: 'USD' },
    { period: '非会员专业（延迟）', price: 895, currency: 'USD' },
    { period: '非会员学生（标准）', price: 145, currency: 'USD' },
    { period: '非会员学生（延迟）', price: 290, currency: 'USD' },
    { period: '第二轮入围会员', price: 575, currency: 'USD' },
    { period: '第二轮入围学生', price: 150, currency: 'USD' },
    { period: '影响力奖附加费', price: 100, currency: 'USD', note: '可选，独立评审' }
  ],
  award_levels: [
    { level: '金奖（Gold）', description: 'IDEA最高荣誉' },
    { level: '银奖（Silver）', description: '卓越设计作品' },
    { level: '铜奖（Bronze）', description: '优秀设计作品' },
    { level: '入围奖（Finalist）', description: '入围第二轮评审的作品' }
  ],
  judging_criteria: [
    { name: '设计创新', description: '设计在创意、体验或制造工艺方面的独特性和新颖性' },
    { name: '用户受益', description: '对用户体验、性能、安全性和易用性的提升' },
    { name: '客户/品牌受益', description: '从商业角度助力业务差异化、品牌增值或市场效益转化' },
    { name: '社会受益', description: '对社会、文化和环境责任的考量，惠及更广泛的社群和生态' },
    { name: '恰当的美学', description: '形式美学与使用场景和功能定位的匹配度' }
  ],
  requirements: {
    '开放对象': '面向全球专业设计师和学生开放',
    '专业组作品时限': '须在2024年3月1日至2026年3月1日之间投入市场或完成交付',
    '学生组作品时限': '须在2024年3月1日至2026年3月1日期间提交给所在学校',
    '概念设计时限': '仅限"概念与推测性设计"类别，须在2024年3月1日至2026年3月1日期间完成',
    '多类别提交': '单个作品可同时提交多个类别，须分别报名缴费；同一作品不可在多个产品类别中获奖',
    '重复参赛': '未获2025年金/银/铜奖且符合标准的作品可于2026年再次提交',
    '身份跨界': '学生可选择在专业组参赛，须按专业组标准缴纳费用',
    '会员优惠': 'IDSA会员享有专属折扣，非会员可申请入会享受同等费率'
  },
  benefits: [
    '职业生涯里程碑：IDEA与红点奖、iF奖并称世界三大设计奖，获奖被公认为职业生涯里程碑',
    '全球媒体曝光：获奖作品通过IDSA官网及全球合作媒体广泛报道',
    '亨利·福特博物馆终审：最终评审在密歇根州亨利·福特博物馆现场进行，获奖作品有机会获博物馆永久收藏',
    '官方年鉴收录：获奖作品收录至官方奖项年鉴及获奖画册',
    '颁奖典礼：受邀参加年度颁奖典礼及交流活动',
    '获奖标识永久使用权：获奖者可终身展示IDEA获奖标识作为设计实力权威背书'
  ],
  categories: [
    { main: '专业组类别', sub: ['汽车与交通', '品牌设计', '儿童产品', '商用与工业产品', '概念与推测性设计（2026新增）', '消费科技', '设计战略', '数字互动', '环境/空间设计', '家居与厨房用品', '家具与灯具', '生活方式与配饰', '医疗与健康', '办公及配件', '户外与园艺', '包装设计', '服务设计', '社会影响设计', '运动与休闲'] },
    { main: '学生组', sub: ['学生项目（Student Projects）'] }
  ],
  notes: '2026年第46届；影响力奖（Impact Award）为2026年新增特别奖项，附加费$100独立评审；2024年共372件获奖（30金/52银/64铜/226入围）',
  special_awards: [
    '影响力奖（Impact Award）——2026年新增，奖金100美元附加费，独立评审社会/环境/文化影响'
  ]
};

// 新增到数组首位
awards.unshift(idsaAward);
fs.writeFileSync(awardsPath, JSON.stringify(awards, null, 2), 'utf8');
console.log('✅ awards.json: 新增IDSA至首位');

// ==================== 2. award-details.json 详情数据 ====================
const detailsPath = 'C:/Users/Administrator/WorkBuddy/国际设计大奖参赛咨询/website/data/award-details.json';
const details = JSON.parse(fs.readFileSync(detailsPath, 'utf8'));

const idsaDetail = {
  award_id: 'idsa奖_美国工业设计师协会奖_2026',
  name: 'IDEA奖（国际设计卓越大奖）',
  name_en: 'IDEA (International Design Excellence Awards)',
  award_intro: '美国工业设计师协会（Industrial Designers Society of America，简称IDSA）的核心奖项——国际设计卓越大奖（International Design Excellence Awards，简称IDEA），1980年创立，是全球现存历史最悠久、最负盛名的设计奖项之一。旨在表彰工业设计及设计战略、品牌塑造、数字交互、环境设计、社会影响等多学科的卓越成就，与德国红点奖（Red Dot）、德国iF奖并称为"世界三大设计奖"。IDSA下设多个奖项分支：IDEA（面向全球专业及学生设计作品）、学生优异奖（Student Merit Awards）、IDSA奖项（IDSA Awards）、以及20/2X表彰计划。斩获IDEA奖被誉为设计师职业生涯的里程碑，获奖作品有机会被全球顶尖博物馆永久收藏。',
  organizer: '美国工业设计师协会（Industrial Designers Society of America, IDSA）',
  organizer_intro: '成立于1965年，是全球历史最悠久、规模最大的工业设计协会之一。IDSA通过教育、社区建设和荣誉表彰持续推动工业设计行业的发展，总部位于弗吉尼亚州赫恩登（Herndon, VA）。IDEA奖设立于1980年，由《商业周刊》（BusinessWeek）联合主办，2004年起正式向全球征集作品。2024年共收到全球数千件参赛作品。',
  organizer_location: '美国 · 弗吉尼亚州赫恩登',
  description: 'IDEA 2026为第46届，核心主题为设计卓越的多学科延伸。2026年新增"概念与推测性设计"类别和"影响力奖"特别奖项。',
  established: '1980年（IDEA）/ 1965年（IDSA）',
  history: 'IDEA奖设立于1980年，由《商业周刊》联合主办。2004年起向全球征集作品，迈出国际化重要一步。2024年共372件获奖（30金/52银/64铜/226入围）。',
  category: [
    '汽车与交通（Automotive & Transportation）',
    '品牌设计（Branding）',
    '儿童产品（Children\'s Products）',
    '商用与工业产品（Commercial & Industrial Products）',
    '概念与推测性设计（Concepts & Speculative Design）——2026年新增',
    '消费科技（Consumer Technology）',
    '设计战略（Design Strategy）',
    '数字互动（Digital Interaction）',
    '环境/空间设计（Environments）',
    '家居与厨房用品（Home）',
    '家具与灯具（Furniture & Lighting）',
    '生活方式与配饰（Lifestyle & Accessories）',
    '医疗与健康（Medical & Health）',
    '办公及配件（Office & Accessories）',
    '户外与园艺（Outdoor & Gardens）',
    '包装设计（Packaging）',
    '服务设计（Service Design）',
    '社会影响设计（Social Impact Design）',
    '运动与休闲（Sports & Recreation）',
    '学生项目（Student Projects）'
  ],
  timeline: [
    { '阶段': '第一轮标准报名', '时间': '2026年1月5日 — 2月13日' },
    { '阶段': '第一轮延迟报名', '时间': '2026年2月14日 — 3月11日' },
    { '阶段': '第一轮入围通知', '时间': '2026年4月13日当周' },
    { '阶段': '第二轮报名（入围作品）', '时间': '2026年4月17日 — 5月4日' },
    { '阶段': '最终获奖公布', '时间': '2026年6月8日' }
  ],
  fee_early_bird: 415,
  fee_regular: 655,
  fee_currency: 'USD',
  fee_timeline: [
    { period: 'IDSA会员——专业（标准，至2月13日）', price: 415, currency: 'USD' },
    { period: 'IDSA会员——专业（延迟，至3月11日）', price: 630, currency: 'USD' },
    { period: 'IDSA会员——学生（标准，至2月13日）', price: 145, currency: 'USD' },
    { period: 'IDSA会员——学生（延迟，至3月11日）', price: 290, currency: 'USD' },
    { period: '非会员——专业（标准，至2月13日）', price: 655, currency: 'USD' },
    { period: '非会员——专业（延迟，至3月11日）', price: 895, currency: 'USD' },
    { period: '非会员——学生（标准，至2月13日）', price: 145, currency: 'USD' },
    { period: '非会员——学生（延迟，至3月11日）', price: 290, currency: 'USD' },
    { period: '第二轮入围——IDSA会员', price: 575, currency: 'USD' },
    { period: '第二轮入围——学生', price: 150, currency: 'USD' },
    { period: '影响力奖附加费（可选）', price: 100, currency: 'USD', note: '独立评审社会/环境/文化影响' }
  ],
  fee_note: '以上均为单件参赛作品费用；影响力奖为可选附加费用，独立于常规评审体系',
  judging_criteria: [
    { '维度': '设计创新', '说明': '设计相较于同类产品在创意、体验或制造工艺方面的独特性和新颖性' },
    { '维度': '用户受益', '说明': '如何提升最终用户的用户体验、性能、安全性和易用性' },
    { '维度': '客户/品牌受益', '说明': '如何从商业角度助力业务差异化、品牌增值或市场效益转化' },
    { '维度': '社会受益', '说明': '如何考量社会、文化和环境责任，惠及更广泛的社群和生态' },
    { '维度': '恰当的美学', '说明': '形式美学是否与使用场景和功能定位相匹配' }
  ],
  judging_note: '评审团约40多位设计专业人士组成，国际化构成。第一轮线上评审，第二轮线下评审于密歇根州亨利·福特博物馆进行，为期4天。评委任期两年。',
  award_levels: [
    { level: '金奖（Gold）', description: 'IDEA最高荣誉，获奖作品有机会被亨利·福特博物馆永久收藏' },
    { level: '银奖（Silver）', description: '卓越设计作品' },
    { level: '铜奖（Bronze）', description: '优秀设计作品' },
    { level: '入围奖（Finalist）', description: '入围第二轮评审的作品' }
  ],
  level_note: '专业组设金奖、银奖、铜奖、入围奖四个等级；学生组统一在"学生项目"类别中角逐',
  special_awards: [
    { name: '影响力奖（Impact Award）', description: '2026年新增特别奖项，附加费$100/作品，独立评审参赛者提交的"影响力陈述"，表彰在社会、环境或文化层面产生深远影响的设计' }
  ],
  requirements: {
    '开放对象': '面向全球专业设计师和学生开放',
    '专业组作品时限': '须在2024年3月1日至2026年3月1日之间投入市场销售或完成交付',
    '学生组作品时限': '须在2024年3月1日至2026年3月1日期间提交给所在学校',
    '概念设计时限': '仅限"概念与推测性设计"类别，须在2024年3月1日至2026年3月1日期间完成/封版',
    '多类别提交': '单个作品可同时提交多个类别，须分别报名并缴纳费用；同一作品不可获颁多个产品类别的奖项',
    '重复参赛': '未在2025年获得金/银/铜奖但符合标准的作品可于2026年再次提交',
    '身份跨界': '学生可选择在专业组参赛，须按专业组标准缴纳报名费',
    '会员优惠': 'IDSA会员享有专属折扣价，非会员可通过官网申请入会并享受同等费率'
  },
  requirements_note: '所有时间以美国东部时间为准',
  benefits: [
    '职业生涯里程碑：IDEA与红点奖、iF奖并称世界三大设计奖，获奖被公认为职业生涯里程碑',
    '全球媒体曝光与推广：获奖作品通过IDSA官网、权威设计媒体及全球合作媒体广泛报道',
    '亨利·福特博物馆终审与收藏：最终评审在密歇根州亨利·福特博物馆现场进行，获奖作品有机会获该博物馆永久收藏',
    '官方展览与年鉴收录：获奖作品收录至官方奖项年鉴及获奖画册，部分作品于国内外展览中展出',
    '颁奖典礼：受邀参加年度颁奖典礼及交流活动，与全球顶尖设计领袖面对面交流',
    '获奖标识永久使用权：获奖者可终身在官网、宣传材料中展示IDEA获奖标识，作为设计实力的权威背书'
  ],
  judges_note: 'IDEA评审团约40多位设计专业人士组成，来自全球行业企业、咨询机构、学界及私人执业领域。第一轮线上评审，第二轮线下评审在亨利·福特博物馆进行（为期4天）。评委任期两年，最多一任。另有IDSA奖项与SMA评审团（每组5名评委）负责荣誉奖及学生优异奖评审。',
  statistics_note: '2024年数据：共30件金奖、52件银奖、64件铜奖、226件入围奖，总计372件产品获奖',
  other_info: 'IDEA最终评审在亨利·福特博物馆（The Henry Ford Museum，密歇根州迪尔伯恩）线下进行。部分金奖作品可获该博物馆永久收藏。IDSA官网：www.idsa.org；IDEA提交平台：idea.secure-platform.com',
  notes: '2026年第46届；新增"概念与推测性设计"类别和"影响力奖"特别奖项'
};

details.unshift(idsaDetail);
fs.writeFileSync(detailsPath, JSON.stringify(details, null, 2), 'utf8');
console.log('✅ award-details.json: 新增IDSA至首位');

// ==================== 3. 完整字段数据文件 ====================
const fullDataPath = 'C:/Users/Administrator/WorkBuddy/国际设计大奖参赛咨询/奖项数据/IDSA_Awards_完整字段数据.json';

const idsaFull = {
  // ===== 基础信息 =====
  award_id: 'idsa奖_美国工业设计师协会奖_2026',
  award_name_cn: 'IDEA奖（国际设计卓越大奖）',
  award_name_en: 'IDEA (International Design Excellence Awards)',
  award_name_short: 'IDEA',
  award_slogan: 'One of the longest running and most prestigious design awards',
  organizer_cn: '美国工业设计师协会（IDSA）',
  organizer_en: 'Industrial Designers Society of America',
  organizer_type: '行业协会',
  country: '美国',
  city: '弗吉尼亚州赫恩登',
  website: 'https://www.idsa.org',
  submission_platform: 'https://idea.secure-platform.com/a',
  contact_email: 'idsa@idsa.org',
  established_year: 1980,
  current_edition: 46,
  award_cycle: '年度',

  // ===== 奖项介绍 =====
  award_intro: '美国工业设计师协会（IDSA）的核心奖项——国际设计卓越大奖（IDEA），1980年创立，与德国红点奖、iF奖并称"世界三大设计奖"。旨在表彰工业设计及设计战略、品牌塑造、数字交互、环境设计、社会影响等多学科的卓越成就。',
  award_intro_full: '美国工业设计师协会（Industrial Designers Society of America，简称IDSA）的奖项体系由多个项目构成，其中最核心的是国际设计卓越大奖（International Design Excellence Awards，简称IDEA）。IDEA由IDSA于1980年创立，是全球现存历史最悠久、最负盛名的设计奖项之一。奖项旨在表彰工业设计及设计战略、品牌塑造、数字交互、环境设计、社会影响等多学科的卓越成就，与德国红点奖（Red Dot）、德国iF奖并称为"世界三大设计奖"。IDSA下设多个奖项分支：IDEA（面向全球专业及学生设计作品）、学生优异奖（Student Merit Awards）、IDSA奖项（IDSA Awards）、以及20/2X表彰计划。斩获IDEA奖被誉为设计师职业生涯的里程碑，获奖作品有机会被全球顶尖博物馆永久收藏。',
  organizer_intro: '成立于1965年，是全球历史最悠久、规模最大的工业设计协会之一。IDSA通过教育、社区建设和荣誉表彰持续推动工业设计行业的发展，总部位于弗吉尼亚州赫恩登（Herndon, VA）。IDEA奖设立于1980年，由《商业周刊》（BusinessWeek）联合主办，IDSA担任评审。2004年起，IDEA正式向全球征集作品，迈出国际化的重要一步。2024年共收到全球数千件参赛作品，最终372件产品获奖。',
  history: '1980年IDEA设立，由《商业周刊》联合主办。2004年起向全球征集作品。2024年共372件获奖（30金/52银/64铜/226入围）。',
  cooperation_collection: 'IDEA获奖作品的最终评审在位于密歇根州迪尔伯恩的亨利·福特博物馆（The Henry Ford Museum）线下进行。部分金奖作品可获该博物馆永久收藏。',

  // ===== 奖项分类 =====
  category_main: '产品设计',
  category_sub: ['工业设计', '产品设计', '概念设计', '服务设计', '品牌设计', '数字交互', '包装设计', '家具与灯具'],
  industry_focus: ['工业设计', '消费电子', '家具', '医疗健康', '汽车交通', '包装', '品牌', '服务设计', '数字交互'],

  // ===== 参赛类别 =====
  categories: [
    { main: '汽车与交通（Automotive & Transportation）', sub: [] },
    { main: '品牌设计（Branding）', sub: [] },
    { main: '儿童产品（Children\'s Products）', sub: [] },
    { main: '商用与工业产品（Commercial & Industrial Products）', sub: [] },
    { main: '概念与推测性设计（Concepts & Speculative Design）', sub: [], note: '2026年新增类别' },
    { main: '消费科技（Consumer Technology）', sub: [] },
    { main: '设计战略（Design Strategy）', sub: [] },
    { main: '数字互动（Digital Interaction）', sub: [] },
    { main: '环境/空间设计（Environments）', sub: [] },
    { main: '家居与厨房用品（Home）', sub: [] },
    { main: '家具与灯具（Furniture & Lighting）', sub: [] },
    { main: '生活方式与配饰（Lifestyle & Accessories）', sub: [] },
    { main: '医疗与健康（Medical & Health）', sub: [] },
    { main: '办公及配件（Office & Accessories）', sub: [] },
    { main: '户外与园艺（Outdoor & Gardens）', sub: [] },
    { main: '包装设计（Packaging）', sub: [] },
    { main: '服务设计（Service Design）', sub: [] },
    { main: '社会影响设计（Social Impact Design）', sub: [] },
    { main: '运动与休闲（Sports & Recreation）', sub: [] },
    { main: '学生项目（Student Projects）', sub: [] }
  ],
  total_categories: 20,

  // ===== 截止日期 =====
  deadline_early: '2026-02-13',
  deadline_regular: '2026-03-11',
  deadline_final: '2026-05-04',
  deadline_extended: '',
  announcement_date: '2026-06-08',
  deadline_note: '所有时间以美国东部时间为准；第一轮入围通知预计2026年4月13日当周；第二轮入围作品须在2026年4月17日—5月4日间提交材料',

  // ===== 参赛费用 =====
  fee_currency: 'USD',
  fee_early_bird: 415,
  fee_regular: 655,
  fee_late: 895,
  fee_final: '',
  fee_extended: '',
  fee_student_early: 145,
  fee_student_regular: 290,
  fee_note: '以上均为单件参赛作品费用；影响力奖（Impact Award）为可选附加费$100，独立评审',
  fee_timeline: [
    { period: 'IDSA会员专业（标准至2/13）', price: 415 },
    { period: 'IDSA会员专业（延迟至3/11）', price: 630 },
    { period: 'IDSA会员学生（标准至2/13）', price: 145 },
    { period: 'IDSA会员学生（延迟至3/11）', price: 290 },
    { period: '非会员专业（标准至2/13）', price: 655 },
    { period: '非会员专业（延迟至3/11）', price: 895 },
    { period: '非会员学生（标准至2/13）', price: 145 },
    { period: '非会员学生（延迟至3/11）', price: 290 },
    { period: '第二轮入围会员', price: 575 },
    { period: '第二轮入围学生', price: 150 },
    { period: '影响力奖附加费（可选）', price: 100 }
  ],

  // ===== 评审标准 =====
  judging_criteria: [
    { name: '设计创新', description: '设计相较于同类产品在创意、体验或制造工艺方面的独特性和新颖性' },
    { name: '用户受益', description: '如何提升最终用户的用户体验、性能、安全性和易用性' },
    { name: '客户/品牌受益', description: '如何从商业角度助力业务差异化、品牌增值或市场效益转化' },
    { name: '社会受益', description: '如何考量社会、文化和环境责任，惠及更广泛的社群和生态' },
    { name: '恰当的美学', description: '形式美学是否与使用场景和功能定位相匹配' }
  ],
  judging_process: '评审团约40多位设计专业人士组成，国际化构成。第一轮线上评审，第二轮线下评审于密歇根州亨利·福特博物馆进行（为期4天）。评委任期两年，最多一任。',
  judges_count: 40,

  // ===== 奖项等级 =====
  award_levels: [
    { level: '金奖（Gold）', description: 'IDEA最高荣誉' },
    { level: '银奖（Silver）', description: '卓越设计作品' },
    { level: '铜奖（Bronze）', description: '优秀设计作品' },
    { level: '入围奖（Finalist）', description: '入围第二轮评审的作品' }
  ],
  special_awards: [
    { name: '影响力奖（Impact Award）', description: '2026年新增，附加费$100，独立评审社会/环境/文化影响' }
  ],

  // ===== 参赛要求 =====
  eligibility: '面向全球专业设计师和学生开放',
  project_year_limit: '2024年3月1日至2026年3月1日',
  project_year_specific: '专业组：作品须在时限内投入市场销售或完成交付；学生组：作品须在时限内提交给所在学校；概念设计类：仅限"概念与推测性设计"类别，须在时限内完成/封版',
  entrant_type: ['专业设计师', '学生', '设计公司', '品牌方'],
  submission_language: '英语',
  team_submission: '支持',
  multi_category: '单个作品可同时提交多个类别，须分别报名缴费；同一作品不可获颁多个产品类别奖项',
  resubmission: '未获2025年金/银/铜奖且符合标准的作品可于2026年再次提交',
  student_cross: '学生可选择在专业组参赛，须按专业组标准缴纳费用',
  member_discount: 'IDSA会员享有专属折扣价，非会员可通过官网申请入会',

  // ===== 获奖权益 =====
  benefits: [
    '职业生涯里程碑：IDEA与红点奖、iF奖并称世界三大设计奖',
    '全球媒体曝光与推广',
    '亨利·福特博物馆终审与收藏机会',
    '官方展览与年鉴收录',
    '年度颁奖典礼',
    '获奖标识永久使用权'
  ],
  recognition_benefits: '获奖被公认为设计师职业生涯的里程碑',

  // ===== 声誉与难度 =====
  prestige_level: '顶级',
  difficulty_level: '高',
  award_type: '协会奖',
  reputation: '与德国红点奖、iF奖并称"世界三大设计奖"',

  // ===== 统计数据 =====
  statistics_2024: { total_winners: 372, gold: 30, silver: 52, bronze: 64, finalist: 226 },
  submission_volume_2024: '数千件',

  // ===== 其他信息 =====
  ceremony_date: '',
  ceremony_location: '',
  media_partners: [],
  notes: '2026年第46届；新增"概念与推测性设计"类别和"影响力奖"特别奖项；数据来源：IDSA官网、百度百科IDEA词条及各参赛报名平台综合采集'
};

fs.writeFileSync(fullDataPath, JSON.stringify(idsaFull, null, 2), 'utf8');
console.log('✅ IDSA_Awards_完整字段数据.json: 覆盖更新完成');

console.log('\n🎉 全部完成！');
