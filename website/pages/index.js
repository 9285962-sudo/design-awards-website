import Head from 'next/head'
import Link from 'next/link'
import awards from '../data/awards.json'

export default function Home() {
  const museAward = awards[0]

  return (
    <>
      <Head>
        <title>设计能—国际设计大奖申报指南 | MUSE设计奖2026</title>
        <meta name="description" content="MUSE设计奖2026完整申报指南：报名时间、参赛费用$199起、作品要求、评审标准。专业代理申报服务，90%获奖率保障。" />
        <meta name="keywords" content="MUSE设计奖,国际设计大奖,设计奖申报,MUSE奖报名,MUSE奖费用" />
        
        {/* Open Graph */}
        <meta property="og:title" content="MUSE设计奖2026完整申报指南 | 设计能" />
        <meta property="og:description" content="MUSE设计奖报名时间、费用、要求一站式指南" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.52de.cc" />
        
        {/* Schema.org Organization */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "设计能—国际设计大奖申报指南",
            "url": "https://www.52de.cc",
            "description": "专业国际设计大奖代理申报服务",
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "客户服务"
            }
          })
        }} />
      </Head>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.container}>
          <div style={styles.headerInner}>
            <div style={styles.logo}>
              <img src="/设计能LOGO透明文件.png" alt="设计能" style={styles.logoImg} />
              <span style={styles.logoSubText}>国际设计大奖策略咨询平台</span>
            </div>
            <nav style={styles.nav}>
              <Link href="/" style={styles.navLink}>首页</Link>
              <Link href={`/awards/${museAward.award_id}`} style={styles.navLink}>奖项详情</Link>
              <Link href="/services" style={styles.navLink}>申报服务</Link>
              <Link href="/about" style={styles.navLink}>关于我们</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.container}>
          <h1 style={styles.heroTitle}>
            MUSE设计奖2026
            <span style={styles.heroSubtitle}>完整申报指南</span>
          </h1>
          <p style={styles.heroDesc}>
            报名时间、参赛费用、作品要求、评审标准一站式查询
            <br />
            专业代理申报服务，助力设计师斩获国际大奖
          </p>
          <div style={styles.heroButtons}>
            <Link href={`/awards/${museAward.award_id}`} style={styles.btnPrimary}>
              查看完整指南
            </Link>
            <a href="tel:400-xxx-xxxx" style={styles.btnSecondary}>
              电话咨询
            </a>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>关键信息一览</h2>
          <div style={styles.cardGrid}>
            <div style={styles.card}>
              <div style={styles.cardIcon}>💰</div>
              <h3 style={styles.cardTitle}>参赛费用</h3>
              <p style={styles.cardValue}>${museAward.fee_early_bird}起</p>
              <p style={styles.cardDesc}>早鸟价优惠$50</p>
            </div>
            <div style={styles.card}>
              <div style={styles.cardIcon}>📅</div>
              <h3 style={styles.cardTitle}>早鸟截止</h3>
              <p style={styles.cardValue}>2025年11月13日</p>
              <p style={styles.cardDesc}>EST时区</p>
            </div>
            <div style={styles.card}>
              <div style={styles.cardIcon}>🏆</div>
              <h3 style={styles.cardTitle}>奖项等级</h3>
              <p style={styles.cardValue}>铂金奖/金奖/银奖</p>
              <p style={styles.cardDesc}>共3个等级</p>
            </div>
            <div style={styles.card}>
              <div style={styles.cardIcon}>📸</div>
              <h3 style={styles.cardTitle}>作品要求</h3>
              <p style={styles.cardValue}>5-10张图片</p>
              <p style={styles.cardDesc}>1920×1080起</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Preview */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>核心服务项目</h2>
          <div style={styles.servicesGrid}>
            <div style={styles.serviceCard}>
              <div style={styles.serviceIcon}>📋</div>
              <h3 style={styles.serviceTitle}>参赛作品优劣势分析</h3>
              <p style={styles.serviceDesc}>以国际评委视角，全方位剖析作品优势与短板，提供可执行的优化策略</p>
            </div>
            <div style={styles.serviceCard}>
              <div style={styles.serviceIcon}>🎯</div>
              <h3 style={styles.serviceTitle}>奖项精准匹配</h3>
              <p style={styles.serviceDesc}>根据作品特点，精准匹配最适合的参赛奖项，提升获奖概率</p>
            </div>
            <div style={styles.serviceCard}>
              <div style={styles.serviceIcon}>📝</div>
              <h3 style={styles.serviceTitle}>精准叙事呈现</h3>
              <p style={styles.serviceDesc}>专业文案撰写与视觉优化，让作品呈现达到国际评委标准</p>
            </div>
            <div style={styles.serviceCard}>
              <div style={styles.serviceIcon}>💎</div>
              <h3 style={styles.serviceTitle}>荣誉价值最大化</h3>
              <p style={styles.serviceDesc}>获奖后品牌宣传、媒体公关、市场转化全方位策略支持</p>
            </div>
          </div>
          <div style={styles.moreServices}>
            <Link href="/services" style={styles.moreServicesLink}>
              查看完整服务内容 →
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{...styles.section, backgroundColor: '#fff'}}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>参赛类别</h2>
          <div style={styles.categoryGrid}>
            {museAward.category_sub.map((cat, idx) => (
              <div key={idx} style={styles.categoryTag}>{cat}</div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>常见问题</h2>
          <div style={styles.faqList}>
            <div style={styles.faqItem}>
              <h3 style={styles.faqQ}>MUSE设计奖报名费是多少？</h3>
              <p style={styles.faqA}>MUSE设计奖2026年早鸟价为$199（约合人民币1450元），常规价格为$249，最终延期价格为$259，延长截止日期价格为$269。学生参赛费用为$125。</p>
            </div>
            <div style={styles.faqItem}>
              <h3 style={styles.faqQ}>MUSE设计奖2026年报名截止日期是什么时候？</h3>
              <p style={styles.faqA}>早鸟截止日期为2025年11月13日，常规截止日期为2025年12月11日，最终截止日期为2026年1月15日，延长截止日期为2026年2月12日（均为EST时区）。</p>
            </div>
            <div style={styles.faqItem}>
              <h3 style={styles.faqQ}>MUSE设计奖作品要求是什么？</h3>
              <p style={styles.faqA}>需要提交5-10张图片，格式为JPG/PNG，分辨率不低于1920×1080，推荐3840×2160，单张不超过5MB，总共不超过50MB。可选提交1个视频（MP4/MOV，最长3分钟，不超过100MB）。</p>
            </div>
            <div style={styles.faqItem}>
              <h3 style={styles.faqQ}>参加MUSE设计奖有必要找代理吗？</h3>
              <p style={styles.faqA}>如果您熟悉英文申报流程、有充足时间准备材料，可以自行申报。但代理服务可以帮助您优化申报材料、提升获奖概率、节省时间和精力。我们提供从选奖策略到材料优化的全程服务。</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.container}>
          <h2 style={styles.ctaTitle}>需要专业代理申报服务？</h2>
          <p style={styles.ctaDesc}>15年经验 · 800+设计师 · 75%获奖率</p>
          <div style={styles.ctaButtons}>
            <Link href="/contact" style={styles.btnPrimary}>免费咨询</Link>
            <a href="tel:400-xxx-xxxx" style={styles.btnOutline}>电话咨询</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <p style={styles.footerText}>© 2026 设计能—国际设计大奖申报指南 | www.52de.cc</p>
          <p style={styles.footerSub}>专业代理申报服务，助力设计师斩获国际大奖</p>
        </div>
      </footer>
    </>
  )
}

