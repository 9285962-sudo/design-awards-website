import Head from 'next/head'
import Link from 'next/link'

export default function About() {
  return (
    <>
      <Head>
        <title>关于我们 | 设计能 - 国际设计大奖申报平台</title>
        <meta name="description" content="设计能（深圳日光月华文化传播有限公司）15年专注国际设计大奖申报代理服务，合作108个全球权威奖项，服务350+两岸四地设计师，获奖率80%。提供国际奖项研究、参赛策略咨询、MUSE奖、红点奖、iF奖等一站式申报服务。" />
        <meta name="keywords" content="设计能,深圳日光月华文化,设计大奖申报,国际设计奖代理,设计奖咨询服务,国际奖项研究,参赛策略咨询,MUSE奖申报,红点奖申报,iF奖申报,IDEA奖申报,GMark奖申报,国际设计奖代理公司,设计奖申报机构,建筑设计奖申报,室内设计奖申报,产品设计奖申报,景观设计奖申报,视觉传达奖申报" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.52de.cc/about" />
      </Head>

      <header style={styles.header}>
        <div style={styles.container}>
          <div style={styles.headerInner}>
            <div style={styles.logo}>
              <Link href="/">
                <img src="/设计能LOGO透明文件.png" alt="设计能" style={styles.logoImg} />
              </Link>
              <span style={styles.logoSubText}>国际设计大奖策略咨询平台</span>
            </div>
            <nav style={styles.nav}>
              <Link href="/" style={styles.navLink}>首页</Link>
              <Link href="/awards" style={styles.navLink}>奖项库</Link>
              <Link href="/compare" style={styles.navLink}>奖项对比</Link>
              <Link href="/services" style={styles.navLink}>申报服务</Link>
              <Link href="/strategy" style={styles.navLink}>参赛策略</Link>
              <Link href="/news" style={styles.navLink}>赛事新闻</Link>
              <Link href="/about" style={{...styles.navLink, color: '#D4AF37'}}>关于我们</Link>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section style={styles.hero}>
          <div style={styles.container}>
            <h1 style={styles.heroTitle}>关于设计能</h1>
            <p style={styles.heroDesc}>让专业的人做专业的事，让您的设计被世界看见</p>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.container}>
            <div style={styles.aboutGrid}>
              <div style={styles.aboutContent}>
                <h2 style={styles.aboutTitle}>我们是谁</h2>
                <p style={styles.aboutText}>
                  设计能（深圳日光月华文化传播有限公司）成立于2010年，15年专注国际设计大奖申报代理服务。
                </p>
                <p style={styles.aboutText}>
                  我们与全球108个顶级设计大奖建立合作关系，涵盖建筑、室内、景观、产品、视觉传达等全品类设计领域。累计服务两岸四地设计师350+，成功帮助1000+作品斩获国际大奖，平均获奖率80%。
                </p>
                <p style={styles.aboutText}>
                  我们的团队由资深设计师、英文文案专家和竞赛策略师组成，深谙国际评委的评审标准和审美偏好，为您的作品量身定制最合适的申报策略。
                </p>
              </div>
              <div style={styles.aboutStats}>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>15+</div>
                  <div style={styles.statLabel}>年行业经验</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>108</div>
                  <div style={styles.statLabel}>合作奖项</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>350+</div>
                  <div style={styles.statLabel}>服务设计师</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>80%</div>
                  <div style={styles.statLabel}>获奖率</div>
                </div>
              </div>
            </div>

            <h2 style={styles.sectionTitle}>我们的服务</h2>
            <div style={styles.servicesGrid}>
              <div style={styles.serviceCard}>
                <div style={styles.serviceIcon}>🔍</div>
                <h3 style={styles.serviceTitle}>参赛作品分析</h3>
                <p style={styles.serviceDesc}>以国际评委视角，全方位剖析作品优势与短板</p>
              </div>
              <div style={styles.serviceCard}>
                <div style={styles.serviceIcon}>🎯</div>
                <h3 style={styles.serviceTitle}>奖项精准匹配</h3>
                <p style={styles.serviceDesc}>根据作品特点，精准匹配最适合的参赛奖项</p>
              </div>
              <div style={styles.serviceCard}>
                <div style={styles.serviceIcon}>📝</div>
                <h3 style={styles.serviceTitle}>专业文案撰写</h3>
                <p style={styles.serviceDesc}>专业团队用国际评委认可的语言撰写申报材料</p>
              </div>
              <div style={styles.serviceCard}>
                <div style={styles.serviceIcon}>🏆</div>
                <h3 style={styles.serviceTitle}>全程代理申报</h3>
                <p style={styles.serviceDesc}>从材料准备到提交缴费，全程代理服务</p>
              </div>
            </div>

            {/* 研究成果 - 横向布局，左图右文 */}
            <h2 style={styles.sectionTitle}>研究成果</h2>
            
            <div style={styles.researchCardsHorizontal}>
              {/* 书籍成果卡片 */}
              <Link href="/about/book" style={styles.researchCardHorizontal}>
                <div style={styles.cardImageWrapH}>
                  <img src="/images/book-cover.jpg" alt="《让你的设计被看见》书籍封面" style={styles.cardImageH} />
                </div>
                <div style={styles.cardContentH}>
                  <h3 style={styles.cardTitle}>《让你的设计被看见》</h3>
                  <p style={styles.cardSubtitle}>国际设计大奖参赛全攻略</p>
                  <div style={styles.cardMetaH}>
                    <span><strong>页数：</strong>320页</span>
                    <span><strong>涵盖奖项：</strong>108个</span>
                    <span><strong>定价：</strong>¥168</span>
                  </div>
                  <p style={styles.cardDescH}>作者何光会15年申报经验精华，涵盖全球108个顶级设计大奖参赛策略、文案技巧、评审标准分析。包含50+真实获奖案例分析，助你在激烈的国际竞争中脱颖而出。</p>
                  <span style={styles.cardLinkH}>查看详情 →</span>
                </div>
              </Link>

              {/* 方法论报告卡片 */}
              <Link href="/about/methodology-report" style={styles.researchCardHorizontal}>
                <div style={styles.cardImageWrapH}>
                  <img src="/images/report-cover.jpg" alt="《垂直领域创意灵感和设计方法参考报告》封面" style={styles.cardImageH} />
                </div>
                <div style={styles.cardContentH}>
                  <h3 style={styles.cardTitle}>垂直领域设计方法论报告</h3>
                  <p style={styles.cardSubtitle}>基于国际大奖案例深度解析</p>
                  <div style={styles.cardMetaH}>
                    <span><strong>报告页数：</strong>200+页</span>
                    <span><strong>涵盖领域：</strong>建筑/室内/产品/视觉</span>
                    <span><strong>案例数量：</strong>60+至尊奖案例</span>
                    <span><strong>定价：</strong>¥298起</span>
                  </div>
                  <p style={styles.cardDescH}>建筑、室内、产品、视觉四大领域获奖密码，品类趋势分析、至尊奖解析、灵感案例库及方法论工具。帮助你建立系统化的设计思维框架，提升作品的国际竞争力。</p>
                  <span style={styles.cardLinkH}>查看详情 →</span>
                </div>
              </Link>
            </div>

            <div style={styles.contact}>
              <div style={styles.contactLeft}>
                <h2 style={styles.contactTitle}>联系我们</h2>
                <div style={styles.contactInfo}>
                  <p style={styles.contactText}><strong>公司：</strong>深圳日光月华文化传播有限公司</p>
                  <p style={styles.contactText}><strong>电话：</strong>136-9222-2744（何先生）</p>
                  <p style={styles.contactText}><strong>邮箱：</strong>9285962@qq.com</p>
                  <p style={styles.contactText}><strong>官网：</strong>www.52de.cc</p>
                  <p style={styles.contactText}><strong>公众号：</strong>设计能（designneng）</p>
                  <p style={styles.contactText}><strong>微信：</strong>13692222744</p>
                </div>
                <a href="tel:13692222744" style={styles.contactBtn}>立即咨询</a>
              </div>
              <div style={styles.contactRight}>
                <div style={styles.qrCodes}>
                  <div style={styles.qrItem}>
                    <img src="/公众号二维码.jpg" alt="设计能公众号" style={styles.qrImg} />
                    <p style={styles.qrLabel}>公众号</p>
                  </div>
                  <div style={styles.qrItem}>
                    <img src="/个人微信二维码.png" alt="何先生微信" style={styles.qrImg} />
                    <p style={styles.qrLabel}>微信</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        <div style={styles.container}>
          <p style={styles.footerText}>© 2026 设计能 | 深圳日光月华文化传播有限公司</p>
        </div>
      </footer>
    </>
  )
}

