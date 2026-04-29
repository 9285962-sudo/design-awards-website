const fs = require('fs');
const html = fs.readFileSync('out/awards.html', 'utf8');

// 提取 __NEXT_DATA__
const dataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
if (dataMatch) {
  const data = JSON.parse(dataMatch[1]);
  console.log('props keys:', Object.keys(data.props || {}));
  // 检查 pageProps
  const pp = data.props?.pageProps;
  if (pp) {
    console.log('pageProps keys:', Object.keys(pp));
    if (pp.awardsData) {
      console.log('awardsData count:', pp.awardsData.length);
      console.log('First award_id:', pp.awardsData[0]?.award_id);
      console.log('First name_cn:', pp.awardsData[0]?.award_name_cn);
    } else {
      console.log('No awardsData in pageProps');
      console.log('Full pageProps (first 500):', JSON.stringify(pp).substring(0, 500));
    }
  }
} else {
  console.log('No __NEXT_DATA__ found');
}