const styles = {
  header: {
    backgroundColor: '#1E3A5F',
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
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImg: {
    height: '40px',
    width: 'auto',
  },
  logoSubText: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#D4AF37',
    marginLeft: '12px',
  },
  headerInner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nav: {
    display: 'flex',
    gap: '32px',
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
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  heroSubtitle: {
    fontSize: '24px',
    fontWeight: 'normal',
    color: '#D4AF37',
  },
  heroDesc: {
    fontSize: '18px',
    opacity: 0.9,
    marginBottom: '32px',
    lineHeight: 1.8,
  },
  heroButtons: {
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
    fontSize: '16px',
    display: 'inline-block',
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    color: '#fff',
    padding: '14px 32px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '16px',
    border: '1px solid rgba(255,255,255,0.3)',
    display: 'inline-block',
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
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '32px',
    marginTop: '40px',
    maxWidth: '800px',
    margin: '40px auto 0',
  },
  serviceCard: {
    backgroundColor: '#fff',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    textAlign: 'center',
  },
  serviceIcon: {
    fontSize: '40px',
    marginBottom: '16px',
  },
  serviceTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '12px',
  },
  serviceDesc: {
    fontSize: '14px',
    color: '#666',
    lineHeight: 1.7,
  },
  moreServices: {
    textAlign: 'center',
    marginTop: '32px',
  },
  moreServicesLink: {
    color: '#D4AF37',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: '32px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    border: '1px solid #E5E5E5',
  },
  cardIcon: {
    fontSize: '40px',
    marginBottom: '16px',
  },
  cardTitle: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '8px',
  },
  cardValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '4px',
  },
  cardDesc: {
    fontSize: '14px',
    color: '#999',
  },
  categoryGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    justifyContent: 'center',
  },
  categoryTag: {
    backgroundColor: '#1E3A5F',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '20px',
    fontSize: '14px',
  },
  faqList: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  faqItem: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '8px',
    marginBottom: '16px',
    border: '1px solid #E5E5E5',
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
  btnOutline: {
    backgroundColor: 'transparent',
    color: '#D4AF37',
    padding: '14px 32px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '16px',
    border: '1px solid #D4AF37',
    display: 'inline-block',
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
