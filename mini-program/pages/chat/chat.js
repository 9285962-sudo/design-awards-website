const app = getApp();

// 知识库内容（简化版，用于兜底回复）
const knowledgeBase = {
  judges: `👥 **MUSE设计奖评审团**

由**国际奖项协会评审委员会(IAA Judging Council)**组成：

**部分公开评委**：
• **Joon Kwon**（韩国）- LR Seoul 首席执行官兼联合创始人
• **Daisuke Nagatomo**（日本）- MisoSoupDesign 创始人、副教授
• **Artem Kropovinsky**（美国）- Arsight 创始人、首席设计师
• **Florian Seidl**（意大利）- Lavazza 设计经理

⚠️ **注意**：
完整评委名单官方未完全公开，每年可能有变化。`,

  theme: `🎨 **2026年MUSE设计奖主题**

**主题：Crowning Achievements（加冕成就）**

**含义**：
庆祝每个创作者将雄心转化为成功、创新转化为认可的里程碑时刻，象征创意与设计领域的巅峰成就。

这一主题强调对杰出设计创新者的表彰和庆祝。`,

  iaa: `🏢 **关于主办方IAA**

**International Awards Associates（国际奖项协会）**

**性质**：由行业创新者、创作者、设计师和传播专业人士组成的组织

**规模**：
• 拥有 34+ 个奖项项目
• 收到 10万+ 参赛作品
• 覆盖 124+ 个国家
• 聘请 200+ 名国际评委

**使命**：通过发现和认可新晋及现有人才，推动行业向前发展。`,

  trophy: `🏆 **MUSE奖杯介绍**

MUSE奖杯设计精美，象征创意与设计的巅峰成就。

获奖者将获得：
• 实体奖杯（铂金奖/金奖/银奖不同等级）
• 获奖证书（电子版）
• 数字徽章（可用于作品集和网站）
• 获奖者标志永久使用权

具体奖杯样式可在官网查看。`,

  winners: `🌟 **查看往届获奖者**

**官方渠道**：
• 官网 Winner's Gallery（获奖者画廊）
• 可按类别、年份筛选浏览
• 包含获奖作品图片和设计师信息

**搜索方式**：
• 按类别搜索（建筑、室内、产品等）
• 按年份筛选
• 按奖项等级筛选（铂金奖/金奖/银奖）

官网展示所有获奖作品，供参赛者参考。`,

  modification: `📝 **投稿后修改政策**

⚠️ **重要提醒**：
• 提交后**可以修改**作品信息（在截止日期前）
• 建议提交前仔细检查所有材料
• 截止日期后无法修改

具体修改流程请登录官网账户操作。`,

  withdrawal: `❌ **退赛/撤回政策**

• 截止日期前**可以申请退赛**
• 但**费用不予退还**
• 退赛后作品不再参与评审

建议投稿前确认作品和类别选择，避免不必要的损失。`
};

