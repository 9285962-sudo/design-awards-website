import Head from 'next/head'
import Link from 'next/link'

export default function WorkAnalysis() {
  return (
    <>
      <Head>
        <title>参赛作品优劣势分析及改进建议 | 设计能 - 国际设计大奖申报平台</title>
        <meta name="description" content="设计能提供专业参赛作品优劣势分析服务，以国际评委视角全方位剖析作品，明确核心优势与潜在短板，提供具象可执行的优化策略。" />
        <meta name="keywords" content="参赛作品分析,作品优劣势评估,设计奖作品优化,参赛作品改进" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.52de.cc/services/work-analysis" />
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
            <span style={styles.breadcrumbCurrent}>参赛作品优劣势分析</span>
          </div>

          {/* Content Container */}
          <div style={styles.contentContainer}>
            {/* Header Section - Blue Background */}
            <div style={styles.containerHeader}>
              <div style={styles.heroIcon}>🎯</div>
              <h1 style={styles.containerTitle}>参赛作品优劣势分析及改进建议</h1>
              <p style={styles.containerSubtitle}>以国际评委的视角，对您的作品进行全方位剖析，明确指出核心优势与潜在短板，并提供具象、可执行的优化策略</p>
            </div>

            {/* Content Body - Light Background */}
            <div style={styles.containerBody}>

          {/* Content Sections */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>为什么需要专业分析？</h2>
            <div style={styles.contentBlock}>
              <p style={styles.paragraph}>
                设计师往往对自己的作品过于熟悉，难以客观判断其竞争力。而国际评委的评审视角与设计师的创作视角存在差异——他们更关注设计的创新性、社会价值、技术实现和叙事表达。
              </p>
              <p style={styles.paragraph}>
                我们15年深耕国际设计大奖领域，累计分析超过1200个参赛作品，深谙国际评委的评审标准和审美偏好。通过我们的专业分析，您可以清晰了解作品的竞争力所在，以及需要在哪些方面进行提升。
              </p>
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>分析维度</h2>
            <div style={styles.dimensionsGrid}>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>01</div>
                <h3 style={styles.dimensionTitle}>设计创新性评估</h3>
                <p style={styles.dimensionDesc}>评估设计理念、解决方案、技术应用等方面的创新程度，判断是否具备获奖级别的创新性</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>02</div>
                <h3 style={styles.dimensionTitle}>美学价值评估</h3>
                <p style={styles.dimensionDesc}>从视觉呈现、空间感受、细节处理等角度评估作品的美学水准和艺术感染力</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>03</div>
                <h3 style={styles.dimensionTitle}>功能实用性评估</h3>
                <p style={styles.dimensionDesc}>分析设计是否有效解决实际问题，功能布局是否合理，用户体验是否优秀</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>04</div>
                <h3 style={styles.dimensionTitle}>社会价值评估</h3>
                <p style={styles.dimensionDesc}>评估设计的社会意义、环境友好性、可持续性贡献等社会价值维度</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>05</div>
                <h3 style={styles.dimensionTitle}>技术实现评估</h3>
                <p style={styles.dimensionDesc}>分析技术难度、工艺水平、材料运用等技术维度的专业性和成熟度</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>06</div>
                <h3 style={styles.dimensionTitle}>叙事呈现评估</h3>
                <p style={styles.dimensionDesc}>评估设计说明的撰写质量、图片呈现效果、故事讲述的完整性和感染力</p>
              </div>
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>分析流程</h2>
            <div style={styles.processList}>
              <div style={styles.processItem}>
                <div style={styles.processStep}>1</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>资料收集整理</h4>
                  <p style={styles.processDesc}>收集项目图纸、效果图、设计说明、创新点说明等完整资料</p>
                </div>
              </div>
              <div style={styles.processItem}>
                <div style={styles.processStep}>2</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>多维度专业评估</h4>
                  <p style={styles.processDesc}>专家团队从6个维度对作品进行深度评估，识别优势和短板</p>
                </div>
              </div>
              <div style={styles.processItem}>
                <div style={styles.processStep}>3</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>对标分析</h4>
                  <p style={styles.processDesc}>与同类获奖作品进行对比分析，明确差距和提升方向</p>
                </div>
              </div>
              <div style={styles.processItem}>
                <div style={styles.processStep}>4</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>改进建议制定</h4>
                  <p style={styles.processDesc}>针对每个短板提供具体、可执行的改进建议和优化方案</p>
                </div>
              </div>
              <div style={styles.processItem}>
                <div style={styles.processStep}>5</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>分析报告交付</h4>
                  <p style={styles.processDesc}>提供详细的优劣势分析报告，包含评分、对比和改进建议</p>
                </div>
              </div>
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>您将获得</h2>
            <div style={styles.benefitsList}>
              <div style={styles.benefitItem}>✓ 六个维度的详细评分</div>
              <div style={styles.benefitItem}>✓ 优势亮点提炼</div>
              <div style={styles.benefitItem}>✓ 短板问题识别</div>
              <div style={styles.benefitItem}>✓ 具体改进建议</div>
              <div style={styles.benefitItem}>✓ 对标获奖案例分析</div>
              <div style={styles.benefitItem}>✓ 参赛策略优化方案</div>
            </div>
          </section>

            {/* CTA */}
            <section style={styles.ctaSection}>
              <h2 style={styles.ctaTitle}>知己知彼，让参赛作品更具竞争力</h2>
              <p style={styles.ctaDesc}>15年经验，1200+作品分析，为您提供专业、客观的优劣势评估</p>
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