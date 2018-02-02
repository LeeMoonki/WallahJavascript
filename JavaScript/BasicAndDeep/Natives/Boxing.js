// 객체 래퍼는 아주 중요한 용도로 쓰인다. 
// 원시 값에는 property나 method가 없으므로 .length, .toString()으로 접근하려면
// 원시 값을 객체 래퍼로 감싸줘야 한다.
// 여기에서 자바스크립트는 원시값을 수동으로 박싱(래핑)하지 않아도 알아서 박싱을 해준다.

console.log('"abc".lenght : ', "abc".length); // 3
console.log('"abc".toUpperCase() : ', "abc".toUpperCase()); // "ABC"

// 자동 박싱을 하지 않기위해 미리 수동으로 박싱을 하는 것은 권장하지 않는다.
// 왜냐하면 브라우저는 이렇게 많이 사용되는 경우 최적화하여 박싱을 진행하기 때문이다.
// 오히려 개발자가 직접 객체 형태로 '선 최적화(Pre-Optimize)'하면 프로그램이 더 느려질 수 있다.

// 그래도 미리 박싱을 해야겠다면 다음을 주의한다.

var booleanObj = new Boolean(false);

if (!booleanObj) {
    console.log("\noops");
} else {
    console.log("\nWhat???");
}

// false를 객체 래퍼로 박싱했지만 문제는 객체 자체가 'truthy'란 점이다.
// 그래서 예상과는 달리 안에 들어있는 false 값과 반대의 결과가 나온다.

// 수동으로 원시 값을 박싱하려면 Object() 함수를 이용하는 것이 좋다. (앞에 new 키워드는 붙이지 않는다.)

var str = "abc";
var str1 = new String(str);
var str2 = Object(str);

console.log("\ntypeof str : ", typeof str); // string
console.log("typeof str1 : ", typeof str1); // object
console.log("typeof str2 : ", typeof str2); // object

console.log("\nstr1 instanceof String : ", str1 instanceof String); // true
console.log("str2 instanceof String : ", str2 instanceof String); // true

console.log("\nObject.prototype.toString.call(str1) : ", Object.prototype.toString.call(str1)); // [object String]
console.log("Object.prototype.toString.call(str2) : ", Object.prototype.toString.call(str2)); // [object String]

// 객체 자체가 truthy이기 때문에 booleanObj1은 객체이고 역시 truthy이다.
var booleanObj1 = Object(false);

if (!booleanObj1) {
    console.log("\nfinally");
} else {
    console.log("\nno!!");
}

console.log("\ntrue instanceof Boolean : ", true instanceof Boolean); // false
console.log("booleanObj instanceof Boolean : ", booleanObj instanceof Boolean); // true

console.log("\ntypeof true : ", typeof true); // boolean
console.log("typeof booleanObj : ", typeof booleanObj); // object

console.log("\nObject.prototype.toString.call(true) : ", Object.prototype.toString.call(true)); // [object Boolean]
console.log("Object.prototype.toString.call(booleanObj1) : ", Object.prototype.toString.call(booleanObj1)); // [object Boolean]

// 다시 한 번 ! 객체 래퍼로 직접 박싱하는 건 권장사항이 아니다!


// 언박싱

// 객체 래퍼의 원시 값은 valueOf() 메서드로 추출한다.

var a = new String("abc");
var b = new Number(42);
var c = new Boolean(true);

console.log("\na.valueOf() : ", a.valueOf());
console.log("b.valueOf() : ", b.valueOf());
console.log("c.valueOf() : ", c.valueOf());

// 이때에도 암시적인 언박싱이 일어난다. 

var d = a + ""; // d에는 언박싱된 원시 값 "abc"가 할당된다.

console.log("typeof a : ", typeof a); // object
console.log("typeof d : ", typeof d); // string