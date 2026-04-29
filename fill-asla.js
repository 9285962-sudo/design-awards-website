const fs = require('fs');
const path = require('path');

// ============================================================
// ASLA Professional Awards & ASLA Student Awards 数据填充脚本
// ============================================================

// ===== 奖项1：ASLA Professional Awards 2026 =====
const proAward = {
  award_id: 'asla_professional_awards_2026',
  award_name_cn: 'ASLA专业奖',
  award_name_en: 'ASLA Professional Awards',
  award_name_short: 'ASLA Pro',
  category_main: '景观设计',
  category_sub: ['景观设计', '建筑设计', '城市设计', '综合设计'],
  country: '美国',
  city: '华盛顿特区',
  website: 'https://www.asla.org/2026cfe/professional-home.html',
  prestige_level: '顶级',
  difficulty_level: '高',
  fee_currency: 'USD',
  fee_regular: 450,
  fee_final: 560,
  submission_open: '2025-11-10',
  deadline_early: '2026-01-09',
  deadline_regular: '2026-01-30',
  deadline_final: '2026-02-06',
  annnouncement_date: '2026-09-01',
  update_time: '2026-04-29'
};

const proWebAward = {
  award_id: 'asla_professional_awards_2026',
  award_name_cn: 'ASLA专业奖',
  award_name_en: 'ASLA Professional Awards',
  award_name: 'ASLA专业奖 (ASLA Professional Awards)',
  short_name: 'ASLA Pro',
  logo_url: '/images/logos/asla-logo.png',
  organizer: 'ASLA (American Society of Landscape Architects)',
  category_main: '景观设计',
  category_sub: ['景观设计', '建筑设计', '城市设计', '综合设计'],
  country: '美国',
  city: '华盛顿特区',
  prestige_level: '顶级',
  difficulty_level: '高',
  fee_regular: 450,
  fee_final: 560,
  fee_currency: 'USD',
  submission_open: '2025-11-10',
  deadline_early: '2026-01-09',
  deadline_regular: '2026-01-30',
  deadline_final: '2026-02-06',
  annnouncement_date: '2026-09-01',
  website: 'https://www.asla.org/2026cfe/professional-home.html',
  update_time: '2026-04-29'
};

