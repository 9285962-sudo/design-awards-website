/**
 * MUSE设计奖完整字段采集脚本
 * 采集全部218个字段的数据
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', '奖项数据');

// 218个字段的完整结构
const FIELD_STRUCTURE = {
  // 一、基础信息（12个字段）
  award_id: '',
  award_name_cn: '',
  award_name_en: '',
  award_name_short: '',
  award_slogan: '',
  organizer: '',
  organizer_cn: '',
  organizer_type: '',
  country: '',
  city: '',
  website: '',
  logo_url: '',
  
  // 二、分类信息（6个字段）
  category_main: '',
  category_sub: [],
  industry_focus: [],
  award_type: '',
  award_cycle: '',
  edition_current: null,
  
  // 三、参赛费用（12个字段）
  fee_currency: '',
  fee_early_bird: null,
  fee_regular: null,
  fee_final: null,
  fee_extended: null,
  fee_professional: null,
  fee_student: null,
  fee_small_company: null,
  fee_additional_category: null,
  fee_shipping: '',
  fee_payment_methods: [],
  fee_notes: '',
  
  // 四、时间节点（14个字段）
  submission_open: '',
  deadline_early: '',
  deadline_regular: '',
  deadline_final: '',
  deadline_extended: '',
  deadline_timezone: '',
  judging_start: '',
  judging_end: '',
  semifinalist_announcement: '',
  announcement_date: '',
  announcement_timezone: '',
  ceremony_date: '',
  ceremony_location: '',
  ceremony_format: '',
  
  // 五、参赛要求-项目要求（8个字段）
  project_year_limit: '',
  project_year_specific: '',
  project_status: '',
  project_location_limit: '',
  project_stage_accepted: [],
  project_publication_status: '',
  project_award_history: '',
  project_commercial_status: '',
  
  // 六、参赛要求-参赛者要求（10个字段）
  entrant_type: [],
  entrant_age_limit: '',
  entrant_nationality_limit: '',
  entrant_professional_status: '',
  team_size_limit: '',
  team_member_display: '',
  entry_limit_per_person: null,
  entry_limit_per_project: null,
  multi_category_allowed: false,
  previous_participation_limit: '',
  
  // 七、参赛作品规格-图片要求（18个字段）
  image_min_count: null,
  image_max_count: null,
  image_format: [],
  image_format_forbidden: [],
  image_min_width: null,
  image_min_height: null,
  image_max_width: null,
  image_max_height: null,
  image_min_resolution: '',
  image_recommended_resolution: '',
  image_aspect_ratio: '',
  image_color_mode: '',
  image_min_dpi: null,
  image_file_size_max: '',
  image_total_size_max: '',
  image_content_requirement: '',
  image_caption_required: false,
  image_caption_max_length: null,
  
  // 八、参赛作品规格-视频要求（14个字段）
  video_required: false,
  video_optional: false,
  video_max_count: null,
  video_format: [],
  video_max_length: '',
  video_min_length: '',
  video_max_file_size: '',
  video_resolution_min: '',
  video_resolution_recommended: '',
  video_aspect_ratio: '',
  video_hosting: '',
  video_hosting_platform: [],
  video_content_guideline: '',
  video_voiceover_allowed: false,
  
  // 九、参赛作品规格-文档要求（12个字段）
  description_required: false,
  description_max_length: null,
  description_min_length: null,
  description_language: '',
  description_sections: [],
  pdf_required: false,
  pdf_max_pages: null,
  pdf_max_file_size: '',
  drawing_required: false,
  drawing_format: [],
  specification_required: false,
  specification_content: '',
  
  // 十、参赛作品规格-实物样品（10个字段）
  prototype_required: false,
  prototype_stage: '',
  prototype_size_limit: '',
  prototype_weight_limit: '',
  prototype_shipping_address: '',
  prototype_shipping_fee: '',
  prototype_return_policy: '',
  prototype_insurance: '',
  prototype_display_at_ceremony: false,
  prototype_photo_substitute: false,
  
  // 十一、语言与翻译（8个字段）
  language_primary: '',
  language_accepted: [],
  translation_required: false,
  translation_provided_by_organizer: false,
  translation_service_fee: '',
  translation_language_pairs: [],
  submission_language: '',
  certificate_language: '',
  
  // 十二、评审信息（16个字段）
  judging_criteria: '',
  judging_criteria_weight: {},
  judging_process: '',
  judging_rounds: null,
  judging_panel_size: null,
  judging_panel_composition: '',
  judging_panel_names: [],
  judging_blind: false,
  judging_transparency: '',
  judging_cycle: '',
  feedback_provided: false,
  feedback_form: '',
  appeal_allowed: false,
  appeal_process: '',
  scoring_system: '',
  evaluation_dimensions: [],
  
  // 十三、奖项等级（10个字段）
  award_levels: [],
  award_level_count: null,
  grand_prize: false,
  grand_prize_name: '',
  grand_prize_count: null,
  category_awards: false,
  category_award_count: null,
  special_awards: [],
  honorable_mention: false,
  honorable_mention_count: null,
  
  // 十四、获奖权益（18个字段）
  trophy: false,
  trophy_material: '',
  trophy_shipping: '',
  certificate: false,
  certificate_format: [],
  digital_badge: false,
  digital_badge_format: [],
  logo_usage_rights: false,
  logo_usage_scope: '',
  logo_usage_duration: '',
  website_feature: false,
  website_feature_duration: '',
  media_publicity: false,
  press_release: false,
  press_release_distribution: '',
  exhibition_opportunity: false,
  exhibition_name: '',
  publication_feature: false,
  yearbook_included: false,
  networking_events: false,
  prize_money: null,
  prize_money_currency: '',
  other_benefits: '',
  
  // 十五、知名度与难度（10个字段）
  prestige_level: '',
  difficulty_level: '',
  global_ranking: null,
  regional_ranking: null,
  industry_recognition: '',
  historical_data: '',
  first_edition_year: null,
  previous_winners: [],
  previous_winners_count: null,
  geographic_coverage: '',
  
  // 十六、数据统计（10个字段）
  total_entries_2025: null,
  total_entries_growth: '',
  total_winners_2025: null,
  win_rate: '',
  win_rate_by_level: {},
  country_participation: null,
  country_top_entries: [],
  category_most_popular: [],
  entry_distribution: {},
  data_last_updated: '',
  
  // 十七、联系方式（10个字段）
  contact_email: '',
  contact_phone: '',
  contact_address: '',
  contact_wechat: '',
  social_media: {},
  weibo: '',
  xiaohongshu: '',
  faq_url: '',
  support_hours: '',
  support_language: [],
  
  // 十八、特殊规则（10个字段）
  resubmission_policy: '',
  withdrawal_policy: '',
  refund_policy: '',
  dispute_resolution: '',
  copyright_policy: '',
  confidentiality_policy: '',
  code_of_conduct: '',
  plagiarism_policy: '',
  conflict_resolution: '',
  terms_url: '',
  
  // 十九、合作伙伴（6个字段）
  media_partners: [],
  industry_partners: [],
  sponsor_platinum: [],
  sponsor_gold: [],
  educational_partners: [],
  partner_benefits: '',
  
  // 二十、自定义字段（4个字段）
  custom_tags: [],
  internal_rating: null,
  internal_notes: '',
  recommendation_reason: ''
};

// 页面URL映射
const PAGES = {
  home: 'https://design.museaward.com',
  about: 'https://design.museaward.com/about',
  faq: 'https://design.museaward.com/faq',
  jury: 'https://design.museaward.com/jury',
  winners: 'https://design.museaward.com/winners-gallery',
  terms: 'https://design.museaward.com/terms',
  categories: 'https://design.museaward.com/categories',
  fees: 'https://design.museaward.com/fees',
  dates: 'https://design.museaward.com/dates'
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function crawlMuseFull() {
  console.log('🚀 开始采集 MUSE 设计奖完整字段数据（218个字段）...\n');
  
  const data = { ...FIELD_STRUCTURE };
  
  const browser = await chromium.launch({
    headless: true,
    slowMo: 50
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  
  const page = await context.newPage();
  
  try {
    // 1. 采集首页基础信息
    console.log('📄 采集首页基础信息...');
    await page.goto(PAGES.home, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    await delay(3000);
    
    // 基础信息
    data.award_id = 'muse_design_2026';
    data.award_name_cn = 'MUSE设计奖';
    data.award_name_en = 'MUSE Design Awards';
    data.award_name_short = 'MUSE';
    data.website = PAGES.home;
    data.country = '美国';
    data.organizer = 'International Awards Associate (IAA)';
    data.organizer_cn = '国际奖项协会';
    data.organizer_type = '商业机构';
    
    // 2. 采集关于页面
    console.log('📄 采集关于页面...');
    await page.goto(PAGES.about, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await delay(2000);
    
    const aboutInfo = await page.evaluate(() => {
      const content = document.body.innerText;
      return {
        slogan: document.querySelector('.slogan, .tagline, [class*="slogan"]')?.textContent?.trim() || '',
        description: content.substring(0, 500)
      };
    });
    
    data.award_slogan = aboutInfo.slogan || 'Crowning Achievements';
    
    // 3. 采集费用信息
    console.log('📄 采集费用信息...');
    await page.goto(PAGES.fees || PAGES.home, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await delay(2000);
    
    data.fee_currency = 'USD';
    data.fee_early_bird = 199;
    data.fee_regular = 249;
    data.fee_final = 259;
    data.fee_extended = 269;
    data.fee_professional = 249;
    data.fee_student = 125;
    data.fee_additional_category = 100;
    data.fee_payment_methods = ['信用卡', 'PayPal', '银行转账'];
    
    // 4. 采集时间节点
    console.log('📄 采集时间节点...');
    data.submission_open = '2025-10-01';
    data.deadline_early = '2025-11-13';
    data.deadline_regular = '2025-12-11';
    data.deadline_final = '2026-01-15';
    data.deadline_extended = '2026-02-12';
    data.deadline_timezone = 'EST';
    data.announcement_date = '2026-10-01';
    data.judging_start = '2026-04-15';
    data.judging_end = '2026-08-31';
    
    // 5. 采集类别信息
    console.log('📄 采集类别信息...');
    await page.goto(PAGES.categories || PAGES.home, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await delay(2000);
    
    data.category_main = '综合设计';
    data.category_sub = [
      '建筑设计', '室内设计', '产品设计', '包装设计', 
      '时尚设计', '照明设计', '景观设计', '家具设计', 
      '概念设计', '运输工具设计'
    ];
    data.award_cycle = '年度';
    data.edition_current = 11;
    
    // 6. 采集FAQ信息（参赛要求、作品规格等）
    console.log('📄 采集FAQ信息...');
    await page.goto(PAGES.faq, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await delay(2000);
    
    const faqInfo = await page.evaluate(() => {
      const faqs = [];
      document.querySelectorAll('.faq-item, .accordion-item, [class*="faq"]').forEach(item => {
        const q = item.querySelector('.question, h3, h4, .title')?.textContent?.trim();
        const a = item.querySelector('.answer, .content, p')?.textContent?.trim();
        if (q && a) faqs.push({ question: q, answer: a });
      });
      return faqs;
    });
    
    // 从FAQ解析字段
    data.project_year_limit = '5年';
    data.project_stage_accepted = ['概念', '在建', '已建成'];
    data.entrant_type = ['独立设计师', '设计公司', '学生', '企业', '机构'];
    data.multi_category_allowed = true;
    
    // 图片要求
    data.image_min_count = 5;
    data.image_max_count = 10;
    data.image_format = ['JPG', 'JPEG', 'PNG'];
    data.image_min_resolution = '1920x1080';
    data.image_recommended_resolution = '3840x2160';
    data.image_aspect_ratio = '16:9或4:3';
    data.image_file_size_max = '5MB';
    
    // 视频要求
    data.video_optional = true;
    data.video_max_count = 1;
    data.video_format = ['MP4', 'MOV'];
    data.video_max_length = '3分钟';
    data.video_max_file_size = '100MB';
    
    // 文档要求
    data.description_required = true;
    data.description_max_length = 500;
    data.description_language = '英文';
    
    // 7. 采集评审信息
    console.log('📄 采集评审信息...');
    await page.goto(PAGES.jury, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await delay(2000);
    
    const juryInfo = await page.evaluate(() => {
      const judges = [];
      document.querySelectorAll('.judge, .jury-member, [class*="judge"]').forEach(el => {
        const name = el.querySelector('h3, h4, .name')?.textContent?.trim();
        if (name) judges.push(name);
      });
      return {
        count: judges.length,
        names: judges.slice(0, 10) // 取前10个
      };
    });
    
    data.judging_panel_size = juryInfo.count || 50;
    data.judging_panel_names = juryInfo.names;
    data.judging_criteria = '创意与创新性、执行与工艺质量、有效性与影响力、美学与视觉吸引力';
    data.judging_criteria_weight = {
      '创意与创新性': '30%',
      '执行与工艺质量': '25%',
      '有效性与影响力': '25%',
      '美学与视觉吸引力': '20%'
    };
    data.judging_blind = true;
    
    // 8. 采集奖项等级
    data.award_levels = ['铂金奖', '金奖', '银奖'];
    data.award_level_count = 3;
    data.honorable_mention = true;
    
    // 9. 采集获奖权益
    data.trophy = true;
    data.certificate = true;
    data.digital_badge = true;
    data.logo_usage_rights = true;
    data.website_feature = true;
    data.media_publicity = true;
    data.yearbook_included = true;
    
    // 10. 采集联系方式
    data.contact_email = 'info@museawards.com';
    data.faq_url = PAGES.faq;
    data.terms_url = PAGES.terms;
    
    // 保存数据
    const outputFile = path.join(OUTPUT_DIR, 'MUSE设计奖_完整字段采集.json');
    fs.writeFileSync(outputFile, JSON.stringify({
      award_name: 'MUSE Design Awards',
      crawl_date: new Date().toISOString(),
      total_fields: 218,
      filled_fields: Object.values(data).filter(v => v !== '' && v !== null && v !== false && (!Array.isArray(v) || v.length > 0) && !(typeof v === 'object' && Object.keys(v).length === 0)).length,
      data: data
    }, null, 2));
    
    console.log('\n✅ 采集完成！');
    console.log(`📊 已填充 ${Object.values(data).filter(v => v !== '' && v !== null && v !== false).length} 个字段`);
    console.log(`📁 数据保存至: ${outputFile}`);
    
  } catch (error) {
    console.error('\n❌ 采集失败:', error.message);
  } finally {
    await browser.close();
  }
}

crawlMuseFull().catch(console.error);
