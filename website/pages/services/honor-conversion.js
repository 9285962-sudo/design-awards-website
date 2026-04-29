import Head from 'next/head'
import Link from 'next/link'

export default function HonorConversion() {
  return (
    <>
      <Head>
        <title>荣誉转化与价值变现 | 设计能 - 国际设计大奖申报平台</title>
        <meta name="description" content="设计能提供荣誉转化与价值变现服务，获奖后提供从品牌宣传、媒体公关到市场转化的全方位策略，助您将荣誉转化为切实的品牌资产与商业价值。" />
        <meta name="keywords" content="荣誉转化,价值变现,获奖后营销,设计奖品牌推广" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.52de.cc/services/honor-conversion" />
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
            <span style={styles.breadcrumbCurrent}>荣誉转化与价值变现</span>
          </div>

          {/* Content Container */}
          <div style={styles.contentContainer}>
            {/* Header Section - Blue Background */}
            <div style={styles.containerHeader}>
              <div style={styles.heroIcon}>💎</div>
              <h1 style={styles.containerTitle}>荣誉转化与价值变现</h1>
              <p style={styles.containerSubtitle}>获奖后提供从品牌宣传、媒体公关到市场转化的全方位策略，助您将这份荣誉转化为切实的品牌资产与商业价值</p>
            </div>

            {/* Content Body - Light Background */}
            <div style={styles.containerBody}>

          {/* Content Sections */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>获奖只是开始</h2>
            <div style={styles.contentBlock}>
              <p style={styles.paragraph}>
                获得国际设计大奖是对设计实力的认可，但这只是价值实现的起点。如何将这份荣誉转化为品牌资产、市场机会和商业价值，需要系统化的策略规划和专业的执行支持。
              </p>
              <p style={styles.paragraph}>
                我们帮助获奖设计师和设计公司，制定全方位的荣誉转化策略，从品牌定位、传播规划到商业落地，让每一次获奖都成为推动业务增长的重要契机。
              </p>
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>转化维度</h2>
            <div style={styles.dimensionsGrid}>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>01</div>
                <h3 style={styles.dimensionTitle}>品牌资产建设</h3>
                <p style={styles.dimensionDesc}>将获奖荣誉融入品牌定位，提升品牌溢价能力和市场认可度</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>02</div>
                <h3 style={styles.dimensionTitle}>媒体传播推广</h3>
                <p style={styles.dimensionDesc}>制定媒体传播策略，通过专业媒体和社交平台扩大获奖影响力</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>03</div>
                <h3 style={styles.dimensionTitle}>行业影响力提升</h3>
                <p style={styles.dimensionDesc}>参与行业活动、发表专业观点，建立行业专家地位和话语权</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>04</div>
                <h3 style={styles.dimensionTitle}>客户信任建立</h3>
                <p style={styles.dimensionDesc}>将获奖荣誉转化为客户信任背书，提升获客能力和项目溢价</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>05</div>
                <h3 style={styles.dimensionTitle}>人才吸引力增强</h3>
                <p style={styles.dimensionDesc}>利用获奖荣誉提升雇主品牌形象，吸引优秀设计人才加入</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>06</div>
                <h3 style={styles.dimensionTitle}>商业机会拓展</h3>
                <p style={styles.dimensionDesc}>开拓新的业务领域和合作机会，实现商业价值的持续增长</p>
              </div>
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>服务内容</h2>
            <div style={styles.dimensionsGrid}>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>01</div>
                <h3 style={styles.dimensionTitle}>获奖新闻稿撰写发布</h3>
                <p style={styles.dimensionDesc}>撰写专业新闻稿，发布至设计行业媒体和主流新闻平台</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>02</div>
                <h3 style={styles.dimensionTitle}>社交媒体运营</h3>
                <p style={styles.dimensionDesc}>制定社交媒体传播策略，运营微信公众号、小红书、LinkedIn等平台</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>03</div>
                <h3 style={styles.dimensionTitle}>获奖作品展示</h3>
                <p style={styles.dimensionDesc}>制作获奖作品展示页面，优化官网和作品集呈现</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>04</div>
                <h3 style={styles.dimensionTitle}>荣誉管理系统</h3>
                <p style={styles.dimensionDesc}>建立荣誉管理体系，规范获奖标识使用，持续维护荣誉价值</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>05</div>
                <h3 style={styles.dimensionTitle}>行业活动参与</h3>
                <p style={styles.dimensionDesc}>推荐参与行业论坛、设计周、颁奖典礼等活动，扩大行业影响力</p>
              </div>
              <div style={styles.dimensionCard}>
                <div style={styles.dimensionNum}>06</div>
                <h3 style={styles.dimensionTitle}>商业转化策略</h3>
                <p style={styles.dimensionDesc}>制定客户开发、项目报价、合作谈判等商业转化策略</p>
              </div>
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>服务流程</h2>
            <div style={styles.processList}>
              <div style={styles.processItem}>
                <div style={styles.processStep}>1</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>获奖情况评估</h4>
                  <p style={styles.processDesc}>了解获奖奖项级别、影响力，评估荣誉价值和市场认知度</p>
                </div>
              </div>
              <div style={styles.processItem}>
                <div style={styles.processStep}>2</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>转化目标确定</h4>
                  <p style={styles.processDesc}>明确荣誉转化的具体目标，如品牌提升、客户获取、业务拓展等</p>
                </div>
              </div>
              <div style={styles.processItem}>
                <div style={styles.processStep}>3</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>策略方案制定</h4>
                  <p style={styles.processDesc}>制定全方位的荣誉转化策略，包含传播、运营、商业等维度</p>
                </div>
              </div>
              <div style={styles.processItem}>
                <div style={styles.processStep}>4</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>内容素材制作</h4>
                  <p style={styles.processDesc}>制作新闻稿、宣传海报、展示页面、视频等传播素材</p>
                </div>
              </div>
              <div style={styles.processItem}>
                <div style={styles.processStep}>5</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>传播推广执行</h4>
                  <p style={styles.processDesc}>执行媒体发布、社交媒体运营、行业活动参与等推广计划</p>
                </div>
              </div>
              <div style={styles.processItem}>
                <div style={styles.processStep}>6</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processTitle}>效果跟踪优化</h4>
                  <p style={styles.processDesc}>跟踪转化效果，持续优化策略，最大化荣誉价值</p>
                </div>
              </div>
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>您将获得</h2>
            <div style={styles.benefitsList}>
              <div style={styles.benefitItem}>✓ 荣誉转化策略方案</div>
              <div style={styles.benefitItem}>✓ 获奖新闻稿及发布</div>
              <div style={styles.benefitItem}>✓ 社交媒体运营支持</div>
              <div style={styles.benefitItem}>✓ 获奖作品展示页面</div>
              <div style={styles.benefitItem}>✓ 荣誉管理规范指南</div>
              <div style={styles.benefitItem}>✓ 商业转化策略建议</div>
            </div>
          </section>

            {/* CTA */}
            <section style={styles.ctaSection}>
              <h2 style={styles.ctaTitle}>让每一份荣誉，都转化为实实在在的价值</h2>
              <p style={styles.ctaDesc}>系统化的荣誉转化策略，助您最大化获奖的商业回报</p>
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