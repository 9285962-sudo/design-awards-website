import Head from 'next/head'
import Link from 'next/link'

export default function MethodologyResearch() {
  return (
    <>
      <Head>
        <title>垂直领域创意灵感与设计方法论研究报告定制 | 设计能 - 国际设计大奖申报平台</title>
        <meta name="description" content="设计能提供垂直领域创意灵感与设计方法论研究报告定制服务，针对特定设计领域深度研究，定制专属设计方法论报告，为团队提供系统化设计思维指导和创意灵感参考。" />
        <meta name="keywords" content="设计方法论研究,设计研究报告定制,垂直领域设计研究,设计思维指导" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.52de.cc/services/methodology-research" />
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
            <span style={styles.breadcrumbCurrent}>创意灵感与设计方法论研究</span>
          </div>

          {/* Content Container */}
          <div style={styles.contentContainer}>
            {/* Header Section - Blue Background */}
            <div style={styles.containerHeader}>
              <div style={styles.heroIcon}>📚</div>
              <h1 style={styles.containerTitle}>垂直领域创意灵感与设计方法论研究报告定制</h1>
              <p style={styles.containerSubtitle}>系统整合各细分领域设计方法与创意灵感，基于红点、iF、IDEA等国际大奖获奖作品深度解析，提炼可复用的设计策略、思维模型与实践技巧</p>
            </div>

            {/* Content Body - Light Background */}
            <div style={styles.containerBody}>

          {/* 成果展示卡片 - 链接到成果介绍页 */}
          <section style={styles.achievementCardSection}>
            <Link href="/about/methodology-report" style={styles.achievementCardLink}>
              <div style={styles.achievementCard}>
                <div style={styles.achievementCardIcon}>🏆</div>
                <div style={styles.achievementCardContent}>
                  <h3 style={styles.achievementCardTitle}>查看我们的研究成果</h3>
                  <p style={styles.achievementCardDesc}>已开发健康、养老、灯饰三大领域成品报告，了解报告结构与核心价值</p>
                </div>
                <span style={styles.achievementCardArrow}>→</span>
              </div>
            </Link>
          </section>

          {/* Content Sections */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>为什么需要方法论研究？</h2>
            <div style={styles.contentBlock}>
              <p style={styles.paragraph}>
                优秀的设计不是偶然的灵感迸发，而是系统化方法论指导下的必然结果。通过对全球顶尖设计大奖获奖作品的深度研究，我们可以提炼出特定领域的设计规律、创新路径和成功要素。
              </p>
              <p style={styles.paragraph}>
                无论您是建筑设计事务所、室内设计公司，还是产品设计团队，一套系统化的设计方法论都能帮助团队建立统一的设计语言，提升设计品质，持续产出具有竞争力的作品。
              </p>
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>研究领域</h2>
            <div style={styles.dimensionsGrid}>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>01</div>
                <h3 style={styles.dimensionTitle}>建筑设计</h3>
                <p style={styles.dimensionDesc}>公共建筑、住宅建筑、商业建筑、文化建筑、可持续建筑等领域的设计方法论研究</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>02</div>
                <h3 style={styles.dimensionTitle}>室内设计</h3>
                <p style={styles.dimensionDesc}>住宅空间、商业空间、办公空间、酒店餐饮、展览展示等领域的设计方法论研究</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>03</div>
                <h3 style={styles.dimensionTitle}>景观设计</h3>
                <p style={styles.dimensionDesc}>城市景观、公园绿地、居住区景观、商业景观、生态修复等领域的设计方法论研究</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>04</div>
                <h3 style={styles.dimensionTitle}>产品设计</h3>
                <p style={styles.dimensionDesc}>消费电子、家居用品、交通工具、医疗器械、工业设备等领域的设计方法论研究</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>05</div>
                <h3 style={styles.dimensionTitle}>视觉传达</h3>
                <p style={styles.dimensionDesc}>品牌设计、包装设计、出版物设计、数字媒体、导视系统等领域的设计方法论研究</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>06</div>
                <h3 style={styles.dimensionTitle}>交互设计</h3>
                <p style={styles.dimensionDesc}>用户体验、界面设计、服务设计、智能产品、数字平台等领域的设计方法论研究</p>
              </div>
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>研究维度</h2>
            <div style={styles.dimensionsGrid}>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>01</div>
                <h3 style={styles.dimensionTitle}>获奖作品分析</h3>
                <p style={styles.dimensionDesc}>系统分析该领域近5年国际大奖获奖作品，提炼共性特征和成功要素</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>02</div>
                <h3 style={styles.dimensionTitle}>评审标准解读</h3>
                <p style={styles.dimensionDesc}>深度解读各奖项的评审标准和偏好，理解评委的关注重点</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>03</div>
                <h3 style={styles.dimensionTitle}>创新趋势研判</h3>
                <p style={styles.dimensionDesc}>分析该领域的设计创新趋势，预测未来发展方向和热点</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>04</div>
                <h3 style={styles.dimensionTitle}>设计方法提炼</h3>
                <p style={styles.dimensionDesc}>从成功案例中提炼可复制、可应用的设计方法和流程</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>05</div>
                <h3 style={styles.dimensionTitle}>叙事策略研究</h3>
                <p style={styles.dimensionDesc}>研究该领域获奖作品的成功叙事策略和表达方式</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>06</div>
                <h3 style={styles.dimensionTitle}>实操指南编制</h3>
                <p style={styles.dimensionDesc}>将研究成果转化为团队可操作的设计指南和工具</p>
              </div>
            </div>
          </section>

          {/* 研究成果展示 */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>📊 研究成果展示</h2>
            
            <div style={styles.achievementSection}>
              <h4 style={styles.achievementSubtitle}>✅ 已开发成果（成品）</h4>
              <div style={styles.achievementList}>
                <div style={styles.achievementItemCompleted}>
                  <span style={styles.achievementName}>健康领域室内设计方法论研究报告</span>
                  <span style={styles.achievementSpec}>50+国际获奖设计案例 | 2.7万字 | 5大核心维度</span>
                </div>
                <div style={styles.achievementItemCompleted}>
                  <span style={styles.achievementName}>养老领域室内设计方法论研究报告</span>
                  <span style={styles.achievementSpec}>60+国际获奖设计案例 | 3万字 | 5大核心维度</span>
                </div>
                <div style={styles.achievementItemCompleted}>
                  <span style={styles.achievementName}>灯饰（台灯）产品设计方法论研究报告</span>
                  <span style={styles.achievementSpec}>55+国际获奖设计案例 | 2.1万字 | 5大核心维度</span>
                </div>
              </div>
            </div>

            <div style={styles.achievementSection}>
              <h4 style={styles.achievementSubtitle}>🔄 正在开发（应邀定制）</h4>
              <div style={styles.achievementList}>
                <div style={styles.achievementItemInProgress}>
                  <span style={styles.achievementName}>智能家居产品设计方法论研究报告</span>
                  <span style={styles.achievementClient}>某知名家电品牌定制</span>
                </div>
                <div style={styles.achievementItemInProgress}>
                  <span style={styles.achievementName}>可持续包装设计方法论研究报告</span>
                  <span style={styles.achievementClient}>某环保材料企业定制</span>
                </div>
              </div>
            </div>

            <div style={styles.achievementSection}>
              <h4 style={styles.achievementSubtitle}>📋 计划开发领域</h4>
              <div style={styles.plannedAreas}>
                <span style={styles.plannedTag}>办公空间设计</span>
                <span style={styles.plannedTag}>餐饮空间设计</span>
                <span style={styles.plannedTag}>文创产品设计</span>
                <span style={styles.plannedTag}>商业照明设计</span>
                <span style={styles.plannedTag}>儿童产品设计</span>
              </div>
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>研究流程</h2>
            <div style={styles.processList}>
              <div style={styles.processItem}>
                <div style={styles.processStep}>1</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>需求沟通确认</h4>
                  <p style={styles.processDesc}>深入了解团队需求，确定研究领域、关注重点和预期成果</p>
                </div>
              </div>
              <div style={styles.processItem}>
                <div style={styles.processStep}>2</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>样本数据采集</h4>
                  <p style={styles.processDesc}>系统收集该领域近5年国际大奖获奖作品数据和相关资料</p>
                </div>
              </div>
              <div style={styles.processItem}>
                <div style={styles.processStep}>3</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>深度分析研究</h4>
                  <p style={styles.processDesc}>运用专业分析方法，对样本进行多维度深度分析</p>
                </div>
              </div>
              <div style={styles.processItem}>
                <div style={styles.processStep}>4</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>方法论提炼</h4>
                  <p style={styles.processDesc}>从研究中提炼设计方法论，形成系统化的理论框架</p>
                </div>
              </div>
              <div style={styles.processItem}>
                <div style={styles.processStep}>5</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>报告撰写编制</h4>
                  <p style={styles.processDesc}>撰写完整的研究报告，包含理论、案例和实操指南</p>
                </div>
              </div>
              <div style={styles.processItem}>
                <div style={styles.processStep}>6</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>成果交付培训</h4>
                  <p style={styles.processDesc}>交付研究报告，并提供团队培训和答疑服务</p>
                </div>
              </div>
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>您将获得</h2>
            <div style={styles.benefitsList}>
              <div style={styles.benefitItem}>✓ 专属领域设计方法论报告</div>
              <div style={styles.benefitItem}>✓ 获奖案例深度分析库</div>
              <div style={styles.benefitItem}>✓ 设计创新趋势研判</div>
              <div style={styles.benefitItem}>✓ 团队设计指南手册</div>
              <div style={styles.benefitItem}>✓ 实操工具和模板</div>
              <div style={styles.benefitItem}>✓ 团队培训及答疑服务</div>
            </div>
          </section>

          {/* CTA */}
          <section style={styles.ctaSection}>
            <h2 style={styles.ctaTitle}>让方法论成为团队的设计竞争力</h2>
            <p style={styles.ctaDesc}>基于1000+获奖案例研究，为您的团队定制专属设计方法论</p>
            <Link href="/contact" style={styles.ctaBtn}>立即咨询</Link>
          </section>
        </div>{/* End containerBody */}
      </div>{/* End contentContainer */}
    </div>{/* End narrowContainer */}
  </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <p style={styles.footerText}>© 2026 设计能 | 深圳日光月华文化传播有限公司 | 粤ICP备XXXXXXXX号</p>
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
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
  },
  headerInner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
  },
  logoImg: {
    height: '40px',
  },
  logoSubText: {
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    gap: '28px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'color 0.3s',
  },
  main: {
    backgroundColor: '#e8eaed',
    minHeight: 'calc(100vh - 200px)',
    padding: '40px 0 80px',
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
    fontSize: '16px',
    opacity: 0.9,
    lineHeight: 1.6,
    maxWidth: '600px',
    margin: '0 auto',
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
    color: '#999',
  },
  breadcrumbCurrent: {
    color: '#666',
  },
  heroIcon: {
    fontSize: '56px',
    marginBottom: '16px',
  },
  achievementCardSection: {
    marginBottom: '48px',
  },
  achievementCardLink: {
    textDecoration: 'none',
    display: 'block',
  },
  achievementCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    backgroundColor: '#fff',
    padding: '24px 28px',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    border: '2px solid #E3F2FD',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  achievementCardIcon: {
    fontSize: '40px',
    flexShrink: 0,
  },
  achievementCardContent: {
    flex: 1,
  },
  achievementCardTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '6px',
  },
  achievementCardDesc: {
    fontSize: '14px',
    color: '#666',
  },
  achievementCardArrow: {
    fontSize: '24px',
    color: '#D4AF37',
    fontWeight: 'bold',
  },

  section: {
    marginBottom: '48px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '32px',
    paddingBottom: '12px',
    borderBottom: '2px solid #D4AF37',
  },
  contentBlock: {
    backgroundColor: '#fff',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  },
  paragraph: {
    fontSize: '16px',
    color: '#444',
    lineHeight: 1.8,
    marginBottom: '16px',
  },
  dimensionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
  },
  dimensionCard: {
    backgroundColor: '#fff',
    padding: '28px',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    borderLeft: '4px solid #D4AF37',
  },
  dimensionNum: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: '12px',
  },
  dimensionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '8px',
  },
  dimensionDesc: {
    fontSize: '14px',
    color: '#666',
    lineHeight: 1.6,
  },
  processList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  processItem: {
    display: 'flex',
    gap: '20px',
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  },
  processStep: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#D4AF37',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    flexShrink: 0,
  },
  processContent: {
    flex: 1,
  },
  processTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '8px',
  },
  processDesc: {
    fontSize: '14px',
    color: '#666',
    lineHeight: 1.6,
  },
  benefitsList: {
    backgroundColor: '#fff',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },
  benefitItem: {
    fontSize: '16px',
    color: '#444',
    padding: '12px 0',
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
  ctaSection: {
    backgroundColor: '#1E3A5F',
    padding: '40px',
    borderRadius: '12px',
    textAlign: 'center',
    marginTop: '48px',
  },
  ctaTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '12px',
  },
  ctaDesc: {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: '24px',
  },
  ctaBtn: {
    display: 'inline-block',
    backgroundColor: '#D4AF37',
    color: '#fff',
    padding: '14px 40px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    transition: 'background-color 0.3s',
  },
  footer: {
    backgroundColor: '#1A1A1A',
    padding: '24px 0',
  },
  footerText: {
    textAlign: 'center',
    color: '#888',
    fontSize: '14px',
  },
}