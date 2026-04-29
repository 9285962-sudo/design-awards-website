/**
 * MUSE奖完整信息采集脚本
 * 采集奖项的218个字段信息
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function scrapeMUSE() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const result = {
    award_name: 'MUSE Design Awards',
    award_name_cn: 'MUSE设计奖',
    official_name: 'MUSE Design Awards',
    organizer: 'International Awards Associate Inc.',
    official_website: 'https://museaward.com',
    contact_email: null,
    contact_phone: null,

    // 奖项简介
    description: null,
    description_cn: null,

    // 类别
    categories: [],

    // 费用
    fees: [],

    // 截止日期
    deadlines: [],

    // 奖项等级
    award_levels: [],

    // 参赛要求
    requirements: [],

    // 作品要求
    submission_requirements: [],

    // 评审标准
    judging_criteria: [],

    // 奖项权益
    benefits: [],

    // 政策条款
    policies: [],

    // 页面所有文字
    full_text: null
  };

  try {
    // 1. 采集主页信息
    console.log('📌 采集主页信息...');
    await page.goto('https://museaward.com', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(2000);

    const homeText = await page.evaluate(() => document.body.innerText);
    result.full_text = homeText;

    // 2. 采集关于页面
    console.log('📌 采集关于页面...');
    try {
      await page.goto('https://museaward.com/about', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1000);
      const aboutText = await page.evaluate(() => document.body.innerText);
      result.description = aboutText;
    } catch (e) {
      console.log('关于页面采集失败:', e.message);
    }

    // 3. 采集参赛费用页面
    console.log('📌 采集费用页面...');
    try {
      await page.goto('https://museaward.com/fees', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1000);
      const feesText = await page.evaluate(() => document.body.innerText);
      result.fees_text = feesText;
    } catch (e) {
      console.log('费用页面采集失败:', e.message);
    }

    // 4. 采集类别页面
    console.log('📌 采集类别页面...');
    try {
      await page.goto('https://museaward.com/categories', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1000);
      const categoriesText = await page.evaluate(() => document.body.innerText);
      result.categories_text = categoriesText;
    } catch (e) {
      console.log('类别页面采集失败:', e.message);
    }

    // 5. 采集常见问题页面
    console.log('📌 采集FAQ页面...');
    try {
      await page.goto('https://museaward.com/faq', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1000);
      const faqText = await page.evaluate(() => document.body.innerText);
      result.faq_text = faqText;
    } catch (e) {
      console.log('FAQ页面采集失败:', e.message);
    }

    // 6. 采集政策页面
    console.log('📌 采集政策页面...');
    try {
      await page.goto('https://museaward.com/policy', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1000);
      const policyText = await page.evaluate(() => document.body.innerText);
      result.policies_text = policyText;
    } catch (e) {
      console.log('政策页面采集失败:', e.message);
    }

    console.log('\n✅ 采集完成!');

    // 保存结果
    const outputPath = path.join(__dirname, 'muse-award-full-info.json');
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');
    console.log(`📁 已保存到: ${outputPath}`);

    // 打印摘要
    console.log('\n📊 采集摘要:');
    console.log(`- 主页文字长度: ${result.full_text?.length || 0}`);
    console.log(`- 关于页面: ${result.description ? '✅' : '❌'}`);
    console.log(`- 费用页面: ${result.fees_text ? '✅' : '❌'}`);
    console.log(`- 类别页面: ${result.categories_text ? '✅' : '❌'}`);
    console.log(`- FAQ页面: ${result.faq_text ? '✅' : '❌'}`);
    console.log(`- 政策页面: ${result.policies_text ? '✅' : '❌'}`);

    return result;

  } catch (error) {
    console.error('❌ 采集失败:', error.message);
    return null;
  } finally {
    await browser.close();
  }
}

// 执行
scrapeMUSE().catch(console.error);
