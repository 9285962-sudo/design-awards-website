import Head from 'next/head'
import Link from 'next/link'

export default function MethodologyReport() {
  return (
    <>
      <Head>
        <title>垂直领域创意灵感及设计方法论参考报告 | 设计能研究成果</title>
        <meta name="description" content="设计能基于国际设计大奖案例的深度解析与趋势洞察，提供垂直领域设计方法论研究报告定制服务，涵盖健康、养老、灯饰等多个领域。" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.52de.cc/about/methodology-report" />
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

      <main style={styles.main}>
        <div style={styles.pageContainer}>
          {/* 标题区域 - 容器内蓝色头部 */}
          <div style={styles.titleSection}>
            <h1 style={styles.title}>垂直领域创意灵感及设计方法论参考报告</h1>
            <p style={styles.subtitle}>基于国际设计大奖案例的深度解析与趋势洞察</p>
          </div>

          {/* 报告摘要 */}
          <div style={styles.summaryBox}>
            <h2 style={styles.summaryTitle}>📋 报告摘要</h2>
            <p style={styles.summaryText}>
              本报告为您的品类量身定制，系统梳理核心设计特征与创新趋势。通过深度解析红点、iF、IDEA等全球顶尖设计奖项的获奖案例，我们为您提供高质量的创意灵感库与设计方法论工具，助力打造具有国际竞争力的设计方案。
            </p>
            
            <div style={styles.dataBoard}>
              <h3 style={styles.dataBoardTitle}>核心数据看板</h3>
              <div style={styles.dataGrid}>
                <div style={styles.dataItem}>
                  <span style={styles.dataIcon}>🏆</span>
                  <span style={styles.dataLabel}>分析奖项</span>
                  <span style={styles.dataValue}>红点奖、iF奖、IDEA奖</span>
                </div>
                <div style={styles.dataItem}>
                  <span style={styles.dataIcon}>📊</span>
                  <span style={styles.dataLabel}>分析案例总数</span>
                  <span style={styles.dataValue}>50+ 精选案例</span>
                </div>
                <div style={styles.dataItem}>
                  <span style={styles.dataIcon}>🎯</span>
                  <span style={styles.dataLabel}>核心趋势关键词</span>
                  <span style={styles.dataValue}>可持续、智能化、人性化</span>
                </div>
              </div>
              <p style={styles.targetReader}><strong>目标读者：</strong>品牌主理人、产品经理、设计总监、研发负责人、市场策略师</p>
            </div>
          </div>

          {/* 报告结构 */}
          <h2 style={styles.sectionTitle}>📑 报告结构</h2>
          <div style={styles.chapterList}>
            <div style={styles.chapterItem}>
              <span style={styles.chapterNum}>01</span>
              <div style={styles.chapterContent}>
                <h3 style={styles.chapterTitle}>品类宏观趋势与设计背景</h3>
                <p style={styles.chapterDesc}>品类定义与范畴、行业背景与市场驱动、未来设计方向展望</p>
              </div>
            </div>
            <div style={styles.chapterItem}>
              <span style={styles.chapterNum}>02</span>
              <div style={styles.chapterContent}>
                <h3 style={styles.chapterTitle}>核心设计特征与决胜点</h3>
                <p style={styles.chapterDesc}>6大核心设计特征雷达图、特征深度解读、评委眼中的"决胜点"</p>
              </div>
            </div>
            <div style={styles.chapterItem}>
              <span style={styles.chapterNum}>03</span>
              <div style={styles.chapterContent}>
                <h3 style={styles.chapterTitle}>至尊奖/金奖作品深度解析</h3>
                <p style={styles.chapterDesc}>3-5个顶级案例完整拆解，看清顶尖设计背后的逻辑</p>
              </div>
            </div>
            <div style={styles.chapterItem}>
              <span style={styles.chapterNum}>04</span>
              <div style={styles.chapterContent}>
                <h3 style={styles.chapterTitle}>扩展案例灵感库（核心章节）</h3>
                <p style={styles.chapterDesc}>分类案例矩阵、案例信息表、灵活定制1-10个分类</p>
              </div>
            </div>
            <div style={styles.chapterItem}>
              <span style={styles.chapterNum}>05</span>
              <div style={styles.chapterContent}>
                <h3 style={styles.chapterTitle}>设计方法论与实操指南</h3>
                <p style={styles.chapterDesc}>设计原则、检查清单、流程建议、灵感发散提示</p>
              </div>
            </div>
          </div>

          {/* 核心价值 */}
          <h2 style={styles.sectionTitle}>💎 报告核心价值</h2>
          <div style={styles.valueGrid}>
            <div style={styles.valueCard}>
              <div style={styles.valueIcon}>📊</div>
              <h3 style={styles.valueTitle}>数据驱动的深度洞察</h3>
              <ul style={styles.valueList}>
                <li>红点奖、iF奖、IDEA奖等全球顶尖设计奖项获奖作品</li>
                <li>单品类报告涵盖 50+ 国际案例</li>
                <li>覆盖近5年设计趋势演变</li>
              </ul>
            </div>
            <div style={styles.valueCard}>
              <div style={styles.valueIcon}>🎯</div>
              <h3 style={styles.valueTitle}>方法论体系化输出</h3>
              <ul style={styles.valueList}>
                <li>从优秀案例中总结 5-8 项核心设计原则</li>
                <li>可直接应用的设计评估标准与自查工具</li>
                <li>从概念到落地的完整设计流程建议</li>
              </ul>
            </div>
            <div style={styles.valueCard}>
              <div style={styles.valueIcon}>🏆</div>
              <h3 style={styles.valueTitle}>多领域覆盖能力</h3>
              <ul style={styles.valueList}>
                <li>产品设计类：消费电子、家居用品、灯具照明</li>
                <li>建筑空间类：住宅、康养、商业空间</li>
                <li>平面设计类：品牌视觉、包装设计</li>
              </ul>
            </div>
          </div>

          {/* 已开发成果 */}
          <h2 style={styles.sectionTitle}>✅ 已开发成果（成品）</h2>
          <div style={styles.achievementList}>
            <div style={styles.achievementItem}>
              <div style={styles.achievementHeader}>
                <span style={styles.achievementName}>健康领域室内设计方法论研究报告</span>
                <span style={styles.achievementTag}>成品</span>
              </div>
              <div style={styles.achievementSpecs}>
                <span style={styles.spec}>50+国际获奖设计案例</span>
                <span style={styles.spec}>2.7万字</span>
                <span style={styles.spec}>5大核心维度</span>
              </div>
            </div>
            <div style={styles.achievementItem}>
              <div style={styles.achievementHeader}>
                <span style={styles.achievementName}>养老领域室内设计方法论研究报告</span>
                <span style={styles.achievementTag}>成品</span>
              </div>
              <div style={styles.achievementSpecs}>
                <span style={styles.spec}>60+国际获奖设计案例</span>
                <span style={styles.spec}>3万字</span>
                <span style={styles.spec}>5大核心维度</span>
              </div>
            </div>
            <div style={styles.achievementItem}>
              <div style={styles.achievementHeader}>
                <span style={styles.achievementName}>灯饰（台灯）产品设计方法论研究报告</span>
                <span style={styles.achievementTag}>成品</span>
              </div>
              <div style={styles.achievementSpecs}>
                <span style={styles.spec}>55+国际获奖设计案例</span>
                <span style={styles.spec}>2.1万字</span>
                <span style={styles.spec}>5大核心维度</span>
              </div>
            </div>
          </div>

          {/* 正在开发 */}
          <h2 style={styles.sectionTitle}>🔄 正在开发（应邀定制）</h2>
          <div style={styles.achievementList}>
            <div style={{...styles.achievementItem, borderLeft: '4px solid #FF9800'}}>
              <div style={styles.achievementHeader}>
                <span style={styles.achievementName}>智能家居产品设计方法论研究报告</span>
                <span style={{...styles.achievementTag, backgroundColor: '#FFF3E0', color: '#FF9800'}}>定制中</span>
              </div>
              <div style={styles.achievementSpecs}>
                <span style={styles.spec}>某知名家电品牌定制</span>
              </div>
            </div>
            <div style={{...styles.achievementItem, borderLeft: '4px solid #FF9800'}}>
              <div style={styles.achievementHeader}>
                <span style={styles.achievementName}>可持续包装设计方法论研究报告</span>
                <span style={{...styles.achievementTag, backgroundColor: '#FFF3E0', color: '#FF9800'}}>定制中</span>
              </div>
              <div style={styles.achievementSpecs}>
                <span style={styles.spec}>某环保材料企业定制</span>
              </div>
            </div>
          </div>

          {/* 计划开发 */}
          <h2 style={styles.sectionTitle}>📋 计划开发领域</h2>
          <div style={styles.plannedAreas}>
            <span style={styles.plannedTag}>办公空间设计</span>
            <span style={styles.plannedTag}>餐饮空间设计</span>
            <span style={styles.plannedTag}>文创产品设计</span>
            <span style={styles.plannedTag}>商业照明设计</span>
            <span style={styles.plannedTag}>儿童产品设计</span>
          </div>

          {/* 定制流程 */}
          <h2 style={styles.sectionTitle}>🔄 定制流程</h2>
          <div style={styles.processGrid}>
            <div style={styles.processCard}>
              <span style={styles.processNum}>1</span>
              <h4 style={styles.processTitle}>需求沟通</h4>
              <p style={styles.processDesc}>明确细分领域、报告用途、重点关注方向</p>
            </div>
            <div style={styles.processCard}>
              <span style={styles.processNum}>2</span>
              <h4 style={styles.processTitle}>案例筛选</h4>
              <p style={styles.processDesc}>基于需求筛选高相关度国际大奖案例</p>
            </div>
            <div style={styles.processCard}>
              <span style={styles.processNum}>3</span>
              <h4 style={styles.processTitle}>框架确认</h4>
              <p style={styles.processDesc}>确认报告结构、案例数量、深度要求</p>
            </div>
            <div style={styles.processCard}>
              <span style={styles.processNum}>4</span>
              <h4 style={styles.processTitle}>内容撰写</h4>
              <p style={styles.processDesc}>专业团队深度解析案例，提炼方法论</p>
            </div>
            <div style={styles.processCard}>
              <span style={styles.processNum}>5</span>
              <h4 style={styles.processTitle}>交付验收</h4>
              <p style={styles.processDesc}>提供初稿，根据反馈调整优化</p>
            </div>
            <div style={styles.processCard}>
              <span style={styles.processNum}>6</span>
              <h4 style={styles.processTitle}>最终交付</h4>
              <p style={styles.processDesc}>提供完整报告及源文件</p>
            </div>
          </div>

          {/* CTA */}
          <div style={styles.ctaBox}>
            <h2 style={styles.ctaTitle}>让全球顶尖设计奖项的智慧，成为您下一款爆品的起点</h2>
            <p style={styles.ctaDesc}>联系我们，开启您的品类定制报告</p>
            <a href="tel:13692222744" style={styles.ctaBtn}>立即咨询：136-9222-2744</a>
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
    fontSize: '28px', 
    fontWeight: 'bold', 
    color: '#fff',
    marginBottom: '12px',
    lineHeight: 1.4,
  },
  subtitle: { 
    fontSize: '16px', 
    color: 'rgba(255,255,255,0.9)',
  },
  
  // 报告内容样式
  summaryBox: { backgroundColor: '#f8f9fa', padding: '28px', borderRadius: '12px', marginBottom: '32px', border: '1px solid #e0e0e0' },
  summaryTitle: { fontSize: '20px', fontWeight: 'bold', color: '#1E3A5F', marginBottom: '16px' },
  summaryText: { fontSize: '15px', color: '#555', lineHeight: 1.8, marginBottom: '20px' },
  dataBoard: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #D4AF37' },
  dataBoardTitle: { fontSize: '15px', fontWeight: 'bold', color: '#1E3A5F', marginBottom: '16px' },
  dataGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' },
  dataItem: { textAlign: 'center' },
  dataIcon: { fontSize: '24px', marginBottom: '8px', display: 'block' },
  dataLabel: { fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' },
  dataValue: { fontSize: '13px', color: '#1E3A5F', fontWeight: '500' },
  targetReader: { fontSize: '13px', color: '#666', fontStyle: 'italic' },
  sectionTitle: { fontSize: '22px', fontWeight: 'bold', color: '#1E3A5F', marginTop: '36px', marginBottom: '20px' },
  chapterList: { display: 'flex', flexDirection: 'column', gap: '14px' },
  chapterItem: { display: 'flex', gap: '16px', backgroundColor: '#f8f9fa', padding: '18px', borderRadius: '8px', border: '1px solid #e8e8e8' },
  chapterNum: { fontSize: '26px', fontWeight: 'bold', color: '#D4AF37', minWidth: '45px' },
  chapterContent: { flex: 1 },
  chapterTitle: { fontSize: '15px', fontWeight: 'bold', color: '#1E3A5F', marginBottom: '6px' },
  chapterDesc: { fontSize: '13px', color: '#666' },
  valueGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' },
  valueCard: { backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #e8e8e8' },
  valueIcon: { fontSize: '28px', marginBottom: '10px' },
  valueTitle: { fontSize: '14px', fontWeight: 'bold', color: '#1E3A5F', marginBottom: '10px' },
  valueList: { fontSize: '12px', color: '#555', lineHeight: 1.7, paddingLeft: '16px', margin: 0 },
  achievementList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  achievementItem: { backgroundColor: '#f8f9fa', padding: '18px', borderRadius: '8px', borderLeft: '4px solid #4CAF50', border: '1px solid #e8e8e8' },
  achievementHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
  achievementName: { fontSize: '14px', fontWeight: 'bold', color: '#1E3A5F' },
  achievementTag: { fontSize: '11px', color: '#4CAF50', backgroundColor: '#E8F5E9', padding: '4px 10px', borderRadius: '12px' },
  achievementSpecs: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  spec: { fontSize: '11px', color: '#666', backgroundColor: '#e8e8e8', padding: '4px 10px', borderRadius: '12px' },
  processGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' },
  processCard: { backgroundColor: '#f8f9fa', padding: '18px', borderRadius: '8px', textAlign: 'center', border: '1px solid #e8e8e8' },
  processNum: { width: '32px', height: '32px', backgroundColor: '#D4AF37', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '13px', margin: '0 auto 10px' },
  processTitle: { fontSize: '14px', fontWeight: 'bold', color: '#1E3A5F', marginBottom: '6px' },
  processDesc: { fontSize: '12px', color: '#666', lineHeight: 1.5 },
  plannedAreas: { display: 'flex', flexWrap: 'wrap', gap: '10px' },
  plannedTag: { fontSize: '13px', color: '#1E3A5F', backgroundColor: '#E3F2FD', padding: '8px 16px', borderRadius: '20px', fontWeight: '500' },
  ctaBox: { backgroundColor: '#1E3A5F', padding: '32px', borderRadius: '12px', textAlign: 'center', marginTop: '40px' },
  ctaTitle: { fontSize: '20px', fontWeight: 'bold', color: '#fff', marginBottom: '10px' },
  ctaDesc: { fontSize: '14px', color: '#fff', opacity: 0.9, marginBottom: '20px' },
  ctaBtn: { display: 'inline-block', backgroundColor: '#D4AF37', color: '#1E3A5F', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px' },
  footer: { backgroundColor: '#1A1A1A', padding: '24px 0', textAlign: 'center' },
  footerText: { color: '#fff', opacity: 0.7, fontSize: '14px' },
}
