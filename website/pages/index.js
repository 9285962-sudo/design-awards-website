import Head from 'next/head'
import Link from 'next/link'
import awards from '../data/awards.json'

// 首页 - 2026-04-16 更新：9项导航
export default function Home() {
  // 精选6个重点奖项展示在首页
  const featuredAwards = awards.slice(0, 6)

  return (
    <>
      <Head>
        <title>设计能 | 国际设计大奖一站式申报平台</title>
        <meta name="description" content="专业代理申报108个全球设计大奖，含MUSE设计奖、D&AD、RIBA、LIA、Andrew Martin等。15年经验，80%获奖率。咨询：136-9222-2744" />
        <meta name="keywords" content="设计大奖,国际设计奖,MUSE设计奖,D&AD奖,RIBA奖,LIA奖,Andrew Martin奖,设计奖申报代理" />
        
        {/* Open Graph */}
        <meta property="og:title" content="设计能 | 国际设计大奖一站式申报平台" />
        <meta property="og:description" content="专业代理申报108个全球设计大奖" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.52de.cc" />
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
              <Link href="/awards" style={styles.navLink}>奖项库</Link>
              <Link href="/compare" style={styles.navLink}>奖项对比</Link>
              <Link href="/cases" style={styles.navLink}>成功案例</Link>
              <Link href="/strategy" style={styles.navLink}>参赛策略</Link>
              <Link href="/news" style={styles.navLink}>赛事新闻</Link>
              <Link href="/services" style={styles.navLink}>申报服务</Link>
              <Link href="/about" style={styles.navLink}>关于我们</Link>
              <Link href="/contact" style={styles.navLink}>联系我们</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.container}>
          <h1 style={styles.heroTitle}>
            国际设计大奖
            <span style={styles.heroSubtitle}>一站式申报平台</span>
          </h1>
          <p style={styles.heroDesc}>
            涵盖建筑、室内、景观、产品、视觉传达等全品类设计奖项
            <br />
            15年深耕 · 108个奖项 · 350+设计师选择 · 80%获奖率
          </p>
          <div style={styles.heroButtons}>
            <a href="tel:13692222744" style={styles.btnPrimary}>
              📞 立即咨询
            </a>
            <Link href="/services" style={styles.btnSecondary}>
              查看申报服务
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Awards */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>重点奖项</h2>
          <p style={styles.sectionSubtitle}>我们代理的部分全球顶级设计大奖</p>
          <div style={styles.awardsGrid}>
            {featuredAwards.map((award) => (
              <Link 
                key={award.award_id} 
                href={`/awards/${award.award_id}`}
                style={styles.awardCard}
              >
                <div style={styles.awardCountry}>{award.country} · {award.city}</div>
                <h3 style={styles.awardName}>{award.award_name_cn}</h3>
                <p style={styles.awardNameEn}>{award.award_name_en}</p>
                <div style={styles.awardMeta}>
                  <span style={styles.awardType}>{award.award_type}</span>
                  <span style={styles.awardPrestige}>{award.prestige_level}</span>
                </div>
                <div style={styles.awardDeadline}>
                  {award.deadline_early && (
                    <span>早鸟截止：{award.deadline_early}</span>
                  )}
                  {award.deadline_regular && (
                    <span> 常规截止：{award.deadline_regular}</span>
                  )}
                </div>
                <div style={styles.awardFee}>
                  {award.fee_currency === 'USD' && '$'}
                  {award.fee_currency === 'GBP' && '£'}
                  {award.fee_early_bird || award.fee_regular || award.fee_student}起
                </div>
              </Link>
            ))}
          </div>
          <div style={styles.moreAwards}>
            <p style={styles.moreText}>更多奖项咨询请致电：<a href="tel:13692222744" style={styles.phoneLink}>136-9222-2744</a></p>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section style={{...styles.section, backgroundColor: '#f8f9fa'}}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>核心服务</h2>
          <div style={styles.servicesGrid}>
            <div style={styles.serviceCard}>
              <div style={styles.serviceIcon}>🔍</div>
              <h3 style={styles.serviceTitle}>参赛作品分析</h3>
              <p style={styles.serviceDesc}>以国际评委视角，全方位剖析作品优势与短板，提供可执行的优化策略</p>
            </div>
            <div style={styles.serviceCard}>
              <div style={styles.serviceIcon}>🎯</div>
              <h3 style={styles.serviceTitle}>奖项精准匹配</h3>
              <p style={styles.serviceDesc}>根据作品特点，精准匹配最适合的参赛奖项，提升获奖概率</p>
            </div>
            <div style={styles.serviceCard}>
              <div style={styles.serviceIcon}>📝</div>
              <h3 style={styles.serviceTitle}>专业文案撰写</h3>
              <p style={styles.serviceDesc}>专业团队用专业语言撰写申报材料，让作品呈现达到国际评委标准</p>
            </div>
            <div style={styles.serviceCard}>
              <div style={styles.serviceIcon}>🏆</div>
              <h3 style={styles.serviceTitle}>全程代理申报</h3>
              <p style={styles.serviceDesc}>从材料准备到提交缴费，全程代理，让您省心省力</p>
            </div>
          </div>
          <div style={styles.moreServices}>
            <Link href="/services" style={styles.moreServicesLink}>
              查看完整服务内容 →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        <div style={styles.container}>
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>15+</div>
              <div style={styles.statLabel}>年行业经验</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>108</div>
              <div style={styles.statLabel}>全球合作奖项</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>350+</div>
              <div style={styles.statLabel}>服务设计师</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>80%</div>
              <div style={styles.statLabel}>平均获奖率</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.container}>
          <h2 style={styles.ctaTitle}>准备好冲击国际大奖了吗？</h2>
          <p style={styles.ctaDesc}>专业团队为您保驾护航，让您的设计作品在国际舞台绽放光芒</p>
          <div style={styles.ctaButtons}>
            <a href="tel:13692222744" style={styles.btnPrimary}>📞 立即咨询</a>
            <Link href="/about" style={styles.btnOutline}>了解更多</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.footerContent}>
            <div style={styles.footerBrand}>
              <img src="/设计能LOGO透明文件.png" alt="设计能" style={styles.footerLogo} />
              <p style={styles.footerSlogan}>专业国际设计大奖代理申报服务</p>
            </div>
            <div style={styles.footerContact}>
              <p style={styles.footerContactTitle}>联系我们</p>
              <p style={styles.footerContactItem}>📞 电话：136-9222-2744</p>
              <p style={styles.footerContactItem}>📧 邮箱：9285962@qq.com</p>
              <p style={styles.footerContactItem}>🌐 官网：www.52de.cc</p>
            </div>
          </div>
          <p style={styles.footerText}>© 2026 设计能—国际设计大奖申报指南 | www.52de.cc</p>
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
    fontSize: '18px',
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
    gap: '20px',
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
    fontSize: '28px',
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
  section: {
    padding: '64px 0',
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '8px',
    color: '#1E3A5F',
  },
  sectionSubtitle: {
    fontSize: '16px',
    textAlign: 'center',
    color: '#666',
    marginBottom: '48px',
  },
  awardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '24px',
  },
  awardCard: {
    backgroundColor: '#fff',
    padding: '28px',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    textDecoration: 'none',
    display: 'block',
    transition: 'transform 0.2s, box-shadow 0.2s',
    border: '1px solid #E5E5E5',
  },
  awardCountry: {
    fontSize: '12px',
    color: '#999',
    marginBottom: '8px',
  },
  awardName: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '4px',
  },
  awardNameEn: {
    fontSize: '13px',
    color: '#666',
    marginBottom: '12px',
  },
  awardMeta: {
    display: 'flex',
    gap: '8px',
    marginBottom: '12px',
  },
  awardType: {
    backgroundColor: '#E8F4E8',
    color: '#2E7D32',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
  },
  awardPrestige: {
    backgroundColor: '#FFF3E0',
    color: '#E65100',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
  },
  awardDeadline: {
    fontSize: '13px',
    color: '#666',
    marginBottom: '8px',
  },
  awardFee: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  moreAwards: {
    textAlign: 'center',
    marginTop: '32px',
  },
  moreText: {
    fontSize: '16px',
    color: '#666',
  },
  phoneLink: {
    color: '#D4AF37',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
  },
  serviceCard: {
    backgroundColor: '#fff',
    padding: '28px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  serviceIcon: {
    fontSize: '36px',
    marginBottom: '16px',
  },
  serviceTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '8px',
  },
  serviceDesc: {
    fontSize: '13px',
    color: '#666',
    lineHeight: 1.6,
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
  statsSection: {
    backgroundColor: '#1E3A5F',
    padding: '60px 0',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '32px',
    textAlign: 'center',
  },
  statItem: {
    color: '#fff',
  },
  statNumber: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: '8px',
  },
  statLabel: {
    fontSize: '16px',
    opacity: 0.9,
  },
  ctaSection: {
    backgroundColor: '#f8f9fa',
    padding: '80px 0',
    textAlign: 'center',
  },
  ctaTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '16px',
  },
  ctaDesc: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '32px',
  },
  ctaButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: '#1A1A1A',
    padding: '48px 0 24px',
    color: '#fff',
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '32px',
    paddingBottom: '32px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  footerBrand: {
    flex: 1,
  },
  footerLogo: {
    height: '40px',
    width: 'auto',
    marginBottom: '12px',
  },
  footerSlogan: {
    fontSize: '14px',
    opacity: 0.7,
  },
  footerContact: {
    textAlign: 'right',
  },
  footerContactTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#D4AF37',
  },
  footerContactItem: {
    fontSize: '14px',
    marginBottom: '8px',
    opacity: 0.8,
  },
  footerText: {
    fontSize: '12px',
    textAlign: 'center',
    opacity: 0.5,
  },
}