const proDetail = {
  award_id: 'asla_professional_awards_2026',
  name: 'ASLA专业奖',
  name_en: 'ASLA Professional Awards',
  award_intro: 'ASLA专业奖（ASLA Professional Awards）是美国景观设计师协会（ASLA）主办的年度国际性设计竞赛，旨在表彰全球范围内最具成就的景观建筑作品，包括已建成项目和规划研究类，是景观建筑行业最具影响力的专业设计奖项之一。奖项历经数十年发展，获奖作品将在《Landscape Architecture Magazine》(LAM)和ASLA年会上获得广泛报道，并收录于美国国会图书馆作为永久行业档案。同期ASLA还设有学生奖（Student Awards）和荣誉奖（ASLA Honors）体系，共同构成景观建筑领域最权威的荣誉评估体系。',
  organizer: 'ASLA (American Society of Landscape Architects，美国景观设计师协会)',
  organizer_intro: 'ASLA成立于1899年，是全球最具影响力的景观建筑专业组织，拥有超过15000名会员，覆盖私营事务所、公共机构、学术领域等全方位景观建筑从业者。ASLA每年举办专业奖和学生奖两大年度竞赛，并设立荣誉奖体系表彰终身成就，其奖项公信力与行业影响力在景观建筑领域首屈一指。ASLA年会（ASLA Conference on Landscape Architecture）是北美规模最大的景观建筑专业盛会。',
  organizer_location: '美国华盛顿特区',
  description: '2026年度ASLA专业奖报名已于2026年2月6日截止。本届赛事设7个核心参赛类别，覆盖综合设计、住宅设计、城市设计、分析与规划、传播、研究及地标奖，采用卓越奖(Award of Excellence)和荣誉奖(Honor Award)两级荣誉体系。评审分两个独立评审组进行，综合设计/住宅/城市设计/地标奖为一组，其余类别为另一组。获奖名单将于2026年9月ASLA年会期间公布，获奖作品将在LAM杂志、官网荣誉画廊永久展示，并收录于国会图书馆。',
  established: '约1970年代（专业奖历经数十年发展）',
  history: 'ASLA专业奖作为美国景观设计师协会的核心年度奖项，历经数十年发展，已成为全球景观建筑行业最具权威性和影响力的专业设计竞赛之一。奖项早期以美国本土项目为主，随着ASLA国际化进程推进，逐步发展为真正的全球性赛事，每年吸引来自全球各国景观建筑师和事务所的杰出作品参与角逐。ASLA同时运营学生奖（Student Awards）和荣誉奖（Honors）体系，荣誉奖由ASLA理事会遴选，表彰对行业有深远影响的个人终身成就，是ASLA每年颁发的最高荣誉。专业奖获奖作品除在年会荣誉典礼上接受表彰外，还将被收录于美国国会图书馆作为永久行业档案，具有极高的学术和历史价值。',
  category: [
    'General Design（综合设计）：已建成的建成环境项目，最具代表性的核心类别',
    'Residential Design（住宅设计）：已建成的住宅及居住区景观项目',
    'Urban Design（城市设计）：已建成的城市尺度规划与建成项目',
    'Analysis & Planning（分析与规划）：以研究/分析/规划为基础的非建成类项目',
    'Communications（传播）：促进公众对景观建筑理解和交流的媒介作品（含书籍、网站、纪录片、展览等）',
    'Research（研究）：以学术研究为主体的景观建筑方法论成果',
    'Landmark Award（地标奖）：对景观建筑领域有突出意义的已建成作品，接受双组评审'
  ],
  timeline: [
    { '阶段': '早鸟注册截止', '时间': '2026年1月9日' },
    { '阶段': '标准注册截止', '时间': '2026年1月30日' },
    { '阶段': '延期注册与材料提交截止', '时间': '2026年2月6日 11:59pm PST' },
    { '阶段': '获奖名单公布', '时间': '2026年9月（ASLA年会期间）' },
    { '阶段': '颁奖典礼', '时间': '2026年ASLA景观建筑年会' }
  ],
  fee_timeline: [
    { period: '早鸟价', price: 400, currency: 'USD', date: '2026-01-09前', note: 'ASLA会员价' },
    { period: '标准价', price: 450, currency: 'USD', date: '2026-01-30前', note: 'ASLA会员价' },
    { period: '延期价', price: 560, currency: 'USD', date: '2026-02-06前', note: 'ASLA会员价' },
    { period: '同类别第二个项目', price: null, currency: 'USD', date: '全时段', note: '享当季价格25%折扣' },
    { period: 'Landmark Award（独立）', price: 125, currency: 'USD', date: '全时段', note: '地标奖独立定价' }
  ],
  fee_note: '以上费用为ASLA会员价。参赛者须为ASLA正式会员、准会员或国际会员，或具备ASLA入会资格。同类别提交第二个项目可享当季价格25%折扣，第三及后续项目按100%全额收费。Landmark Award独立定价$125/项。',
  judging_criteria: [
    { '维度': '设计质量', '说明': '评估作品在设计理念、空间组织、材料运用和美学表达等方面的综合设计水准' },
    { '维度': '创新性', '说明': '考察作品在设计方法、技术手段或解决问题的路径上是否具备原创性和前瞻性' },
    { '维度': '可衡量的影响力', '说明': '评估项目如何对社会、生态系统和公共空间产生实际、可验证的积极影响和长远公共价值' },
    { '维度': '场所与语境回应', '说明': '考察设计对场地特征、历史文化背景及周围环境的深刻理解与恰当回应' },
    { '维度': '环境与可持续性', '说明': '关注项目在生态保护、资源管理、气候适应等环境层面的贡献与责任' }
  ],
  judge_info: '专业奖设两个独立评审组，实行分轨制独立评审。综合设计/住宅设计/城市设计/地标奖组评审主席为Adam Greenspan, FASLA（PWP Landscape Architects，伯克利）。分析与规划/全球影响奖/研究/传播/地标奖组评审主席为Sierra Bainbridge, ASLA（MASS Design Group，波士顿）。评委甄选强调来自多元专业背景，涵盖私营、公共、学术等多个领域，注重地域、性别及族裔的多元均衡。Landmark Award接受双组联合评审。',
  judges: [
    { name: 'Adam Greenspan', title: '联合创始人 & 评审主席', company: 'PWP Landscape Architecture' },
    { name: 'Sierra Bainbridge', title: '首席景观建筑师 & 评审主席', company: 'MASS Design Group' },
    { name: 'Mami Hanaue', title: 'Principal', company: 'SWA Group' },
    { name: 'Gina Ford', title: 'Principal & Co-Founder', company: 'Agency Landscape + Planning' },
    { name: 'Walter Hood', title: 'Founder & Creative Director', company: 'Hood Design Studio' },
    { name: 'Kate Orff', title: 'Founder & Principal', company: 'SCAPE Landscape Architecture' },
    { name: 'Pamela Conrad', title: 'Principal', company: 'James Corner Field Operations' },
    { name: 'Cheng Chen', title: 'Associate Principal', company: 'Sasaki Associates' }
  ],
  award_levels: [
    { level: '卓越奖 (Award of Excellence)', description: '类别最高荣誉，表彰对景观建筑贡献最重大的作品。每个评审组中各主要类别仅评出1名卓越奖获得者，是该类别的最高认可。' },
    { level: '荣誉奖 (Honor Award)', description: '同等次奖项，各评审组可颁出若干名。表彰在专业实践、设计品质和创新能力等方面表现杰出的已建成或研究类作品。' }
  ],
  award_stats_2025: '2025届ASLA专业奖吸引来自全球数百件参赛作品，涵盖7大类别。获奖作品在2025年ASLA年会期间公布并接受表彰，并在《Landscape Architecture Magazine》专栏报道。',
  nomination_types: ['专业组 (Professionals)'],
  preliminary_check: '所有参赛作品通过ASLA官方在线提交系统（CFE系统）完成注册和材料上传。参赛者须为ASLA会员（正式会员、准会员或国际会员）或具备入会资格。材料提交后由组委会进行完整性审查。评审过程采用盲审机制，设计作品匿名提交以确保公正性。除Analysis & Planning、Communications、Research等非落地类外，其他类别均要求提供实景照片和真实的成果记录。',
  requirements: {
    '参赛资格': '面向全球景观建筑师及从业者开放。参赛者须为ASLA正式会员、准会员或国际会员，或具备ASLA入会资格。',
    '作品要求': '接受已建成项目和规划研究类作品。除Analysis & Planning、Communications、Research、Global Impact Award等非落地类外，其他类别均要求已真实建成的项目并附实景照片。',
    '提交规格': '需通过ASLA官方CFE在线系统提交，包括项目描述、高清图片（JPEG格式，分辨率不低于300dpi）、图纸、分析图表等支撑材料。具体数量和格式要求以当年度CFE指南为准。',
    '会员要求': '参赛者必须在报名时使用有效的ASLA会员ID登录系统。非会员可在报名时同时申请入会。',
    '知识产权': '参赛者须确保对参赛作品拥有独立的知识产权。因版权问题产生的任何争议由参赛者自行负责。'
  },
  benefits: [
    '在ASLA景观建筑年会荣誉典礼上接受表彰，获得行业最高规格认可',
    '获奖作品在《Landscape Architecture Magazine》(LAM) 获奖栏目专题报道',
    '获奖作品收录于ASLA官网荣誉画廊，作为永久行业档案展示',
    '获奖作品收录于美国国会图书馆 (Library of Congress)，具有永久学术和历史价值',
    '获得ASLA官方认证获奖标识 (Winner Seal)，可用于官网、宣传册、作品集等市场材料',
    '获奖事务所/个人获得行业公信力与全行业认可的最佳背书，显著提升商业竞争力',
    '获奖作品在ASLA合作伙伴平台及行业媒体上获得广泛PR曝光',
    '受邀参加ASLA年会专属交流活动，与全球顶尖景观建筑师建立人脉网络'
  ],
  website: 'https://www.asla.org/2026cfe/professional-home.html'
};

