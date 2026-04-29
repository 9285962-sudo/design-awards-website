import Head from 'next/head'
import Link from 'next/link'
import strategyDataObj from '../../data/strategy.json'

// 文章数据 - 参赛策略分类下的所有文章
const strategyData = strategyDataObj.articles

export default function StrategyPage() {
  return (
    <>
      <Head>
        <title>参赛策略 | 设计能 - 国际设计大奖申报平台</title>
        <meta name="description" content="国际设计大奖参赛策略、申报指南、获奖技巧。专业国际奖项研究、参赛策略咨询，指导如何准备参赛作品、撰写设计说明、提高获奖概率。" />
        <meta name="keywords" content="设计大奖参赛策略,国际设计奖申报指南,获奖技巧,国际奖项研究,参赛策略咨询,参赛作品准备,设计说明撰写,提高获奖率,设计奖评审标准" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.52de.cc/strategy" />
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
              <Link href="/about" style={styles.navLink}>关于我们</Link>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section style={styles.hero}>
          <div style={styles.container}>
            <h1 style={styles.heroTitle}>参赛策略</h1>
            <p style={styles.heroDesc}>专业的申报指南与获奖策略，助您在国际设计大奖中脱颖而出</p>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.container}>
            <div style={styles.categories}>
              <Link href="/strategy" style={styles.categoryActive}>全部</Link>
              <Link href="/strategy/strategy" style={styles.categoryBtn}>参赛策略</Link>
              <Link href="/strategy/conversion" style={styles.categoryBtn}>荣誉转化</Link>
              <Link href="/strategy/growth" style={styles.categoryBtn}>参赛成长</Link>
            </div>

            {strategyData.length === 0 ? (
              <div style={styles.emptyState}>
                <p style={styles.emptyText}>暂无策略文章，敬请期待...</p>
              </div>
            ) : (
              <div style={styles.newsGrid}>
                {strategyData.map((article) => (
                  <Link key={article.id} href={`/articles/${article.id}.html`} style={{textDecoration: 'none'}}>
                    <div style={styles.newsCard}>
                      {article.cover ? (
                        <div style={{...styles.newsImage, backgroundImage: `url(${article.cover})`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
                      ) : (
                        <div style={styles.newsImage}>策略</div>
                      )}
                      <div style={styles.newsContent}>
                        <div style={styles.newsMeta}>
                          <span style={styles.newsCategory}>{article.category}</span>
                          <span style={styles.newsDate}>{article.publishTime}</span>
                        </div>
                        <h3 style={styles.newsTitle}>{article.title}</h3>
                        <p style={styles.newsSummary}>{article.summary}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        <div style={styles.container}>
          <p style={styles.footerText}>© 2026 设计能 | 电话：136-9222-2744 | 邮箱：9285962@qq.com</p>
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
  hero: { background: 'linear-gradient(135deg, #1E3A5F 0%, #2d4a6f 100%)', padding: '60px 0', textAlign: 'center', color: '#fff' },
  heroTitle: { fontSize: '36px', fontWeight: 'bold', marginBottom: '12px' },
  heroDesc: { fontSize: '18px', opacity: 0.9 },
  section: { padding: '60px 0' },
  emptyState: { textAlign: 'center', padding: '80px 0' },
  emptyText: { fontSize: '16px', color: '#999' },
  categories: { display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' },
  categoryBtn: { padding: '8px 20px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '20px', color: '#666', textDecoration: 'none', fontSize: '14px' },
  categoryActive: { padding: '8px 20px', backgroundColor: '#1E3A5F', border: '1px solid #1E3A5F', borderRadius: '20px', color: '#fff', textDecoration: 'none', fontSize: '14px' },
  newsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' },
  newsCard: { width: '100%', backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #E5E5E5', display: 'flex', flexDirection: 'column' },
  newsImage: { width: '100%', height: '200px', backgroundColor: '#e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '14px', flexShrink: 0 },
  newsContent: { padding: '20px 24px', display: 'flex', flexDirection: 'column', flex: 1 },
  newsMeta: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', flexShrink: 0 },
  newsCategory: { backgroundColor: '#E3F2FD', color: '#1565C0', padding: '4px 12px', borderRadius: '12px', fontSize: '12px' },
  newsDate: { fontSize: '12px', color: '#999' },
  newsTitle: { fontSize: '17px', fontWeight: 'bold', color: '#1E3A5F', marginBottom: '8px', lineHeight: 1.4, flexShrink: 0 },
  newsSummary: { fontSize: '13px', color: '#666', lineHeight: 1.6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', flex: 1 },
  footer: { backgroundColor: '#1A1A1A', padding: '32px 0', color: '#fff' },
  footerText: { fontSize: '14px', textAlign: 'center', opacity: 0.7 },
}
