import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import awardsData from '../../data/awards.json'
import awardDetails from '../../data/award-details.json'

// ==================== 可折叠区块组件 ====================
// 当子项超过 limit 数时自动折叠，点击展开
function FoldableSection({ title, icon, items, limit = 5, renderItem, emptyText, note }) {
  const [expanded, setExpanded] = useState(false)
  const needsFold = items && items.length > limit
  const displayItems = expanded ? items : (items || []).slice(0, limit)

  if (!items || items.length === 0) {
    return (
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>{icon} {title}</h2>
        <p style={styles.emptyHint}>{emptyText}</p>
      </div>
    )
  }

  return (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>{icon} {title}</h2>
      {renderItem(displayItems)}
      {needsFold && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={styles.expandBtn}
          onMouseEnter={e => e.target.style.backgroundColor = '#e8e8e8'}
          onMouseLeave={e => e.target.style.backgroundColor = '#f5f5f5'}
        >
          {expanded ? '收起 ▲' : `展开全部（共${items.length}项） ▼`}
        </button>
      )}
      {note && <p style={styles.cardNote}>{note}</p>}
    </div>
  )
}

// ==================== 客户端页面组件 ====================
export default function AwardDetail({ award }) {
  if (!award) {
    return (
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <h1>奖项未找到</h1>
        <Link href="/awards">返回奖项库</Link>
      </div>
    )
  }

  const formatCurrency = (value, currency) => {
    if (!value && value !== 0) return null
    const symbols = { USD: '$', EUR: '\u20AC', GBP: '\u00A3', JPY: '\u00A5', KRW: '\u20A9', SGD: 'S$', CHF: 'CHF ', CAD: 'C$', TWD: 'NT$' }
    const sym = symbols[currency] || currency ? `${currency} ` : ''
    return `${sym}${value}`
  }

  return (
    <>
      <Head>
        <title>{award.name} | 设计能</title>
        <meta name="description" content={`${award.name}（${award.name_en || ''}）详细介绍，参赛费用、截止日期、评审标准等。`} />
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
            <div style={styles.breadcrumb}>
              <Link href="/awards" style={styles.breadcrumbLink}>奖项库</Link>
              <span style={styles.breadcrumbSep}>/</span>
              <span>{award.name}</span>
            </div>
            <h1 style={styles.heroTitle}>{award.name}</h1>
            <p style={styles.heroEn}>{award.name_en}</p>
            <div style={styles.disclaimer}>
              ⚠️ 本页面信息仅供参考，具体参赛规则、费用及截止日期请以官网或参赛服务机构最新公布为准。
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.container}>
            <div style={styles.detailGrid}>
              {/* 左列 - 详细内容 */}
              <div style={styles.mainContent}>

                {/* 奖项介绍 */}
                <div style={styles.card}>
                  <h2 style={styles.cardTitle}>🏆 奖项介绍</h2>
                  <p style={styles.introText}>{award.award_intro || '—'}</p>
                </div>

                {/* 主办方介绍 */}
                <div style={styles.card}>
                  <h2 style={styles.cardTitle}>🏛️ 主办方介绍</h2>
                  <div style={styles.organizerBadge}>
                    <span style={styles.organizerName}>{award.organizer || '—'}</span>
                    {award.organizer_location && (
                      <span style={styles.organizerLocation}>📍 {award.organizer_location}</span>
                    )}
                  </div>
                  <p style={styles.organizerText}>{award.organizer_intro || '—'}</p>
                </div>

                {/* 参赛时间轴 + 评审标准 - 双列卡片 */}
                <div style={styles.twoColGrid}>
                  <FoldableSection
                    title="参赛时间轴"
                    icon="📅"
                    items={award.timeline || []}
                    limit={5}
                    emptyText="暂未收录参赛时间轴，请访问官网查看"
                    renderItem={(items) => (
                      <div style={styles.timeline}>
                        {items.map((item, i) => (
                          <div key={i} style={styles.timelineItem}>
                            <div style={styles.timelineDot}></div>
                            <div style={styles.timelineContent}>
                              <span style={styles.timelinePhase}>{item.阶段}</span>
                              <span style={styles.timelineTime}>{item.时间}{item.地点 ? ` · ${item.地点}` : ''}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  />

                  <FoldableSection
                    title="评审标准"
                    icon="⭐"
                    items={award.judging_criteria || []}
                    limit={5}
                    note={award.judging_note}
                    emptyText="暂未收录评审标准，请访问官网查看"
                    renderItem={(items) => (
                      typeof items[0] === 'object' ? (
                        <div style={styles.criteriaGrid}>
                          {items.map((item, i) => (
                            <div key={i} style={styles.criteriaItem}>
                              <div style={styles.criteriaHeader}>
                                <span style={styles.criteriaName}>{item.维度 || item.name}</span>
                                <span style={styles.criteriaWeight}>{item.权重 || item.weight}</span>
                              </div>
                              {item.说明 && <p style={styles.criteriaDesc}>{item.说明}</p>}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div style={styles.criteriaGrid}>
                          {items.map((item, i) => (
                            <div key={i} style={styles.criteriaItem}>
                              <span style={styles.criteriaName}>{typeof item === 'string' ? item : JSON.stringify(item)}</span>
                            </div>
                          ))}
                        </div>
                      )
                    )}
                  />
                </div>

                {/* 参赛要求 */}
                <div style={styles.card}>
                  <h2 style={styles.cardTitle}>📋 参赛要求</h2>
                  {award.requirements && Object.keys(award.requirements).length > 0 ? (
                    <div style={styles.reqGrid}>
                      {Object.entries(award.requirements).map(([key, value], i) => (
                        <div key={i} style={styles.reqItem}>
                          <span style={styles.reqLabel}>{key}</span>
                          <span style={styles.reqValue}>{value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={styles.emptyHint}>暂未收录参赛要求，请访问官网查看</p>
                  )}
                  {award.requirements_note && <p style={styles.cardNote}>{award.requirements_note}</p>}
                </div>

                {/* 获奖权益 */}
                <div style={styles.card}>
                  <h2 style={styles.cardTitle}>🎁 获奖权益</h2>
                  {award.benefits && award.benefits.length > 0 ? (
                    <div style={styles.benefitsGrid}>
                      {award.benefits.map((item, i) => (
                        <div key={i} style={styles.benefitItem}>
                          <span style={styles.benefitIcon}>✓</span>
                          <span>{typeof item === 'string' ? item : JSON.stringify(item)}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={styles.emptyHint}>暂未收录获奖权益信息，请访问官网查看</p>
                  )}
                </div>

                {/* 评委介绍 + 常见问答 - 双列卡片，始终显示 */}
                <div style={styles.twoColGrid}>
                  <FoldableSection
                    title="评委介绍"
                    icon="👨‍⚖️"
                    items={award.judges || []}
                    limit={4}
                    emptyText="暂未收录评委信息，请访问官网查看"
                    note={award.judges_note}
                    renderItem={(items) => (
                      <div style={styles.judgesList}>
                        {items.map((judge, i) => (
                          <div key={i} style={styles.judgeCard}>
                            <div style={styles.judgeAvatar}>{((judge.姓名 || judge.name) || '?').charAt(0)}</div>
                            <div style={styles.judgeInfo}>
                              <div style={styles.judgeName}>{judge.姓名 || judge.name || '未知'}</div>
                              <div style={styles.judgeTitle}>{(judge.头衔 || judge.title || '') + (judge.公司 || judge.company ? ' · ' + (judge.公司 || judge.company) : '')}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  />

                  <div style={styles.card}>
                    <h2 style={styles.cardTitle}>❓ 常见问答</h2>
                    {award.faq && award.faq.length > 0 ? (
                      <div style={styles.faqList}>
                        {award.faq.map((item, i) => (
                          <div key={i} style={styles.faqItem}>
                            <div style={styles.faqQ}>Q: {item.q}</div>
                            <div style={styles.faqA}>A: {item.a}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p style={styles.emptyHint}>暂未收录常见问答，请访问官网查看</p>
                    )}
                  </div>
                </div>

                {/* 中国获奖者 */}
                {(() => {
                  const topWinners = award.chinese_winners ? award.chinese_winners.filter(w =>
                    w.award && (w.award.includes('铂金') || w.award.includes('金') || w.award.includes('Best') || w.award.includes('Grand') || w.award.includes('至尊'))
                  ) : []
                  return (
                    <FoldableSection
                      title="中国获奖者"
                      icon="🇨🇳"
                      items={topWinners}
                      limit={5}
                      emptyText="暂未收录中国获奖者信息"
                      renderItem={(items) => (
                        <div style={styles.winnersTable}>
                          <div style={styles.winnersHeader}>
                            <span style={styles.winnerColYear}>年份</span>
                            <span style={styles.winnerColProject}>获奖作品</span>
                            <span style={styles.winnerColFirm}>设计公司</span>
                            <span style={styles.winnerColCategory}>类别</span>
                            <span style={styles.winnerColAward}>奖项</span>
                          </div>
                          {items.map((w, i) => (
                            <div key={i} style={styles.winnerRow}>
                              <span style={styles.winnerColYear}>{w.year || '-'}</span>
                              <span style={styles.winnerColProject}>{w.project}</span>
                              <span style={styles.winnerColFirm}>{w.firm}</span>
                              <span style={styles.winnerColCategory}>{w.category || '-'}</span>
                              <span style={{
                                ...styles.winnerColAward,
                                color: (w.award && (w.award.includes('铂金') || w.award.includes('Best') || w.award.includes('Grand'))) ? '#D4AF37' : '#1677ff'
                              }}>{w.award}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                  )
                })()}

                {/* 著名获奖者/获奖作品 */}
                <div style={styles.card}>
                  <h2 style={styles.cardTitle}>🌟 著名获奖者</h2>
                  {award.famous_winners && award.famous_winners.length > 0 ? (
                    <div style={styles.tagList}>
                      {award.famous_winners.map((w, i) => (
                        <span key={i} style={styles.famousTag}>{w}</span>
                      ))}
                    </div>
                  ) : (
                    <p style={styles.emptyHint}>暂未收录著名获奖者信息，请访问官网查看</p>
                  )}
                </div>

                {/* 媒体合作伙伴 */}
                <div style={styles.card}>
                  <h2 style={styles.cardTitle}>📰 媒体伙伴</h2>
                  {award.media_partners && award.media_partners.length > 0 ? (
                    <div style={styles.tagList}>
                      {award.media_partners.map((p, i) => (
                        <span key={i} style={styles.tag}>{p}</span>
                      ))}
                    </div>
                  ) : (
                    <p style={styles.emptyHint}>暂未收录媒体伙伴信息</p>
                  )}
                </div>

              </div>

              {/* 右列 - 侧边信息 */}
              <div style={styles.sidebar}>

                {/* 关键信息 - 始终显示 */}
                <div style={styles.sideCard}>
                  <h3 style={styles.sideCardTitle}>📌 关键信息</h3>
                  <div style={styles.infoList}>
                    <div style={styles.infoItem}>
                      <span style={styles.infoLabel}>历史</span>
                      <span style={styles.infoValue}>{award.history || '—'}</span>
                    </div>
                    <div style={styles.infoItem}>
                      <span style={styles.infoLabel}>届数</span>
                      <span style={styles.infoValue}>{award.edition || '—'}</span>
                    </div>
                    <div style={styles.infoItem}>
                      <span style={styles.infoLabel}>颁奖典礼</span>
                      <span style={styles.infoValue}>{(award.ceremony_date || '—') + (award.ceremony_location ? ` · ${award.ceremony_location}` : '')}</span>
                    </div>
                    <div style={styles.infoItem}>
                      <span style={styles.infoLabel}>周期</span>
                      <span style={styles.infoValue}>{award.award_cycle || '—'}</span>
                    </div>
                    <div style={styles.infoItem}>
                      <span style={styles.infoLabel}>声誉</span>
                      <span style={styles.infoValue}>
                        {award.prestige_level ? (
                          <span style={{
                            display: 'inline-block',
                            padding: '1px 8px',
                            borderRadius: '4px',
                            color: '#fff',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            backgroundColor: award.prestige_level === '顶级' ? '#D4AF37' : award.prestige_level === '知名' ? '#1677ff' : '#52c41a'
                          }}>{award.prestige_level}</span>
                        ) : '—'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 官方网站 - 始终显示 */}
                <div style={styles.sideCard}>
                  <h3 style={styles.sideCardTitle}>🌐 官方网站</h3>
                  {award.website ? (
                    <a href={award.website} target="_blank" rel="noopener noreferrer" style={{ color: '#1677ff', fontSize: '13px', wordBreak: 'break-all' }}>
                      {award.website.replace(/^https?:\/\//, '')}
                    </a>
                  ) : (
                    <span style={{ fontSize: '13px', color: '#999' }}>—</span>
                  )}
                </div>

                {/* 参赛类别 - 始终显示 */}
                {award.category && award.category.length > 10 ? (
                  <FoldableSection
                    title="参赛类别"
                    icon="🏷️"
                    items={award.category}
                    limit={10}
                    renderItem={(items) => (
                      <div style={styles.tagList}>
                        {items.map((cat, i) => (
                          <span key={i} style={styles.tag}>{cat}</span>
                        ))}
                      </div>
                    )}
                  />
                ) : (
                  <div style={styles.sideCard}>
                    <h3 style={styles.sideCardTitle}>🏷️ 参赛类别</h3>
                    {award.category && award.category.length > 0 ? (
                      <div style={styles.tagList}>
                        {award.category.map((cat, i) => (
                          <span key={i} style={styles.tag}>{cat}</span>
                        ))}
                      </div>
                    ) : (
                      <p style={styles.emptyHint}>暂未收录详细类别信息，请访问官网查看</p>
                    )}
                  </div>
                )}

                {/* 参赛费用 - 详细奖显示 fee_timeline 明细，非详细奖显示基础费用 */}
                {(award.fee_timeline && award.fee_timeline.length > 0) || award.fee_early_bird || award.fee_regular ? (
                  <div style={styles.sideCard}>
                    <h3 style={styles.sideCardTitle}>💰 参赛费用</h3>
                    {award.fee_timeline && award.fee_timeline.length > 0 ? (
                      <div style={styles.feeList}>
                        {award.fee_timeline.map((item, i) => (
                          <div key={i} style={styles.feeItem}>
                            <div style={styles.feePeriodRow}>
                              <span style={styles.feePeriod}>{item.period}</span>
                              <span style={styles.feePrice}>{formatCurrency(item.price, item.currency || award.fee_currency)}</span>
                            </div>
                            <div style={styles.feeDate}>{item.date}</div>
                            {item.note && <div style={styles.feeNote}>{item.note}</div>}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={styles.feeList}>
                        {award.fee_early_bird && (
                          <div style={styles.feeItem}>
                            <div style={styles.feePeriodRow}>
                              <span style={styles.feePeriod}>早鸟价</span>
                              <span style={styles.feePrice}>{formatCurrency(award.fee_early_bird, award.fee_currency)}</span>
                            </div>
                            {award.deadline_early && <div style={styles.feeDate}>截止 {award.deadline_early}</div>}
                          </div>
                        )}
                        {award.fee_regular && (
                          <div style={styles.feeItem}>
                            <div style={styles.feePeriodRow}>
                              <span style={styles.feePeriod}>常规价</span>
                              <span style={styles.feePrice}>{formatCurrency(award.fee_regular, award.fee_currency)}</span>
                            </div>
                            {award.deadline_regular && <div style={styles.feeDate}>截止 {award.deadline_regular}</div>}
                          </div>
                        )}
                        {award.fee_student && (
                          <div style={styles.feeItem}>
                            <div style={styles.feePeriodRow}>
                              <span style={styles.feePeriod}>学生价</span>
                              <span style={styles.feePrice}>{formatCurrency(award.fee_student, award.fee_currency)}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {award.fee_note && <p style={styles.sideNote}>{award.fee_note}</p>}
                    {award.fee_notes && <p style={styles.sideNote}>{award.fee_notes}</p>}
                  </div>
                ) : null}

                {/* 奖项等级 - 始终显示 */}
                <div style={styles.sideCard}>
                  <h3 style={styles.sideCardTitle}>🏅 奖项等级</h3>
                  {award.award_levels && award.award_levels.length > 0 ? (
                    <>
                      <div style={styles.levelsList}>
                        {award.award_levels.map((level, i) => (
                          <div key={i} style={styles.levelItem}>
                            <span style={styles.levelIcon}>🏅</span>
                            <div style={{ flex: 1 }}>
                              <span style={styles.levelName}>{typeof level === 'string' ? level : level.level}</span>
                              {typeof level === 'object' && level.description && (
                                <p style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>{level.description}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      {award.level_note && <p style={styles.sideNote}>{award.level_note}</p>}
                    </>
                  ) : (
                    <p style={styles.emptyHint}>暂未收录奖项等级信息，请访问官网查看</p>
                  )}
                </div>

                {/* 行业覆盖 */}
                {award.industry_focus && award.industry_focus.length > 0 && (
                  <div style={styles.sideCard}>
                    <h3 style={styles.sideCardTitle}>🏭 覆盖行业</h3>
                    <div style={styles.tagList}>
                      {award.industry_focus.map((ind, i) => (
                        <span key={i} style={styles.tag}>{ind}</span>
                      ))}
                    </div>
                  </div>
                )}



                {/* 联系方式 */}
                <div style={styles.contactCard}>
                  <div style={styles.contactTitle}>需要专业指导？</div>
                  <div style={styles.contactPhone}>136 9222 2744</div>
                  <div style={styles.contactWechat}>微信同号 · 何先生</div>
                  <div style={styles.contactNote}>设计能提供全程代理申报服务</div>
                  <a href="/services" style={styles.contactBtn}>查看服务详情 →</a>
                </div>

              </div>
            </div>

            <div style={styles.backLink}>
              <Link href="/awards" style={styles.backBtn}>← 返回奖项库</Link>
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

export async function getStaticPaths() {
  const paths = awardsData.map(award => ({
    params: { id: award.award_id }
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const award = awardsData.find(a => a.award_id === params.id)
  const detail = award ? awardDetails.find(d => d.award_id === award.award_id) || null : null

  // 统一名称字段
  if (award) {
    award.name = award.award_name || award.short_name || award.award_id
    award.name_en = award.award_name_en || award.award_name_cn || ''
  }

  if (!award) {
    return { notFound: true }
  }

  // ==================== 统一构建函数 ====================
  // 合并 award-details.json（详细数据）和 awards.json（基础数据）为统一结构
  // 两个数据源互补：detail 有丰富内容，award 有费用/截止日期等结构化字段

  const s = award  // 基础数据源
  const d = detail // 详细数据源（可能为 null）

  // --- 参赛类别 ---
  let categoryData = (d && d.category && d.category.length > 0) ? d.category : []
  if (categoryData.length === 0 && d && d.categories && d.categories.length > 0) {
    // 支持 {main, sub} 对象格式 或 字符串格式
    categoryData = d.categories.map(c => {
      if (typeof c === 'object' && c.main) {
        return `${c.main}: ${(c.sub || []).join('、')}`
      }
      return c['类别'] || c['name'] || c
    })
  }
  if (categoryData.length === 0 && s.category_sub && s.category_sub.length > 0) {
    categoryData = s.category_sub
  }

  // --- 评审标准 ---
  let rawJC = []
  if (d && d.judging_criteria && d.judging_criteria.length > 0) {
    rawJC = d.judging_criteria
  } else {
    rawJC = s.judging_criteria || s.evaluation_criteria || []
  }
  if (typeof rawJC === 'string') {
    rawJC = rawJC.split(/[,，、;；]/).map(function(x) { return x.trim() }).filter(Boolean)
  }
  const judgingCriteria = Array.isArray(rawJC) ? rawJC : []

  // --- 奖项等级 ---
  let awardLevels = []
  if (d && d.award_levels && d.award_levels.length > 0) {
    awardLevels = d.award_levels
  } else {
    awardLevels = s.award_levels || s.prize_levels || []
  }

  // --- 获奖权益 ---
  let benefits = (d && d.benefits && d.benefits.length > 0) ? d.benefits : []
  if (benefits.length === 0) {
    benefits = s.benefits || s.award_winner_benefits || s.recognition_benefits || []
  }

  // --- 参赛要求 ---
  let reqs = (d && d.requirements && Object.keys(d.requirements).length > 0) ? d.requirements : {}
  // 如果 detail 没有 requirements，从 award 的散列字段聚合
  if (Object.keys(reqs).length === 0) {
    if (s.eligibility) reqs['参赛资格'] = s.eligibility
    if (s.age_requirement) reqs['年龄限制'] = s.age_requirement
    if (s.project_year_limit) reqs['作品年限'] = s.project_year_limit
    if (s.project_year_specific) reqs['具体年限'] = s.project_year_specific
    if (s.project_status) reqs['作品状态'] = s.project_status
    if (s.submission_language || s.language_primary) reqs['参赛语言'] = s.submission_language || s.language_primary
    if (s.submission_method) reqs['提交方式'] = s.submission_method
    if (s.image_format && s.image_format.length > 0) reqs['图片格式'] = s.image_format.join('、')
    if (s.image_max_count) reqs['图片数量'] = '最多' + s.image_max_count + '张'
    if (s.video_format && s.video_format.length > 0) reqs['视频格式'] = s.video_format.join('、')
    if (s.video_duration) reqs['视频时长'] = s.video_duration
    if (s.entrant_type && s.entrant_type.length > 0) reqs['参赛者类型'] = s.entrant_type.join('、')
    if (s.team_submission) reqs['团队参赛'] = '支持' + (s.max_team_size ? '（最多' + s.max_team_size + '人）' : '')
    // 从 detail.submission_requirements 提取补充
    if (d && d.submission_requirements && Object.keys(d.submission_requirements).length > 0) {
      reqs = d.submission_requirements
    }
  }

  // --- 评委 ---
  const judges = (d && d.judges) ? d.judges : []

  // --- FAQ ---
  const faq = (d && d.faq) ? d.faq : []

  // --- 中国获奖者 ---
  const chineseWinners = (d && d.chinese_winners) ? d.chinese_winners : []

  // --- 费用明细（详细奖的 timeline 格式）---
  const feeTimeline = (d && d.fee_timeline) ? d.fee_timeline : []

  // --- 时间轴 ---
  const timeline = (d && d.timeline) ? d.timeline : (s.timeline || [])

  const fullAward = {
    // 基础信息
    award_id: s.award_id,
    name: (d && d.name) || s.award_name_cn || s.award_name_en || '设计大奖',
    name_en: (d && d.name_en) || s.award_name_en || '',
    award_intro: (d && d.award_intro) || s.award_intro_cn || s.award_intro || s.reputation || '',
    organizer: (d && d.organizer) || s.organizer_cn || s.organizer || '',
    organizer_intro: (d && d.organizer_intro) || '',
    organizer_location: (d && d.organizer_location) || (s.city ? (s.country || '') + ' · ' + s.city : (s.country || '')),
    category_main: s.category_main || '',
    category: categoryData,

    // 费用
    fee_timeline: feeTimeline,
    fee_note: (d && d.fee_note) || s.fee_notes || '',
    fee_early_bird: s.fee_early_bird || '',
    fee_regular: s.fee_regular || '',
    fee_student: s.fee_student || '',
    fee_currency: s.fee_currency || '',
    fee_notes: s.fee_notes || '',

    // 时间
    timeline: timeline,
    deadline_early: s.deadline_early || '',
    deadline_regular: s.deadline_regular || '',
    deadline_late: s.deadline_late || '',
    deadline_final: s.deadline_final || '',

    // 评审
    judging_criteria: judgingCriteria,
    judging_note: (d && d.judging_note) || s.judging_process || s.evaluation_process || '',

    // 等级
    award_levels: awardLevels,
    level_note: (d && d.level_note) || '',

    // 要求
    requirements: reqs,
    requirements_note: (d && d.requirements_note) || '',

    // 权益
    benefits: benefits,

    // 评委 & FAQ
    judges: judges,
    judges_note: (d && d.judges_note) || (s.judges_count ? '评审团约' + s.judges_count + '人' : ''),
    faq: faq,

    // 获奖者
    chinese_winners: chineseWinners,
    famous_winners: s.famous_winners || [],
    media_partners: s.media_partners || [],

    // 联系 & 官网
    website: (d && d.website) || s.website || '',
    contact: (d && d.contact) || s.contact_email || '',

    // 元信息
    edition: (d && d.edition) || (s.edition_current ? '第' + s.edition_current + '届' : ''),
    award_type: s.award_type || '',
    prestige_level: s.prestige_level || '',
    award_cycle: s.award_cycle || '',
    history: s.history || '',
    reputation: s.reputation || '',
    ceremony_date: s.ceremony_date || '',
    ceremony_location: s.ceremony_location || '',
    industry_focus: s.industry_focus || [],
    notes: (d && d.notes) || s.notes || '',
  }

  return { props: { award: fullAward } }
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
  hero: { background: 'linear-gradient(135deg, #1E3A5F 0%, #2d4a6f 100%)', padding: '50px 0', color: '#fff' },
  breadcrumb: { fontSize: '14px', marginBottom: '16px', opacity: 0.8 },
  breadcrumbLink: { color: '#fff', textDecoration: 'none' },
  breadcrumbSep: { margin: '0 8px' },
  heroTitle: { fontSize: '38px', fontWeight: 'bold', marginBottom: '8px' },
  heroEn: { fontSize: '18px', opacity: 0.85 },
  disclaimer: { marginTop: '16px', padding: '10px 16px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '6px', fontSize: '13px', color: 'rgba(255,255,255,0.95)', border: '1px solid rgba(255,255,255,0.2)', display: 'inline-block', maxWidth: '800px' },
  section: { padding: '40px 0', backgroundColor: '#f5f5f5' },
  detailGrid: { display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' },
  mainContent: { display: 'flex', flexDirection: 'column', gap: '16px' },
  sidebar: { display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '90px' },
  twoColGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'start' },
  card: { backgroundColor: '#fff', padding: '18px', borderRadius: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', border: '1px solid #eee' },
  cardTitle: { fontSize: '16px', fontWeight: 'bold', color: '#1E3A5F', marginBottom: '12px', paddingBottom: '10px', borderBottom: '2px solid #D4AF37' },
  cardNote: { marginTop: '10px', fontSize: '12px', color: '#888', fontStyle: 'italic' },
  prestigeBadge: { display: 'inline-block', padding: '2px 10px', borderRadius: '4px', color: '#fff', fontSize: '13px', fontWeight: 'bold' },
  introText: { fontSize: '14px', color: '#555', lineHeight: 1.75 },
  organizerBadge: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px', alignItems: 'center' },
  organizerName: { fontSize: '14px', fontWeight: 'bold', color: '#1E3A5F' },
  organizerLocation: { fontSize: '12px', color: '#666', backgroundColor: '#f5f5f5', padding: '2px 8px', borderRadius: '4px' },
  organizerText: { fontSize: '14px', color: '#555', lineHeight: 1.7 },
  timeline: { position: 'relative', paddingLeft: '16px' },
  timelineItem: { display: 'flex', alignItems: 'flex-start', marginBottom: '10px', position: 'relative' },
  timelineDot: { width: '8px', height: '8px', backgroundColor: '#D4AF37', borderRadius: '50%', position: 'absolute', left: '-16px', top: '4px' },
  timelineContent: { display: 'flex', flexDirection: 'column' },
  timelinePhase: { fontSize: '14px', fontWeight: 'bold', color: '#333' },
  timelineTime: { fontSize: '14px', color: '#666' },
  criteriaGrid: { display: 'flex', flexDirection: 'column', gap: '10px' },
  criteriaItem: { backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '6px' },
  criteriaHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' },
  criteriaName: { fontSize: '14px', fontWeight: 'bold', color: '#333' },
  criteriaWeight: { fontSize: '14px', fontWeight: 'bold', color: '#D4AF37' },
  criteriaDesc: { fontSize: '14px', color: '#666', margin: '4px 0 0 0' },
  reqGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' },
  reqItem: { display: 'flex', flexDirection: 'column', gap: '2px', padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '6px' },
  reqLabel: { fontSize: '14px', fontWeight: 'bold', color: '#1E3A5F' },
  reqValue: { fontSize: '14px', color: '#555', lineHeight: 1.4 },
  benefitIcon: { color: '#52c41a', fontWeight: 'bold', fontSize: '14px' },
  benefitsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' },
  benefitItem: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#555' },
  judgesList: { display: 'flex', flexDirection: 'column', gap: '8px' },
  judgeCard: { display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '6px' },
  judgeAvatar: { width: '32px', height: '32px', backgroundColor: '#1E3A5F', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' },
  judgeInfo: { flex: 1 },
  judgeName: { fontSize: '14px', fontWeight: 'bold', color: '#333' },
  judgeTitle: { fontSize: '14px', color: '#666' },
  faqList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  faqItem: { padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '6px' },
  faqQ: { fontSize: '14px', fontWeight: 'bold', color: '#1E3A5F', marginBottom: '4px' },
  faqA: { fontSize: '14px', color: '#555', lineHeight: 1.5 },
  winnersTable: { display: 'flex', flexDirection: 'column' },
  winnersHeader: { display: 'grid', gridTemplateColumns: '0.6fr 2fr 1.5fr 1fr 0.8fr', gap: '8px', padding: '8px 0', borderBottom: '2px solid #D4AF37', fontSize: '14px', fontWeight: 'bold', color: '#666' },
  winnerRow: { display: 'grid', gridTemplateColumns: '0.6fr 2fr 1.5fr 1fr 0.8fr', gap: '8px', padding: '8px 0', borderBottom: '1px solid #f0f0f0', alignItems: 'center' },
  winnerColYear: { fontSize: '14px', color: '#666' },
  winnerColProject: { fontSize: '14px', color: '#333' },
  winnerColFirm: { fontSize: '14px', color: '#666' },
  winnerColCategory: { fontSize: '14px', color: '#666' },
  winnerColAward: { fontSize: '14px', fontWeight: 'bold' },
  winnersDisclaimer: { fontSize: '14px', color: '#999', marginTop: '12px', fontStyle: 'italic' },
  famousTag: { backgroundColor: '#f0f7ff', color: '#1677ff', padding: '4px 10px', borderRadius: '4px', fontSize: '13px', border: '1px solid #d6e4ff' },
  sideCard: { backgroundColor: '#fff', padding: '16px', borderRadius: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', border: '1px solid #eee' },
  sideCardTitle: { fontSize: '14px', fontWeight: 'bold', color: '#1E3A5F', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #eee' },
  sideNote: { marginTop: '10px', fontSize: '14px', color: '#888', fontStyle: 'italic' },
  emptyHint: { fontSize: '13px', color: '#999', margin: 0 },
  infoList: { display: 'flex', flexDirection: 'column', gap: '8px' },
  infoItem: { display: 'flex', flexDirection: 'column', gap: '2px' },
  infoLabel: { fontSize: '11px', color: '#999', fontWeight: 'bold', textTransform: 'uppercase' },
  infoValue: { fontSize: '13px', color: '#333', lineHeight: 1.5 },
  tagList: { display: 'flex', flexWrap: 'wrap', gap: '5px' },
  tag: { backgroundColor: '#f0f0f0', padding: '3px 8px', borderRadius: '4px', fontSize: '14px', color: '#666' },
  feeList: { display: 'flex', flexDirection: 'column', gap: '8px' },
  feeItem: { padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '6px' },
  feePeriodRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' },
  feePeriod: { fontSize: '14px', fontWeight: 'bold', color: '#1E3A5F' },
  feePrice: { fontSize: '16px', fontWeight: 'bold', color: '#D4AF37' },
  feeDate: { fontSize: '14px', color: '#666' },
  feeNote: { fontSize: '14px', color: '#888', marginTop: '2px' },
  levelsList: { display: 'flex', flexDirection: 'column', gap: '8px' },
  levelItem: { display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', backgroundColor: '#f8f9fa', borderRadius: '6px' },
  levelIcon: { fontSize: '18px', flexShrink: 0 },
  levelName: { fontSize: '13px', fontWeight: 'bold', color: '#1E3A5F', lineHeight: '1.4' },
  contactCard: { background: 'linear-gradient(135deg, #1E3A5F 0%, #2d4a6f 100%)', padding: '20px', borderRadius: '10px', color: '#fff', textAlign: 'center' },
  contactTitle: { fontSize: '14px', marginBottom: '10px' },
  contactPhone: { fontSize: '24px', fontWeight: 'bold', color: '#D4AF37', margin: '12px 0 6px' },
  contactWechat: { fontSize: '14px', opacity: 0.9 },
  contactNote: { fontSize: '14px', opacity: 0.7, marginTop: '10px' },
  contactBtn: { display: 'inline-block', backgroundColor: '#D4AF37', color: '#1A1A1A', padding: '8px 20px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', marginTop: '12px' },
  backLink: { marginTop: '32px', textAlign: 'center' },
  backBtn: { color: '#1E3A5F', textDecoration: 'none', fontSize: '14px', backgroundColor: '#fff', padding: '8px 20px', borderRadius: '6px', display: 'inline-block' },
  footer: { backgroundColor: '#1A1A1A', padding: '24px 0', color: '#fff' },
  footerText: { fontSize: '13px', textAlign: 'center', opacity: 0.7 },
  expandBtn: { display: 'block', width: '100%', marginTop: '12px', padding: '8px 0', backgroundColor: '#f5f5f5', border: '1px solid #e0e0e0', borderRadius: '6px', color: '#666', fontSize: '13px', cursor: 'pointer', textAlign: 'center', transition: 'background-color 0.2s' },
}
