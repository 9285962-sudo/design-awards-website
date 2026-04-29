import Head from 'next/head'
import Link from 'next/link'
import awards from '../data/awards.json'
import newsData from '../data/news.json'
import strategyData from '../data/strategy.json'

// 首页 - 2026-04-19 更新：去掉焦点新闻红色按钮+焦点新闻宽度=两条新闻+占位图颜色区分
export default function Home() {
  // 精选12个重点奖项
  const featuredAwards = awards.slice(0, 12)
  
  // 分离焦点新闻和普通新闻
  const featuredNews = newsData.articles.filter(n => n.featured)
  const normalNews = newsData.articles.filter(n => !n.featured).slice(0, 3)
  
  // 分离焦点策略和普通策略
  const featuredStrategy = strategyData.articles.filter(n => n.featured)
  const normalStrategy = strategyData.articles.filter(n => !n.featured).slice(0, 4)

  // 合并所有焦点文章（新闻+策略），按日期排序取最新的一条
  const allFeatured = [...featuredNews, ...featuredStrategy].sort((a, b) => 
    new Date(b.publishTime) - new Date(a.publishTime)
  )
  const featuredItem = allFeatured.length > 0 ? allFeatured[0] : null
  
  // 判断焦点文章类型，用于生成正确的链接
  const isStrategyFeatured = featuredItem && featuredStrategy.some(s => s.id === featuredItem.id)

  return (
    <>
      <Head>
        <title>设计能 | 国际设计大奖一站式申报平台</title>
        <meta name="description" content="设计能-专业代理申报108个全球设计大奖，含MUSE设计奖、红点奖、iF奖、D&AD、RIBA、LIA、Andrew Martin等。15年经验，服务350+设计师，80%获奖率。咨询：136-9222-2744" />
        <meta name="keywords" content="设计大奖申报,国际设计奖代理,MUSE设计奖申报,红点奖申报,iF奖申报,设计奖代理服务,国际设计大奖咨询" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.52de.cc/" />
        
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
              <Link href="/services" style={styles.navLink}>申报服务</Link>
              <Link href="/strategy" style={styles.navLink}>参赛策略</Link>
              <Link href="/news" style={styles.navLink}>赛事新闻</Link>
              <Link href="/about" style={styles.navLink}>关于我们</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - 标题合并一行，去掉统计文字 */}
      <section style={styles.hero}>
        <div style={styles.container}>
          <h1 style={styles.heroTitle}>
            国际设计大奖一站式申报平台
          </h1>
          <p style={styles.heroDesc}>
            涵盖建筑、室内、景观、产品、视觉传达等全品类设计奖项
          </p>
          <div style={styles.heroButtons}>
            <a href="tel:13692222744" style={styles.btnPrimary}>📞 立即咨询</a>
            <Link href="/services" style={styles.btnSecondary}>查看申报服务</Link>
          </div>
        </div>
      </section>

      {/* 主内容区 - 左右两栏（焦点新闻移入左栏） */}
      <section style={styles.mainSection}>
        <div style={styles.container}>
          <div style={styles.twoColumnGrid}>
            
            {/* 左栏 - 3.5fr */}
            <div style={styles.leftColumn}>

              {/* 焦点新闻区域 - 宽度=两条新闻，去掉红色按钮，标题摘要在图片下方 */}
              <div style={styles.featuredSection}>
                <div style={styles.featuredGrid}>
                  {featuredItem ? (
                    <Link key={featuredItem.id} href={`/articles/${featuredItem.id}.html`} style={styles.featuredCard}>
                      <div style={styles.featuredImageWrapper}>
                        {featuredItem.cover ? (
                          <img src={featuredItem.cover} alt={featuredItem.title} style={styles.featuredImage} />
                        ) : (
                          <div style={styles.featuredPlaceholder}>
                            <span style={styles.placeholderText}>焦点新闻封面图</span>
                          </div>
                        )}
                      </div>
                      <div style={styles.featuredContentBelow}>
                        <h2 style={styles.featuredTitleBelow}>{featuredItem.title}</h2>
                        <p style={styles.featuredSummaryBelow}>{featuredItem.summary}</p>
                        <span style={styles.featuredDateBelow}>{featuredItem.publishTime}</span>
                      </div>
                    </Link>
                  ) : (
                    <Link href="/news" style={styles.featuredCard}>
                      <div style={styles.featuredImageWrapper}>
                        <div style={styles.featuredPlaceholder}>
                          <span style={styles.placeholderText}>焦点新闻封面图</span>
                        </div>
                      </div>
                      <div style={styles.featuredContentBelow}>
                        <h2 style={styles.featuredTitleBelow}>MUSE设计奖2026年度获奖名单公布</h2>
                        <p style={styles.featuredSummaryBelow}>本年度MUSE设计奖共有来自50个国家的作品参赛，中国设计师斩获15项大奖，创下历史新高...</p>
                        <span style={styles.featuredDateBelow}>2026-04-19</span>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
              
              {/* 赛事新闻（3条，上图下文，与焦点新闻合并为一个区域） */}
              <div style={{marginTop: '6px'}}>
                <div style={styles.newsGridThree}>
                  {normalNews.length > 0 ? (
                    normalNews.map((news) => (
                      <Link key={news.id} href={`/articles/${news.id}.html`} style={styles.newsCardVertical}>
                        <div style={styles.newsThumbLarge}>
                          <img 
                            src={news.cover || '/images/news-default.jpg'} 
                            alt={news.title}
                            style={styles.newsThumbImg}
                          />
                        </div>
                        <div style={styles.newsContentVertical}>
                          <div style={styles.newsCardTitle}>{news.title}</div>
                          <p style={styles.newsCardSummary}>{news.summary}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <>
                      <Link href="/news" style={styles.newsCardVertical}>
                        <div style={styles.newsThumbLarge}>
                          {/* 占位图 - 绿色 */}
                          <div style={styles.newsPlaceholder}>新闻封面图</div>
                        </div>
                        <div style={styles.newsContentVertical}>
                          <div style={styles.newsCardTitle}>2026年国际设计大奖申报时间汇总</div>
                          <p style={styles.newsCardSummary}>汇总本年度各大设计奖项的申报时间节点，帮助设计师提前规划参赛计划...</p>
                        </div>
                      </Link>
                      <Link href="/news" style={styles.newsCardVertical}>
                        <div style={styles.newsThumbLarge}>
                          {/* 占位图 - 绿色 */}
                          <div style={styles.newsPlaceholder}>新闻封面图</div>
                        </div>
                        <div style={styles.newsContentVertical}>
                          <div style={styles.newsCardTitle}>中国设计师在iF奖再创佳绩</div>
                          <p style={styles.newsCardSummary}>2026年iF设计奖评选结果揭晓，中国设计师获得32项大奖，涵盖产品设计、包装设计等多个领域...</p>
                        </div>
                      </Link>
                      <Link href="/news" style={styles.newsCardVertical}>
                        <div style={styles.newsThumbLarge}>
                          {/* 占位图 - 绿色 */}
                          <div style={styles.newsPlaceholder}>新闻封面图</div>
                        </div>
                        <div style={styles.newsContentVertical}>
                          <div style={styles.newsCardTitle}>红点奖2026年度获奖名单公布</div>
                          <p style={styles.newsCardSummary}>德国红点设计奖2026年度获奖名单正式公布，中国设计师斩获多项殊荣...</p>
                        </div>
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* 中：申报服务 */}
              <div style={styles.block}>
                <div style={styles.blockHeader}>
                  <h2 style={styles.blockTitle}>🎯 申报服务</h2>
                  <Link href="/services" style={styles.moreLink}>更多 →</Link>
                </div>
                <div style={styles.servicesCompactGrid3}>
                  <Link href="/services/award-matching" style={styles.serviceCompactCard}>
                    <div style={styles.serviceCompactIcon}>🏆</div>
                    <div style={styles.serviceCompactContent}>
                      <h3 style={styles.serviceCompactTitle}>奖项精准匹配</h3>
                      <p style={styles.serviceCompactDesc}>根据项目特点精准匹配最适合的国际设计大奖，制定最佳参赛策略，确保获奖率</p>
                    </div>
                  </Link>
                  <Link href="/services/win-probability" style={styles.serviceCompactCard}>
                    <div style={styles.serviceCompactIcon}>📊</div>
                    <div style={styles.serviceCompactContent}>
                      <h3 style={styles.serviceCompactTitle}>获奖概率评估</h3>
                      <p style={styles.serviceCompactDesc}>多维度交叉分析，提供客观前瞻性的获奖预测报告，助您科学决策，优化参赛资源配置</p>
                    </div>
                  </Link>
                  <Link href="/services/storytelling" style={styles.serviceCompactCard}>
                    <div style={styles.serviceCompactIcon}>✨</div>
                    <div style={styles.serviceCompactContent}>
                      <h3 style={styles.serviceCompactTitle}>精准叙事呈现</h3>
                      <p style={styles.serviceCompactDesc}>深度挖掘项目内核，将其转化为具有感染力的国际设计语言，优化版面及多媒体材料</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* 中下：参赛策略（左图右文） */}
              <div style={styles.block}>
                <div style={styles.blockHeader}>
                  <h2 style={styles.blockTitle}>📚 参赛策略</h2>
                  <Link href="/strategy" style={styles.moreLink}>更多 →</Link>
                </div>
                <div style={styles.strategyList}>
                  {normalStrategy.length > 0 ? (
                    normalStrategy.map((article) => (
                      <Link key={article.id} href={`/articles/${article.id}.html`} style={styles.strategyItem}>
                        <div style={styles.strategyThumb}>
                          <img 
                            src={article.cover || '/images/strategy-default.jpg'} 
                            alt={article.title}
                            style={styles.strategyThumbImg}
                          />
                        </div>
                        <div style={styles.strategyContent}>
                          <div style={styles.strategyItemTitle}>{article.title}</div>
                          <p style={styles.strategyItemSummary}>{article.summary}</p>
                          <div style={styles.strategyItemMeta}>
                            <span style={styles.strategyItemCategory}>{article.category}</span>
                            <span style={styles.strategyItemDate}>{article.publishTime}</span>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <>
                      <Link href="/strategy" style={styles.strategyItem}>
                        <div style={styles.strategyThumb}>
                          {/* 占位图 - 橙色 */}
                          <div style={styles.strategyPlaceholder}>策略封面</div>
                        </div>
                        <div style={styles.strategyContent}>
                          <div style={styles.strategyItemTitle}>如何选择适合自己的设计奖项</div>
                          <p style={styles.strategyItemSummary}>面对众多国际设计奖项，设计师如何根据自身作品特点、职业发展阶段选择最合适的奖项...</p>
                          <div style={styles.strategyItemMeta}>
                            <span style={styles.strategyItemCategory}>选奖指南</span>
                            <span style={styles.strategyItemDate}>2026-04-19</span>
                          </div>
                        </div>
                      </Link>
                      <Link href="/strategy" style={styles.strategyItem}>
                        <div style={styles.strategyThumb}>
                          {/* 占位图 - 橙色 */}
                          <div style={styles.strategyPlaceholder}>策略封面</div>
                        </div>
                        <div style={styles.strategyContent}>
                          <div style={styles.strategyItemTitle}>获奖文案撰写的核心技巧</div>
                          <p style={styles.strategyItemSummary}>一篇优秀的参赛文案需要准确传达设计理念、突出创新点、展现社会价值...</p>
                          <div style={styles.strategyItemMeta}>
                            <span style={styles.strategyItemCategory}>文案技巧</span>
                            <span style={styles.strategyItemDate}>2026-04-18</span>
                          </div>
                        </div>
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* 下：研究成果 - 横向布局，左图右文 */}
              <div style={styles.block}>
                <div style={styles.blockHeader}>
                  <h2 style={styles.blockTitle}>🔬 研究成果</h2>
                </div>
                <div style={styles.researchGrid}>
                  {/* 书籍卡片 - 横向布局 */}
                  <Link href="/about/book" style={styles.researchCardHorizontal}>
                    <div style={styles.researchCoverWrapper}>
                      <img src="/images/book-cover.jpg" alt="《让你的设计被看见》" style={styles.researchCoverImg} />
                    </div>
                    <div style={styles.researchInfoWrapper}>
                      <h3 style={styles.researchTitle}>《让你的设计被看见》</h3>
                      <p style={styles.researchDesc}>国际设计大奖参赛全攻略</p>
                      <div style={styles.researchParamsInline}>
                        <span><strong>页数：</strong>320页</span>
                        <span><strong>涵盖奖项：</strong>108个</span>
                        <span><strong>案例分析：</strong>50+真实获奖案例</span>
                        <span><strong>适用人群：</strong>设计师/设计机构</span>
                        <span><strong>定价：</strong>¥98</span>
                      </div>
                      <p style={styles.researchIntro}>
                        本书系统梳理了全球108个主流设计奖项的申报要点，从选奖策略、文案撰写、图片准备到评审逻辑，为设计师提供一站式参赛指南。包含50+真实获奖案例分析，助你在激烈的国际竞争中脱颖而出。
                      </p>
                    </div>
                  </Link>
                  {/* 研究报告卡片 - 横向布局 */}
                  <Link href="/about/methodology-report" style={styles.researchCardHorizontal}>
                    <div style={styles.researchCoverWrapper}>
                      <img src="/images/report-cover.jpg" alt="垂直领域创意灵感与设计方法论研究报告" style={styles.researchCoverImg} />
                    </div>
                    <div style={styles.researchInfoWrapper}>
                      <h3 style={styles.researchTitle}>垂直领域创意灵感与设计方法论研究报告</h3>
                      <p style={styles.researchDesc}>基于国际大奖案例深度解析</p>
                      <div style={styles.researchParamsInline}>
                        <span><strong>报告页数：</strong>200+页</span>
                        <span><strong>涵盖领域：</strong>建筑/室内/产品/视觉</span>
                        <span><strong>案例数量：</strong>60+至尊奖案例</span>
                        <span><strong>更新周期：</strong>年度更新</span>
                        <span><strong>定价：</strong>¥98</span>
                      </div>
                      <p style={styles.researchIntro}>
                        深度拆解建筑、室内、产品、视觉传达四大领域的获奖密码。报告涵盖品类趋势分析、核心特征提炼、至尊奖案例解析、灵感案例库及方法论指南，帮助你建立系统化的设计思维框架，提升作品的国际竞争力。
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

            </div>

            {/* 右栏 - 1fr */}
            <div style={styles.rightColumn}>
              
              {/* 热门奖项 */}
              <div style={styles.sidebarBlock}>
                <div style={styles.sidebarHeader}>
                  <h3 style={styles.sidebarTitle}>🏆 热门奖项</h3>
                </div>
                <div style={styles.sidebarList}>
                  {featuredAwards.slice(0, 8).map((award) => (
                    <Link key={award.award_id} href={`/awards/${award.award_id}`} style={styles.sidebarItem}>
                      <div style={styles.sidebarItemName}>{award.award_name_cn}</div>
                      <div style={styles.sidebarItemType}>{award.award_type}</div>
                    </Link>
                  ))}
                </div>
                <Link href="/awards" style={styles.sidebarMore}>查看全部 →</Link>
              </div>

              {/* 奖项对比 */}
              <div style={styles.sidebarBlock}>
                <div style={styles.sidebarHeader}>
                  <h3 style={styles.sidebarTitle}>⚖️ 奖项对比</h3>
                </div>
                <Link href="/compare" style={styles.sidebarLink}>
                  <div style={styles.sidebarLinkText}>热门奖项费用/难度对比</div>
                  <div style={styles.sidebarLinkArrow}>→</div>
                </Link>
              </div>

              {/* 中国获奖者名单 - 格式：年份+奖项+获奖名单 */}
              <div style={styles.sidebarBlock}>
                <div style={styles.sidebarHeader}>
                  <h3 style={styles.sidebarTitle}>🇨🇳 中国获奖者</h3>
                </div>
                <div style={styles.sidebarList}>
                  <Link href="/winners/muse-2026" style={styles.winnerItem}>
                    <span style={styles.winnerIcon}>🏆</span>
                    <span style={styles.winnerText}>2026 MUSE设计奖获奖名单</span>
                  </Link>
                  <Link href="/winners/reddot-2026" style={styles.winnerItem}>
                    <span style={styles.winnerIcon}>🏆</span>
                    <span style={styles.winnerText}>2026 红点设计奖获奖名单</span>
                  </Link>
                  <Link href="/winners/if-2026" style={styles.winnerItem}>
                    <span style={styles.winnerIcon}>🏆</span>
                    <span style={styles.winnerText}>2026 iF设计奖获奖名单</span>
                  </Link>
                  <Link href="/winners/idea-2026" style={styles.winnerItem}>
                    <span style={styles.winnerIcon}>🏆</span>
                    <span style={styles.winnerText}>2026 IDEA设计奖获奖名单</span>
                  </Link>
                  <Link href="/winners/gmark-2026" style={styles.winnerItem}>
                    <span style={styles.winnerIcon}>🏆</span>
                    <span style={styles.winnerText}>2026 G-Mark设计奖获奖名单</span>
                  </Link>
                  <Link href="/winners/andrew-martin-2026" style={styles.winnerItem}>
                    <span style={styles.winnerIcon}>🏆</span>
                    <span style={styles.winnerText}>2026 Andrew Martin奖获奖名单</span>
                  </Link>
                  <Link href="/winners/sbid-2026" style={styles.winnerItem}>
                    <span style={styles.winnerIcon}>🏆</span>
                    <span style={styles.winnerText}>2026 SBID国际设计奖获奖名单</span>
                  </Link>
                  <Link href="/winners/waf-2026" style={styles.winnerItem}>
                    <span style={styles.winnerIcon}>🏆</span>
                    <span style={styles.winnerText}>2026 WAF世界建筑节获奖名单</span>
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Banner链接区域 - 5条，去掉蓝色背景，颜色区分 */}
      <section style={styles.bannerSection}>
        <div style={styles.container}>
          <div style={styles.bannerGrid}>
            <Link href="/services" style={styles.bannerCard}>
              <img src="/images/banners/001.jpg" alt="申报服务" style={{width:'100%',height:'100px',objectFit:'cover',borderRadius:'8px',display:'block'}} />
            </Link>
            <Link href="/awards" style={styles.bannerCard}>
              {/* 占位图 - 青色 */}
              <div style={{...styles.bannerPlaceholder, backgroundColor: '#00BCD4', borderColor: '#0097A7'}}>奖项库 Banner</div>
            </Link>
            <Link href="/strategy" style={styles.bannerCard}>
              {/* 占位图 - 粉色 */}
              <div style={{...styles.bannerPlaceholder, backgroundColor: '#E91E63', borderColor: '#C2185B'}}>参赛策略 Banner</div>
            </Link>
            <Link href="/news" style={styles.bannerCard}>
              {/* 占位图 - 琥珀色 */}
              <div style={{...styles.bannerPlaceholder, backgroundColor: '#FF9800', borderColor: '#F57C00'}}>赛事新闻 Banner</div>
            </Link>
            <Link href="/about" style={styles.bannerCard}>
              {/* 占位图 - 蓝灰色 */}
              <div style={{...styles.bannerPlaceholder, backgroundColor: '#607D8B', borderColor: '#455A64'}}>关于我们 Banner</div>
            </Link>
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
              <p style={styles.footerContactItem}>📞 136-9222-2744</p>
              <p style={styles.footerContactItem}>📧 9285962@qq.com</p>
            </div>
            <div style={styles.footerQRCodes}>
              <div style={styles.footerQRItem}>
                <img src="/公众号二维码.jpg" alt="公众号" style={styles.footerQRImg} />
                <p style={styles.footerQRLabel}>公众号</p>
              </div>
              <div style={styles.footerQRItem}>
                <img src="/个人微信二维码.png" alt="微信" style={styles.footerQRImg} />
                <p style={styles.footerQRLabel}>微信</p>
              </div>
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
    backgroundColor: '#1A1A1A',
    padding: '14px 0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
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
  logoImg: {
    height: '36px',
    width: 'auto',
  },
  logoSubText: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#D4AF37',
    marginLeft: '10px',
  },
  nav: {
    display: 'flex',
    gap: '24px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '13px',
    opacity: 0.9,
  },
  // Hero - 标题合并一行，去掉统计文字
  hero: {
    background: 'linear-gradient(135deg, #1E3A5F 0%, #2d4a6f 100%)',
    padding: '30px 0',
    textAlign: 'center',
    color: '#fff',
  },
  heroTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '12px',
  },
  heroDesc: {
    fontSize: '14px',
    opacity: 0.9,
    marginBottom: '16px',
  },
  heroButtons: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
  },
  btnPrimary: {
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    padding: '10px 24px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '14px',
    display: 'inline-block',
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    color: '#fff',
    padding: '10px 24px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '14px',
    border: '1px solid rgba(255,255,255,0.3)',
    display: 'inline-block',
  },
  
  // 焦点新闻区域 - 移入左栏，宽度=两条新闻合起来的宽度，去掉红色按钮，标题在图片下方
  featuredSection: {
    marginBottom: '8px',
  },
  featuredGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '20px',
  },
  featuredCard: {
    display: 'block',
    textDecoration: 'none',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
    border: '1px solid rgba(30,58,95,0.1)',
    backgroundColor: '#fff',
  },
  featuredImageWrapper: {
    position: 'relative',
    width: '100%',
    paddingTop: '45%',
  },
  // 焦点新闻真实图片
  featuredImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  // 焦点新闻占位符 - 蓝色，带边框区分
  featuredPlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#1E3A5F',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '4px dashed rgba(255,255,255,0.3)',
    boxSizing: 'border-box',
  },
  placeholderText: {
    color: '#fff',
    fontSize: '16px',
    opacity: 0.8,
  },
  // 焦点新闻内容区 - 图片下方
  featuredContentBelow: {
    padding: '16px',
    backgroundColor: '#fff',
  },
  featuredCategory: {
    display: 'inline-block',
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    padding: '3px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  featuredTitleBelow: {
    fontSize: '17px',
    fontWeight: 'bold',
    marginBottom: '8px',
    lineHeight: 1.4,
    color: '#333',
  },
  featuredSummaryBelow: {
    fontSize: '13px',
    color: '#666',
    lineHeight: 1.6,
    marginBottom: '10px',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  featuredDateBelow: {
    fontSize: '11px',
    color: '#999',
  },
  
  // 主内容区
  mainSection: {
    padding: '30px 0 16px',
    backgroundColor: '#f8f9fa',
  },
  twoColumnGrid: {
    display: 'grid',
    gridTemplateColumns: '900px 300px',
    gap: '24px',
  },
  
  // 左栏
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  block: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '24px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },
  blockHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '2px solid #1E3A5F',
  },
  blockTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    margin: 0,
  },
  moreLink: {
    fontSize: '13px',
    color: '#D4AF37',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  
  // 新闻网格 - 3条，上图下文
  newsGridThree: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  newsCardVertical: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    overflow: 'hidden',
    textDecoration: 'none',
  },
  newsThumbLarge: {
    width: '100%',
    paddingTop: '56.25%', // 16:9 比例
    position: 'relative',
    overflow: 'hidden',
  },
  newsThumbImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  // 新闻占位图 - 绿色，带边框区分，增加阴影
  newsPlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#4CAF50',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    border: '3px dashed rgba(255,255,255,0.4)',
    boxSizing: 'border-box',
    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)',
  },
  newsContentVertical: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  newsCardTitle: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 1.4,
  },
  newsCardSummary: {
    fontSize: '13px',
    color: '#666',
    lineHeight: 1.6,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  
  // 服务紧凑布局 - 3列
  servicesCompactGrid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  serviceCompactCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '24px 20px',
    background: 'linear-gradient(145deg, #ffffff 0%, #f4f7fc 100%)',
    borderRadius: '12px',
    textDecoration: 'none',
    boxShadow: '0 2px 8px rgba(30,58,95,0.06), 0 1px 2px rgba(30,58,95,0.04)',
    border: '1px solid rgba(30,58,95,0.06)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  serviceCompactIcon: {
    fontSize: '36px',
    marginBottom: '12px',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
  },
  serviceCompactContent: {},
  serviceCompactTitle: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '6px',
  },
  serviceCompactDesc: {
    fontSize: '12px',
    color: '#666',
    lineHeight: 1.5,
  },
  
  // 策略列表（左图右文）
  strategyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  strategyItem: {
    display: 'flex',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    textDecoration: 'none',
  },
  strategyThumb: {
    width: '200px',
    height: '120px',
    flexShrink: 0,
    borderRadius: '6px',
    overflow: 'hidden',
  },
  strategyThumbImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  // 策略占位图 - 橙色，带边框区分，增加阴影
  strategyPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FF9800',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 'bold',
    border: '3px dashed rgba(255,255,255,0.4)',
    boxSizing: 'border-box',
    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)',
  },
  strategyContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  strategyItemTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '6px',
    lineHeight: 1.4,
  },
  strategyItemSummary: {
    fontSize: '13px',
    color: '#666',
    lineHeight: 1.5,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    marginBottom: '8px',
  },
  strategyItemMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  strategyItemCategory: {
    fontSize: '11px',
    color: '#D4AF37',
    backgroundColor: '#FFF8E1',
    padding: '3px 10px',
    borderRadius: '10px',
  },
  strategyItemDate: {
    fontSize: '11px',
    color: '#999',
  },
  
  // 研究成果 - 横向布局，左图右文
  researchGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  // 横向卡片样式
  researchCardHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    textDecoration: 'none',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    border: '2px solid #e0e0e0',
    gap: '24px',
  },
  // 封面图容器 - 固定宽度，自适应高度，无白色背景
  researchCoverWrapper: {
    width: '140px',
    flexShrink: 0,
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  },
  // 封面图 - 完整显示不裁剪
  researchCoverImg: {
    width: '140px',
    height: 'auto',
    objectFit: 'contain',
    backgroundColor: 'transparent',
    display: 'block',
  },
  // 右侧信息区
  researchInfoWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  // 内联参数行
  researchParamsInline: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px 20px',
    marginBottom: '12px',
    fontSize: '13px',
    color: '#555',
  },
  researchCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: '24px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    textDecoration: 'none',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    border: '2px solid #e0e0e0',
    minHeight: '200px',
  },
  researchCardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '16px',
  },
  researchIcon: {
    fontSize: '48px',
    flexShrink: 0,
  },
  researchIconPlaceholder: {
    width: '120px',
    height: '120px',
    borderRadius: '12px',
    backgroundColor: '#1E3A5F',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '56px',
    flexShrink: 0,
    boxShadow: 'inset 0 0 30px rgba(0,0,0,0.3)',
    border: '3px dashed rgba(255,255,255,0.3)',
  },
  researchContent: {
    flex: 1,
  },
  researchTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '8px',
    lineHeight: 1.4,
  },
  researchDesc: {
    fontSize: '13px',
    color: '#666',
    lineHeight: 1.6,
    marginBottom: '12px',
  },
  researchIntro: {
    fontSize: '12px',
    color: '#888',
    lineHeight: 1.7,
    paddingTop: '12px',
    borderTop: '1px dashed #ddd',
  },
  
  emptyItem: {
    padding: '20px',
    textAlign: 'center',
    color: '#999',
    fontSize: '13px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  
  // 右栏侧边栏
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  sidebarBlock: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '16px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },
  sidebarHeader: {
    paddingBottom: '10px',
    borderBottom: '2px solid #1E3A5F',
    marginBottom: '12px',
  },
  sidebarTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    margin: 0,
  },
  sidebarList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  sidebarItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid #f0f0f0',
    textDecoration: 'none',
  },
  sidebarItemName: {
    fontSize: '14px',
    color: '#333',
    fontWeight: '500',
  },
  sidebarItemType: {
    fontSize: '11px',
    color: '#2E7D32',
    backgroundColor: '#E8F5E9',
    padding: '2px 6px',
    borderRadius: '8px',
  },
  sidebarMore: {
    display: 'block',
    textAlign: 'center',
    fontSize: '13px',
    marginTop: '12px',
    padding: '8px',
    fontSize: '12px',
    color: '#D4AF37',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  sidebarLink: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    textDecoration: 'none',
  },
  sidebarLinkText: {
    fontSize: '14px',
    color: '#333',
  },
  sidebarLinkArrow: {
    fontSize: '16px',
    color: '#D4AF37',
  },
  winnerItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#333',
    fontWeight: '500',
    padding: '6px 0',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  winnerIcon: {
    fontSize: '14px',
  },
  winnerText: {
    flex: 1,
  },
  // 研究成果产品参数
  researchParams: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '8px 16px',
    padding: '12px 0',
    marginBottom: '12px',
    borderTop: '1px dashed #e0e0e0',
    borderBottom: '1px dashed #e0e0e0',
  },
  paramItem: {
    fontSize: '12px',
    color: '#555',
  },
  paramLabel: {
    color: '#888',
  },

  // Banner链接区域 - 5条，去掉蓝色背景
  bannerSection: {
    backgroundColor: '#f8f9fa',
    padding: '16px 0',
  },
  bannerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '16px',
  },
  bannerCard: {
    display: 'block',
    textDecoration: 'none',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  // Banner占位图基础样式 - 带边框区分
  bannerPlaceholder: {
    width: '100%',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    border: '4px dashed rgba(255,255,255,0.5)',
    borderRadius: '8px',
    boxSizing: 'border-box',
  },
  
  // Footer
  footer: {
    backgroundColor: '#1A1A1A',
    padding: '40px 0 20px',
    color: '#fff',
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
    paddingBottom: '24px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    gap: '32px',
  },
  footerBrand: {
    flex: 1,
  },
  footerLogo: {
    height: '36px',
    width: 'auto',
    marginBottom: '10px',
  },
  footerSlogan: {
    fontSize: '13px',
    opacity: 0.7,
  },
  footerContact: {
    textAlign: 'right',
  },
  footerContactTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#D4AF37',
  },
  footerContactItem: {
    fontSize: '13px',
    marginBottom: '6px',
    opacity: 0.8,
  },
  footerQRCodes: {
    display: 'flex',
    gap: '12px',
  },
  footerQRItem: {
    textAlign: 'center',
  },
  footerQRImg: {
    width: '70px',
    height: '70px',
    borderRadius: '6px',
    backgroundColor: '#fff',
    padding: '4px',
  },
  footerQRLabel: {
    fontSize: '11px',
    marginTop: '4px',
    opacity: 0.7,
  },
  footerText: {
    fontSize: '12px',
    textAlign: 'center',
    opacity: 0.5,
  },
}
