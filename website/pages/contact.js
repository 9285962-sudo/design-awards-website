import Head from 'next/head'
import Link from 'next/link'

export default function Contact() {
  return (
    <>
      <Head>
        <title>联系我们 | 设计能 - 国际设计大奖申报平台</title>
        <meta name="description" content="联系设计能获取国际设计大奖申报咨询服务、国际奖项研究、参赛策略咨询。电话：136-9222-2744，邮箱：9285962@qq.com，官网：www.52de.cc" />
        <meta name="keywords" content="设计能联系方式,设计奖申报咨询,国际奖项研究,参赛策略咨询,国际设计奖代理电话,MUSE奖咨询,红点奖咨询,iF奖咨询" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.52de.cc/contact" />
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
              <Link href="/services" style={styles.navLink}>申报服务</Link>
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
          <h1 style={styles.heroTitle}>联系我们</h1>
          <p style={styles.heroSubtitle}>期待与您的合作，让您的设计作品登上国际舞台</p>
        </div>
      </section>

      {/* Contact Info */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.contactGrid}>
            <div style={styles.contactCard}>
              <div style={styles.contactIcon}>📞</div>
              <h3 style={styles.contactTitle}>联系电话</h3>
              <p style={styles.contactText}>
                <a href="tel:13692222744" style={styles.contactLink}>136-9222-2744</a>
              </p>
              <p style={styles.contactHint}>何先生</p>
            </div>
            <div style={styles.contactCard}>
              <div style={styles.contactIcon}>📧</div>
              <h3 style={styles.contactTitle}>电子邮箱</h3>
              <p style={styles.contactText}>
                <a href="mailto:9285962@qq.com" style={styles.contactLink}>9285962@qq.com</a>
              </p>
            </div>
            <div style={styles.contactCard}>
              <div style={styles.contactIcon}>🌐</div>
              <h3 style={styles.contactTitle}>官方网站</h3>
              <p style={styles.contactText}>
                <a href="https://www.52de.cc" style={styles.contactLink}>www.52de.cc</a>
              </p>
            </div>
            <div style={styles.contactCard}>
              <div style={styles.contactIcon}>🏢</div>
              <h3 style={styles.contactTitle}>公司名称</h3>
              <p style={styles.contactText}>深圳日光月华文化传播有限公司</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Scope */}
      <section style={{...styles.section, backgroundColor: '#f8f9fa'}}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>服务范围</h2>
          <div style={styles.serviceList}>
            <div style={styles.serviceItem}>
              <span style={styles.serviceDot}>•</span>
              <span>建筑类设计奖项申报</span>
            </div>
            <div style={styles.serviceItem}>
              <span style={styles.serviceDot}>•</span>
              <span>室内设计奖项申报</span>
            </div>
            <div style={styles.serviceItem}>
              <span style={styles.serviceDot}>•</span>
              <span>景观设计奖项申报</span>
            </div>
            <div style={styles.serviceItem}>
              <span style={styles.serviceDot}>•</span>
              <span>产品设计奖项申报</span>
            </div>
            <div style={styles.serviceItem}>
              <span style={styles.serviceDot}>•</span>
              <span>视觉传达类奖项申报</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={styles.ctaSection}>
        <div style={styles.container}>
          <h2 style={styles.ctaTitle}>立即开始您的国际大奖之旅</h2>
          <p style={styles.ctaDesc}>专业团队为您保驾护航，让您的设计作品在国际舞台绽放光芒</p>
          <div style={styles.ctaButtons}>
            <a href="tel:13692222744" style={styles.btnPrimary}>📞 立即咨询</a>
            <Link href="/services" style={styles.btnOutline}>查看申报服务</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <p style={styles.footerText}>© 2026 设计能—国际设计大奖申报指南 | www.52de.cc</p>
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
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
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
  hero: {
    background: 'linear-gradient(135deg, #1E3A5F 0%, #2d4a6f 100%)',
    padding: '60px 0',
    textAlign: 'center',
    color: '#fff',
  },
  heroTitle: {
    fontSize: '42px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#fff',
  },
  heroSubtitle: {
    fontSize: '18px',
    opacity: 0.9,
  },
  section: {
    padding: '64px 0',
  },
  sectionTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '48px',
    color: '#1E3A5F',
  },
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
  },
  contactCard: {
    backgroundColor: '#fff',
    padding: '32px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  },
  contactIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  contactTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '12px',
  },
  contactText: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '8px',
  },
  contactLink: {
    color: '#D4AF37',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  contactHint: {
    fontSize: '14px',
    color: '#999',
  },
  serviceList: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  serviceItem: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  serviceDot: {
    color: '#D4AF37',
    fontWeight: 'bold',
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
    color: '#fff',
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
    flexWrap: 'wrap',
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
    padding: '24px 0',
    color: '#fff',
  },
  footerText: {
    fontSize: '14px',
    textAlign: 'center',
    opacity: 0.6,
  },
}
