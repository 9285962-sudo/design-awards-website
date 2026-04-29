import Head from 'next/head'
import Link from 'next/link'

export default function Book() {
  return (
    <>
      <Head>
        <title>《让你的设计被看见》| 设计能 - 国际设计大奖参赛全攻略</title>
        <meta name="description" content="《让你的设计被看见——国际设计大奖参赛全攻略》作者何光会，15年国际设计大奖申报经验精华总结。系统拆解建筑、室内、平面、产品、交互等多类大奖申报逻辑，评审标准、材料准备、战略布局全流程指南。" />
        <meta name="keywords" content="让你的设计被看见,国际设计大奖参赛攻略,设计大奖申报书籍,何光会,红点奖申报指南,iF奖参赛手册,MUSE设计奖攻略,设计师参赛指南" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.52de.cc/about/book" />
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
              <Link href="/about" style={{...styles.navLink, color: '#D4AF37'}}>关于我们</Link>
            </nav>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.pageContainer}>
          {/* 标题区域 */}
          <div style={styles.titleSection}>
            <h1 style={styles.title}>《让你的设计被看见》</h1>
            <p style={styles.subtitle}>国际设计大奖参赛全攻略</p>
            <p style={styles.author}>作者：何光会</p>
          </div>

          <div style={styles.contentGrid}>
            {/* 左侧：书籍信息 + 作者介绍 */}
            <div style={styles.bookInfo}>
              <div style={styles.bookCover}>
                <img src="/images/book-cover.jpg" alt="《让你的设计被看见》书籍封面" style={styles.bookCoverImg} />
              </div>
              <div style={styles.bookMeta}>
                <div style={styles.metaItem}>
                  <span style={styles.metaLabel}>出版社</span>
                  <span style={styles.metaValue}>中国科学技术文化音像出版社</span>
                </div>
                <div style={styles.metaItem}>
                  <span style={styles.metaLabel}>作者</span>
                  <span style={styles.metaValue}>何光会</span>
                </div>
                <div style={styles.metaItem}>
                  <span style={styles.metaLabel}>购买渠道</span>
                  <span style={styles.metaValue}>抖音商城 / 淘宝 / 微信小店</span>
                </div>
              </div>
              <a href="tel:13692222744" style={styles.contactBtn}>📞 咨询购买：136-9222-2744</a>

            </div>

            {/* 右侧：内容简介 - 与左侧平齐 */}
            <div style={styles.bookContent}>
              <h2 style={styles.sectionTitle}>内容简介</h2>
              <div style={styles.introText}>
                <p>
                  在全球化浪潮席卷设计产业的今天，国际设计大奖早已不只是荣誉的象征，更是设计师走向世界舞台的跳板。它是品牌的扩音器，是价值的放大镜，是你与国际对话的通行证。
                </p>
                <p>
                  《让你的设计被看见——国际设计大奖参赛全攻略》立足中国设计师真实需求，系统拆解建筑、室内、平面、产品、交互等多类大奖的申报逻辑，深入剖析评审标准、材料准备、战略布局等关键环节，并结合行业趋势、申报成本、获奖延伸价值等深度内容，为你构建一套"可复制、可执行、可致胜"的全流程申报策略。
                </p>
                <p>
                  这是一本写给设计师的实战工具书，也是一盏照亮你专业成长路径的申报灯塔。无论你是初次尝试，还是屡战屡败，这本书都能帮助你从迷茫走向清晰，从被动走向主动。是时候，让世界看见你。
                </p>
              </div>

              <h2 style={styles.sectionTitle}>适合读者</h2>
              <div style={styles.audienceList}>
                <div style={styles.audienceItem}>✓ 希望提升影响力的设计师</div>
                <div style={styles.audienceItem}>✓ 品牌负责人、设计创业者</div>
                <div style={styles.audienceItem}>✓ 申报辅导机构从业者</div>
                <div style={styles.audienceItem}>✓ 初入职场的年轻设计师</div>
                <div style={styles.audienceItem}>✓ 正在冲击大奖的独立设计人</div>
                <div style={styles.audienceItem}>✓ 带领团队迈向国际的企业主</div>
                <div style={styles.audienceItem}>✓ 高校教师、设计教育者</div>
                <div style={styles.audienceItem}>✓ 国际设计生态观察者</div>
              </div>

            </div>
          </div>

          {/* 作者介绍 - 通栏 */}
          <div style={styles.authorSectionFull}>
            <h3 style={styles.authorTitleFull}>👤 作者介绍</h3>
            <p style={styles.authorTextFull}>
              何光会，深圳日光月华文化传播有限公司创始人，「设计能」平台主理人。深耕国际设计大奖申报领域15年，累计服务350+设计师及设计机构，成功助力1000+项目斩获国际大奖，平均获奖率高达80%。熟悉全球108个主流设计奖项的评审逻辑与申报规则，擅长从战略定位、文案叙事、视觉呈现等多维度提升作品竞争力。致力于帮助中国设计师在国际舞台上获得更多认可与荣耀。
            </p>
          </div>

          {/* 目录 */}
          <h2 style={styles.sectionTitle}>目录</h2>
          <div style={styles.tocGrid}>
            <div style={styles.tocColumn}>
              <div style={styles.tocItem}>
                <span style={styles.tocNumber}>绪章</span>
                <span style={styles.tocTitle}>奖项的力量</span>
              </div>
              <div style={styles.tocItem}>
                <span style={styles.tocNumber}>前言</span>
                <span style={styles.tocTitle}>拨开迷雾，重拾设计的荣光</span>
              </div>
              <div style={styles.tocItem}>
                <span style={styles.tocNumber}>第一章</span>
                <span style={styles.tocTitle}>洞悉全球设计风向标</span>
              </div>
              <div style={styles.tocItem}>
                <span style={styles.tocNumber}>第二章</span>
                <span style={styles.tocTitle}>知己知彼，百战不殆</span>
              </div>
              <div style={styles.tocItem}>
                <span style={styles.tocNumber}>第三章</span>
                <span style={styles.tocTitle}>建筑设计类奖项深度解析</span>
              </div>
              <div style={styles.tocItem}>
                <span style={styles.tocNumber}>第四章</span>
                <span style={styles.tocTitle}>室内设计类奖项深度解析</span>
              </div>
              <div style={styles.tocItem}>
                <span style={styles.tocNumber}>第五章</span>
                <span style={styles.tocTitle}>平面设计类奖项深度解析</span>
              </div>
              <div style={styles.tocItem}>
                <span style={styles.tocNumber}>第六章</span>
                <span style={styles.tocTitle}>产品设计类奖项深度解析</span>
              </div>
            </div>
            <div style={styles.tocColumn}>
              <div style={styles.tocItem}>
                <span style={styles.tocNumber}>第七章</span>
                <span style={styles.tocTitle}>数字交互与体验设计奖项</span>
              </div>
              <div style={styles.tocItem}>
                <span style={styles.tocNumber}>第八章</span>
                <span style={styles.tocTitle}>决胜毫厘，精细布局</span>
              </div>
              <div style={styles.tocItem}>
                <span style={styles.tocNumber}>第九章</span>
                <span style={styles.tocTitle}>参赛与获奖的价值延伸</span>
              </div>
              <div style={styles.tocItem}>
                <span style={styles.tocNumber}>第十章</span>
                <span style={styles.tocTitle}>理性参赛，精准落子</span>
              </div>
              <div style={styles.tocItem}>
                <span style={styles.tocNumber}>第十一章</span>
                <span style={styles.tocTitle}>共筑多元繁荣的奖项生态</span>
              </div>
              <div style={styles.tocItem}>
                <span style={styles.tocNumber}>第十二章</span>
                <span style={styles.tocTitle}>文明的印记，时代的荣光</span>
              </div>
              <div style={styles.tocItem}>
                <span style={styles.tocNumber}>第十三章</span>
                <span style={styles.tocTitle}>设计赋能未来</span>
              </div>
            </div>
          </div>

          {/* 核心亮点 */}
          <h2 style={styles.sectionTitle}>核心亮点</h2>
          <div style={styles.highlightsGrid}>
            <div style={styles.highlightCard}>
              <div style={styles.highlightIcon}>🎯</div>
              <h3 style={styles.highlightTitle}>正本清源</h3>
              <p style={styles.highlightDesc}>深度解析全球数百个权威奖项，戳破"伪大奖"泡沫，建立批判性思维</p>
            </div>
            <div style={styles.highlightCard}>
              <div style={styles.highlightIcon}>📊</div>
              <h3 style={styles.highlightTitle}>系统策略</h3>
              <p style={styles.highlightDesc}>从评审标准到材料准备，从精准定位到价值延伸，全流程方法论</p>
            </div>
            <div style={styles.highlightCard}>
              <div style={styles.highlightIcon}>💡</div>
              <h3 style={styles.highlightTitle}>实战导向</h3>
              <p style={styles.highlightDesc}>100+成功案例复盘，获奖文案模板，可直接应用的申报技巧</p>
            </div>
            <div style={styles.highlightCard}>
              <div style={styles.highlightIcon}>🌍</div>
              <h3 style={styles.highlightTitle}>全球视野</h3>
              <p style={styles.highlightDesc}>涵盖建筑、室内、平面、产品、交互等全品类国际设计大奖</p>
            </div>
          </div>

          {/* 前言节选 */}
          <h2 style={styles.sectionTitle}>前言节选</h2>
          <div style={styles.quoteBox}>
            <p style={styles.quoteText}>
              "此刻，当你翻开这本书，或许正深陷于这样的困惑与焦虑：邮箱里塞满各种'国际设计大奖'的征稿函，社交媒体上刷到层出不穷的'金奖捷报'，耳边充斥着奖项代理机构'保送获奖''提升身价'的承诺。然而，当真正投入时间、金钱与心血参与其中，却发现有些奖项评审标准模糊不清，获奖名单令人费解..."
            </p>
            <p style={styles.quoteAuthor}>—— 何光会《让你的设计被看见》前言</p>
          </div>
        </div>
      </main>

      <footer style={styles.footer}>
        <div style={styles.container}>
          <p style={styles.footerText}>© 2026 设计能 | 深圳日光月华文化传播有限公司</p>
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
  
  // 主内容区 - 窄屏有框
  main: { 
    backgroundColor: '#f5f5f5', 
    padding: '40px 0',
    minHeight: 'calc(100vh - 200px)',
  },
  pageContainer: { 
    maxWidth: '900px', 
    margin: '0 auto', 
    padding: '40px 48px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: '1px solid #e0e0e0',
  },
  
  // 标题区域 - 容器内蓝色头部
  titleSection: { 
    textAlign: 'center', 
    marginBottom: '32px',
    padding: '32px 48px',
    margin: '-40px -48px 32px -48px',
    background: 'linear-gradient(135deg, #1E3A5F 0%, #2d4a6f 100%)',
    color: '#fff',
    borderRadius: '12px 12px 0 0',
  },
  title: { 
    fontSize: '32px', 
    fontWeight: 'bold', 
    color: '#fff',
    marginBottom: '12px',
  },
  subtitle: { 
    fontSize: '18px', 
    color: 'rgba(255,255,255,0.9)',
    marginBottom: '8px',
  },
  author: { 
    fontSize: '14px', 
    color: 'rgba(255,255,255,0.7)',
  },
  
  contentGrid: { display: 'grid', gridTemplateColumns: '280px 1fr', gap: '40px', marginBottom: '40px' },
  
  bookInfo: { display: 'flex', flexDirection: 'column', gap: '20px' },
  bookCover: { backgroundColor: '#f8f9fa', borderRadius: '12px', padding: '16px', textAlign: 'center', border: '1px solid #e0e0e0' },
  bookCoverImg: { width: '100%', maxWidth: '240px', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
  bookMeta: { display: 'flex', flexDirection: 'column', gap: '12px' },
  metaItem: { display: 'flex', flexDirection: 'column', gap: '4px' },
  metaLabel: { fontSize: '12px', color: '#999' },
  metaValue: { fontSize: '14px', color: '#333', fontWeight: 'bold' },
  contactBtn: { display: 'block', backgroundColor: '#D4AF37', color: '#1A1A1A', padding: '14px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', textAlign: 'center', marginTop: '12px' },

  // 作者介绍 - 通栏
  authorSectionFull: {
    marginTop: '40px',
    padding: '28px 32px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    border: '1px solid #e0e0e0',
  },
  authorTitleFull: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: '16px',
  },
  authorTextFull: {
    fontSize: '15px',
    lineHeight: 1.8,
    color: '#555',
  },

  bookContent: {},
  sectionTitle: { fontSize: '22px', fontWeight: 'bold', color: '#1E3A5F', marginBottom: '16px', marginTop: '24px' },
  introText: { fontSize: '15px', lineHeight: 1.7, color: '#555', display: 'flex', flexDirection: 'column', gap: '10px' },
  
  audienceList: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' },
  audienceItem: { fontSize: '13px', color: '#333', padding: '8px 12px', backgroundColor: '#f8f9fa', borderRadius: '8px' },
  
  tocGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', backgroundColor: '#f8f9fa', padding: '28px', borderRadius: '12px' },
  tocColumn: { display: 'flex', flexDirection: 'column', gap: '10px' },
  tocItem: { display: 'flex', gap: '12px', alignItems: 'baseline' },
  tocNumber: { fontSize: '13px', color: '#D4AF37', fontWeight: 'bold', minWidth: '50px' },
  tocTitle: { fontSize: '14px', color: '#333' },
  
  highlightsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' },
  highlightCard: { backgroundColor: '#f8f9fa', padding: '24px', borderRadius: '12px', textAlign: 'center' },
  highlightIcon: { fontSize: '36px', marginBottom: '12px' },
  highlightTitle: { fontSize: '15px', fontWeight: 'bold', color: '#1E3A5F', marginBottom: '8px' },
  highlightDesc: { fontSize: '13px', color: '#666', lineHeight: 1.6 },
  

  
  quoteBox: { backgroundColor: '#1E3A5F', padding: '28px', borderRadius: '12px', color: '#fff' },
  quoteText: { fontSize: '15px', lineHeight: 1.8, opacity: 0.9, fontStyle: 'italic', marginBottom: '16px' },
  quoteAuthor: { fontSize: '14px', color: '#D4AF37', textAlign: 'right' },
  
  footer: { backgroundColor: '#1A1A1A', padding: '32px 0', color: '#fff' },
  footerText: { fontSize: '14px', textAlign: 'center', opacity: 0.7 },
}
