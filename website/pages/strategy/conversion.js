import Head from 'next/head'
import Link from 'next/link'

const strategyData = [
  { id: 2, title: 'MUSE设计奖参赛材料准备全攻略', date: '2026-03-25', category: '备赛指南', excerpt: '从图片拍摄到文案撰写，详解MUSE奖参赛材料的准备要点。' },
  { id: 5, title: '设计说明撰写技巧：让文字为作品加分', date: '2026-02-15', category: '备赛指南', excerpt: '专业的设计说明是获奖的关键因素之一，教你如何写出打动评委的文案。' },
]

export default function StrategyPrep() {
  return (
    <>
      <Head>
        <title>备赛指南 | 设计能</title>
        <meta name="description" content="国际设计大奖参赛材料准备、设计说明撰写等备赛技巧。" />
      </Head>

      <header style={styles.header}>
        <div style={styles.container}>
          <div style={styles.headerInner}>
            <div style={styles.logo}>
              <Link href="/"><img src="/设计能LOGO透明文件.png" alt="设计能" style={styles.logoImg} /></Link>
              <span style={styles.logoSubText}>国际设计大奖策略咨询平台</span>
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

      <main>
        <section style={styles.hero}>
          <div style={styles.container}>
            <div style={styles.breadcrumb}><Link href="/strategy" style={styles.breadLink}>参赛策略</Link> / 荣誉转化</div>
            <h1 style={styles.heroTitle}>荣誉转化</h1>
            <p style={styles.heroDesc}>参赛材料准备、设计说明撰写等备赛技巧</p>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.container}>
            <div style={styles.categories}>
              <Link href="/strategy" style={styles.categoryBtn}>全部</Link>
              <Link href="/strategy/strategy" style={styles.categoryBtn}>参赛策略</Link>
              <Link href="/strategy/conversion" style={styles.categoryActive}>荣誉转化</Link>
              <Link href="/strategy/growth" style={styles.categoryBtn}>参赛成长</Link>
            </div>
            <div style={styles.strategyGrid}>
              {strategyData.map((item) => (
                <div key={item.id} style={styles.strategyCard}>
                  <div style={styles.strategyMeta}>
                    <span style={styles.strategyCategory}>{item.category}</span>
                    <span style={styles.strategyDate}>{item.date}</span>
                  </div>
                  <h3 style={styles.strategyTitle}>{item.title}</h3>
                  <p style={styles.strategySummary}>{item.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        <div style={styles.container}>
          <p style={styles.footerText}>© 2026 设计能 | 电话：136-9222-2744</p>
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
  hero: { background: 'linear-gradient(135deg, #1E3A5F 0%, #2d4a6f 100%)', padding: '60px 0', color: '#fff' },
  breadcrumb: { fontSize: '14px', marginBottom: '12px', opacity: 0.8 },
  breadLink: { color: '#fff', textDecoration: 'none' },
  heroTitle: { fontSize: '36px', fontWeight: 'bold', marginBottom: '12px' },
  heroDesc: { fontSize: '18px', opacity: 0.9 },
  section: { padding: '60px 0' },
  categories: { display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' },
  categoryBtn: { padding: '8px 20px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '20px', color: '#666', textDecoration: 'none', fontSize: '14px' },
  categoryActive: { padding: '8px 20px', backgroundColor: '#1E3A5F', border: '1px solid #1E3A5F', borderRadius: '20px', color: '#fff', textDecoration: 'none', fontSize: '14px' },
  strategyGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' },
  strategyCard: { backgroundColor: '#fff', padding: '20px 24px', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #E5E5E5', display: 'flex', flexDirection: 'column' },
  strategyMeta: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', flexShrink: 0 },
  strategyCategory: { backgroundColor: '#FFF3E0', color: '#E65100', padding: '4px 12px', borderRadius: '12px', fontSize: '12px' },
  strategyDate: { fontSize: '12px', color: '#999' },
  strategyTitle: { fontSize: '17px', fontWeight: 'bold', color: '#1E3A5F', marginBottom: '8px', lineHeight: 1.4, flexShrink: 0 },
  strategySummary: { fontSize: '13px', color: '#666', lineHeight: 1.6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', flex: 1 },
  footer: { backgroundColor: '#1A1A1A', padding: '32px 0', color: '#fff' },
  footerText: { fontSize: '14px', textAlign: 'center', opacity: 0.7 },
}
