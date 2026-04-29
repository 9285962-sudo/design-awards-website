var https = require('https');
var url = 'https://www.52de.cc/images/articles/' + encodeURIComponent('那些看起来不惊艳的设计，为什么反而拿走了最高奖？') + '/cover.jpg';
console.log('请求:', url);
https.get(url, function(r) {
  console.log('状态码:', r.statusCode);
  console.log('Location:', r.headers.location);
  r.on('data', function() {});
  r.on('end', function() {
    // 也试一下直接路径
    https.get('https://www.52de.cc/images/articles/%E9%82%A3%E4%BA%9B%E7%9C%8B%E8%B5%B7%E6%9D%A5%E4%B8%8D%E6%83%8A%E8%89%B3%E7%9A%84%E8%AE%BE%E8%AE%A1%EF%BC%8C%E4%B8%BA%E4%BB%80%E4%B9%88%E5%8F%8D%E8%80%8C%E6%8B%BF%E8%B5%B0%E4%BA%86%E6%9C%80%E9%AB%98%E5%A5%96%EF%BC%9F/cover.jpg', function(r2) {
      console.log('直接编码状态码:', r2.statusCode);
      console.log('Location:', r2.headers.location);
    });
  });
});
