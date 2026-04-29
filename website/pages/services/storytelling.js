import Head from 'next/head'
import Link from 'next/link'

export default function Storytelling() {
  return (
    <>
      <Head>
        <title>精准叙事呈现 | 设计能 - 国际设计大奖申报平台</title>
        <meta name="description" content="设计能提供专业精准叙事呈现服务，深度挖掘项目内核，转化为具有感染力的国际设计语言，确保您的创意被精准且动人地呈现。" />
        <meta name="keywords" content="精准叙事呈现,设计奖文案撰写,参赛作品包装,设计说明撰写" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.52de.cc/services/storytelling" />
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
            <span style={styles.breadcrumbCurrent}>精准叙事呈现</span>
          </div>

          {/* Content Container */}
          <div style={styles.contentContainer}>
            {/* Header Section - Blue Background */}
            <div style={styles.containerHeader}>
              <div style={styles.heroIcon}>✨</div>
              <h1 style={styles.containerTitle}>精准叙事呈现</h1>
              <p style={styles.containerSubtitle}>深度挖掘项目内核，将其转化为具有感染力的国际设计语言，确保您的创意被精准且动人地呈现</p>
            </div>

            {/* Content Body - Light Background */}
            <div style={styles.containerBody}>

          {/* Content Sections */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>为什么叙事很重要？</h2>
            <div style={styles.contentBlock}>
              <p style={styles.paragraph}>
                在国际设计大奖评审中，评委往往需要在短时间内浏览大量作品。一个好的设计，如果没有被恰当地讲述，很可能被埋没。反之，一个普通的设计，如果有一个动人的故事，却能脱颖而出。
              </p>
              <p style={styles.paragraph}>
                我们深谙国际评委的阅读习惯和审美偏好，知道如何用他们熟悉的语言，讲述一个既有深度又有感染力的设计故事。不是夸大其词，而是精准提炼——找到项目最打动人的那个点，用恰当的方式呈现出来。
              </p>
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>叙事维度</h2>
            <div style={styles.dimensionsGrid}>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>01</div>
                <h3 style={styles.dimensionTitle}>设计理念挖掘</h3>
                <p style={styles.dimensionDesc}>深度访谈设计师，挖掘设计背后的灵感来源、思考过程和核心理念</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>02</div>
                <h3 style={styles.dimensionTitle}>创新点提炼</h3>
                <p style={styles.dimensionDesc}>识别项目的独特创新之处，用简洁有力的语言进行精准描述</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>03</div>
                <h3 style={styles.dimensionTitle}>价值阐述</h3>
                <p style={styles.dimensionDesc}>阐述设计的社会价值、环境价值、经济价值和人文价值</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>04</div>
                <h3 style={styles.dimensionTitle}>故事构建</h3>
                <p style={styles.dimensionDesc}>构建有起承转合的设计叙事，让评委产生情感共鸣</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>05</div>
                <h3 style={styles.dimensionTitle}>语言优化</h3>
                <p style={styles.dimensionDesc}>使用国际评委认可的专业术语和表达方式，避免文化隔阂</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>06</div>
                <h3 style={styles.dimensionTitle}>视觉呈现</h3>
                <p style={styles.dimensionDesc}>优化图片选择、排版设计和多媒体材料，强化叙事效果</p>
              </div>
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>服务流程</h2>
            <div style={styles.processList}>
              <div style={styles.processItem}>
                <div style={styles.processStep}>1</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>项目深度访谈</h4>
                  <p style={styles.processDesc}>与设计师深入交流，了解项目背景、设计思路和创作过程</p>
                </div>
              </div>
              <div style={styles.processItem}>
                <div style={styles.processStep}>2</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>素材梳理分析</h4>
                  <p style={styles.processDesc}>整理项目图纸、照片、手稿等素材，分析叙事角度和亮点</p>
                </div>
              </div>
              <div style={styles.processItem}>
                <div style={styles.processStep}>3</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>叙事框架搭建</h4>
                  <p style={styles.processDesc}>确定核心叙事主线，构建完整的故事框架和逻辑结构</p>
                </div>
              </div>
              <div style={styles.processItem}>
                <div style={styles.processStep}>4</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>文案撰写打磨</h4>
                  <p style={styles.processDesc}>撰写设计说明文案，反复打磨，确保语言精准、表达动人</p>
                </div>
              </div>
              <div style={styles.processItem}>
                <div style={styles.processStep}>5</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>视觉优化呈现</h4>
                  <p style={styles.processDesc}>优化图片选择和排版设计，确保视觉呈现与文字叙事相得益彰</p>
                </div>
              </div>
              <div style={styles.processItem}>
                <div style={styles.processStep}>6</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>专业翻译审核</h4>
                  <p style={styles.processDesc}>专业英文翻译和母语审核，确保国际评委能准确理解</p>
                </div>
              </div>
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>您将获得</h2>
            <div style={styles.benefitsList}>
              <div style={styles.benefitItem}>✓ 专业设计说明文案（中英文）</div>
              <div style={styles.benefitItem}>✓ 优化后的图片素材包</div>
              <div style={styles.benefitItem}>✓ 专业排版设计文件</div>
              <div style={styles.benefitItem}>✓ 项目核心故事提炼</div>
              <div style={styles.benefitItem}>✓ 答辩/演讲稿（如需要）</div>
              <div style={styles.benefitItem}>✓ 多媒体材料制作（如需要）</div>
            </div>
          </section>

            {/* CTA */}
            <section style={styles.ctaSection}>
              <h2 style={styles.ctaTitle}>让每一个好设计，都能被世界看见</h2>
              <p style={styles.ctaDesc}>用专业的叙事，让您的设计故事打动国际评委</p>
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