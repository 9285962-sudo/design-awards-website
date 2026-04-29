import Head from 'next/head'
import Link from 'next/link'
import awardsData from '../data/awards.json'

// 定义分类：直接用 category_main 精确匹配
const categoryGroups = {
  architecture: ['建筑设计'],
  interior: ['室内设计'],
  product: ['产品设计', '概念设计'],
  visual: ['视觉传达', '传达设计'],
  general: ['综合设计']
}

function AwardCard({ award }) {
  const hasFee = award.fee_early_bird || award.fee_regular || award.fee_student
  const hasDeadline = award.deadline_early || award.deadline_regular
  
  return (
    <Link href={`/awards/${award.award_id}`} style={styles.awardCardLink}>
      <div style={styles.awardCard}>
        <div style={styles.awardCountry}>{award.country && award.country !== '待补充' ? award.country : '国际'}</div>
        <h3 style={styles.awardName}>{award.award_name_cn}</h3>
        <p style={styles.awardNameEn}>{award.award_name_en}</p>
        <div style={styles.awardMeta}>
          <span style={styles.awardType}>{award.award_type || '综合奖'}</span>
          {award.prestige_level && <span style={styles.awardPrestige}>{award.prestige_level}</span>}
        </div>
        <div style={styles.awardDeadline}>
          {hasDeadline ? (
            <>
              {award.deadline_early && <span>早鸟：{award.deadline_early}</span>}
              {award.deadline_regular && <span> 常规：{award.deadline_regular}</span>}
            </>
          ) : (
            <span style={{color: '#999'}}>截止日期：官网查询</span>
          )}
        </div>
        <div style={styles.awardFee}>
          {hasFee ? (
            <>
              {award.fee_currency === 'USD' && '$'}
              {award.fee_currency === 'GBP' && '£'}
              {award.fee_currency === 'EUR' && '€'}
              {award.fee_early_bird || award.fee_regular || award.fee_student}起
            </>
          ) : (
            <span style={{color: '#999'}}>费用：官网查询</span>
          )}
        </div>
      </div>
    </Link>
  )
}

// 按分类筛选奖项（精确匹配 category_main），并按更新时间降序排列
function filterByCategory(category) {
  const values = categoryGroups[category] || []
  return awardsData
    .filter(a => values.includes(a.category_main))
    .sort((a, b) => {
      const dateA = a.update_time || '1970-01-01'
      const dateB = b.update_time || '1970-01-01'
      return dateB.localeCompare(dateA) // 越新越靠前
    })
}

export default function Awards() {
  const architectureAwards = filterByCategory('architecture')
  const interiorAwards = filterByCategory('interior')
  const productAwards = filterByCategory('product')
  const visualAwards = filterByCategory('visual')
  const generalAwards = filterByCategory('general')

  return (
    <>
      <Head>
        <title>奖项库 | 设计能 - 国际设计大奖申报平台</title>
        <meta name="description" content="设计能国际奖项库合作108个全球顶级设计大奖，提供国际奖项研究、参赛策略咨询。涵盖建筑、室内、景观、产品、视觉传达等领域，MUSE奖、红点奖、iF奖、IDEA奖等一站式申报服务。" />
        <meta name="keywords" content="设计大奖库,国际设计奖项,国际奖项研究,参赛策略咨询,MUSE设计奖,红点奖,iF奖,IDEA奖,GMark奖,建筑设计奖,室内设计奖,产品设计奖,景观设计奖" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.52de.cc/awards" />
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
            <h1 style={styles.heroTitle}>全球设计大奖奖项库</h1>
            <p style={styles.heroDesc}>我们代理覆盖建筑、室内、景观、产品、视觉传达等全品类设计大奖</p>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>建筑与空间设计类</h2>
            <div style={styles.awardsGrid}>
              {architectureAwards.map(a => <AwardCard key={a.award_id} award={a} />)}
            </div>
            <div style={styles.moreLink}><Link href="/compare" style={styles.moreLinkStyle}>查看更多建筑类奖项 →</Link></div>

            <h2 style={styles.sectionTitle}>室内设计类</h2>
            <div style={styles.awardsGrid}>
              {interiorAwards.map(a => <AwardCard key={a.award_id} award={a} />)}
            </div>
            <div style={styles.moreLink}><Link href="/compare" style={styles.moreLinkStyle}>查看更多室内设计类奖项 →</Link></div>

            <h2 style={styles.sectionTitle}>产品与工业设计类</h2>
            <div style={styles.awardsGrid}>
              {productAwards.map(a => <AwardCard key={a.award_id} award={a} />)}
            </div>
            <div style={styles.moreLink}><Link href="/compare" style={styles.moreLinkStyle}>查看更多产品设计类奖项 →</Link></div>

            <h2 style={styles.sectionTitle}>视觉传达与品牌类</h2>
            <div style={styles.awardsGrid}>
              {visualAwards.map(a => <AwardCard key={a.award_id} award={a} />)}
            </div>
            <div style={styles.moreLink}><Link href="/compare" style={styles.moreLinkStyle}>查看更多视觉传达类奖项 →</Link></div>

            <h2 style={styles.sectionTitle}>综合设计类</h2>
            <div style={styles.awardsGrid}>
              {generalAwards.map(a => <AwardCard key={a.award_id} award={a} />)}
            </div>
            <div style={styles.moreLink}><Link href="/compare" style={styles.moreLinkStyle}>查看更多综合设计类奖项 →</Link></div>

            <div style={styles.cta}>
              <p style={styles.ctaText}>更多奖项咨询，请联系：<a href="tel:13692222744" style={styles.ctaLink}>136-9222-2744</a></p>
            </div>
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
  sectionTitle: { fontSize: '28px', fontWeight: 'bold', color: '#1E3A5F', marginBottom: '32px', marginTop: '48px' },
  awardsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' },
  awardCardLink: { textDecoration: 'none' },
  awardCard: { backgroundColor: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #E5E5E5', transition: 'transform 0.2s, box-shadow 0.2s' },
  awardCountry: { fontSize: '12px', color: '#999', marginBottom: '8px' },
  awardName: { fontSize: '18px', fontWeight: 'bold', color: '#1E3A5F', marginBottom: '4px' },
  awardNameEn: { fontSize: '12px', color: '#666', marginBottom: '12px' },
  awardDeadline: { fontSize: '13px', color: '#666', marginBottom: '8px' },
  awardMeta: { display: 'flex', gap: '8px', marginBottom: '12px' },
  awardType: { fontSize: '11px', backgroundColor: '#f0f0f0', padding: '2px 8px', borderRadius: '4px', color: '#666' },
  awardPrestige: { fontSize: '11px', backgroundColor: '#D4AF37', padding: '2px 8px', borderRadius: '4px', color: '#fff' },
  awardFee: { fontSize: '18px', fontWeight: 'bold', color: '#D4AF37' },
  cta: { textAlign: 'center', marginTop: '60px', padding: '40px', backgroundColor: '#f8f9fa', borderRadius: '12px' },
  ctaText: { fontSize: '18px', color: '#666' },
  ctaLink: { color: '#D4AF37', textDecoration: 'none', fontWeight: 'bold' },
  footer: { backgroundColor: '#1A1A1A', padding: '32px 0', color: '#fff' },
  footerText: { fontSize: '14px', textAlign: 'center', opacity: 0.7 },
  moreLink: { textAlign: 'center', marginTop: '24px', marginBottom: '48px' },
  moreLinkStyle: { color: '#D4AF37', textDecoration: 'none', fontSize: '15px', fontWeight: 'bold' },
}