// ===== 奖项2：ASLA Student Awards 2026 =====
const stuAward = {
  award_id: 'asla_student_awards_2026',
  award_name_cn: 'ASLA学生奖',
  award_name_en: 'ASLA Student Awards',
  award_name_short: 'ASLA Student',
  category_main: '景观设计',
  category_sub: ['景观设计', '建筑设计', '城市设计', '综合设计'],
  country: '美国',
  city: '华盛顿特区',
  website: 'https://www.asla.org/2026cfe/student-home.html',
  prestige_level: '顶级',
  difficulty_level: '中',
  fee_currency: 'USD',
  fee_regular: 80,
  fee_final: 80,
  submission_open: '2025-11-10',
  deadline_early: '2026-04-24',
  deadline_regular: '2026-05-01',
  deadline_final: '2026-05-08',
  annnouncement_date: '2026-09-01',
  update_time: '2026-04-29'
};

const stuWebAward = {
  award_id: 'asla_student_awards_2026',
  award_name_cn: 'ASLA学生奖',
  award_name_en: 'ASLA Student Awards',
  award_name: 'ASLA学生奖 (ASLA Student Awards)',
  short_name: 'ASLA Student',
  logo_url: '/images/logos/asla-logo.png',
  organizer: 'ASLA (American Society of Landscape Architects)',
  category_main: '景观设计',
  category_sub: ['景观设计', '建筑设计', '城市设计', '综合设计'],
  country: '美国',
  city: '华盛顿特区',
  prestige_level: '顶级',
  difficulty_level: '中',
  fee_regular: 80,
  fee_final: 80,
  fee_currency: 'USD',
  submission_open: '2025-11-10',
  deadline_early: '2026-04-24',
  deadline_regular: '2026-05-01',
  deadline_final: '2026-05-08',
  annnouncement_date: '2026-09-01',
  website: 'https://www.asla.org/2026cfe/student-home.html',
  update_time: '2026-04-29'
};

