var str = '<p style="width:192px;">asd</p>' +
'<span style="height:200px;">qwe13< style</span>' +
'<span style="">qwe13style</span>' +
'<span style="" >qwe13style</span>' +
'<input style="" />';

var newStr = str.replace(/(<{1})([a-zA-Z]+.*?)(style=".{0,}?")/g, '$1$2 ');
var newStr1 = str.replace(/(style=".{0,}?")/g, '');

console.log(str.match(/(<{1})([a-zA-Z]+).*?(style=".{0,}?")/g));
console.log(newStr);
console.log(newStr1);

