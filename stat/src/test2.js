const OpenKoreanText = require('open-korean-text-node').default;

const text = "아버지가방에들어가신다.";
OpenKoreanText.tokenize(text).then(r => console.log(r))