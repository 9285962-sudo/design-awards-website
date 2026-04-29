import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import museWinners from '../data/muse-winners-2026.json'

// 成功案例页面
export default function Cases() {
  const [activeCategory, setActiveCategory] = useState('全部')
  const [selectedWinner, setSelectedWinner] = useState(null)
  const [lightboxImage, setLightboxImage] = useState(null)
  
  // 映射类别名称
  const categoryMap = {
    '建筑设计': ['Architectural Design'],
    '室内设计': ['Interior Design'],
    '产品设计': ['Product Design'],
    '景观设计': ['Landscape Design'],
    '包装设计': ['Packaging Design'],
    '交通设计': ['Transportation']
  }
  
  const categories = ['全部', '建筑设计', '室内设计', '产品设计', '景观设计', '包装设计', '交通设计']
  
  // 过滤获奖作品
  const getFilteredWinners = () => {
    if (activeCategory === '全部') return museWinners
    const subCategories = categoryMap[activeCategory] || []
    return museWinners.filter(w => subCategories.includes(w.award_category))
  }
  
  const filteredWinners = getFilteredWinners()
  
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px'
    },
    header: {
      backgroundColor: '#1A1A1A',
      padding: '16px 0',
      position: 'sticky',
      top: 0,
      zIndex: 100
    },
    navContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none'
    },
    logoImg: {
      height: '40px',
      width: 'auto'
    },
    logoText: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#D4AF37',
      marginLeft: '12px'
    },
    nav: {
      display: 'flex',
      gap: '28px'
    },
    navLink: {
      color: '#fff',
      textDecoration: 'none',
      fontSize: '14px',
      opacity: 0.9
    },
    hero: {
      background: 'linear-gradient(135deg, #1E3A5F 0%, #2d4a6f 100%)',
      padding: '60px 0',
      textAlign: 'center',
      color: '#fff'
    },
    heroBadge: {
      display: 'inline-block',
      backgroundColor: '#D4AF37',
      color: '#1A1A1A',
      padding: '6px 16px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '16px'
    },
    heroTitle: {
      fontSize: '36px',
      fontWeight: 'bold',
      marginBottom: '12px'
    },
    heroDesc: {
      fontSize: '18px',
      opacity: 0.9,
      marginBottom: '32px'
    },
    stats: {
      display: 'flex',
      justifyContent: 'center',
      gap: '60px'
    },
    statItem: {
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#D4AF37'
    },
    statLabel: {
      fontSize: '14px',
      opacity: 0.9
    },
    section: {
      padding: '60px 0',
      backgroundColor: '#f8f9fa'
    },
    filterBar: {
      display: 'flex',
      gap: '12px',
      marginBottom: '32px',
      flexWrap: 'wrap'
    },
    filterBtn: (isActive) => ({
      padding: '10px 20px',
      borderRadius: '24px',
      border: '1px solid #ddd',
      backgroundColor: isActive ? '#1E3A5F' : '#fff',
      cursor: 'pointer',
      fontSize: '14px',
      color: isActive ? '#fff' : '#666',
      transition: 'all 0.2s'
    }),
    winnersGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '24px'
    },
    winnerCard: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s'
    },
    winnerImageWrap: {
      position: 'relative',
      aspectRatio: '16/10',
      overflow: 'hidden'
    },
    winnerImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    imageZoomIcon: {
      position: 'absolute',
      top: '12px',
      left: '12px',
      backgroundColor: 'rgba(0,0,0,0.6)',
      color: '#fff',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      opacity: 0,
      transition: 'opacity 0.2s'
    },
    levelBadge: {
      position: 'absolute',
      top: '12px',
      right: '12px',
      backgroundColor: '#D4AF37',
      color: '#fff',
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    winnerImagePlaceholder: {
      aspectRatio: '16/10',
      backgroundColor: '#2d4a6f',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    },
    placeholderIcon: {
      fontSize: '48px',
      marginBottom: '8px'
    },
    placeholderText: {
      fontSize: '14px',
      color: '#fff',
      opacity: 0.8
    },
    winnerContent: {
      padding: '20px'
    },
    winnerCategory: {
      fontSize: '12px',
      color: '#D4AF37',
      marginBottom: '8px',
      textTransform: 'uppercase',
      fontWeight: 'bold'
    },
    winnerTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#1E3A5F',
      marginBottom: '8px'
    },
    winnerDesigner: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '12px'
    },
    awardInfo: {
      marginBottom: '12px'
    },
    awardName: {
      backgroundColor: '#FFF3E0',
      color: '#E65100',
      padding: '6px 12px',
      borderRadius: '8px',
      fontSize: '13px',
      fontWeight: 'bold',
      display: 'inline-block'
    },
    winnerMeta: {
      display: 'flex',
      gap: '16px',
      fontSize: '13px',
      color: '#999'
    },
    ctaSection: {
      textAlign: 'center',
      marginTop: '48px',
      padding: '40px',
      backgroundColor: '#fff',
      borderRadius: '12px'
    },
    ctaText: {
      fontSize: '18px',
      color: '#666'
    },
    ctaLink: {
      color: '#D4AF37',
      textDecoration: 'none',
      fontWeight: 'bold'
    },
    footer: {
      backgroundColor: '#1A1A1A',
      padding: '32px 0',
      color: '#fff'
    },
    footerText: {
      fontSize: '14px',
      textAlign: 'center',
      opacity: 0.7
    },
    // Modal styles
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: '16px',
      maxWidth: '900px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'auto',
      position: 'relative'
    },
    modalClose: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      background: 'none',
      border: 'none',
      fontSize: '28px',
      cursor: 'pointer',
      color: '#666',
      zIndex: 10
    },
    modalHeader: {
      padding: '24px',
      borderBottom: '1px solid #eee'
    },
    modalCategory: {
      fontSize: '12px',
      color: '#D4AF37',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    modalTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1E3A5F',
      marginBottom: '8px'
    },
    modalDesigner: {
      fontSize: '14px',
      color: '#666'
    },
    gallery: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '12px',
      padding: '24px'
    },
    galleryItemWrap: {
      position: 'relative',
      cursor: 'pointer'
    },
    galleryImage: {
      width: '100%',
      aspectRatio: '16/10',
      objectFit: 'cover',
      borderRadius: '8px'
    },
    modalBody: {
      padding: '24px'
    },
    infoSection: {
      marginBottom: '24px'
    },
    infoTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#1E3A5F',
      marginBottom: '8px'
    },
    infoText: {
      fontSize: '14px',
      color: '#666',
      lineHeight: 1.8
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '16px',
      marginBottom: '24px'
    },
    infoItem: {
      backgroundColor: '#f8f9fa',
      padding: '12px',
      borderRadius: '8px'
    },
    infoLabel: {
      fontSize: '12px',
      color: '#999',
      display: 'block',
      marginBottom: '4px'
    },
    infoValue: {
      fontSize: '14px',
      color: '#1E3A5F',
      fontWeight: 'bold'
    },
    // Lightbox
    lightbox: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.95)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      cursor: 'pointer'
    },
    lightboxImg: {
      maxWidth: '90vw',
      maxHeight: '90vh',
      objectFit: 'contain'
    }
  }

  return (
    <div>
      <Head>
        <title>获奖作品 | 设计能 - 国际设计大奖一站式申报平台</title>
        <meta name="description" content="查看金奖以上的获奖作品案例，涵盖建筑、室内、景观、产品、视觉传达等全品类设计。" />
      </Head>

      <header style={styles.header}>
        <div style={styles.navContainer}>
          <Link href="/" style={styles.logo}>
            <img src="/设计能LOGO透明文件.png" alt="设计能" style={styles.logoImg} />
            <span style={styles.logoText}>国际设计大奖策略咨询平台</span>
          </Link>
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
      </header>

      <main>
        {/* MUSE年度大奖专题 */}
        <section style={styles.hero}>
          <div style={styles.container}>
            <div style={styles.heroBadge}>MUSE Design Awards 2026</div>
            <h1 style={styles.heroTitle}>年度设计大奖作品</h1>
            <p style={styles.heroDesc}>铂金奖获奖作品展示 · 涵盖建筑、室内、产品、景观、包装、交通六大类别</p>
            <div style={styles.stats}>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>1000+</div>
                <div style={styles.statLabel}>获奖案例</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>80%</div>
                <div style={styles.statLabel}>获奖率</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>108</div>
                <div style={styles.statLabel}>覆盖奖项</div>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.container}>
            {/* 类别筛选 */}
            <div style={styles.filterBar}>
              {categories.map(cat => (
                <button
                  key={cat}
                  style={styles.filterBtn(activeCategory === cat)}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 获奖作品列表 */}
            <div style={styles.winnersGrid}>
              {filteredWinners.map((winner) => (
                <div 
                  key={winner.id} 
                  style={styles.winnerCard}
                  onClick={() => setSelectedWinner(winner)}
                >
                  {winner.image ? (
                    <div style={styles.winnerImageWrap}>
                      <img 
                        src={winner.image} 
                        alt={winner.name_cn} 
                        style={styles.winnerImage}
                        onClick={(e) => {
                          e.stopPropagation()
                          setLightboxImage(winner.image)
                        }}
                        onError={(e) => { e.target.style.display = 'none' }}
                      />
                      <div style={styles.imageZoomIcon}>🔍</div>
                      <div style={styles.levelBadge}>{winner.rank}</div>
                    </div>
                  ) : (
                    <div style={styles.winnerImagePlaceholder}>
                      <span style={styles.placeholderIcon}>🏗️</span>
                      <span style={styles.placeholderText}>{winner.award_category}</span>
                      <div style={styles.levelBadge}>{winner.rank}</div>
                    </div>
                  )}
                  <div style={styles.winnerContent}>
                    <div style={styles.winnerCategory}>
                      {winner.award_category}
                    </div>
                    <h3 style={styles.winnerTitle}>{winner.name_cn}</h3>
                    <p style={styles.winnerDesigner}>{winner.studio}</p>
                    <div style={styles.awardInfo}>
                      <span style={styles.awardName}>🏆 MUSE Design Awards</span>
                    </div>
                    <div style={styles.winnerMeta}>
                      <span>🏢 {winner.studio}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredWinners.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#666' }}>
                <p>暂无该类别作品</p>
              </div>
            )}

            {/* CTA */}
            <div style={styles.ctaSection}>
              <p style={styles.ctaText}>
                想要让您的作品获得国际大奖？
                <a href="tel:13692222744" style={styles.ctaLink}> 立即咨询专业团队 →</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        <div style={styles.container}>
          <p style={styles.footerText}>© 2026 设计能 | 电话：136-9222-2744 | 邮箱：9285962@qq.com</p>
        </div>
      </footer>

      {/* 作品详情弹窗 */}
      {selectedWinner && (
        <div style={styles.modal} onClick={() => setSelectedWinner(null)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={() => setSelectedWinner(null)}>×</button>
            <div style={styles.modalHeader}>
              <div style={styles.modalCategory}>{selectedWinner.award_category}</div>
              <h2 style={styles.modalTitle}>{selectedWinner.name_cn}</h2>
              <p style={styles.modalDesigner}>{selectedWinner.name_en}</p>
            </div>
            
            {/* 图片画廊 */}
            {selectedWinner.image && (
              <div style={styles.gallery}>
                <div style={styles.galleryItemWrap}>
                  <img 
                    src={selectedWinner.image}
                    alt={selectedWinner.name_cn}
                    style={styles.galleryImage}
                    onClick={() => setLightboxImage(selectedWinner.image)}
                  />
                </div>
              </div>
            )}
            
            <div style={styles.modalBody}>
              <div style={styles.infoSection}>
                <h4 style={styles.infoTitle}>📋 作品描述</h4>
                <p style={styles.infoText}>{selectedWinner.description}</p>
              </div>
              
              <div style={styles.infoSection}>
                <h4 style={styles.infoTitle}>💡 设计亮点</h4>
                <ul style={styles.infoText}>
                  {selectedWinner.highlights && selectedWinner.highlights.map((h, i) => (
                    <li key={i} style={{ marginBottom: '8px' }}>{h}</li>
                  ))}
                </ul>
              </div>
              
              <div style={styles.infoGrid}>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>获奖类别</span>
                  <span style={styles.infoValue}>{selectedWinner.award_category}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>获奖等级</span>
                  <span style={styles.infoValue}>{selectedWinner.rank}</span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>设计公司</span>
                  <span style={styles.infoValue}>{selectedWinner.studio}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 图片放大查看 */}
      {lightboxImage && (
        <div style={styles.lightbox} onClick={() => setLightboxImage(null)}>
          <img src={lightboxImage} alt="" style={styles.lightboxImg} />
        </div>
      )}
    </div>
  )
}