Page({
  data: {
    messages: [],
    inputValue: '',
    showWelcome: true,
    showQuickQuestions: true,
    scrollToMessage: '',
    quickQuestions: [
      'MUSE奖是哪个国家的？',
      'MUSE奖费用多少？',
      '获奖率怎么样？',
      '需要什么材料？',
      '新手适合投哪个？'
    ],
    // MUSE奖数据
    awardData: null
  },

  onLoad(options) {
    // 支持通过参数传入奖项ID，或从全局获取当前奖项
    const awardId = options.awardId;
    let awardData = app.globalData.currentAward;
    
    if (awardId) {
      // 如果传入了奖项ID，从awardList中查找对应奖项
      const awardList = app.globalData.awardList || [];
      const foundAward = awardList.find(a => a.award_id === awardId);
      if (foundAward) {
        awardData = foundAward;
        // 更新全局currentAward为当前选择的奖项
        app.globalData.currentAward = foundAward;
      }
    }
    
    this.setData({
      awardData: awardData
    });
    
    // 更新快捷问题为当前奖项相关
    this.updateQuickQuestions(awardData);
  },
  
  onShow() {
    // 页面显示时检查currentAward是否变化
    const currentAward = app.globalData.currentAward;
    if (currentAward && this.data.awardData && currentAward.award_id !== this.data.awardData.award_id) {
      this.setData({
        awardData: currentAward
      });
      this.updateQuickQuestions(currentAward);
    }
  },
  
  // 根据当前奖项更新快捷问题
  updateQuickQuestions(award) {
    if (!award) return;
    const awardShortName = award.award_name_short || award.award_name_cn;
    this.setData({
      quickQuestions: [
        `${awardShortName}是哪个国家的？`,
        `${awardShortName}费用多少？`,
        `获奖率怎么样？`,
        `需要什么材料？`,
        `新手适合投哪个？`
      ]
    });
  },

  // 从用户输入中检测提到的奖项名称
  detectAwardFromInput(input) {
    const lowerInput = input.toLowerCase();
    const awardList = app.globalData.awardList || [];
    
    // 定义奖项关键词映射
    const awardKeywords = {
      'muse': ['muse', '缪斯'],
      'd&ad': ['d&ad', 'dandad', '黄铅笔'],
      'newblood': ['newblood', 'new blood', '新血'],
      'riba': ['riba', '英国皇家建筑师'],
      'lia': ['lia', '伦敦国际奖', '伦敦国际'],
      'andrew_martin': ['andrew martin', 'andrewmartin', '安德鲁马丁', '室内设计奥斯卡']
    };
    
    for (const award of awardList) {
      const awardId = award.award_id || '';
      const shortName = (award.award_name_short || '').toLowerCase();
      const fullName = (award.award_name_cn || '').toLowerCase();
      
      // 检查是否匹配奖项ID或名称
      if (lowerInput.includes(shortName) || lowerInput.includes(fullName)) {
        return award;
      }
      
      // 检查关键词映射
      for (const [key, keywords] of Object.entries(awardKeywords)) {
        if (awardId.includes(key)) {
          for (const keyword of keywords) {
            if (lowerInput.includes(keyword)) {
              return award;
            }
          }
        }
      }
    }
    
    return null;
  },

  // 智能问题解析 - 从用户问题中提取查询意图
  parseQuestion(input) {
    const lowerInput = input.toLowerCase();
    const award = this.data.awardData;
    
    // 定义问题类型和关键词映射
    const questionTypes = [
      {
        type: 'country',
        keywords: ['国家', '哪国', '哪个国家', 'country', 'nation', '地域'],
        field: 'country',
        answer: `🏆 **${award.award_name_cn}** 是 **${award.country}** 的奖项。`
      },
      {
        type: 'organizer',
        keywords: ['主办', '主办方', '机构', '谁办的', 'organizer', 'host', '举办'],
        field: 'organizer',
        answer: `🏢 **${award.award_name_cn}** 由 **${award.organizer}** 主办。`
      },
      {
        type: 'website',
        keywords: ['官网', '网站', '网址', 'website', 'url', '链接'],
        field: 'website',
        answer: `🌐 **${award.award_name_cn}** 官方网站：\n${award.website}`
      },
      {
        type: 'history',
        keywords: ['历史', '创办', '成立', '哪年', 'history', 'founded', 'established'],
        field: 'first_edition_year',
        answer: `📅 **${award.award_name_cn}** 创办于 **${award.first_edition_year}** 年，已有 ${new Date().getFullYear() - award.first_edition_year} 年历史。`
      },
      {
        type: 'name',
        keywords: ['英文名', '英文', '全称', 'name', 'english'],
        field: 'award_name_en',
        answer: `📝 **${award.award_name_cn}** 的英文名是 **${award.award_name_en}**。`
      },
      {
        type: 'email',
        keywords: ['邮箱', '邮件', 'email', '联系'],
        field: 'contact_email',
        answer: `📧 **${award.award_name_cn}** 联系邮箱：\n${award.contact_email}`
      },
      {
        type: 'slogan',
        keywords: ['口号', '标语', 'slogan', '主题'],
        field: 'award_slogan',
        answer: `💬 **${award.award_name_cn}** 的口号是：**${award.award_slogan}**`
      }
    ];
    
    // 匹配问题类型
    for (const qt of questionTypes) {
      if (qt.keywords.some(kw => lowerInput.includes(kw))) {
        // 检查数据是否存在
        const value = award[qt.field];
        if (value && value !== '待确认' && value !== 'N/A') {
          return {
            matched: true,
            type: qt.type,
            content: qt.answer
          };
        }
      }
    }
    
    return { matched: false };
  },

  // 输入变化
  onInputChange(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  // 发送消息
  sendMessage() {
    const { inputValue, messages } = this.data;
    if (!inputValue.trim()) return;

    // 隐藏欢迎消息和快捷问题
    this.setData({
      showWelcome: false,
      showQuickQuestions: false
    });

    // 添加用户消息
    const userMessage = {
      id: Date.now(),
      type: 'user',
      contentType: 'text',
      content: inputValue,
      time: this.formatTime()
    };

    this.setData({
      messages: [...messages, userMessage],
      inputValue: ''
    }, () => {
      this.scrollToBottom();
      // 模拟AI回复
      this.simulateAIResponse(inputValue);
    });
  },

  // 发送快捷问题
  sendQuickQuestion(e) {
    const question = e.currentTarget.dataset.question;
    this.setData({
      inputValue: question
    }, () => {
      this.sendMessage();
    });
  },

  // AI回复 - 使用云函数调用DeepSeek
  async simulateAIResponse(userInput) {
    wx.showLoading({
      title: '思考中...',
      mask: true
    });

    try {
      // 检测用户是否提到了特定奖项名称，如果是则切换到该奖项
      let currentAward = this.data.awardData;
      const detectedAward = this.detectAwardFromInput(userInput);
      if (detectedAward && detectedAward.award_id !== currentAward.award_id) {
        currentAward = detectedAward;
        this.setData({ awardData: currentAward });
        app.globalData.currentAward = currentAward;
        this.updateQuickQuestions(currentAward);
      }
      
      // 调用云函数，传入当前奖项数据
      const { result } = await wx.cloud.callFunction({
        name: 'deepseekChat',
        data: {
          message: userInput,
          awardData: currentAward, // 传递当前奖项数据
          history: this.data.messages.slice(-10).map(m => ({
            type: m.type,
            content: typeof m.content === 'string' ? m.content : ''
          }))
        }
      });

      wx.hideLoading();

      if (result.success) {
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          contentType: 'text',
          content: result.content,
          time: this.formatTime()
        };
        this.setData({
          messages: [...this.data.messages, aiMessage]
        }, () => {
          this.scrollToBottom();
        });
      } else {
        // 云函数失败，回退到原有规则系统
        console.warn('DeepSeek调用失败，使用备用方案:', result.error);
        const response = this.generateResponse(userInput);
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          contentType: response.type,
          content: response.content,
          data: response.data,
          time: this.formatTime()
        };
        this.setData({
          messages: [...this.data.messages, aiMessage]
        }, () => {
          this.scrollToBottom();
        });
      }
    } catch (error) {
      wx.hideLoading();
      console.error('AI回复失败:', error);

      // 出错时回退到原有规则系统
      const response = this.generateResponse(userInput);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        contentType: response.type,
        content: response.content,
        data: response.data,
        time: this.formatTime()
      };
      this.setData({
        messages: [...this.data.messages, aiMessage]
      }, () => {
        this.scrollToBottom();
      });
    }
  },

  // 生成回复（基于MUSE奖数据）
  generateResponse(input) {
    let award = this.data.awardData;
    const lowerInput = input.toLowerCase();
    
    // 调试：检查数据是否存在
    if (!award) {
      return {
        type: 'text',
        content: '⚠️ 数据加载中，请稍后再试'
      };
    }

    // 检测用户是否提到了特定奖项名称，如果是则切换到该奖项
    const detectedAward = this.detectAwardFromInput(input);
    if (detectedAward && detectedAward.award_id !== award.award_id) {
      // 更新当前奖项
      award = detectedAward;
      this.setData({ awardData: award });
      app.globalData.currentAward = award;
      this.updateQuickQuestions(award);
    }

    // 第一步：尝试智能解析基础信息问题（国家、主办方、官网等）
    const parsedQuestion = this.parseQuestion(input);
    if (parsedQuestion.matched) {
      return {
        type: 'text',
        content: parsedQuestion.content
      };
    }

    // 费用相关
    if (lowerInput.includes('费用') || lowerInput.includes('价格') || lowerInput.includes('多少钱') || lowerInput.includes('fee') || lowerInput.includes('price')) {
      const currentFee = award.fee_final;
      const daysLeft = this.calculateDaysLeft(award.deadline_final);
      const currencySymbol = award.fee_currency === 'GBP' ? '£' : (award.fee_currency === 'EUR' ? '€' : '$');
      const awardShortName = award.award_name_short || award.award_name_cn;
      
      return {
        type: 'text',
        content: `💰 **${awardShortName}参赛费用**

目前处于**最后机会阶段**：${currentFee ? currencySymbol + currentFee : '待公布'}

📅 **费用时间线**：
• 早鸟价：${award.fee_early_bird ? currencySymbol + award.fee_early_bird : '待公布'}
• 常规价：${award.fee_regular ? currencySymbol + award.fee_regular : '待公布'}
• 最后机会：${award.fee_final ? currencySymbol + award.fee_final : '待公布'}${daysLeft > 0 ? '（' + daysLeft + '天后截止）' : ''}

💡 **建议**：
如果作品已准备好，建议尽快提交，避免错过最后期限。`
      };
    }

    // 截止日期相关
    if (lowerInput.includes('截止') || lowerInput.includes('deadline') || lowerInput.includes('时间') || lowerInput.includes('什么时候')) {
      const daysLeft = this.calculateDaysLeft(award.deadline_final);
      const awardShortName = award.award_name_short || award.award_name_cn;
      
      return {
        type: 'text',
        content: `⏰ **${awardShortName}时间节点**

🚨 **重要提醒**：
**最终截止日期：${award.deadline_final || '待公布'}**
${daysLeft > 0 ? '**还剩 ' + daysLeft + ' 天！**' : ''}

📋 **完整时间线**：
• 投稿开始：${award.submission_open || '待公布'}
• 评审开始：${award.judging_start || '待公布'}
• 评审结束：${award.judging_end || '待公布'}
• 结果公布：${award.announcement_date || '待公布'}
• 颁奖典礼：${award.ceremony_date || '待公布'}

⚡ **建议**：时间紧迫，如果作品还没准备好，可以考虑准备下一届。`
      };
    }

    // 知识库查询 - 往届获奖者相关问题（放在"获奖率"之前，避免"获奖作品"被拦截）
    if (lowerInput.includes('往届') || lowerInput.includes('往届获奖') || lowerInput.includes('winner') ||
        lowerInput.includes('获奖作品') || lowerInput.includes('哪里看获奖') ||
        lowerInput.includes('gallery') || lowerInput.includes('画廊')) {
      return {
        type: 'text',
        content: knowledgeBase.winners
      };
    }

    // 获奖率相关
    if (lowerInput.includes('获奖') || lowerInput.includes('概率') || lowerInput.includes('难度') || lowerInput.includes('win') || lowerInput.includes('rate')) {
      const awardShortName = award.award_name_short || award.award_name_cn;
      const currencySymbol = award.fee_currency === 'GBP' ? '£' : (award.fee_currency === 'EUR' ? '€' : '$');
      
      return {
        type: 'text',
        content: `🏆 **关于${awardShortName}获奖率**

${awardShortName}**官方不公布具体获奖率数据**。

📊 **行业参考信息**：
根据参赛者反馈和行业观察，${awardShortName}的获奖难度：
• **知名度**：${award.prestige_level || '待确认'}
• **难度**：${award.difficulty_level || '待确认'}
• 适合${award.entrant_type ? award.entrant_type.join('、') : '设计师'}参赛

🎯 **奖项等级**（共${award.award_level_count}级）：
${(award.award_levels || []).map(l => '• **' + l + '**').join('\n')}

💡 **与其关注获奖率，不如**：
1. 参考官网展示的往届获奖作品质量
2. 确保作品符合参赛要求
3. 选择最匹配的参赛类别
4. 图片质量是关键（建议专业摄影）
5. 设计说明突出创新点和用户价值`
      };
    }

    // 类别相关 - 包含"哪些""有什么"等问法
    if (lowerInput.includes('类别') || lowerInput.includes('分类') || lowerInput.includes('category') || 
        (lowerInput.includes('哪些') && lowerInput.includes('参赛'))) {
      const categories = award.category_sub || [];
      const awardShortName = award.award_name_short || award.award_name_cn;
      let categoryText = `📂 **${awardShortName}参赛类别**\n\n`;
      
      categoryText += categories.length > 0 ? categories.join('、') : '官方未公布具体类别';
      categoryText += '\n\n💡 **提示**：同一作品可以投稿多个类别，增加获奖机会！';
      
      return {
        type: 'text',
        content: categoryText
      };
    }

    // 建筑/室内/产品等具体领域匹配
    if (lowerInput.includes('建筑') || lowerInput.includes('室内') || lowerInput.includes('产品') || lowerInput.includes('设计师')) {
      const categories = award.category_sub || [];
      const awardShortName = award.award_name_short || award.award_name_cn;
      const currencySymbol = award.fee_currency === 'GBP' ? '£' : (award.fee_currency === 'EUR' ? '€' : '$');
      
      // 判断用户领域是否匹配
      let matchedCategories = [];
      if (lowerInput.includes('建筑')) matchedCategories = categories.filter(c => c.includes('建筑') || c.includes('景观'));
      else if (lowerInput.includes('室内')) matchedCategories = categories.filter(c => c.includes('室内'));
      else if (lowerInput.includes('产品')) matchedCategories = categories.filter(c => c.includes('产品') || c.includes('家具') || c.includes('照明'));
      
      return {
        type: 'text',
        content: `👋 **关于您的领域**

${awardShortName}非常适合您！

📂 **相关参赛类别**：
${matchedCategories.length > 0 ? matchedCategories.join('、') : categories.slice(0, 5).join('、')}

✅ **为什么适合**：
• ${awardShortName}涵盖${categories.length}个主要类别
• 费用合理，早鸟价${award.fee_early_bird ? currencySymbol + award.fee_early_bird : '待公布'}性价比高
• 对新手友好，适合首次尝试国际奖项
• 在${award.category_main || '设计'}领域有一定知名度

💡 **建议**：
您可以直接在「奖项详情」页面查看更多类别信息，或问我"${awardShortName}有哪些参赛类别？"`
      };
    }

    // 概念设计相关 - 包含"接受""可以投"等问法
    if (lowerInput.includes('概念') || lowerInput.includes('进行') || lowerInput.includes('stage') ||
        (lowerInput.includes('接受') && lowerInput.includes('概念'))) {
      const awardShortName = award.award_name_short || award.award_name_cn;
      return {
        type: 'text',
        content: `📋 **${awardShortName}项目阶段要求**

✅ **接受的项目阶段**：
${(award.project_stage_accepted || []).map(s => '• ' + s).join('\n')}

💡 **这意味着**：
${(award.project_stage_accepted || []).map(s => '• **' + s + '** - 可以投！').join('\n')}

⚠️ **时间限制**：
作品必须是 **${award.project_year_limit || '官方未公布'}** 内完成的
${award.project_year_specific ? '（' + award.project_year_specific + '）' : ''}

🎯 **建议**：
概念设计类作品在${awardShortName}中很受欢迎，重点突出创新性和解决的用户痛点！`
      };
    }

    // 图片规格相关 - 包含"要求""多少"等问法
    if (lowerInput.includes('图片') || lowerInput.includes('分辨率') || lowerInput.includes('规格') || 
        lowerInput.includes('image') || lowerInput.includes('photo') ||
        (lowerInput.includes('要求') && lowerInput.includes('多少'))) {
      const awardShortName = award.award_name_short || award.award_name_cn;
      return {
        type: 'text',
        content: `🖼️ **${awardShortName}图片要求**

📊 **基本规格**：
• 数量：**${award.image_min_count}-${award.image_max_count}张**
• 格式：**${(award.image_format || []).join('、')}**
• 单张大小：**≤${award.image_file_size_max}**
• 总大小：**≤${award.image_total_size_max || '50MB'}**

📐 **分辨率要求**：
• 最低：**${award.image_min_resolution}**
• 推荐：**${award.image_recommended_resolution}**
• 比例：**${award.image_aspect_ratio}**
• DPI：**≥${award.image_min_dpi || 72}**

📝 **内容要求**：
${award.image_content_requirement || '• 需展示整体+细节+使用场景'}

⚠️ **重要提示**：
图片质量直接影响获奖概率！
建议请专业摄影师拍摄。`
      };
    }

    // 语言相关 - 包含"接受""投稿"等问法
    if (lowerInput.includes('中文') || lowerInput.includes('语言') || lowerInput.includes('翻译') || 
        lowerInput.includes('language') ||
        (lowerInput.includes('接受') && lowerInput.includes('中文'))) {
      const awardShortName = award.award_name_short || award.award_name_cn;
      return {
        type: 'text',
        content: `🌐 **${awardShortName}语言要求**

📋 **投稿语言**：
• 主要语言：**${award.language_primary}**
• 接受语言：**${(award.language_accepted || []).join('、')}**

📝 **项目说明**：
• 提交语言：**${award.submission_language}**
• 证书语言：**${award.certificate_language}**

❌ **中文投稿**：
**不接受中文直接投稿**

✅ **解决方案**：
• 自行翻译成英文
• 找专业翻译服务
• 确保设计说明准确表达创新点

💡 **提示**：
设计说明的质量很重要，建议找懂设计的翻译。`
      };
    }

    // 评审标准相关 - 包含"是什么"等问法
    if (lowerInput.includes('评审') || lowerInput.includes('标准') || lowerInput.includes('criteria') || 
        lowerInput.includes('judging') ||
        (lowerInput.includes('评审') && lowerInput.includes('是什么'))) {
      const awardShortName = award.award_name_short || award.award_name_cn;
      return {
        type: 'text',
        content: `⚖️ **${awardShortName}评审标准**

📊 **评审维度**：
${award.judging_criteria}

👥 **关于评审团**：
由**国际知名设计师、学者、媒体人**组成。

⚠️ **注意**：
具体评委名单官方未完全公开，每年可能有变化。

🔒 **评审方式**：
• 匿名评审：**${award.judging_blind ? '是' : '否'}
• 评审轮次：**${award.judging_rounds}轮**
• 评审周期：**${award.judging_cycle}**

💡 **准备作品时重点突出**：
1. 创新性和独特的设计理念
2. 解决用户痛点的能力
3. 高质量的视觉呈现
4. 清晰的说明文字

📚 **建议**：
关注评审标准比关注评委更重要！`
      };
    }

    // 奖项等级相关 - 包含"最高奖""是什么"等问法
    if (lowerInput.includes('等级') || lowerInput.includes('最高') || lowerInput.includes('铂金奖') || 
        lowerInput.includes('level') || lowerInput.includes('grand') ||
        (lowerInput.includes('最高') && lowerInput.includes('奖')) ||
        (lowerInput.includes('最高奖') && lowerInput.includes('是什么'))) {
      const levels = award.award_levels || [];
      const awardShortName = award.award_name_short || award.award_name_cn;
      return {
        type: 'text',
        content: `🏆 **${awardShortName}奖项等级**

🥇 **奖项设置**（共${award.award_level_count}个等级）：
${levels.map((l, i) => `${i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'} **${l}**`).join('\n')}

${award.grand_prize ? `🏅 **特别大奖**：${award.grand_prize_name}` : ''}
${award.honorable_mention ? `📜 **荣誉提名**：有` : ''}

📊 **获奖率分布**：
官方不公布具体获奖率分布数据。

💡 **说明**：
• ${levels[0] || '最高奖'}是最高荣誉
• 同一作品只能获得一个等级
• 所有获奖者都会获得证书和标志使用权`
      };
    }

    // 奖金相关 - 包含"有吗"等问法
    if (lowerInput.includes('奖金') || lowerInput.includes('奖品') || lowerInput.includes('money') || 
        lowerInput.includes('prize') ||
        (lowerInput.includes('有') && lowerInput.includes('奖金'))) {
      const awardShortName = award.award_name_short || award.award_name_cn;
      const currencySymbol = award.fee_currency === 'GBP' ? '£' : (award.fee_currency === 'EUR' ? '€' : '$');
      return {
        type: 'text',
        content: `💰 **${awardShortName}奖金说明**

${award.prize_money > 0 ? `🏆 **奖金**：${currencySymbol}${award.prize_money} ${award.prize_money_currency}` : '❌ **无现金奖金**'}

🎁 **获奖权益**（非现金）：
${award.trophy ? `• 🏆 ${(award.award_levels || []).join('/')}奖杯` : ''}
${award.certificate ? `• 📜 获奖证书（${(award.certificate_format || []).join('+')}）` : ''}
${award.digital_badge ? '• 🎖️ 数字徽章' : ''}
${award.website_feature ? '• 🌐 官网展示' : ''}
${award.media_publicity ? '• 📢 媒体推广' : ''}
${award.press_release ? '• 📰 新闻稿发布' : ''}
${award.logo_usage_rights ? `• ✅ 获奖者标志使用权（${award.logo_usage_duration}）` : ''}

💼 **商业价值**：
虽然无现金奖金，但获奖带来的：
• 品牌曝光价值
• 客户信任度提升
• 设计服务溢价
• 行业认可度

💡 **这些无形价值远超奖金本身！**`
      };
    }

    // 排名/知名度相关 - 包含"排第几"等问法
    if (lowerInput.includes('排名') || lowerInput.includes('知名') || lowerInput.includes('全球') || 
        lowerInput.includes('rank') || lowerInput.includes('prestige') ||
        lowerInput.includes('排第几') || lowerInput.includes('第几')) {
      return {
        type: 'text',
        content: `🌍 **关于排名**

设计奖项**没有权威的全球统一排名**，不同机构和媒体的评价标准不同。

⭐ **${awardShortName}的行业定位**：

| 维度 | 评价 |
|------|------|
| 知名度 | ${award.prestige_level || '在国际设计奖项中有一定影响力'} |
| 领域 | ${(award.industry_focus || []).slice(0, 3).join('、')}等领域认可度较高 |
| 适合人群 | ${award.award_type === '学生奖' ? '学生、新人' : '新手入门、中小企业、专业设计师'} |

📅 **可确认的信息**：
• 已举办至第${award.edition_current}届（${award.first_edition_year}年创办）
• 主办方：${award.organizer}
• 覆盖范围：${award.geographic_coverage || '全球'}

💡 **建议**：
选择奖项时不应只看排名，更应考虑：
• 作品类型与奖项类别的匹配度
• 费用预算是否合理
• 获奖权益是否符合需求`
      };
    }

    // 知识库查询 - 修改/撤回相关问题（放在数据统计之前，避免"投稿后修改"被拦截）
    if (lowerInput.includes('修改') || lowerInput.includes('撤回') || lowerInput.includes('withdraw') ||
        lowerInput.includes('改材料') || lowerInput.includes('重新提交') ||
        (lowerInput.includes('投稿') && lowerInput.includes('改'))) {
      return {
        type: 'text',
        content: knowledgeBase.modification + '\n\n' + knowledgeBase.withdrawal
      };
    }

    // 数据统计相关 - 包含"多少人""每年"等问法
    if (lowerInput.includes('投稿') || lowerInput.includes('参赛人数') || lowerInput.includes('统计') || 
        lowerInput.includes('entry') || lowerInput.includes('data') ||
        lowerInput.includes('多少人') || lowerInput.includes('每年')) {
      return {
        type: 'text',
        content: `📊 **关于投稿数据**

${awardShortName}**官方不公布详细的投稿统计数据**。

📅 **可确认的信息**：
• 已举办至第${award.edition_current}届（${award.first_edition_year}年创办）
• 覆盖全球多个国家和地区
• 参赛类别涵盖：${(award.category_sub || []).slice(0, 5).join('、')}等

🎯 **奖项设置**：
• 奖项等级：铂金奖、金奖、银奖
• 支持同一作品投多个类别
• 学生和专业组分开评审

💡 **如何了解竞争情况**：
1. 浏览官网往届获奖作品展示
2. 查看各年度获奖作品数量（官网可见）
3. 参考设计社区的参赛者经验分享

📚 **与其关注投稿人数，不如专注于**：
• 提升作品质量
• 精准选择参赛类别
• 准备专业的展示材料`
      };
    }

    // 退款/退赛相关 - 包含"能退吗""没获奖"等问法
    if (lowerInput.includes('退费') || lowerInput.includes('退款') || lowerInput.includes('退赛') || 
        lowerInput.includes('refund') || lowerInput.includes('withdraw') || lowerInput.includes('能退') ||
        (lowerInput.includes('没获奖') && lowerInput.includes('退')) ||
        (lowerInput.includes('能') && lowerInput.includes('退'))) {
      const awardShortName = award.award_name_short || award.award_name_cn;
      return {
        type: 'text',
        content: `⚠️ **${awardShortName}退赛/退款政策**

❌ **退款政策**：
**${award.refund_policy || '所有费用一旦缴纳，不予退款。'}**

📋 **退赛政策**：
${award.withdrawal_policy || '在截止日期前可以申请退赛，但费用不退还。'}

🔄 **重新投稿**：
未获奖的作品可以在下一年度重新投稿，但需要重新缴纳全额参赛费用。

⚖️ **争议解决**：
如对评审结果有异议，可通过官方渠道申诉，但不改变评审决定。

💡 **重要提醒**：
投稿前务必确认：
1. 作品符合参赛要求
2. 类别选择正确
3. 材料准备齐全
4. 费用预算充足

一旦缴费，**无法退款**，请谨慎决定！`
      };
    }

    // 材料/要求相关 - 包含"有什么要求"等问法
    if (lowerInput.includes('材料') || lowerInput.includes('要求') || lowerInput.includes('准备') || 
        lowerInput.includes('requirement') || lowerInput.includes('条件') ||
        (lowerInput.includes('有什么') && lowerInput.includes('要求')) ||
        (lowerInput.includes('需要') && lowerInput.includes('什么'))) {
      const awardShortName = award.award_name_short || award.award_name_cn;
      return {
        type: 'text',
        content: `📋 **${awardShortName}作品提交要求**

🖼️ **图片要求**：
• 数量：**${award.image_min_count || '官方未公布'}-${award.image_max_count || '官方未公布'}张**
• 格式：**${(award.image_format || []).join('、') || '官方未公布'}**
• 大小：每张≤${award.image_file_size_max || '官方未公布'}
• 分辨率：最低${award.image_min_resolution || '官方未公布'}，推荐${award.image_recommended_resolution || '官方未公布'}
• 比例：${award.image_aspect_ratio || '官方未公布'}

🎬 **视频${award.video_optional ? '（可选）' : ''}**：
• 时长：≤${award.video_max_length || '官方未公布'}
• 格式：${(award.video_format || []).join('、') || '官方未公布'}
• 大小：≤${award.video_max_file_size || '官方未公布'}

📝 **项目说明**：
• 字数：≤${award.description_max_length || '官方未公布'}字符
• 语言：${award.description_language || '英文'}
• 建议包含：${(award.description_sections || []).join('、') || '设计理念、创新点'}

⚠️ **重要提示**：
• 作品必须是${award.project_year_limit || '官方未公布时间'}内完成
• 接受阶段：${(award.project_stage_accepted || []).join('、') || '官方未公布'}
• 图片质量直接影响获奖概率，建议请专业摄影师`
      };
    }

    // 推荐相关
    if (lowerInput.includes('推荐') || lowerInput.includes('建议') || lowerInput.includes('适合') || lowerInput.includes('哪个') || lowerInput.includes('recommend')) {
      const daysLeft = this.calculateDaysLeft(award.deadline_final);
      
      return {
        type: 'award-card',
        content: '',
        data: {
          id: award.award_id,
          name_cn: award.award_name_cn,
          name_en: award.award_name_en,
          currentFee: award.fee_final,
          deadline: award.deadline_final,
          daysLeft: daysLeft,
          win_rate: null
        }
      };
    }

    // 新手相关
    if (lowerInput.includes('新手') || lowerInput.includes('第一次') || lowerInput.includes('初次') || lowerInput.includes('beginner')) {
      return {
        type: 'text',
        content: `👋 **新手参赛指南**

🎯 **为什么推荐MUSE作为首投？**

✅ **获奖率友好**：官方未公布具体数据，但行业反馈比红点/iF更友好
✅ **费用合理**：早鸟价$${award.fee_early_bird}，性价比高
✅ **类别丰富**：${(award.category_sub || []).length}+细分类别，容易找到匹配
✅ **国际认可**：全球知名，对作品集加分

📚 **新手建议流程**：
1️⃣ **选奖**：从MUSE、TITAN等获奖率高的开始
2️⃣ **准备材料**：高质量图片+清晰的设计说明
3️⃣ **选类别**：精准匹配，别贪多
4️⃣ **投稿**：赶早鸟价，省钱
5️⃣ **积累经验**：无论获奖与否，都是宝贵经验

🚫 **常见误区**：
❌ 第一次就冲红点（难度太高）
❌ 只投一个奖（多投几个增加机会）
❌ 图片随便拍（质量是关键）

💡 **需要我帮你评估作品适合投哪个类别吗？**`
      };
    }

    // 权益相关 - 不包含"获奖率"相关问法
    if (lowerInput.includes('权益') || lowerInput.includes('好处') || lowerInput.includes('benefit') ||
        (lowerInput.includes('获奖') && lowerInput.includes('权益')) ||
        (lowerInput.includes('获奖') && lowerInput.includes('有什么'))) {
      const awardShortName = award.award_name_short || award.award_name_cn;
      return {
        type: 'text',
        content: `🎁 **${awardShortName}获奖权益**

🏆 **实体权益**：
• ${award.trophy ? awardShortName + '奖杯（' + (award.award_levels || []).join('/') + '）' : '无奖杯'}
• ${award.certificate ? '获奖证书（' + (award.certificate_format || []).join('+') + '）' : '无证书'}
• ${award.digital_badge ? awardShortName + '获奖者专属标志' : ''}

📢 **曝光权益**：
• ${award.website_feature ? '官网作品展示' : ''}
• ${award.media_publicity ? '社交媒体推广' : ''}
• ${award.press_release ? '新闻稿发布' : ''}
• ${award.publication_feature ? '设计杂志收录' : ''}
• ${award.yearbook_included ? '年鉴收录' : ''}

🌟 **增值权益**：
• 获奖者人才库收录
• ${award.ceremony_date ? '颁奖典礼邀请（' + award.ceremony_date + '）' : ''}
• 行业人脉拓展
• 作品集强力背书

💼 **商业价值**：
• 提升品牌/个人知名度
• 增加客户信任度
• 设计服务溢价能力
• 团队招聘吸引力

💡 **标志使用权**：
获奖后可${award.logo_usage_duration || '永久'}使用${awardShortName}获奖者标志，用于：
• 官网/作品集展示
• 宣传物料
• 产品包装
• 媒体报道`
      };
    }

    // 评价/建议类问题（怎么样、值得吗、好吗）
    if (lowerInput.includes('怎么样') || lowerInput.includes('值得') || lowerInput.includes('好吗') || 
        lowerInput.includes('评价') || lowerInput.includes('推荐') || lowerInput.includes('建议')) {
      const daysLeft = this.calculateDaysLeft(award.deadline_final);
      const awardShortName = award.award_name_short || award.award_name_cn;
      const currencySymbol = award.fee_currency === 'GBP' ? '£' : (award.fee_currency === 'EUR' ? '€' : '$');
      return {
        type: 'text',
        content: `📊 **${awardShortName}综合评价**

✅ **优点**：
• 费用合理，早鸟价${award.fee_early_bird ? currencySymbol + award.fee_early_bird : '待公布'}性价比高
• 类别丰富，${(award.category_sub || []).length}个主要领域容易找到匹配
• 对新手${award.difficulty_level === '极高' || award.difficulty_level === '高' ? '有一定挑战' : '友好'}，${award.difficulty_level === '极高' || award.difficulty_level === '高' ? '适合有经验的设计师' : '适合首次尝试国际奖项'}
• 在${(award.industry_focus || []).slice(0, 3).join('、')}领域有一定知名度
• ${award.media_partners && award.media_partners.length > 0 ? '与多家设计媒体有合作，获奖后有曝光机会' : '获奖后有官方曝光机会'}

⚠️ **需要注意**：
• 知名度${award.prestige_level === '顶级' ? '很高，但竞争也更激烈' : '不如红点(Red Dot)、iF等顶级奖项'}
• 官方不公布获奖率，无法准确评估难度
• ${award.prize_money > 0 ? '有现金奖金' : '无现金奖金'}，获奖权益以${award.prize_money > 0 ? '奖金、' : ''}曝光和证书为主
• 一旦缴费不予退款
• 需要${award.language_primary || '英文'}投稿

🎯 **适合人群**：
• 想尝试国际奖项的${award.difficulty_level === '极高' || award.difficulty_level === '高' ? '有经验' : '新手'}设计师
• 需要作品集背书的学生
• 想拓展海外市场的中小企业
• 已有作品想增加曝光度的团队

⏰ **当前状态**：
最终截止：${award.deadline_final || '待定'}（还剩${daysLeft}天）
当前费用：${award.fee_final ? currencySymbol + award.fee_final : '待公布'}

💡 **我的建议**：
如果你是第一次投国际奖，MUSE可以作为入门选择！
如果作品已准备好，可以冲这一届；
如果时间紧张，建议准备下一届早鸟价更划算。`
      };
    }

    // 综合信息查询 - 一句话问多个问题
    if ((lowerInput.includes('参赛要求') && lowerInput.includes('费用')) || 
        (lowerInput.includes('费用') && lowerInput.includes('时间')) ||
        (lowerInput.includes('要求') && lowerInput.includes('权益')) ||
        input.length > 30 && (lowerInput.includes('材料') || lowerInput.includes('费用') || lowerInput.includes('时间'))) {
      const awardShortName = award.award_name_short || award.award_name_cn;
      const currencySymbol = award.fee_currency === 'GBP' ? '£' : (award.fee_currency === 'EUR' ? '€' : '$');
      return {
        type: 'text',
        content: `📋 **${awardShortName}综合信息**

💰 **费用情况**：
• 早鸟价：${award.fee_early_bird ? currencySymbol + award.fee_early_bird : '待公布'}
• 常规价：${award.fee_regular ? currencySymbol + award.fee_regular : '待公布'}
• 最终截止：${award.fee_final ? currencySymbol + award.fee_final : '待公布'}

⏰ **时间节点**：
• 投稿开始：${award.submission_open || '待定'}
• 最终截止：${award.deadline_final || '待定'}
• 结果公布：${award.announcement_date || '待定'}

📂 **参赛要求**：
• 作品年限：${award.project_year_limit}内完成
• 接受阶段：${(award.project_stage_accepted || []).join('、')}
• 图片数量：${award.image_min_count}-${award.image_max_count}张
• 图片规格：最低${award.image_min_resolution}

🎁 **获奖权益**：
• 奖杯、证书、数字徽章
• 官网展示、媒体推广
• 获奖者标志永久使用权

⚠️ **退款政策**：所有费用一旦缴纳，不予退款

💡 **需要了解哪方面的详细信息？**`
      };
    }

    // 奖项比较类问题
    if (lowerInput.includes('和红点') || lowerInput.includes('和iF') || lowerInput.includes('和if') || 
        lowerInput.includes('区别') || lowerInput.includes('对比') || lowerInput.includes('比较') ||
        lowerInput.includes('哪个好') || lowerInput.includes('更好') || lowerInput.includes('怎么选')) {
      const awardShortName = award.award_name_short || award.award_name_cn;
      const currencySymbol = award.fee_currency === 'GBP' ? '£' : (award.fee_currency === 'EUR' ? '€' : '$');
      const feeRange = award.fee_early_bird && award.fee_final ? `${currencySymbol}${award.fee_early_bird}-${award.fee_final}` : '待公布';
      return {
        type: 'text',
        content: `📊 **设计奖项对比参考**

设计奖项**没有权威的全球统一排名**，选择应基于您的具体需求：

| 维度 | 红点/iF | ${awardShortName} |
|------|---------|------|
| 知名度 | ⭐⭐⭐⭐⭐ 顶级 | ${award.prestige_level === '顶级' ? '⭐⭐⭐⭐⭐ 顶级' : award.prestige_level === '知名' ? '⭐⭐⭐ 知名' : '⭐⭐⭐'} |
| 费用 | 较高（€300-500+） | ${award.fee_currency === 'EUR' ? '较高' : award.fee_currency === 'GBP' ? '中等' : '中等'}（${feeRange}） |
| 难度 | 高（获奖率<5%） | 相对友好 |
| 适合 | 成熟作品/品牌背书 | 新手入门/性价比 |

🎯 **选择建议**：
• **首次参赛** → 推荐MUSE、TITAN等获奖率友好的奖项
• **追求顶级背书** → 红点、iF（但难度高）
• **预算有限** → MUSE早鸟价$199性价比高
• **作品成熟度高** → 可同时投多个奖项

💡 **MUSE的优势**：
• 费用合理，早鸟价$${award.fee_early_bird}
• 类别丰富，容易找到匹配
• 对新手友好，适合积累经验

需要我帮您评估作品更适合投哪个奖吗？`
      };
    }

    // 作品年限/时间限制
    if (lowerInput.includes('6年') || lowerInput.includes('5年') || lowerInput.includes('年限') || 
        lowerInput.includes('2020') || lowerInput.includes('2019') || lowerInput.includes('2018') ||
        (lowerInput.includes('年前') && lowerInput.includes('作品'))) {
      const awardShortName = award.award_name_short || award.award_name_cn;
      return {
        type: 'text',
        content: `📅 **${awardShortName}作品时间限制**

⏰ **硬性要求**：
作品必须是 **${award.project_year_limit || '官方未公布年限'}** 内完成的
${award.project_year_specific ? '（' + award.project_year_specific + '）' : ''}

✅ **解决方案**：
1. **查看作品实际完成时间**：
   - 确认作品是否在允许的时间范围内
   - 如不确定，可咨询主办方
   - 如果是2020年完成 → 不能投本届

2. **考虑下一届**：
   - 准备新的作品
   - 或改进旧作品形成新版本

3. **其他奖项**：
   - 部分奖项对作品年限要求不同
   - 可以咨询其他奖项的要求

💡 **建议**：
如果作品确实优秀，可以考虑：
• 重新设计/改进后作为新版本投稿
• 投其他对年限要求更宽松的奖项`
      };
    }

    // 参赛者身份/资格问题
    if (lowerInput.includes('学生') && lowerInput.includes('公司') || 
        lowerInput.includes('名义') || lowerInput.includes('身份') ||
        lowerInput.includes('用公司') || lowerInput.includes('以个人')) {
      const awardShortName = award.award_name_short || award.award_name_cn;
      const currencySymbol = award.fee_currency === 'GBP' ? '£' : (award.fee_currency === 'EUR' ? '€' : '$');
      return {
        type: 'text',
        content: `👤 **${awardShortName}参赛者身份要求**

✅ **可接受的参赛身份**：
${(award.entrant_type || []).map(t => '• ' + t).join('\n') || '• 官方未公布'}

💰 **费用对比**：
• 学生费用：${award.fee_student ? currencySymbol + award.fee_student : '官方未公布'}
• 专业费用：${award.fee_professional ? currencySymbol + award.fee_professional : '官方未公布'}

⚠️ **重要提醒**：
• 学生身份可能需要提供有效学生证明
• 作品需符合对应身份的要求
• 身份不符可能取消资格

❓ **您的情况**：
"学生用公司名义投" → 建议：
1. **如果作品是学校项目** → 用学生身份，享受优惠
2. **如果作品是公司项目** → 用专业身份，按专业费用
3. **不要混淆身份**：评审团会审核，身份不符可能取消资格

💡 **建议**：
如实申报身份，避免后续问题！`
      };
    }

    // 多类别投稿
    if (lowerInput.includes('10个') || lowerInput.includes('多个类别') || 
        lowerInput.includes('同时投') || (lowerInput.includes('几个') && lowerInput.includes('类别'))) {
      const awardShortName = award.award_name_short || award.award_name_cn;
      const currencySymbol = award.fee_currency === 'GBP' ? '£' : (award.fee_currency === 'EUR' ? '€' : '$');
      const additionalFee = award.fee_additional_category || 0;
      const baseFee = award.fee_final || 0;
      const totalFee = additionalFee > 0 ? baseFee + additionalFee * 2 : baseFee;
      return {
        type: 'text',
        content: `📂 **${awardShortName}多类别投稿规则**

✅ **多类别投稿**：
• 同一作品可投**多个类别**：${award.multi_category_allowed ? '允许' : '不允许'}
${additionalFee > 0 ? `• 每个额外类别费用：${currencySymbol}${additionalFee}` : ''}

⚠️ **限制说明**：
• 同一作品最多投**${award.entry_limit_per_project || '官方未公布'}个类别**

${additionalFee > 0 ? `💰 **费用计算示例**：
• 第1个类别：${currencySymbol}${baseFee}（基础费用）
• 第2个类别：+${currencySymbol}${additionalFee}
• 第3个类别：+${currencySymbol}${additionalFee}
• 总计：${currencySymbol}${totalFee}` : ''}

🎯 **建议**：
• 选择**最匹配**的类别
• 不要为了多投而降低匹配度
• 精准匹配比数量更重要

💡 **如何选择类别**：
告诉我您的作品类型，我帮您推荐最适合的类别！`
      };
    }

    // 含金量/价值质疑
    if (lowerInput.includes('丢人') || lowerInput.includes('水奖') || lowerInput.includes('含金量') || 
        lowerInput.includes('交钱就能') || lowerInput.includes('花钱就能') || lowerInput.includes('容易拿')) {
      const awardShortName = award.award_name_short || award.award_name_cn;
      return {
        type: 'text',
        content: `🏆 **关于${awardShortName}的价值说明**

📊 **客观定位**：
${awardShortName}是**${award.prestige_level || '国际知名'}**设计奖项。

✅ **真实价值**：
• 由${award.organizer_cn || award.organizer}主办
• 已举办${award.edition_current}届，有历史积累
• 获奖作品会在官网展示，有曝光价值
• 获奖者标志可用于作品集和商业宣传

⚠️ **理性看待**：
• 官方不公布具体获奖率数据
• 费用${award.fee_final < 300 ? '相对较低' : '适中'}，性价比高
• 适合**${award.difficulty_level === '极高' || award.difficulty_level === '高' ? '有经验的设计师' : '新手入门和积累经验'}**

🎯 **是否"丢人"？**
• **不丢人** - 毕竟是国际奖项，有一定门槛
• **看目的** - 如果是作品集背书、客户信任，有价值
• **别神化** - 也不是投了就能拿，需要作品质量

💡 **建议**：
• 把${awardShortName}作为**起点**，不是终点
• 获奖后可以继续挑战更高级别的奖项
• 重点是**作品质量**，不是奖项数量

您参赛的主要目的是什么？我可以给更具体的建议。`
      };
    }

    // 知识库查询 - 评委相关问题
    if (lowerInput.includes('评委') || lowerInput.includes('评审') || lowerInput.includes('judging panel') ||
        lowerInput.includes('评审团') || lowerInput.includes('谁评审')) {
      return {
        type: 'text',
        content: knowledgeBase.judges
      };
    }

    // 知识库查询 - 主题相关问题
    if (lowerInput.includes('主题') || lowerInput.includes('theme') || lowerInput.includes('crowning') ||
        lowerInput.includes('2026') && lowerInput.includes('主题')) {
      return {
        type: 'text',
        content: knowledgeBase.theme
      };
    }

    // 知识库查询 - IAA/主办方相关问题
    if (lowerInput.includes('iaa') || (lowerInput.includes('主办') && lowerInput.includes('协会')) ||
        lowerInput.includes('国际奖项协会') || lowerInput.includes('多少个国家')) {
      return {
        type: 'text',
        content: knowledgeBase.iaa
      };
    }

    // 知识库查询 - 奖杯相关问题
    if (lowerInput.includes('奖杯') || lowerInput.includes('trophy') || lowerInput.includes('奖品')) {
      return {
        type: 'text',
        content: knowledgeBase.trophy
      };
    }

    // 通用介绍类问题
    if (lowerInput.includes('介绍') || lowerInput.includes('说说') || lowerInput.includes('是什么') || 
        lowerInput.includes('关于') || lowerInput.includes('了解')) {
      const awardShortName = award.award_name_short || award.award_name_cn;
      const currencySymbol = award.fee_currency === 'GBP' ? '£' : (award.fee_currency === 'EUR' ? '€' : '$');
      const levels = award.award_levels || ['铂金奖', '金奖', '银奖'];
      return {
        type: 'text',
        content: `🏆 **${awardShortName}简介**

**${award.award_name_cn}**（${award.award_name_en}）是${award.country}的${award.prestige_level || '知名'}设计奖项，由${award.organizer}主办。

📅 **基本信息**：
• 创办年份：${award.first_edition_year}年
• 当前届数：第${award.edition_current}届
• 参赛类别：${(award.category_sub || []).length}个主要领域

💰 **费用情况**：
• 早鸟价：${award.fee_early_bird ? currencySymbol + award.fee_early_bird : '待公布'}
• 常规价：${award.fee_regular ? currencySymbol + award.fee_regular : '待公布'}
• 最终截止：${award.fee_final ? currencySymbol + award.fee_final : '待公布'}

🏆 **奖项等级**：${levels.join('、')}

💡 **适合人群**：
• ${(award.industry_focus || ['设计师']).join('、')}相关从业者
• ${award.award_type === '学生奖' ? '在校学生' : '设计专业学生'}
• 想拓展国际市场的企业
• 首次参赛的新手

你想了解哪方面的详细信息？`
      };
    }

    // 默认回复
    const awardShortName = award.award_name_short || award.award_name_cn;
    return {
      type: 'text',
      content: `🤔 我理解了你的问题："${input}"

关于${awardShortName}，我可以帮你了解：
• 💰 参赛费用和时间节点
• 🏆 获奖率和难度评估
• 📂 参赛类别和作品要求
• 📋 材料准备和提交规格
• 🎁 获奖权益和价值
• ⚠️ 退赛/退款政策

💡 **试试这样问我**：
"${awardShortName}费用多少？"
"${awardShortName}有哪些参赛类别？"
"获奖率怎么样？"
"需要什么材料？"
"新手适合投哪个？"
"没获奖能退费吗？"

你想了解哪方面的信息？`
    };
  },

  // 计算剩余天数
  calculateDaysLeft(deadline) {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  },

  // 滚动到底部
  scrollToBottom() {
    this.setData({
      scrollToMessage: 'msg-bottom'
    });
  },

  // 格式化时间
  formatTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  },

  // 跳转到奖项详情
  goToAwardDetail(e) {
    const awardId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/award-detail/award-detail?id=${awardId}`
    });
  },

  // 处理列表项点击
  handleListItemTap(e) {
    const item = e.currentTarget.dataset.item;
    this.setData({
      inputValue: `告诉我更多关于${item.name}的信息`
    }, () => {
      this.sendMessage();
    });
  }
});
