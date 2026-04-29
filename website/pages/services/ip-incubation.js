import Head from 'next/head'
import Link from 'next/link'

export default function IPIncubation() {
  const modules = [
    {
      num: '01',
      title: '定位筑基系统',
      en: 'Positioning System',
      items: ['找到差异化定位，建立个人品牌基础', '明确目标受众，打造独特人设标签', '构建个人品牌故事，形成记忆锚点']
    },
    {
      num: '02',
      title: '内容创作系统',
      en: 'Content Creation System',
      items: ['持续输出专业内容，建立专业影响力', '设计内容矩阵，覆盖多场景触达', '建立内容生产SOP，保证输出稳定性']
    },
    {
      num: '03',
      title: '视觉统一系统',
      en: 'Visual Identity System',
      items: ['打造个人视觉识别体系，提升品牌辨识度', '统一各平台视觉风格，形成视觉记忆', '设计个人专属视觉符号系统']
    },
    {
      num: '04',
      title: '平台运营系统',
      en: 'Platform Operation System',
      items: ['多平台矩阵运营，扩大触达范围', '制定各平台运营策略，精准触达目标用户', '数据驱动优化，持续提升运营效率']
    },
    {
      num: '05',
      title: '作品转化系统',
      en: 'Portfolio Conversion System',
      items: ['将作品转化为商业价值，实现变现闭环', '设计作品展示逻辑，提升转化效率', '建立作品与商业需求的连接桥梁']
    },
    {
      num: '06',
      title: '商业变现系统',
      en: 'Monetization System',
      items: ['设计多元化收入模型，稳定商业收益', '构建产品服务体系，实现价值交付', '建立长期客户关系，实现持续复购']
    },
    {
      num: '07',
      title: '沟通影响力系统',
      en: 'Communication Influence System',
      items: ['提升演讲与表达能力，扩大个人影响力', '掌握公众表达技巧，建立行业话语权', '打造个人风格化的沟通方式']
    },
    {
      num: '08',
      title: '生态协作系统',
      en: 'Ecosystem Collaboration System',
      items: ['构建行业资源网络，实现资源整合', '建立战略合作关系，扩大影响力边界', '参与行业生态建设，提升行业地位']
    },
    {
      num: '09',
      title: '心智建设系统',
      en: 'Mindset Building System',
      items: ['建立IP运营心智模式，保持长期主义', '培养商业思维，理解价值创造逻辑', '打造持续成长的学习系统']
    },
    {
      num: '10',
      title: '未来洞察系统',
      en: 'Future Insight System',
      items: ['把握行业趋势，提前布局未来', '建立趋势预判能力，抢占先机', '持续迭代升级，保持竞争优势']
    }
  ]

  const values = [
    { icon: '🎯', title: '建立差异化定位', desc: '从同质化竞争中脱颖而出' },
    { icon: '📢', title: '构建内容影响力', desc: '持续输出，积累专业口碑' },
    { icon: '💰', title: '实现商业变现', desc: '将专业能力转化为稳定收入' },
    { icon: '💎', title: '打造长期价值', desc: '建立可持续的个人品牌资产' }
  ]

  return (
    <>
      <Head>
        <title>设计师个人IP孵化服务 | 设计能 - 国际设计大奖申报平台</title>
        <meta name="description" content="设计师个人IP孵化服务，从懂设计到被记住的IP化跃迁。十大核心模块系统化打造，帮助设计师建立差异化定位、构建内容影响力、实现商业变现。" />
        <meta name="keywords" content="设计师IP,个人品牌,设计师孵化,IP打造,设计师营销,个人影响力" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.52de.cc/services/ip-incubation" />
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

      {/* Main Content - Narrow Layout */}
      <main style={styles.main}>
        <div style={styles.narrowContainer}>
          {/* Breadcrumb */}
          <div style={styles.breadcrumb}>
            <Link href="/" style={styles.breadcrumbLink}>首页</Link>
            <span style={styles.breadcrumbSep}>›</span>
            <Link href="/services" style={styles.breadcrumbLink}>申报服务</Link>
            <span style={styles.breadcrumbSep}>›</span>
            <span style={styles.breadcrumbCurrent}>设计师个人IP孵化</span>
          </div>

          {/* Content Container */}
          <div style={styles.contentContainer}>
            {/* Header Section - Blue Background */}
            <div style={styles.containerHeader}>
              <div style={styles.heroIcon}>👤</div>
              <h1 style={styles.containerTitle}>设计师个人IP孵化服务</h1>
              <p style={styles.containerSubtitle}>从"懂设计"到"被记住"的IP化跃迁</p>
              <p style={styles.containerDesc}>不仅是技能提升，更是商业价值的系统重构</p>
            </div>

            {/* Content Body - Light Background */}
            <div style={styles.containerBody}>

          {/* Core Concept */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>核心理念</h2>
            <div style={styles.contentBlock}>
              <p style={styles.paragraph}>
                在信息爆炸的时代，优秀的设计作品层出不穷，但能被记住的设计师却凤毛麟角。
                个人IP不仅是专业能力的展示，更是差异化价值的传递。
              </p>
              <p style={styles.paragraph}>
                我们帮助设计师从"会做设计"到"被看见、被记住、被选择"，
                通过十大核心模块的系统化打造，构建可持续的个人品牌资产。
              </p>
            </div>
          </section>

          {/* 10 Modules */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>十大核心模块</h2>
            <div style={styles.modulesGrid}>
              {modules.map((module, index) => (
                <div key={index} style={styles.moduleCard}>
                  <div style={styles.moduleHeader}>
                    <span style={styles.moduleNum}>{module.num}</span>
                    <div>
                      <h3 style={styles.moduleTitle}>{module.title}</h3>
                      <span style={styles.moduleEn}>{module.en}</span>
                    </div>
                  </div>
                  <ul style={styles.moduleList}>
                    {module.items.map((item, i) => (
                      <li key={i} style={styles.moduleItem}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Service Value */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>服务价值</h2>
            <div style={styles.valuesGrid}>
              {values.map((value, index) => (
                <div key={index} style={styles.valueCard}>
                  <div style={styles.valueIcon}>{value.icon}</div>
                  <h3 style={styles.valueTitle}>{value.title}</h3>
                  <p style={styles.valueDesc}>{value.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Target Audience */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>适合人群</h2>
            <div style={styles.audienceGrid}>
              <div style={styles.audienceCard}>
                <div style={styles.audienceIcon}>🎨</div>
                <h3 style={styles.audienceTitle}>独立设计师</h3>
                <p style={styles.audienceDesc}>希望建立个人品牌，获取更多优质客户资源</p>
              </div>
              <div style={styles.audienceCard}>
                <div style={styles.audienceIcon}>🏢</div>
                <h3 style={styles.audienceTitle}>设计工作室创始人</h3>
                <p style={styles.audienceDesc}>想要提升个人及工作室的行业影响力</p>
              </div>
              <div style={styles.audienceCard}>
                <div style={styles.audienceIcon}>🚀</div>
                <h3 style={styles.audienceTitle}>有野心的新锐设计师</h3>
                <p style={styles.audienceDesc}>渴望快速建立行业知名度，实现职业跃迁</p>
              </div>
              <div style={styles.audienceCard}>
                <div style={styles.audienceIcon}>💼</div>
                <h3 style={styles.audienceTitle}>寻求转型的资深设计师</h3>
                <p style={styles.audienceDesc}>希望从执行者转型为意见领袖或创业者</p>
              </div>
            </div>
          </section>

            {/* CTA Section */}
            <section style={styles.ctaSection}>
              <p style={styles.ctaSlogan}>让好设计被看见，让好设计师被记住</p>
              <h2 style={styles.ctaTitle}>开启您的IP孵化之旅</h2>
              <p style={styles.ctaDesc}>预约免费咨询，获取个性化IP打造方案</p>
              <div style={styles.ctaButtons}>
                <Link href="/about" style={styles.btnPrimary}>立即咨询</Link>
                <Link href="/services" style={styles.btnOutline}>返回服务列表</Link>
              </div>
            </section>
          </div>{/* End containerBody */}
        </div>{/* End contentContainer */}
      </div>{/* End narrowContainer */}
      </main>

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
  },
  main: {
    backgroundColor: '#e8eaed',
    padding: '40px 0 80px',
    minHeight: 'calc(100vh - 200px)',
  },
  narrowContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 24px',
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  containerHeader: {
    background: 'linear-gradient(135deg, #1E3A5F 0%, #2d4a6f 100%)',
    padding: '48px 40px',
    textAlign: 'center',
    color: '#fff',
  },
  containerTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '12px',
  },
  containerSubtitle: {
    fontSize: '20px',
    color: '#D4AF37',
    marginBottom: '8px',
  },
  containerDesc: {
    fontSize: '16px',
    opacity: 0.9,
  },
  containerBody: {
    backgroundColor: '#f8f9fa',
    padding: '48px 40px',
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '32px',
    fontSize: '14px',
    color: '#666',
  },
  breadcrumbLink: {
    color: '#1E3A5F',
    textDecoration: 'none',
  },
  breadcrumbSep: {
    color: '#ccc',
  },
  breadcrumbCurrent: {
    color: '#999',
  },
  heroIcon: {
    fontSize: '56px',
    marginBottom: '16px',
  },
  section: {
    marginBottom: '48px',
  },
  sectionTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '32px',
    textAlign: 'center',
  },
  contentBlock: {
    backgroundColor: '#fff',
    padding: '32px',
    borderRadius: '12px',
    border: '1px solid #e5e5e5',
  },
  paragraph: {
    fontSize: '16px',
    color: '#555',
    lineHeight: 1.8,
    marginBottom: '16px',
  },
  modulesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  },
  moduleCard: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid #e5e5e5',
  },
  moduleHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '1px solid #f0f0f0',
  },
  moduleNum: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#D4AF37',
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: '50%',
    flexShrink: 0,
  },
  moduleTitle: {
    fontSize: '17px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '2px',
  },
  moduleEn: {
    fontSize: '12px',
    color: '#999',
    fontStyle: 'italic',
  },
  moduleList: {
    margin: 0,
    paddingLeft: '16px',
  },
  moduleItem: {
    fontSize: '14px',
    color: '#555',
    lineHeight: 1.7,
    marginBottom: '6px',
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
  },
  valueCard: {
    backgroundColor: '#fff',
    padding: '24px 16px',
    borderRadius: '12px',
    textAlign: 'center',
    border: '1px solid #e5e5e5',
  },
  valueIcon: {
    fontSize: '36px',
    marginBottom: '12px',
  },
  valueTitle: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '6px',
  },
  valueDesc: {
    fontSize: '13px',
    color: '#666',
    lineHeight: 1.5,
  },
  audienceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
  },
  audienceCard: {
    backgroundColor: '#fff',
    padding: '24px 16px',
    borderRadius: '12px',
    textAlign: 'center',
    border: '1px solid #e5e5e5',
  },
  audienceIcon: {
    fontSize: '36px',
    marginBottom: '12px',
  },
  audienceTitle: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '6px',
  },
  audienceDesc: {
    fontSize: '13px',
    color: '#666',
    lineHeight: 1.5,
  },
  ctaSection: {
    backgroundColor: '#1E3A5F',
    padding: '40px',
    borderRadius: '12px',
    textAlign: 'center',
    color: '#fff',
    marginTop: '48px',
  },
  ctaSlogan: {
    fontSize: '18px',
    color: '#D4AF37',
    fontStyle: 'italic',
    marginBottom: '12px',
  },
  ctaTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '12px',
  },
  ctaDesc: {
    fontSize: '16px',
    opacity: 0.9,
    marginBottom: '28px',
  },
  ctaButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
  },
  btnPrimary: {
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    padding: '14px 32px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '15px',
  },
  btnOutline: {
    backgroundColor: 'transparent',
    color: '#fff',
    padding: '14px 32px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '15px',
    border: '1px solid rgba(255,255,255,0.5)',
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
