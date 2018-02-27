// 추상 동등비교
// The Abstract Equality Comparison Algorithm

// 1. 비교할 두 값이 같은 타입이면 값이 같은지만 체크한다.
// 예외 : 
// NaN은 그 자신과도 결코 동등하지 않다.
// +0과 -0은 동등하지 않다.

// 2. 문자열 -> 숫자
console.log('30 == "30" : ', 30 == "30"); // true
console.log('30 === "30" : ', 30 === "30"); // false

// 숫자와 문자열의 경우 문자열을 ToNumber() 하여 결과를 비교한다

// 3. * -> 불리언
console.log('"30" == true : ', "30" == true); // false

// 동등비교에 불리언 값이 있다면 그 값을 ToNumber() 하여 결과를 비교한다
// true -> 1, false -> 0
// "30" -> 30
// 30 == 1 -> false

// == true, == false, === true, === false를 사용하지 말고 다음을 사용하자.
var a = "30";
if (a) { } // 암시적 변환
if (!!a) {  } // 명시적 변환

// 4. null -> undefined
// null == undefined -> true
// undefined == null -> true
// null == falsy -> false
// undefined == falsy -> false

console.log("null == undefined", null == undefined); // true
console.log("null == falsy : ", null == ""); // false
console.log("undefined == falsy : ", undefined == 0); // false

// 다음과 같은 코드는 권장하지 않는다
var b = null;

if (b === undefined || b === null) {  }

// 5. 객체 -> 비객체
// 동등비교에서 한 쪽이 String 또는 Number이고 다른 한 쪽이 객체라면 
// 객체에 대해 ToPrimitive() 연산을 수행하고 동등비교를 한다.

console.log("30 == [30] : ", 30 == [30]); // true
// [30]의 ToPrimitive() 연산결과는 "30"

var c = "abc";
var d = Object(c); // new String(c)와 같다.

console.log('"abc" == Object("abc") : ', "abc" == Object("abc")); // true
console.log('"abc" == new String("abc") : ', "abc" == new String("abc")); // true
console.log('"abc" === Object("abc") : ', "abc" === Object("abc")); // false

console.log("null == Object(null) : ", null == Object(null)); // false
console.log("undefined == Object(undefined) : ", undefined == Object(undefined)); // false
console.log("NaN == Object(NaN) : ", NaN == Object(NaN)); // false

// null과 undefined는 객체 래퍼가 따로 없으므로 박싱이 안 된다.
// 따라서 Object(null)은 일반 Object()로 해석되어 일반 객체가 만들어진다.
// NaN은 Number로 박싱되지만 NaN == NaN은 false이다.

