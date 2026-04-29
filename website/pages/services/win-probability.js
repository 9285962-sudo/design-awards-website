import Head from 'next/head'
import Link from 'next/link'

export default function WinProbability() {
  return (
    <>
      <Head>
        <title>获奖概率评估 | 设计能 - 国际设计大奖申报平台</title>
        <meta name="description" content="设计能提供专业获奖概率评估服务，多维度交叉分析，提供客观前瞻性的获奖预测报告，助您科学决策。" />
        <meta name="keywords" content="获奖概率评估,设计奖获奖率,参赛风险评估,获奖预测" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.52de.cc/services/win-probability" />
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
            <span style={styles.breadcrumbCurrent}>获奖概率评估</span>
          </div>

          {/* Content Container */}
          <div style={styles.contentContainer}>
            {/* Header Section - Blue Background */}
            <div style={styles.containerHeader}>
              <div style={styles.heroIcon}>📊</div>
              <h1 style={styles.containerTitle}>获奖概率评估</h1>
              <p style={styles.containerSubtitle}>多维度交叉分析，提供客观前瞻性的获奖预测报告，助您科学决策，优化参赛资源配置</p>
            </div>

            {/* Content Body - Light Background */}
            <div style={styles.containerBody}>

          {/* Content Sections */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>为什么要做获奖概率评估？</h2>
            <div style={styles.contentBlock}>
              <p style={styles.paragraph}>
                国际设计大奖申报是一项需要投入时间和资金的决策。在正式申报前，了解作品的获奖概率可以帮助您做出更明智的选择——是全力冲刺，还是继续打磨，或是调整参赛策略。
              </p>
              <p style={styles.paragraph}>
                我们的获奖概率评估服务，基于15年申报经验积累的1000+案例数据，结合当前行业趋势和竞争环境，为您提供科学、客观的获奖可能性分析。
              </p>
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>评估维度</h2>
            <div style={styles.dimensionsGrid}>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>01</div>
                <h3 style={styles.dimensionTitle}>作品质量评估</h3>
                <p style={styles.dimensionDesc}>从设计创新性、技术实现度、美学价值、社会影响力等维度评估作品本身质量</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>02</div>
                <h3 style={styles.dimensionTitle}>奖项契合度</h3>
                <p style={styles.dimensionDesc}>分析作品与目标奖项评审标准的匹配程度，识别优势和短板</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>03</div>
                <h3 style={styles.dimensionTitle}>竞争环境分析</h3>
                <p style={styles.dimensionDesc}>研究同类别历年参赛作品水平和获奖门槛，评估相对竞争力</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>04</div>
                <h3 style={styles.dimensionTitle}>叙事呈现质量</h3>
                <p style={styles.dimensionDesc}>评估设计说明的撰写质量、图片呈现效果、故事讲述能力</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>05</div>
                <h3 style={styles.dimensionTitle}>行业趋势匹配</h3>
                <p style={styles.dimensionDesc}>判断作品是否符合当前设计行业关注的热点和趋势方向</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>06</div>
                <h3 style={styles.dimensionTitle}>历史数据参考</h3>
                <p style={styles.dimensionDesc}>参考类似项目的历史获奖情况，提供数据支撑的概率预测</p>
              </div>
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>评估流程</h2>
            <div style={styles.processList}>
              <div style={styles.processItem}>
                <div style={styles.processStep}>1</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>资料收集与初审</h4>
                  <p style={styles.processDesc}>收集项目完整资料，进行初步筛选和分类整理</p>
                </div>
              </div>
              <div style={styles.processItem}>
                <div style={styles.processStep}>2</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>多维度专业评估</h4>
                  <p style={styles.processDesc}>专家团队从6个维度对项目进行深度评估打分</p>
                </div>
              </div>
              <div style={styles.processItem}>
                <div style={styles.processStep}>3</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>数据交叉分析</h4>
                  <p style={styles.processDesc}>结合历史数据和行业趋势，进行多维度交叉分析</p>
                </div>
              </div>
              <div style={styles.processItem}>
                <div style={styles.processStep}>4</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>概率模型计算</h4>
                  <p style={styles.processDesc}>运用评估模型计算获奖概率，识别关键影响因素</p>
                </div>
              </div>
              <div style={styles.processItem}>
                <div style={styles.processStep}>5</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>评估报告交付</h4>
                  <p style={styles.processDesc}>提供详细的概率评估报告，包含改进建议和优化方向</p>
                </div>
              </div>
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>评估报告内容</h2>
            <div style={styles.benefitsList}>
              <div style={styles.benefitItem}>✓ 综合获奖概率评级（高/中/低）</div>
              <div style={styles.benefitItem}>✓ 六个维度的详细评分</div>
              <div style={styles.benefitItem}>✓ 优势与短板分析</div>
              <div style={styles.benefitItem}>✓ 具体改进建议</div>
              <div style={styles.benefitItem}>✓ 同类项目获奖案例参考</div>
              <div style={styles.benefitItem}>✓ 参赛策略优化方案</div>
            </div>
          </section>

            {/* CTA */}
            <section style={styles.ctaSection}>
              <h2 style={styles.ctaTitle}>科学评估，让每一次参赛都更有把握</h2>
              <p style={styles.ctaDesc}>基于1000+案例数据，为您提供专业、客观的获奖概率分析</p>
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