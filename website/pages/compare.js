import Head from 'next/head'
import Link from 'next/link'
import { useState, useMemo, Fragment } from 'react'
import awards from '../data/awards.json'

const MAX_COMPARE = 4

const CURRENCY_SYMBOLS = { EUR: '€', USD: '$', GBP: '£', JPY: '¥', HKD: 'HK$' }
const EXCHANGE_RATES = { EUR: 7.85, USD: 7.25, GBP: 9.15, JPY: 0.048, HKD: 0.93 }

function toCNY(amount, currency) {
  return Math.round(amount * (EXCHANGE_RATES[currency] || 1))
}

function formatFee(amount, currency) {
  if (!amount) return '—'
  return `${CURRENCY_SYMBOLS[currency] || ''}${amount.toLocaleString()}`
}

export default function Compare() {
  const [selected, setSelected] = useState([])
  const [filter, setFilter] = useState('全部')
  const [showResult, setShowResult] = useState(false)

  const categories = useMemo(() => {
    const cats = [...new Set(awards.map(a => a.category_main))]
    return ['全部', ...cats]
  }, [])

  const filteredAwards = useMemo(() => {
    return filter === '全部' ? awards : awards.filter(a => a.category_main === filter)
  }, [filter])

  function toggleSelect(id) {
    setSelected(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      if (prev.length >= MAX_COMPARE) return prev
      return [...prev, id]
    })
  }

  function clearSelect() {
    setSelected([])
    setShowResult(false)
  }

  function doCompare() {
    if (selected.length < 2) return
    setShowResult(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function backToSelect() {
    setShowResult(false)
  }

  const selectedAwards = awards.filter(a => selected.includes(a.award_id))

  // 简化后的对比维度
  const compareSections = [
    {
      title: '📅 时间节点',
      fields: [
        { key: 'deadline_early', label: '早鸟截止' },
        { key: 'deadline_regular', label: '常规截止' },
        { key: 'deadline_final', label: '最终截止' },
        { key: 'announcement_date', label: '结果公布' },
      ]
    },
    {
      title: '💰 参赛费用',
      fields: [
        { key: 'fee_early_bird', label: '早鸟费', currency: true },
        { key: 'fee_regular', label: '常规费', currency: true },
        { key: 'fee_student', label: '学生费', currency: true },
      ]
    },
    {
      title: '🏅 奖项与声誉',
      fields: [
        { key: 'prestige_level', label: '声誉等级' },
        { key: 'award_levels', label: '奖项等级', array: true },
        { key: 'win_rate', label: '获奖率' },
      ]
    },
    {
      title: '📋 参赛条件',
      fields: [
        { key: 'project_year_limit', label: '作品年限' },
        { key: 'project_status', label: '作品状态' },
      ]
    }
  ]

  function getFieldValue(award, field) {
    if (field.currency) {
      return formatFee(award[field.key], award.fee_currency)
    }
    const val = award[field.key]
    if (field.array && Array.isArray(val)) return val.join(' → ')
    if (field.array && typeof val === 'string') return val
    return val || '—'
  }

  return (
    <>
      <Head>
        <title>奖项对比 | 设计能 - 国际设计大奖申报平台</title>
        <meta name="description" content="热门国际设计大奖对比分析：费用、时间、难度、评审标准多维度对比。选择最适合的参赛奖项。" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.52de.cc/compare" />
      </Head>

      <header style={s.header}>
        <div style={s.container}>
          <div style={s.headerInner}>
            <div style={s.logo}>
              <Link href="/"><img src="/设计能LOGO透明文件.png" alt="设计能" style={s.logoImg} /></Link>
              <span style={s.logoSubText}>国际设计大奖策略咨询平台</span>
            </div>
            <nav style={s.nav}>
              <Link href="/" style={s.navLink}>首页</Link>
              <Link href="/awards" style={s.navLink}>奖项库</Link>
              <Link href="/compare" style={{...s.navLink, color: '#D4AF37'}}>奖项对比</Link>
              <Link href="/services" style={s.navLink}>申报服务</Link>
              <Link href="/strategy" style={s.navLink}>参赛策略</Link>
              <Link href="/news" style={s.navLink}>赛事新闻</Link>
              <Link href="/about" style={s.navLink}>关于我们</Link>
            </nav>
          </div>
        </div>
      </header>

      {!showResult ? (
        <main>
          <section style={s.hero}>
            <div style={s.container}>
              <h1 style={s.heroTitle}>奖项对比</h1>
              <p style={s.heroDesc}>选择 2-4 个奖项，一键对比费用、时间、声誉等核心维度</p>
            </div>
          </section>

          <section style={s.section}>
            <div style={s.container}>
              <div style={s.selectHeader}>
                <h2 style={s.selectTitle}>选择奖项 <span style={s.badge}>{selected.length}/{MAX_COMPARE}</span></h2>
              </div>

              <div style={s.filterBar}>
                {categories.map(cat => (
                  <button key={cat} style={filter === cat ? s.filterBtnActive : s.filterBtn} onClick={() => setFilter(cat)}>
                    {cat}
                  </button>
                ))}
              </div>

              <div style={s.cardGrid}>
                {filteredAwards.map(a => {
                  const isSel = selected.includes(a.award_id)
                  return (
                    <div key={a.award_id} style={{...s.card, ...(isSel ? s.cardSelected : {})}} onClick={() => toggleSelect(a.award_id)}>
                      {isSel && <div style={s.checkMark}>✓</div>}
                      <div style={s.cardName}>{a.award_name_cn}</div>
                      <div style={s.cardEnName}>{a.award_name_en}</div>
                      <div style={s.cardMeta}>
                        <span style={s.cardFee}>{formatFee(a.fee_early_bird || a.fee_regular, a.fee_currency)}起</span>
                        <span style={s.cardTag}>{a.prestige_level}</span>
                        <span>🌍 {a.country}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          <div style={s.bottomBar}>
            <span style={s.barInfo}>已选 <strong style={{color:'#D4AF37'}}>{selected.length}</strong> 个奖项</span>
            <button style={{...s.btnCompare, ...(selected.length < 2 ? s.btnDisabled : {})}} disabled={selected.length < 2} onClick={doCompare}>
              开始对比
            </button>
            <button style={s.btnClear} onClick={clearSelect}>清空</button>
          </div>
        </main>
      ) : (
        <main>
          <section style={s.hero}>
            <div style={s.container}>
              <h1 style={s.heroTitle}>对比结果</h1>
              <p style={s.heroDesc}>
                {selectedAwards.map((a, i) => (
                  <span key={a.award_id}>{i > 0 && '  vs  '}{a.award_name_cn}</span>
                ))}
              </p>
            </div>
          </section>

          <section style={s.section}>
            <div style={s.container}>
              <div style={{marginBottom: 24}}>
                <span style={{...s.navLink, cursor:'pointer', color:'#D4AF37'}} onClick={backToSelect}>← 重新选择</span>
              </div>

              {/* 对比结果 - 卡片式布局 */}
              {compareSections.map((sec, si) => (
                <div key={si} style={s.sectionBlock}>
                  <h2 style={s.sectionTitle}>{sec.title}</h2>
                  <div style={s.cardsRow(selectedAwards.length)}>
                    {selectedAwards.map((a, ai) => (
                      <div key={a.award_id} style={{...s.awardCard, ...(ai === 0 ? s.awardCardFirst : {})}}>
                        {/* 奖项名称头部 */}
                        <div style={s.cardHeader}>
                          <div style={s.cardHeaderName}>{a.award_name_cn}</div>
                          <div style={s.cardHeaderEn}>{a.award_name_en}</div>
                        </div>
                        {/* 字段列表 */}
                        <div style={s.cardBody}>
                          {sec.fields.map((field, fi) => {
                            const numericVals = selectedAwards.map(sa => {
                              const f = sa[field.key]
                              if (field.currency && f) return toCNY(f, sa.fee_currency)
                              return null
                            }).filter(v => v !== null)
                            const minVal = numericVals.length > 0 ? Math.min(...numericVals) : null
                            const myVal = field.currency && a[field.key] ? toCNY(a[field.key], a.fee_currency) : null
                            const isLowest = field.currency && minVal !== null && myVal !== null && myVal === minVal

                            return (
                            <div key={fi} style={{...s.fieldRow, ...(fi % 2 === 0 ? s.fieldRowEven : {})}}>
                              <span style={s.fieldLabel}>{field.label}</span>
                              <span style={{...s.fieldValue, ...(isLowest ? s.fieldValueLow : {})}}>
                                {getFieldValue(a, field)}
                                {isLowest && <span style={s.lowestBadge}>最低</span>}
                              </span>
                            </div>
                          )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* 费用柱状图 */}
              <div style={s.chartBox}>
                <h3 style={s.chartTitle}>💰 常规费用对比（折合人民币）</h3>
                {(() => {
                  const maxCNY = Math.max(...selectedAwards.map(a => a.fee_regular ? toCNY(a.fee_regular, a.fee_currency) : 0))
                  return selectedAwards.map(a => {
                    const cny = a.fee_regular ? toCNY(a.fee_regular, a.fee_currency) : 0
                    const pct = maxCNY > 0 ? Math.round(cny / maxCNY * 100) : 0
                    return (
                      <div key={a.award_id} style={s.chartRow}>
                        <div style={s.chartLabel}>{a.award_name_cn}</div>
                        <div style={s.chartBarWrap}>
                          <div style={{...s.chartBar, width: `${pct}%`}}>¥{cny.toLocaleString()}</div>
                        </div>
                      </div>
                    )
                  })
                })()}

                <h3 style={{...s.chartTitle, marginTop: 28}}>🐦 早鸟费用对比（折合人民币）</h3>
                {(() => {
                  const withEarly = selectedAwards.filter(a => a.fee_early_bird)
                  if (withEarly.length === 0) return <p style={s.emptyHint}>无早鸟费用数据</p>
                  const maxCNY = Math.max(...withEarly.map(a => toCNY(a.fee_early_bird, a.fee_currency)))
                  return withEarly.map(a => {
                    const cny = toCNY(a.fee_early_bird, a.fee_currency)
                    const pct = maxCNY > 0 ? Math.round(cny / maxCNY * 100) : 0
                    return (
                      <div key={a.award_id} style={s.chartRow}>
                        <div style={s.chartLabel}>{a.award_name_cn}</div>
                        <div style={s.chartBarWrap}>
                          <div style={{...s.chartBar, ...s.chartBarEarly, width: `${pct}%`}}>¥{cny.toLocaleString()}</div>
                        </div>
                      </div>
                    )
                  })
                })()}

                <div style={s.exchangeNote}>
                  汇率参考：1 EUR ≈ ¥{EXCHANGE_RATES.EUR} · 1 USD ≈ ¥{EXCHANGE_RATES.USD} · 1 GBP ≈ ¥{EXCHANGE_RATES.GBP}
                </div>
              </div>

              <div style={s.cta}>
                <p style={s.ctaText}>不确定选哪个？专业顾问帮您分析 → <a href="tel:13692222744" style={s.ctaLink}>136-9222-2744</a></p>
              </div>
            </div>
          </section>
        </main>
      )}

      <footer style={s.footer}>
        <div style={s.container}>
          <p style={s.footerText}>© 2026 设计能 | 电话：136-9222-2744 | 邮箱：9285962@qq.com</p>
        </div>
      </footer>
    </>
  )
}

const s = {
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
  selectHeader: { display: 'flex', alignItems: 'center', marginBottom: 20 },
  selectTitle: { fontSize: 20, fontWeight: 700, color: '#1E3A5F' },
  badge: { background: '#D4AF37', color: '#fff', fontSize: 12, padding: '2px 10px', borderRadius: 10, fontWeight: 700, marginLeft: 10 },

  filterBar: { display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' },
  filterBtn: { padding: '8px 20px', borderRadius: 20, border: '1px solid #1E3A5F', backgroundColor: '#fff', color: '#1E3A5F', fontSize: 14, cursor: 'pointer' },
  filterBtnActive: { padding: '8px 20px', borderRadius: 20, border: 'none', backgroundColor: '#1E3A5F', color: '#fff', fontSize: 14, cursor: 'pointer', fontWeight: 600 },

  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 },
  card: { background: '#fff', border: '2px solid #E5E5E5', borderRadius: 10, padding: 18, cursor: 'pointer', transition: 'all 0.2s', position: 'relative' },
  cardSelected: { borderColor: '#D4AF37', background: 'rgba(212,175,55,0.05)' },
  checkMark: { position: 'absolute', top: 12, right: 12, width: 24, height: 24, background: '#D4AF37', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 },
  cardName: { fontWeight: 700, fontSize: 16, color: '#1E3A5F', marginBottom: 4 },
  cardEnName: { fontSize: 12, color: '#999', marginBottom: 10 },
  cardMeta: { display: 'flex', gap: 12, fontSize: 13, color: '#666', alignItems: 'center', flexWrap: 'wrap' },
  cardFee: { color: '#D4AF37', fontWeight: 700 },
  cardTag: { background: '#f0f0f0', padding: '2px 8px', borderRadius: 4, fontSize: 12 },

  bottomBar: { position: 'sticky', bottom: 0, background: 'rgba(26,26,26,0.96)', backdropFilter: 'blur(10px)', borderTop: '1px solid #333', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, zIndex: 100 },
  barInfo: { color: '#aaa', fontSize: 14 },
  btnCompare: { padding: '10px 36px', background: '#D4AF37', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: 'pointer', letterSpacing: 1 },
  btnDisabled: { opacity: 0.4, cursor: 'not-allowed' },
  btnClear: { padding: '10px 20px', background: 'transparent', color: '#aaa', border: '1px solid #555', borderRadius: 8, fontSize: 14, cursor: 'pointer' },

  // 对比结果布局
  sectionBlock: { marginBottom: 40 },
  sectionTitle: { fontSize: 18, fontWeight: 700, color: '#1E3A5F', marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #D4AF37' },
  cardsRow: (colCount) => ({ display: 'grid', gridTemplateColumns: `repeat(${colCount}, 1fr)`, gap: 16 }),
  awardCard: { background: '#fff', border: '2px solid #E5E5E5', borderRadius: 12, overflow: 'hidden' },
  awardCardFirst: { borderColor: '#D4AF37', boxShadow: '0 4px 16px rgba(212,175,55,0.15)' },
  cardHeader: { background: 'linear-gradient(135deg, #1E3A5F 0%, #2d4a6f 100%)', padding: '16px 20px', textAlign: 'center' },
  cardHeaderName: { fontSize: 16, fontWeight: 700, color: '#fff' },
  cardHeaderEn: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4 },
  cardBody: { padding: '8px 0' },
  fieldRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', gap: 12 },
  fieldRowEven: { backgroundColor: '#fafbfc' },
  fieldLabel: { fontSize: 13, color: '#666', flexShrink: 0 },
  fieldValue: { fontSize: 14, color: '#333', fontWeight: 500, textAlign: 'right', display: 'flex', alignItems: 'center', gap: 6 },
  fieldValueLow: { color: '#16a34a', fontWeight: 700 },
  lowestBadge: { fontSize: 10, color: '#fff', background: '#16a34a', padding: '1px 5px', borderRadius: 3, fontWeight: 700 },

  emptyHint: { fontSize: 13, color: '#999', fontStyle: 'italic' },

  chartBox: { marginTop: 36, background: '#fff', borderRadius: 12, border: '1px solid #E5E5E5', padding: 28 },
  chartTitle: { fontSize: 16, fontWeight: 700, color: '#1E3A5F', marginBottom: 20 },
  chartRow: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 },
  chartLabel: { width: 120, textAlign: 'right', fontSize: 13, color: '#666', flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  chartBarWrap: { flex: 1, height: 30, background: '#f0f0f0', borderRadius: 6, overflow: 'hidden' },
  chartBar: { height: '100%', borderRadius: 6, background: 'linear-gradient(90deg, #1E3A5F, #2d6a9f)', color: '#fff', display: 'flex', alignItems: 'center', paddingLeft: 10, fontSize: 12, fontWeight: 600, transition: 'width 0.6s ease', minWidth: 60 },
  chartBarEarly: { background: 'linear-gradient(90deg, #D4AF37, #e8c88a)', color: '#1A1A1A' },
  exchangeNote: { marginTop: 16, fontSize: 12, color: '#999', paddingTop: 12, borderTop: '1px solid #eee' },

  cta: { textAlign: 'center', marginTop: 48, padding: 40, backgroundColor: '#1E3A5F', borderRadius: 12 },
  ctaText: { fontSize: 18, color: '#fff' },
  ctaLink: { color: '#D4AF37', textDecoration: 'none', fontWeight: 'bold' },
  footer: { backgroundColor: '#1A1A1A', padding: '32px 0', color: '#fff' },
  footerText: { fontSize: '14px', textAlign: 'center', opacity: 0.7 },
}