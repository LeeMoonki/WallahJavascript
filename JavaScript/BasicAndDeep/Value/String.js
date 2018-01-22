// 자바스크립트에서 문자열은 문자의 배열과 다르다

var strFoo = "foo";
var arrFoo = ["f", "o", "o"];

// 문자열은 유사배열로 .length property와 .indexOf(), .concat() method를 갖는다

console.log("strFoo's length : ", strFoo.length); // 3
console.log("arrFoo's length : ", arrFoo.length); // 3

console.log("strFoo.indexOf('o') : ", strFoo.indexOf('o')); // 1
console.log("arrFoo.indexOf('o') : ", arrFoo.indexOf('o')); // 1

var strFooBar = strFoo.concat("bar");
var arrFooBar = arrFoo.concat("bar");

console.log("\nstrFooBar : ", strFooBar); // foobar
console.log("arrFooBar : ", arrFooBar); // [ 'f', 'o', 'o', 'bar' ]

console.log("strFoo === strFooBar : ", strFoo === strFooBar); // false
console.log("arrFoo === arrFooBar : ", arrFoo === arrFooBar); // false

console.log("strFoo : ", strFoo); // foo
console.log("arrFoo : ", arrFoo); // [ 'f', 'o', 'o' ]

// 문자열은 불변값(immutable)이고 배열은 가변값(mutable)이다.
strFoo[1] = '0';
arrFoo[1] = '0';

console.log("\nstrFoo : ", strFoo); // foo
console.log("arrFoo : ", arrFoo); // [ 'f', '0', 'o' ]

// 문자열은 불변값이므로 문자열 메서드는 그 내용을 바로 변경하지 않고 항상 새로운 문자열을 생성한 후 반환한다.
// 대부분의 배열 메서드는 그 자리에서 곧바로 원소를 수정한다.
var upperStrFoo = strFoo.toUpperCase();
console.log("\nstrFoo === upperStrFoo : ", strFoo === upperStrFoo);
console.log("strFoo : ", strFoo);
console.log("upperStrFoo : ", upperStrFoo);

// 그리고 문자열을 다룰 때 유용한 대부분의 배열 메서드는 사실상 문자열에 쓸 수 없지만
// 문자열에 대해 불변 배열 메서드를 빌려 쓸 수는 있다.
console.log("\nstrFoo.join : ", strFoo.join);
console.log("strFoo.map : ", strFoo.map);

var joinStrFoo = Array.prototype.join.call(strFoo, "-");
var mapStrFoo = Array.prototype.map.call(strFoo, function (v) {
    return v.toUpperCase() + ".";
}).join("");

console.log("joinStrFoo : ", joinStrFoo);
console.log("mapStrFoo : ", mapStrFoo);

// 배열의 .reverse() method를 통한 문자열 뒤집기
var reverseStrFoo = "";
console.log("\nstrFoo : ", strFoo);
console.log("strFoo.reverse : ", strFoo.reverse);
try {
    reverseStrFoo = Array.prototype.reverse.call(strFoo);
    console.log("Array.prototype.reverse.call(strFoo) may do not make error. But still the method can not apply to string");
} catch (e) {
    console.log(".reverse() method of Array changes its elements. Hence we can not apply it to string since string is immutable.");
}

// 따라서 문자열을 배열로 바꾸고 원하는 작업을 수행한 후 다시 문자열로 되돌리는 꼼수(Hack)를 쓴다.
reverseStrFoo = strFoo.split("").reverse().join("");

console.log('Do hack with strFoo.split("").reverse().join("")');
console.log("reverseStrFoo : ", reverseStrFoo);