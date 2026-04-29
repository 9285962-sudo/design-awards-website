import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?963d1d2dc7cdd626aa7ea973a387a53c";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
            `
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  var bp = document.createElement('script');
  var curProtocol = window.location.protocol.split(':')[0];
  if (curProtocol === 'https') {
    bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
  } else {
    bp.src = 'http://push.zhanzhang.baidu.com/push.js';
  }
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(bp, s);
})();
            `
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
