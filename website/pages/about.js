import Head from 'next/head'
import Link from 'next/link'
import awards from '../data/awards.json'

export default function About() {
  const museAward = awards[0]

  return (
    <>
      <Head>
        <title>关于我们 | 设计能—国际设计大奖申报指南</title>
        <meta name="description" content="设计能，10年+专注国际设计大奖申报策略，合作108个全球奖项，累计服务两岸四地设计师350+，平均获奖率80%。让专业的人做专业的事，让你的设计被世界看见。" />
        <meta name="keywords" content="设计能,国际设计大奖,参赛代理,报奖服务,MUSE设计奖,深圳日光月华文化传播" />
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
              <Link href={`/awards/${museAward.award_id}`} style={styles.navLink}>奖项详情</Link>
              <Link href="/services" style={styles.navLink}>申报服务</Link>
              <Link href="/about" style={{...styles.navLink, color: '#D4AF37'}}>关于我们</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.container}>
          <h1 style={styles.heroTitle}>关于设计能</h1>
          <p style={styles.heroSubtitle}>让专业的人做专业的事，让你的设计作品被看见</p>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        <div style={styles.container}>
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>10年+</span>
              <span style={styles.statLabel}>从业经验</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>108个</span>
              <span style={styles.statLabel}>合作奖项</span>
            </div>
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

      {/* About Content */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.introText}>
            <p style={styles.introParagraph}>
              设计能是一家为建筑、室内、景观、产品和视觉传达类的设计公司申报国际设计奖项提供顾问咨询服务的专业机构。
            </p>
            <p style={styles.introParagraph}>
              我们凭借十余年的从业经验，竭诚为客户提供最专业的报奖策略与申报作业服务。包括：参赛作品精准叙事和呈现优化，参赛作品优劣势分析与改进建议，获奖概率评估，荣誉价值最大化以及荣誉管理等，助力更多中国设计师登上国际舞台，让你的设计作品被看见，为客户在经济下行的背景下参与激烈的市场竞争提供权威背书。
            </p>
          </div>
        </div>
      </section>

      {/* Research Achievement */}
      <section style={{...styles.section, backgroundColor: '#fff'}}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>我们的研究成果</h2>
          <div style={styles.bookCard}>
            <div style={styles.bookImgWrapper}>
              <img src="/我们的研究成果.png" alt="研究成果书籍" style={styles.bookImg} />
            </div>
            <div style={styles.bookContent}>
              <h3 style={styles.bookTitle}>《让你的设计被看见——国际设计大奖参赛策略全攻略》</h3>
              <p style={styles.bookText}>
                我们的研究成果是我们在设计竞技领域的一项里程碑式成果。该书系统性地揭示了国际评委的评审逻辑，并构建了一套从作品叙事、视觉呈现到申报流程管理的权威方法论。它不仅是本指南，更是我们深刻洞察与专业实力的体现，已成功助力众多设计师将创意转化为世界认可的卓越荣誉。
              </p>
              <p style={styles.bookPublisher}>
                该书由中国科学文化音像出版社出版，抖音、淘宝、微信等平台均有出售（搜书名即可找到）。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>联系我们</h2>
          <div style={styles.contactLayout}>
            <div style={styles.contactInfo}>
              <div style={styles.contactItem}>
                <span style={styles.contactLabel}>公司名称</span>
                <span style={styles.contactValue}>深圳日光月华文化传播有限公司</span>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactLabel}>官方网站</span>
                <span style={styles.contactValue}>www.52de.cc</span>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactLabel}>联系电话</span>
                <span style={styles.contactValue}>13692222744 何先生</span>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactLabel}>电子邮箱</span>
                <span style={styles.contactValue}>9285962@qq.com</span>
              </div>
            </div>
            <div style={styles.qrCodes}>
              <div style={styles.qrCodeItem}>
                <img src="/公众号二维码.jpg" alt="公众号二维码" style={styles.qrCodeImg} />
                <p style={styles.qrCodeLabel}>关注公众号</p>
              </div>
              <div style={styles.qrCodeItem}>
                <img src="/个人微信二维码.png" alt="个人微信" style={styles.qrCodeImg} />
                <p style={styles.qrCodeLabel}>添加微信</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.container}>
          <h2 style={styles.ctaTitle}>开启您的获奖之旅</h2>
          <p style={styles.ctaDesc}>让专业的人做专业的事，让你的设计被世界看见</p>
          <div style={styles.ctaButtons}>
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
    backgroundColor: '#1E3A5F',
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
  logoImg: {
    height: '40px',
    width: 'auto',
  },
  logoLink: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoSubText: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#D4AF37',
    marginLeft: '12px',
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
    padding: '60px 0',
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
    color: '#D4AF37',
  },
  statsSection: {
    backgroundColor: '#1E3A5F',
    padding: '48px 0',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '24px',
    textAlign: 'center',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  statLabel: {
    fontSize: '14px',
    color: '#fff',
    opacity: 0.9,
    marginTop: '8px',
  },
  section: {
    padding: '64px 0',
  },
  introText: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  introParagraph: {
    fontSize: '16px',
    color: '#444',
    lineHeight: 2,
    marginBottom: '20px',
    textAlign: 'justify',
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '48px',
    color: '#1E3A5F',
  },
  aboutGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '24px',
  },
  aboutCard: {
    backgroundColor: '#fff',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    border: '1px solid #E5E5E5',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardIcon: {
    fontSize: '40px',
    marginBottom: '16px',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '12px',
  },
  cardText: {
    fontSize: '15px',
    color: '#666',
    lineHeight: 1.8,
    flex: 1,
  },
  analysisGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '24px',
  },
  analysisItem: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '8px',
    border: '1px solid #E5E5E5',
  },
  analysisTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: '12px',
  },
  analysisText: {
    fontSize: '14px',
    color: '#666',
    lineHeight: 1.8,
  },
  bookCard: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    border: '1px solid #E5E5E5',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '40px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  bookImgWrapper: {
    flexShrink: 0,
  },
  bookImg: {
    width: '160px',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  bookContent: {
    flex: 1,
  },
  bookTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '16px',
  },
  bookText: {
    fontSize: '15px',
    color: '#666',
    lineHeight: 1.8,
    marginBottom: '16px',
  },
  bookPublisher: {
    fontSize: '14px',
    color: '#D4AF37',
    fontWeight: 'bold',
  },
  contactLayout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '80px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  contactInfo: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    flex: 1,
  },
  contactItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1px solid #E5E5E5',
  },
  contactLabel: {
    fontSize: '14px',
    color: '#999',
    marginBottom: '8px',
  },
  contactValue: {
    fontSize: '16px',
    color: '#1E3A5F',
    fontWeight: 'bold',
  },
  qrCodes: {
    display: 'flex',
    gap: '32px',
    flexShrink: 0,
  },
  qrCodeItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  qrCodeImg: {
    width: '120px',
    height: '120px',
    borderRadius: '8px',
    border: '1px solid #E5E5E5',
  },
  qrCodeLabel: {
    fontSize: '14px',
    color: '#666',
    marginTop: '8px',
    textAlign: 'center',
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
