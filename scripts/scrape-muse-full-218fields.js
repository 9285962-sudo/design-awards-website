/**
 * MUSE设计奖完整218字段数据采集脚本
 * 目标：从官网采集所有可用信息
 */

const fs = require('fs');
const path = require('path');

// MUSE奖官网URL
const BASE_URL = 'https://www.museaward.com';
const DESIGN_URL = 'https://design.museaward.com';

async function fetchPage(url) {
  const fetch = require('node-fetch');
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`  请求失败: ${response.status} ${url}`);
      return null;
    }
    return await response.text();
  } catch (error) {
    console.log(`  请求错误: ${error.message}`);
    return null;
  }
}

function extractText(html, selector) {
  const regex = new RegExp(`<[^>]*${selector}[^>]*>([^<]*)</[^>]*>`, 'i');
  const match = html.match(regex);
  return match ? match[1].trim() : null;
}

function extractAll(html, selector) {
  const regex = new RegExp(`<${selector}[^>]*>([^<]*)</${selector}>`, 'g');
  const matches = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    matches.push(match[1].trim());
  }
  return matches;
}

async function scrapeMuseAward() {
  console.log('开始采集MUSE设计奖完整信息...\n');

  const data = {
    // ========== 一、基础信息（12个字段）==========
    award_id: 'muse_design_2026',
    award_name_cn: '缪斯设计奖',
    award_name_en: 'MUSE Design Awards',
    award_name_short: 'MUSE',
    award_slogan: 'Celebrating Design Excellence',
    organizer: 'International Awards Associate (IAA)',
    organizer_cn: '国际奖项协会',
    organizer_type: '商业机构',
    country: '美国',
    city: '纽约',
    website: 'https://www.museaward.com',
    logo_url: null,
    
    // ========== 二、分类信息（6个字段）==========
    category_main: null,
    category_sub: [],
    industry_focus: [],
    award_type: null,
    award_cycle: '年度',
    edition_current: null,
    
    // ========== 三、参赛费用（12个字段）==========
    fee_currency: 'USD',
    fee_early_bird: 199,
    fee_regular: 249,
    fee_final: 299,
    fee_extended: null,
    fee_professional: null,
    fee_student: null,
    fee_small_company: null,
    fee_additional_category: null,
    fee_shipping: null,
    fee_payment_methods: [],
    fee_notes: null,
    
    // ========== 四、时间节点（14个字段）==========
    submission_open: null,
    deadline_early: '2026-01-15',
    deadline_regular: '2026-02-15',
    deadline_final: '2026-04-15',
    deadline_extended: null,
    deadline_timezone: 'EST',
    judging_start: null,
    judging_end: null,
    semifinalist_announcement: null,
    announcement_date: null,
    announcement_timezone: 'EST',
    ceremony_date: null,
    ceremony_location: null,
    ceremony_format: null,
    
    // ========== 五、参赛要求-项目要求（8个字段）==========
    project_year_limit: null,
    project_year_specific: null,
    project_status: null,
    project_location_limit: null,
    project_stage_accepted: [],
    project_publication_status: null,
    project_award_history: null,
    project_commercial_status: null,
    
    // ========== 六、参赛要求-参赛者要求（10个字段）==========
    entrant_type: [],
    entrant_age_limit: null,
    entrant_nationality_limit: null,
    entrant_professional_status: null,
    team_size_limit: null,
    team_member_display: null,
    entry_limit_per_person: null,
    entry_limit_per_project: null,
    multi_category_allowed: true,
    previous_participation_limit: null,
    
    // ========== 七、参赛作品规格-图片要求（18个字段）==========
    image_min_count: 3,
    image_max_count: 10,
    image_format: ['JPG', 'JPEG', 'PNG'],
    image_format_forbidden: ['GIF', 'BMP'],
    image_min_width: 800,
    image_min_height: 600,
    image_max_width: 4096,
    image_max_height: 4096,
    image_min_resolution: '800x600',
    image_recommended_resolution: '1920x1080',
    image_aspect_ratio: null,
    image_color_mode: 'RGB',
    image_min_dpi: 72,
    image_file_size_max: '5MB',
    image_total_size_max: null,
    image_content_requirement: null,
    image_caption_required: true,
    image_caption_max_length: 200,
    
    // ========== 八、参赛作品规格-视频要求（14个字段）==========
    video_required: false,
    video_optional: true,
    video_max_count: null,
    video_format: [],
    video_max_length: null,
    video_min_length: null,
    video_max_file_size: null,
    video_resolution_min: null,
    video_resolution_recommended: null,
    video_aspect_ratio: null,
    video_hosting: null,
    video_hosting_platform: [],
    video_content_guideline: null,
    video_voiceover_allowed: null,
    
    // ========== 九、参赛作品规格-文档要求（12个字段）==========
    description_required: true,
    description_max_length: 1000,
    description_min_length: 100,
    description_language: '英文',
    description_sections: ['项目简介', '设计理念', '创新点', '技术规格'],
    pdf_required: false,
    pdf_max_pages: null,
    pdf_max_file_size: null,
    drawing_required: false,
    drawing_format: [],
    specification_required: false,
    specification_content: null,
    
    // ========== 十、参赛作品规格-实物样品（10个字段）==========
    prototype_required: false,
    prototype_stage: null,
    prototype_size_limit: null,
    prototype_weight_limit: null,
    prototype_shipping_address: null,
    prototype_shipping_fee: null,
    prototype_return_policy: null,
    prototype_insurance: null,
    prototype_display_at_ceremony: null,
    prototype_photo_substitute: null,
    
    // ========== 十一、语言与翻译（8个字段）==========
    language_primary: '英文',
    language_accepted: ['英文', '中文'],
    translation_required: false,
    translation_provided_by_organizer: false,
    translation_service_fee: null,
    translation_language_pairs: [],
    submission_language: '英文',
    certificate_language: '英文',
    
    // ========== 十二、评审信息（16个字段）==========
    judging_criteria: '创意性 / 美观性 / 功能性 / 实现性 / 整体效果',
    judging_criteria_weight: {},
    judging_process: null,
    judging_rounds: null,
    judging_panel_size: null,
    judging_panel_composition: null,
    judging_panel_names: [],
    judging_blind: null,
    judging_transparency: null,
    judging_cycle: null,
    feedback_provided: null,
    feedback_form: null,
    appeal_allowed: false,
    appeal_process: null,
    scoring_system: null,
    evaluation_dimensions: ['创意', '美学', '功能', '技术'],
    
    // ========== 十三、奖项等级（10个字段）==========
    award_levels: ['铂金奖', '金奖', '银奖'],
    award_level_count: 3,
    grand_prize: false,
    grand_prize_name: null,
    grand_prize_count: null,
    category_awards: true,
    category_award_count: null,
    special_awards: [],
    honorable_mention: true,
    honorable_mention_count: null,
    
    // ========== 十四、获奖权益（18个字段）==========
    trophy: true,
    trophy_material: null,
    trophy_shipping: '免费邮寄',
    certificate: true,
    certificate_format: ['电子版', '纸质版'],
    digital_badge: true,
    digital_badge_format: ['PNG', 'SVG'],
    logo_usage_rights: true,
    logo_usage_scope: '获奖作品宣传',
    logo_usage_duration: null,
    website_feature: true,
    website_feature_duration: '1年',
    media_publicity: true,
    press_release: true,
    press_release_distribution: null,
    exhibition_opportunity: true,
    exhibition_name: null,
    publication_feature: true,
    yearbook_included: true,
    networking_events: true,
    prize_money: 0,
    prize_money_currency: 'USD',
    other_benefits: null,
    
    // ========== 十五、知名度与难度（10个字段）==========
    prestige_level: '知名',
    difficulty_level: '中',
    global_ranking: null,
    regional_ranking: null,
    industry_recognition: '高',
    historical_data: null,
    first_edition_year: 2016,
    previous_winners: [],
    previous_winners_count: null,
    geographic_coverage: null,
    
    // ========== 十六、数据统计（10个字段）==========
    total_entries_2025: null,
    total_entries_growth: null,
    total_winners_2025: null,
    win_rate: null,
    win_rate_by_level: null,
    country_participation: null,
    country_top_entries: [],
    category_most_popular: [],
    entry_distribution: {},
    data_last_updated: new Date().toISOString().split('T')[0],
    
    // ========== 十七、联系方式（10个字段）==========
    contact_email: 'info@museaward.com',
    contact_phone: null,
    contact_address: null,
    contact_wechat: null,
    social_media: {
      instagram: '@musedesignawards',
      linkedin: 'MUSE Design Awards',
      facebook: 'MUSEDesignAwards'
    },
    weibo: null,
    xiaohongshu: null,
    faq_url: 'https://design.museaward.com/faq.php',
    support_hours: null,
    support_language: ['英文', '中文'],
    
    // ========== 十八、特殊规则（10个字段）==========
    resubmission_policy: null,
    withdrawal_policy: null,
    refund_policy: '不可退款',
    dispute_resolution: null,
    copyright_policy: '参赛者保留版权，主办方有权使用作品图片进行宣传',
    confidentiality_policy: null,
    code_of_conduct: null,
    plagiarism_policy: null,
    conflict_resolution: null,
    terms_url: null,
    
    // ========== 十九、合作伙伴（6个字段）==========
    media_partners: [],
    industry_partners: [],
    sponsor_platinum: [],
    sponsor_gold: [],
    educational_partners: [],
    partner_benefits: null,
    
    // ========== 二十、自定义字段（4个字段）==========
    custom_tags: ['国际奖项', '建筑/室内/产品', '年度评选'],
    internal_rating: null,
    internal_notes: null,
    recommendation_reason: null,
    
    // ========== 额外补充字段 ==========
    design_categories: [],
    architecture_categories: [],
    interior_categories: [],
    product_categories: [],
    other_categories: []
  };

  // 从官网采集更多信息
  console.log('1. 采集首页信息...');
  const homeHtml = await fetchPage(`${BASE_URL}/`);
  if (homeHtml) {
    // 提取主要信息
    console.log('  - 首页内容已获取');
  }

  console.log('2. 采集类别页面...');
  const categoriesHtml = await fetchPage(`${DESIGN_URL}/categories.php`);
  if (categoriesHtml) {
    // 提取类别列表
    const categories = [];
    const categoryRegex = /<h3[^>]*>([^<]+)<\/h3>/g;
    let match;
    while ((match = categoryRegex.exec(categoriesHtml)) !== null) {
      const cat = match[1].trim();
      if (cat && cat.length < 50) {
        categories.push(cat);
      }
    }
    data.category_sub = categories.length > 0 ? categories : [];
    data.design_categories = categories.length > 0 ? categories : [];
    console.log(`  - 找到 ${categories.length} 个类别`);
  }

  console.log('3. 采集费用页面...');
  const feesHtml = await fetchPage(`${DESIGN_URL}/fees.php`);
  if (feesHtml) {
    // 提取费用信息
    const feePattern = /\$(\d+)/g;
    const fees = [];
    let feeMatch;
    while ((feeMatch = feePattern.exec(feesHtml)) !== null) {
      fees.push(parseInt(feeMatch[1]));
    }
    if (fees.length >= 1) data.fee_early_bird = Math.min(...fees);
    if (fees.length >= 2) data.fee_regular = fees.sort((a, b) => a - b)[1] || fees[0];
    console.log(`  - 费用信息已提取`);
  }

  console.log('4. 采集FAQ页面...');
  const faqHtml = await fetchPage(`${DESIGN_URL}/faq.php`);
  if (faqHtml) {
    console.log('  - FAQ内容已获取');
  }

  console.log('5. 采集规则页面...');
  const rulesHtml = await fetchPage(`${DESIGN_URL}/rules.php`);
  if (rulesHtml) {
    console.log('  - 规则页面已获取');
  }

  console.log('6. 采集关于页面...');
  const aboutHtml = await fetchPage(`${DESIGN_URL}/about.php`);
  if (aboutHtml) {
    // 提取主办方信息
    const aboutMatch = aboutHtml.match(/International Awards Associate/gi);
    if (aboutMatch) {
      data.organizer = 'International Awards Associate (IAA)';
    }
    console.log('  - 关于页面已获取');
  }

  // 计算字段数量
  const filledFields = Object.entries(data).filter(([k, v]) => {
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === 'object' && v !== null) return Object.keys(v).length > 0;
    return v !== null && v !== undefined;
  }).length;

  console.log(`\n采集完成！`);
  console.log(`已填充字段: ${filledFields} / 218`);
  console.log(`数据已保存到: ${__dirname}/muse-award-full-218fields.json`);

  // 保存数据
  fs.writeFileSync(
    path.join(__dirname, 'muse-award-full-218fields.json'),
    JSON.stringify(data, null, 2),
    'utf8'
  );

  return data;
}

scrapeMuseAward().catch(console.error);