const stuDetail = {
  award_id: 'asla_student_awards_2026',
  name: 'ASLA学生奖',
  name_en: 'ASLA Student Awards',
  award_intro: 'ASLA学生奖（ASLA Student Awards）是美国景观设计师协会（ASLA）主办的年度国际性学生设计竞赛，旨在发掘全球景观建筑学生最具创造力的卓越作品，是景观建筑领域最具权威性的学生设计奖项。获奖作品涵盖设计、研究、分析及规划多领域的创意和方法学价值，获奖学生及其指导教师将受邀参加ASLA年会，优秀奖及卓越奖获得者将获年会免费注册资格。同期ASLA还设有专业奖（Professional Awards）和荣誉奖（ASLA Honors）体系，共同构成景观建筑领域最权威的荣誉评估体系。',
  organizer: 'ASLA (American Society of Landscape Architects，美国景观设计师协会)',
  organizer_intro: 'ASLA成立于1899年，是全球最具影响力的景观建筑专业组织，拥有超过15000名会员。ASLA学生奖每年吸引来自全球各高校景观建筑（及部分交叉学科）学生参与，获奖作品将在《Landscape Architecture Magazine》(LAM)和ASLA年会上获得报道，并收录于ASLA官网荣誉画廊。ASLA为学生会员提供免费注册资格，合格学生可在报名时完成免费的学生会员注册。',
  organizer_location: '美国华盛顿特区',
  description: '2026年度ASLA学生奖注册截止日期已延期至2026年5月1日，提交截止日期延期至2026年5月8日（均截止于11:59pm PST）。本届赛事设8个核心参赛类别，包括综合设计、住宅设计、城市设计、分析与规划、传播、研究、社区服务及跨学科协作。因响应教育工作者的广泛反馈，主办方将注册与提交截止日双双向后调整，以更好适应各高校课程安排。评审分两个独立评审组进行。获奖名单将于2026年9月ASLA年会期间公布，获奖学生将受邀参加2026年9月16—18日在费城举行的ASLA景观建筑年会。',
  established: '约1970年代（学生奖与专业奖同期发展）',
  history: 'ASLA学生奖作为美国景观设计师协会的年度学生设计竞赛，历经数十年发展，已成为全球景观建筑领域最具权威性和影响力的学生设计奖项。奖项旨在发掘全球高校景观建筑学生的卓越创造力和方法论价值，接受课程作业、毕业设计、工作坊作品或独立研究等多种形式的参赛作品。ASLA学生会员资格对全球所有高校的合格学生开放，无额外年费，报名费一经提交不可退还。学生奖与专业奖共享相同的卓越奖(Award of Excellence)和荣誉奖(Honor Award)两级荣誉体系，获奖学生将获得与行业顶尖专业人士同台展示的机会，对职业生涯起步具有极高价值。',
  category: [
    'General Design（综合设计）：设计导向型项目，涵盖多种建成环境类型',
    'Residential Design（住宅设计）：住宅及居住类景观设计项目',
    'Urban Design（城市设计）：城市尺度景观建筑设计',
    'Analysis & Planning（分析与规划）：分析与规划类研究项目',
    'Communications（传播）：传播媒介类（书籍、网站、纪录片、展览等）',
    'Research（研究）：学术研究类项目',
    'Student Community Service（学生社区服务）：由学生个人或团队在社区中完成的公益类项目',
    'Student Collaboration（学生跨学科协作）：多学科团队合作项目，允许工程、规划、设计等不同学科学生参与'
  ],
  timeline: [
    { '阶段': '原注册截止', '时间': '2026年4月24日' },
    { '阶段': '延期后注册截止', '时间': '2026年5月1日 11:59pm PST' },
    { '阶段': '延期后提交截止', '时间': '2026年5月8日 11:59pm PST' },
    { '阶段': '获奖名单公布', '时间': '2026年9月（ASLA年会期间）' },
    { '阶段': '颁奖典礼 & 年会', '时间': '2026年9月16—18日（美国费城）' }
  ],
  fee_timeline: [
    { period: 'ASLA学生会员/助理会员', price: 80, currency: 'USD', date: '2026-05-08前', note: '每项目费用，无折扣' },
    { period: '非ASLA学生（报名时入会）', price: 80, currency: 'USD', date: '2026-05-08前', note: '合格学生可免费注册会员后按会员价提交' },
    { period: '多项目提交', price: 80, currency: 'USD', date: '2026-05-08前', note: '每件$80，无折扣；学生类别提交数量不设上限' }
  ],
  fee_note: 'ASLA学生会员资格对全球所有高校的合格学生开放，无额外年费，报名时可直接注册。非会员学生在报名时完成免费学生会员注册后即可按会员价$80/项提交。报名费一经提交不可退还。学生可提交任意数量的类别和项目，无上限。',
  judging_criteria: [
    { '维度': '设计概念逻辑', '说明': '评估作品是否展现出清晰的设计概念和逻辑推演过程' },
    { '维度': '场所与语境回应', '说明': '考察设计对场地特征、历史文化背景及周围环境的深刻理解与恰当回应' },
    { '维度': '表达力与专业水准', '说明': '评估作品在图纸表达、排版设计和专业原则的驾驭力方面的综合表现' },
    { '维度': '跨界思考与社会责任', '说明': '关注设计是否体现跨界思维、社会责任感以及对公共利益的关怀' },
    { '维度': '方法论与创新性', '说明': '考察研究方法或设计策略是否具备创新性和学术/实践价值' }
  ],
  judge_info: '学生奖设两个独立评审组，实行分轨制独立评审。综合设计/住宅设计/城市设计/跨学科协作组评审主席为Ebru Ozer, FASLA（Florida International University）。分析与规划/传播/研究/社区服务组评审主席为Nina Chase, ASLA（Merritt Chase）。评委来自全美各景观院校及设计公司，多人同时活跃于专业实践与学术领域，注重地域、性别及族裔的多元均衡。',
  judges: [
    { name: 'Ebru Ozer', title: 'Professor & 评审主席 (FASLA)', company: 'Florida International University' },
    { name: 'Nina Chase', title: 'Principal & 评审主席 (ASLA)', company: 'Merritt Chase' },
    { name: 'Alison Hirsch', title: 'Associate Professor', company: 'University of Southern California' },
    { name: 'Rachel Slocum', title: 'Associate Professor', company: 'University of Minnesota' },
    { name: 'Forster Ndubisi', title: 'Professor & Head', company: 'Texas A&M University' },
    { name: 'Kofi Boone', title: 'Professor', company: 'North Carolina State University' },
    { name: 'Laura Solano', title: 'Principal', company: 'Michael Van Valkenburgh Associates' },
    { name: 'Tom Balsley', title: 'Founder', company: 'SWA/Balsley' }
  ],
  award_levels: [
    { level: '卓越奖 (Award of Excellence)', description: '学生奖最高荣誉，各评审组中各主要类别仅评出1名卓越奖获得者。获奖学生将获ASLA年会免费注册资格，并受邀在年会荣誉典礼上接受表彰。' },
    { level: '荣誉奖 (Honor Award)', description: '同等次奖项，各评审组可颁出若干名。表彰在学生设计、研究、分析及规划领域表现杰出的创意作品。获奖学生同样可获得ASLA年会免费注册资格。' }
  ],
  award_stats_2025: '2025届ASLA学生奖吸引来自全球各高校数千件学生作品参与，涵盖8大类别。获奖学生在2025年ASLA年会期间公布并接受表彰，获奖作品在《Landscape Architecture Magazine》专栏报道。',
  nomination_types: ['学生组 (Students)'],
  preliminary_check: '所有参赛作品通过ASLA官方在线提交系统（CFE系统）完成注册和材料上传。参赛者须为ASLA学生会员、学生助理会员、国际学生会员或第一年准会员。合格学生可在报名时完成免费的学生会员注册。学生提交的类别数量不设上限。材料提交后由组委会进行完整性审查，评审过程采用盲审机制。',
  requirements: {
    '参赛资格': '面向全球高校全日制景观建筑（及部分交叉学科）学生开放，不限国籍。参赛者须为ASLA学生会员、学生助理会员、国际学生会员或第一年准会员。合格学生可在报名时完成免费的学生会员注册。',
    '作品要求': '可接受课程作业、毕业设计、工作坊作品或独立研究。之前已完成的学期/毕业作品同样被允许参评。无作品完成年限限制。',
    '提交规格': '需通过ASLA官方CFE在线系统提交，包括项目描述、高清图片、图纸、分析图表等支撑材料。具体数量和格式要求以当年度CFE指南为准。学生可提交任意数量的类别和项目，无上限。',
    '会员要求': '参赛者须为ASLA学生会员或合格学生（可在报名时免费注册）。报名费一经提交不可退还。',
    '知识产权': '参赛者须确保对参赛作品拥有独立的知识产权。因版权问题产生的任何争议由参赛者自行负责。'
  },
  benefits: [
    '获奖学生将获邀参加2026年9月16—18日在费城举行的ASLA景观建筑年会',
    '优秀奖及卓越奖获得者将获ASLA年会免费注册资格',
    '获奖作品在《Landscape Architecture Magazine》(LAM) 获奖栏目专题报道',
    '获奖作品收录于ASLA官网荣誉画廊，作为学生作品永久展示平台',
    '获得ASLA官方认证获奖标识，可用于作品集、简历、求职材料等',
    '获奖学生及其指导教师同在荣誉典礼上接受表彰，提升学术声誉和就业竞争力',
    '与全球顶尖景观建筑师建立人脉网络，获得职业发展机会',
    '获奖作品有机会被收录于美国国会图书馆作为行业档案'
  ],
  website: 'https://www.asla.org/2026cfe/student-home.html'
};

