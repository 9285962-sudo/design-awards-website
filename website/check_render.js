const fs = require('fs');
const html = fs.readFileSync('out/awards.html', 'utf8');

// 检查是否有预渲染的奖项卡片内容
const hasAwardCards = html.includes('awardCard') || html.includes('award-card') || html.includes('awardName');
console.log('Has awardName class:', html.includes('awardName'));
console.log('Has award-card link:', html.includes('awards/'));

// 查找所有奖项名称
const nameMatches = html.match(/award_name_cn["\s:]+\s*["']([^"']+)["']/g) || [];
console.log('Award names found:', nameMatches.length);
console.log('First 3:', nameMatches.slice(0,3));

// 检查是否用了getStaticProps
const hasGSP = html.includes('__NEXT_DATA__');
console.log('Has __NEXT_DATA__:', hasGSP);

if (hasGSP) {
  const match = html.match(/"pageProps":(\{[^}]+\})/);
  if (match) console.log('pageProps:', match[1].substring(0, 200));
}
