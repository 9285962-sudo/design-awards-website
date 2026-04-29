import Head from 'next/head'
import Link from 'next/link'
import newsDataJson from '../../data/news.json'

// 筛选获奖快讯类文章
const newsData = newsDataJson.articles.filter(a => a.category === '获奖快讯')

export default function NewsWinners() {
  return (
    <>
      <Head>
        <title>获奖快讯 | 设计能</title>
        <meta name="description" content="中国设计师在国际设计大奖中的获奖喜讯。" />
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
            <div style={styles.breadcrumb}><Link href="/news" style={styles.breadLink}>赛事新闻</Link> / 获奖快讯</div>
            <h1 style={styles.heroTitle}>获奖快讯</h1>
            <p style={styles.heroDesc}>中国设计师在国际设计大奖中的获奖喜讯</p>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.container}>
            <div style={styles.categories}>
              <Link href="/news" style={styles.categoryBtn}>全部</Link>
              <Link href="/news/notice" style={styles.categoryBtn}>报名通知</Link>
              <Link href="/news/winners" style={styles.categoryActive}>获奖快讯</Link>
              <Link href="/news/events" style={styles.categoryBtn}>赛事动态</Link>
            </div>
            <div style={styles.newsGrid}>
              {newsData.map((news) => (
                <Link key={news.id} href={`/articles/${news.id}.html`} style={{textDecoration: 'none'}}>
                  <div style={styles.newsCard}>
                    <div style={styles.newsImage}>16:9</div>
                    <div style={styles.newsContent}>
                      <div style={styles.newsMeta}>
                        <span style={styles.newsCategory}>{news.category}</span>
                        <span style={styles.newsDate}>{news.publishTime}</span>
                      </div>
                      <h3 style={styles.newsTitle}>{news.title}</h3>
                      <p style={styles.newsSummary}>{news.summary}</p>
                    </div>
                  </div>
                </Link>
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
  newsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' },
  newsCard: { width: '100%', backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #E5E5E5' },
  newsImage: { width: '100%', height: '200px', backgroundColor: '#e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '14px' },
  newsContent: { padding: '24px' },
  newsMeta: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px' },
  newsCategory: { backgroundColor: '#E3F2FD', color: '#1565C0', padding: '4px 12px', borderRadius: '12px', fontSize: '12px' },
  newsDate: { fontSize: '12px', color: '#999' },
  newsTitle: { fontSize: '18px', fontWeight: 'bold', color: '#1E3A5F', marginBottom: '8px', lineHeight: 1.4 },
  newsSummary: { fontSize: '14px', color: '#666', lineHeight: 1.6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical' },
  footer: { backgroundColor: '#1A1A1A', padding: '32px 0', color: '#fff' },
  footerText: { fontSize: '14px', textAlign: 'center', opacity: 0.7 },
}
