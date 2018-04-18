https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test

var reg = /^01[016789]\d{7,8}$/g; // 한국 휴대 전화번호(- 없음) 체크
var reg1 = /^01[016789]\d{7,8}$/;
var phone = '01012341234';

console.log(reg.test(phone), reg.lastIndex); // true 11
console.log(reg.test(phone), reg.lastIndex); // false 0

console.log(reg1.test(phone), reg.lastIndex); // true 0
console.log(reg1.test(phone), reg.lastIndex); // true 0

/* Using test() on a regex with the **global flag**
 * If the regex has the global flag set, 'test()' will advance the 'lastIndex' of the regex.
 * A subsequent use of 'test()' will start the search at the substring of 'str' specified
 * by 'lastIndex' ('exec()' will also advance the 'lastIndex' property).
*/

console.log("");
console.log('aaa'.match(/a/g)); // [ 'a', 'a', 'a' ]
console.log('aaa'.match(/a/)); // [ 'a', index: 0, input: 'aaa' ]