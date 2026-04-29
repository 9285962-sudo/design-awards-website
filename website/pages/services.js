import Head from 'next/head'
import Link from 'next/link'
import awards from '../data/awards.json'

export default function Services() {
  const museAward = awards[0]

  const services = [
    {
      icon: '🏆',
      title: '奖项精准匹配',
      desc: '根据项目特点精准匹配最适合的国际设计大奖，结合历年获奖数据、评委偏好及行业趋势，制定最佳参赛策略。',
      link: '/services/award-matching'
    },
    {
      icon: '📊',
      title: '获奖概率评估',
      desc: '多维度交叉分析，提供客观前瞻性的获奖预测报告，助您科学决策，优化参赛资源配置。',
      link: '/services/win-probability'
    },
    {
      icon: '✨',
      title: '精准叙事呈现',
      desc: '深度挖掘项目内核，将其转化为具有感染力的国际设计语言，优化版面及多媒体材料，确保您的创意被精准且动人地呈现。',
      link: '/services/storytelling'
    }
  ]

  const process = [
    { step: '01', items: ['参赛作品初审', '参赛策略提案'] },
    { step: '02', items: ['分析匹配奖项', '挑选参赛图片'] },
    { step: '03', items: ['撰写竞赛文案', '专业语言翻译'] },
    { step: '04', items: ['图片合规处理', '图文美工排版'] },
    { step: '05', items: ['投递参赛作品', '完成缴费手续'] },
    { step: '06', items: ['报告评审结果', '处理获奖事宜'] },
    { step: '07', items: ['获奖新闻报道', '获奖作品发布'] }
  ]

  const advantages = [
    { icon: '⭐', title: '经验丰富', desc: '15年深耕国际设计大奖申报，熟悉全球各大奖项的评审标准和偏好' },
    { icon: '🌐', title: '资源广泛', desc: '与108个全球奖项建立官方合作，涵盖建筑、室内、景观、产品、视觉传达全品类' },
    { icon: '🏆', title: '成功率高', desc: '80%平均获奖率，累计服务350+设计师，1000+作品成功获奖' },
    { icon: '💎', title: '省心省力', desc: '全程代理服务，您只需提供作品资料，其他所有流程交给我们' }
  ]

  return (
    <>
      <Head>
        <title>专业代理服务 | 设计能 - 国际设计大奖申报平台</title>
        <meta name="description" content="设计能提供专业国际设计大奖代理申报服务：参赛作品优劣势分析、获奖概率评估、荣誉价值最大化、精准叙事呈现。15年经验，国际奖项研究、参赛策略咨询，合作108个奖项，获奖率80%。" />
        <meta name="keywords" content="设计大奖代理,报奖服务,代理申报,国际奖项研究,参赛策略咨询,国际设计奖申报,参赛代理服务,MUSE奖代理,红点奖代理,iF奖代理" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.52de.cc/services" />
      </Head>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.container}>
          <div style={styles.headerInner}>
            <div style={styles.logo}>
              <Link href="/" style={styles.logoLink}>
                <img src="/设计能LOGO透明文件.png" alt="设计能" style={styles.logoImg} />
                <span style={styles.logoSubText}>国际设计大奖策略咨询平台</span>
              </Link>
            </div>
            <nav style={styles.nav}>
              <Link href="/" style={styles.navLink}>首页</Link>
              <Link href="/awards" style={styles.navLink}>奖项库</Link>
              <Link href="/compare" style={styles.navLink}>奖项对比</Link>
              <Link href="/services" style={{...styles.navLink, color: '#D4AF37'}}>申报服务</Link>
              <Link href="/strategy" style={styles.navLink}>参赛策略</Link>
              <Link href="/news" style={styles.navLink}>赛事新闻</Link>
              <Link href="/about" style={styles.navLink}>关于我们</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.container}>
          <h1 style={styles.heroTitle}>15年专注国际设计大奖申报</h1>
          <p style={styles.heroSubtitle}>让专业的人做专业的事，让您的设计被世界看见</p>
          <div style={styles.heroStats}>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>500+</span>
              <span style={styles.statLabel}>服务设计师</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>800+</span>
              <span style={styles.statLabel}>服务案例</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>600+</span>
              <span style={styles.statLabel}>获奖案例</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>75%</span>
              <span style={styles.statLabel}>平均获奖率</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>服务亮点</h2>
          <div style={styles.servicesGrid}>
            {services.map((service, index) => (
              <Link 
                key={index} 
                href={service.link}
                style={{textDecoration: 'none'}}
              >
                <div style={styles.serviceCard}>
                  <div style={styles.serviceIcon}>{service.icon}</div>
                  <h3 style={styles.serviceTitle}>{service.title}</h3>
                  <p style={styles.serviceDesc}>{service.desc}</p>
                  <div style={styles.serviceLink}>了解详情 →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section style={{...styles.section, backgroundColor: '#fff'}}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>服务流程</h2>
          <div style={styles.processRow}>
            {process.map((item, index) => (
              <div key={index} style={styles.processItem}>
                <div style={styles.processStep}>{item.step}</div>
                {item.items.map((text, i) => (
                  <p key={i} style={styles.processItemText}>{text}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>为什么选择我们</h2>
          <div style={styles.advantagesGrid}>
            {advantages.map((item, index) => (
              <div key={index} style={styles.advantageItem}>
                <div style={styles.advantageIcon}>{item.icon}</div>
                <h3 style={styles.advantageTitle}>{item.title}</h3>
                <p style={styles.advantageDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value-Added Services Section */}
      <section style={{...styles.section, backgroundColor: '#fff'}}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>增值服务</h2>
          <div style={styles.valueAddedGrid}>
            <Link href="/services/work-analysis" style={{textDecoration: 'none'}}>
              <div style={{...styles.valueAddedItem, cursor: 'pointer'}}>
                <div style={styles.valueAddedIcon}>🎯</div>
                <h3 style={styles.valueAddedTitle}>参赛作品优劣势分析及改进建议</h3>
                <p style={styles.valueAddedDesc}>以国际评委的视角，对您的作品进行全方位剖析，明确指出核心优势与潜在短板，并提供具象、可执行的优化策略。</p>
                <span style={styles.detailLink}>了解详情 →</span>
              </div>
            </Link>
            <Link href="/services/methodology-research" style={{textDecoration: 'none'}}>
              <div style={{...styles.valueAddedItem, cursor: 'pointer'}}>
                <div style={styles.valueAddedIcon}>📚</div>
                <h3 style={styles.valueAddedTitle}>垂直领域设计方法论研究报告定制</h3>
                <p style={styles.valueAddedDesc}>基于红点、iF、IDEA等大奖获奖作品深度解析，提炼可复用的设计策略与思维模型，单品类报告涵盖50+国际案例。</p>
                <span style={styles.detailLink}>了解详情 →</span>
              </div>
            </Link>
            <Link href="/services/honor-conversion" style={{textDecoration: 'none'}}>
              <div style={{...styles.valueAddedItem, cursor: 'pointer'}}>
                <div style={styles.valueAddedIcon}>💎</div>
                <h3 style={styles.valueAddedTitle}>荣誉转化与价值变现</h3>
                <p style={styles.valueAddedDesc}>获奖后提供从品牌宣传、媒体公关到市场转化的全方位策略，助您将这份荣誉转化为切实的品牌资产与商业价值。</p>
                <span style={styles.detailLink}>了解详情 →</span>
              </div>
            </Link>
            <Link href="/services/ip-incubation" style={{textDecoration: 'none'}}>
              <div style={{...styles.valueAddedItem, cursor: 'pointer'}}>
                <div style={styles.valueAddedIcon}>👤</div>
                <h3 style={styles.valueAddedTitle}>设计师个人IP孵化服务</h3>
                <p style={styles.valueAddedDesc}>从"懂设计"到"被记住"的IP化跃迁，通过十大核心模块，帮您建立差异化定位、构建影响力并实现商业变现。</p>
                <span style={styles.detailLink}>了解详情 →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{...styles.section, backgroundColor: '#f8f9fa'}}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>常见问题</h2>
          <div style={styles.faqList}>
            <div style={styles.faqItem}>
              <h3 style={styles.faqQ}>代理申报和自己申报有什么区别？</h3>
              <p style={styles.faqA}>
                主要区别在于专业度和成功率。我们15年研究各奖项评审标准，懂得如何从评委视角包装项目，让您的作品更容易脱颖而出。同时，我们处理所有英文材料和流程细节，省去您的沟通成本。
              </p>
            </div>
            <div style={styles.faqItem}>
              <h3 style={styles.faqQ}>费用是怎么计算的？</h3>
              <p style={styles.faqA}>
                费用分为两种：一种是奖项官方收取的报名费，另一种是我方收取的代理申报服务费。官方收取的报名费每个奖是不一样的，收费机制也不相同，在本站奖项详情页可查询。我方收取的参赛服务费也是根据不同奖项的服务难度不同而不同。具体费用请咨询服务电话：13692222744（何先生）微信同号。
              </p>
            </div>
            <div style={styles.faqItem}>
              <h3 style={styles.faqQ}>设计师在申报奖项前期需要做哪些准备工作？</h3>
              <p style={styles.faqA}>
                1、作品文字素材：设计灵感/理念、设计说明、故事背景、创新特点、技术难点与挑战、社会价值/进步意义<br/>
                2、作品图档资料：项目实景图或效果图、平面图、设计手稿/施工图<br/>
                3、团队介绍资料表：团队背景、主营业务、学历/经历/获奖履历介绍、公司文化理念、团队照片<br/>
                4、其他辅助资料：网站、视频、模型等（硬性或选择性提供）<br/>
                5、自备境外支付卡（VISA/MASTERCARD）
              </p>
            </div>
            <div style={styles.faqItem}>
              <h3 style={styles.faqQ}>如果没获奖可以退款吗？</h3>
              <p style={styles.faqA}>
                我们会在申报前对项目进行专业评估，确保有较高获奖概率才会接单。但奖项评审本身存在不确定性，我们承诺：如果是因为我们的材料问题导致未获奖，我们将提供免费重新申报或部分退款。
              </p>
            </div>
            <div style={styles.faqItem}>
              <h3 style={styles.faqQ}>获奖后可以获得哪些支持？</h3>
              <p style={styles.faqA}>
                我们提供完整的获奖后服务：获奖证书/奖杯接收与邮寄、官方媒体公关报道、社交媒体推广素材包、品牌宣传海报设计、获奖案例入库展示、以及后续其他奖项的申报建议等，全方位助您将荣誉转化为品牌资产。
              </p>
            </div>
            <div style={styles.faqItem}>
              <h3 style={styles.faqQ}>申报周期一般需要多长时间？</h3>
              <p style={styles.faqA}>
                完整的申报周期通常为2-4个月，具体取决于：奖项的截止日期、材料的准备进度、审核与修改轮次等。我们会在服务开始时制定详细的时间表，确保每个环节按时推进。
              </p>
            </div>
            <div style={styles.faqItem}>
              <h3 style={styles.faqQ}>可以同时申报多个奖项吗？</h3>
              <p style={styles.faqA}>
                可以。我们会根据您的作品特点，推荐最合适的奖项组合，同时申报多个相关奖项可以大大提高整体获奖概率。当然，我们也会根据实际情况给出专业建议，避免资源浪费。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.container}>
          <h2 style={styles.ctaTitle}>开始您的获奖之旅</h2>
          <p style={styles.ctaDesc}>让专业的人做专业的事，让你的设计被世界看见</p>
          <div style={styles.ctaButtonsCentered}>
            <Link href="/about" style={styles.btnPrimary}>立即咨询</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <p style={styles.footerText}>© 2026 设计能 | 深圳日光月华文化传播有限公司</p>
          <p style={styles.footerSub}>www.52de.cc | 13692222744</p>
        </div>
      </footer>
    </>
  )
}

const styles = {
  header: {
    backgroundColor: '#1A1A1A',
    padding: '16px 0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  headerInner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  logoLink: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  logoImg: {
    height: '40px',
    width: 'auto',
  },
  logoSubText: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#D4AF37',
    marginLeft: '12px',
  },
  nav: {
    display: 'flex',
    gap: '28px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '14px',
    opacity: 0.9,
    transition: 'opacity 0.2s',
  },
  hero: {
    background: 'linear-gradient(135deg, #1E3A5F 0%, #2d4a6f 100%)',
    padding: '80px 0',
    textAlign: 'center',
    color: '#fff',
  },
  heroTitle: {
    fontSize: '42px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  heroSubtitle: {
    fontSize: '20px',
    opacity: 0.9,
    marginBottom: '40px',
  },
  heroStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '60px',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  statLabel: {
    fontSize: '16px',
    opacity: 0.8,
    marginTop: '8px',
  },
  section: {
    padding: '64px 0',
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '48px',
    color: '#1E3A5F',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '32px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  serviceCard: {
    backgroundColor: '#fff',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    border: '1px solid #E5E5E5',
  },
  serviceIcon: {
    fontSize: '36px',
    marginBottom: '16px',
  },
  serviceTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '12px',
  },
  serviceDesc: {
    fontSize: '15px',
    color: '#666',
    lineHeight: 1.8,
    marginBottom: '16px',
  },
  serviceLink: {
    fontSize: '14px',
    color: '#D4AF37',
    fontWeight: 'bold',
    marginTop: 'auto',
  },
  btnPrimary: {
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    padding: '12px 32px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '14px',
    display: 'inline-block',
  },
  btnOutline: {
    backgroundColor: 'transparent',
    color: '#1E3A5F',
    padding: '12px 32px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '14px',
    border: '1px solid #1E3A5F',
    display: 'inline-block',
  },
  processGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },
  processRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '12px',
    flexWrap: 'wrap',
  },
  turnArrow: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  processRowSecond: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '16px',
  },
  processItem: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '16px 12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    border: '1px solid #E5E5E5',
    textAlign: 'center',
    position: 'relative',
    flex: '1 1 calc(14.28% - 12px)',
    minWidth: '140px',
    maxWidth: '160px',
  },
  processItemSecond: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    border: '1px solid #E5E5E5',
    textAlign: 'center',
    position: 'relative',
    minWidth: '180px',
    flex: '0 0 auto',
  },
  processArrow: {
    position: 'absolute',
    right: '-28px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
  },
  processArrowLeft: {
    position: 'absolute',
    left: '-28px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
  },
  arrowImg: {
    width: '24px',
    height: 'auto',
  },
  arrowImgVertical: {
    width: 'auto',
    height: '24px',
  },
  processStep: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: '12px',
  },
  processItemText: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '6px',
    lineHeight: '1.4',
  },
  advantagesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
  },
  advantageItem: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '8px',
    textAlign: 'center',
    border: '1px solid #E5E5E5',
  },
  advantageIcon: {
    fontSize: '40px',
    marginBottom: '12px',
  },
  advantageTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '8px',
  },
  advantageDesc: {
    fontSize: '14px',
    color: '#666',
    lineHeight: 1.6,
  },
  extendedServicesGrid: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  extendedServiceItem: {
    backgroundColor: '#fff',
    padding: '28px 32px',
    borderRadius: '12px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    border: '1px solid #E5E5E5',
    borderLeft: '4px solid #D4AF37',
  },
  extendedServiceTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '12px',
  },
  extendedServiceDesc: {
    fontSize: '15px',
    color: '#555',
    lineHeight: 1.8,
  },
  valueAddedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  valueAddedItem: {
    backgroundColor: '#fff',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    border: '1px solid #E5E5E5',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  valueAddedIcon: {
    fontSize: '40px',
    marginBottom: '16px',
  },
  valueAddedTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '12px',
    lineHeight: 1.4,
  },
  valueAddedDesc: {
    fontSize: '14px',
    color: '#666',
    lineHeight: 1.7,
  },
  detailLink: {
    display: 'inline-block',
    marginTop: '16px',
    color: '#D4AF37',
    fontSize: '14px',
    fontWeight: '500',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  methodologyAchievements: {
    maxWidth: '900px',
    margin: '40px auto 0',
    padding: '32px',
    backgroundColor: '#f8f9fa',
    borderRadius: '16px',
    border: '1px solid #E5E5E5',
  },
  achievementsTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '24px',
    textAlign: 'center',
  },
  achievementSection: {
    marginBottom: '24px',
  },
  achievementSubtitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '12px',
    paddingBottom: '8px',
    borderBottom: '2px solid #D4AF37',
    display: 'inline-block',
  },
  achievementList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  achievementItemCompleted: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    borderLeft: '4px solid #4CAF50',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  achievementItemInProgress: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    borderLeft: '4px solid #FF9800',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  achievementName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1E3A5F',
  },
  achievementSpec: {
    fontSize: '12px',
    color: '#666',
    backgroundColor: '#f0f0f0',
    padding: '4px 10px',
    borderRadius: '12px',
  },
  achievementClient: {
    fontSize: '12px',
    color: '#FF9800',
    fontStyle: 'italic',
  },
  plannedAreas: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  plannedTag: {
    fontSize: '13px',
    color: '#666',
    backgroundColor: '#fff',
    padding: '6px 14px',
    borderRadius: '16px',
    border: '1px dashed #ccc',
  },
  ipServiceRow: {
    marginTop: '40px',
    maxWidth: '900px',
    margin: '40px auto 0',
  },
  ipServiceCard: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: '2px solid #D4AF37',
    textAlign: 'left',
  },
  ipServiceHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '20px',
  },
  ipServiceIcon: {
    fontSize: '48px',
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: '50%',
    border: '2px solid #D4AF37',
  },
  ipServiceTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '8px',
  },
  ipServiceSubtitle: {
    fontSize: '16px',
    color: '#D4AF37',
    fontWeight: '500',
  },
  ipServiceDesc: {
    fontSize: '15px',
    color: '#555',
    lineHeight: 1.8,
    marginBottom: '24px',
  },
  ipModulesPreview: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '20px',
  },
  ipModuleTag: {
    fontSize: '13px',
    color: '#1E3A5F',
    backgroundColor: '#f8f9fa',
    padding: '6px 12px',
    borderRadius: '16px',
    border: '1px solid #E5E5E5',
  },
  faqList: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  faqItem: {
    backgroundColor: '#f8f9fa',
    padding: '24px',
    borderRadius: '8px',
    marginBottom: '16px',
  },
  faqQ: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '12px',
  },
  faqA: {
    fontSize: '15px',
    color: '#666',
    lineHeight: 1.8,
  },
  ctaSection: {
    backgroundColor: '#1E3A5F',
    padding: '80px 0',
    textAlign: 'center',
    color: '#fff',
  },
  ctaTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  ctaDesc: {
    fontSize: '18px',
    opacity: 0.9,
    marginBottom: '32px',
  },
  ctaButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
  },
  ctaButtonsCentered: {
    display: 'flex',
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: '#1A1A1A',
    padding: '32px 0',
    textAlign: 'center',
    color: '#fff',
  },
  footerText: {
    fontSize: '14px',
    marginBottom: '8px',
  },
  footerSub: {
    fontSize: '12px',
    opacity: 0.6,
  },
}
