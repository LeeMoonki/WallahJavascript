// 자바스크립트의 모든 값은 다음 둘 중 하나다.
// 1) Boolean으로 강제변환하면 false가 되는 값
// 2) 1)번을 제외한 나머지. 즉, 명백히 true인 값

// ES5 Chapter 9.2 ToBoolean 추상 연산에 
// Boolean으로 강제변환 시 모든 가능한 경우의 수가 나열되어있다.

// ToBoolean 추상 연산은 다음 목록에 의해 인자로 전달받은 값을 Boolean 타입의 값으로 변환한다.
// 1) Undefined -> false
// 2) Null -> false
// 3) Boolean -> 인자 값과 동일(변환하지 않음)
// 4) Number -> 인자가 +0, -0, NaN 이면 false, 그 외에는 true
// 5) String -> 인자가 공백 문자열(length가 0)이면 false, 그 외에는 true
// 6) Object -> true

// 이 목록을 참고한다면
// undefined, null, false, +0, -0, NaN, "" 이 falsy 값이며, Boolan으로 강제변환하면 false다.

console.log("Boolean(undefined) : ", Boolean(undefined)); // false
console.log("Boolean(null) : ", Boolean(null)); // false
console.log("Boolean(0) : ", Boolean(0)); // false
console.log("Boolean(NaN) : ", Boolean(NaN)); // false
console.log('Boolean("") : ', Boolean("")); // false

if (!null) {
    console.log("!falsy is true : ", !null);
}

// Object를 ToBoolean 추상 연산하면 true 이기 때문에 다음을 조심해야 한다.

var a = new Boolean(false);
var b = new Boolean(0);
var c = new String("");

console.log("a.toString() : ", a.toString()); // false
console.log("b.toString() : ", b.toString()); // false

console.log("Boolean(a) : ", Boolean(a)); // true
console.log("Boolean(b) : ", Boolean(b)); // true
console.log("Boolean(c) : ", Boolean(c)); // true

console.log("!a : ", !a); // false
console.log("!b : ", !b); // false
console.log("!c : ", !c); // false