// ============================================================
// 写入三个JSON文件
// ============================================================

// 1. data/awards.json
const awardsPath = path.join(__dirname, 'data/awards.json');
let awardsData = JSON.parse(fs.readFileSync(awardsPath, 'utf8'));
awardsData = awardsData.filter(a => a.award_id !== 'asla_professional_awards_2026' && a.award_id !== 'asla_student_awards_2026');
awardsData.unshift(stuAward);  // 学生奖排第一（仍可报名）
awardsData.unshift(proAward);  // 专业奖排第二
fs.writeFileSync(awardsPath, JSON.stringify(awardsData, null, 2), 'utf8');
console.log('✅ data/awards.json，总计', awardsData.length, '条');

// 2. website/data/awards.json
const webAwardsPath = path.join(__dirname, 'website/data/awards.json');
let webAwardsData = JSON.parse(fs.readFileSync(webAwardsPath, 'utf8'));
webAwardsData = webAwardsData.filter(a => a.award_id !== 'asla_professional_awards_2026' && a.award_id !== 'asla_student_awards_2026');
webAwardsData.unshift(stuWebAward);
webAwardsData.unshift(proWebAward);
fs.writeFileSync(webAwardsPath, JSON.stringify(webAwardsData, null, 2), 'utf8');
console.log('✅ website/data/awards.json，总计', webAwardsData.length, '条');

// 3. website/data/award-details.json
const detailsPath = path.join(__dirname, 'website/data/award-details.json');
let detailsData = JSON.parse(fs.readFileSync(detailsPath, 'utf8'));
detailsData = detailsData.filter(a => a.award_id !== 'asla_professional_awards_2026' && a.award_id !== 'asla_student_awards_2026');
detailsData.unshift(stuDetail);
detailsData.unshift(proDetail);
fs.writeFileSync(detailsPath, JSON.stringify(detailsData, null, 2), 'utf8');
console.log('✅ website/data/award-details.json，总计', detailsData.length, '条');

console.log('\n全部完成！student奖排第一位（仍可报名），professional奖排第二位');