const styles = {
  header: { backgroundColor: '#1A1A1A', padding: '16px 0', position: 'sticky', top: 0, zIndex: 100 },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '0 24px' },
  headerInner: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { display: 'flex', alignItems: 'center' },
  logoImg: { height: '40px', width: 'auto' },
  logoSubText: { fontSize: '18px', fontWeight: 'bold', color: '#D4AF37', marginLeft: '12px' },
  nav: { display: 'flex', gap: '28px' },
  navLink: { color: '#fff', textDecoration: 'none', fontSize: '14px', opacity: 0.9 },
  hero: { background: 'linear-gradient(135deg, #1E3A5F 0%, #2d4a6f 100%)', padding: '80px 0', textAlign: 'center', color: '#fff' },
  heroTitle: { fontSize: '42px', fontWeight: 'bold', marginBottom: '16px' },
  heroDesc: { fontSize: '20px', opacity: 0.9 },
  section: { padding: '60px 0' },
  aboutGrid: { display: 'grid', gridTemplateColumns: '1fr 300px', gap: '48px', marginBottom: '60px' },
  aboutTitle: { fontSize: '28px', fontWeight: 'bold', color: '#1E3A5F', marginBottom: '20px' },
  aboutText: { fontSize: '16px', color: '#666', lineHeight: 1.8, marginBottom: '16px' },
  aboutStats: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  statCard: { backgroundColor: '#1E3A5F', padding: '24px', borderRadius: '12px', textAlign: 'center' },
  statNumber: { fontSize: '32px', fontWeight: 'bold', color: '#D4AF37', marginBottom: '8px' },
  statLabel: { fontSize: '13px', color: '#fff', opacity: 0.9 },
  sectionTitle: { fontSize: '28px', fontWeight: 'bold', color: '#1E3A5F', marginBottom: '32px', marginTop: '48px' },

  // 研究成果卡片 - 左右排列
  researchCards: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(2, 1fr)', 
    gap: '24px',
    marginTop: '24px'
  },
  researchCardsHorizontal: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(2, 1fr)', 
    gap: '24px',
    marginTop: '24px'
  },
  researchCardHorizontal: { 
    display: 'flex', 
    flexDirection: 'row',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    textDecoration: 'none',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    border: '2px solid #e0e0e0',
    gap: '20px',
  },
  cardImageWrapH: { 
    width: '120px', 
    flexShrink: 0,
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  },
  cardImageH: { 
    width: '120px', 
    height: 'auto',
    objectFit: 'contain',
    backgroundColor: 'transparent',
    display: 'block',
  },
  cardContentH: { 
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardTitle: { 
    fontSize: '17px', 
    fontWeight: 'bold', 
    color: '#1E3A5F', 
    marginBottom: '4px',
    lineHeight: 1.4
  },
  cardSubtitle: { 
    fontSize: '13px', 
    color: '#888', 
    marginBottom: '12px' 
  },
  cardMetaH: { 
    display: 'flex', 
    flexWrap: 'wrap',
    gap: '8px 20px',
    marginBottom: '12px',
    fontSize: '13px',
    color: '#555',
  },
  cardMetaItem: { 
    fontSize: '12px', 
    color: '#666', 
    backgroundColor: '#f0f0f0', 
    padding: '4px 10px', 
    borderRadius: '12px' 
  },
  cardDescH: { 
    fontSize: '13px', 
    color: '#555', 
    lineHeight: 1.6,
    marginBottom: '12px',
  },
  cardLink: { 
    display: 'inline-block', 
    color: '#D4AF37', 
    fontSize: '14px', 
    fontWeight: 'bold', 
    textDecoration: 'none',
    marginTop: 'auto'
  },
  cardLinkH: { 
    color: '#D4AF37', 
    fontSize: '14px', 
    fontWeight: 'bold',
  },

  servicesGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' },
  serviceCard: { backgroundColor: '#fff', padding: '28px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center' },
  serviceIcon: { fontSize: '36px', marginBottom: '16px' },
  serviceTitle: { fontSize: '16px', fontWeight: 'bold', color: '#1E3A5F', marginBottom: '8px' },
  serviceDesc: { fontSize: '13px', color: '#666', lineHeight: 1.6 },
  whyGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' },
  whyCard: { backgroundColor: '#f8f9fa', padding: '28px', borderRadius: '12px' },
  whyTitle: { fontSize: '16px', fontWeight: 'bold', color: '#1E3A5F', marginBottom: '12px' },
  whyDesc: { fontSize: '14px', color: '#666', lineHeight: 1.6 },
  contact: { marginTop: '60px', padding: '40px', backgroundColor: '#1E3A5F', borderRadius: '12px', color: '#fff', display: 'flex', alignItems: 'center', gap: '24px' },
  contactLeft: { flex: '2' },
  contactTitle: { fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#D4AF37' },
  contactInfo: { marginBottom: '16px' },
  contactText: { fontSize: '14px', marginBottom: '6px', opacity: 0.9 },
  contactBtn: { display: 'inline-block', backgroundColor: '#D4AF37', color: '#1A1A1A', padding: '10px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' },
  contactRight: { flex: '1' },
  qrCodes: { display: 'flex', gap: '24px' },
  qrItem: { textAlign: 'center' },
  qrImg: { width: '90px', height: '90px', borderRadius: '8px', backgroundColor: '#fff', padding: '6px' },
  qrLabel: { fontSize: '12px', marginTop: '6px', opacity: 0.9 },
  footer: { backgroundColor: '#1A1A1A', padding: '32px 0', color: '#fff' },
  footerText: { fontSize: '14px', textAlign: 'center', opacity: 0.7 },
}
