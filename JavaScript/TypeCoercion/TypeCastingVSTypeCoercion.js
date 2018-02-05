// 어떤 값을 다른 타입의 값으로 바꾸는 과정이 
// 명시적이면 : 타입 캐스팅; Type Casting
// 암시적이면 : 강제변환 : Coercion 

var a = 30;
var b = a + "";
var c = String(a);

console.log("typeof a : ", typeof a); // "number"
console.log("typeof b : ", typeof b); // "string"
console.log("typeof c : ", typeof c); // "string"

// b 에는 암시적 강제변환이 발생한다. 공백문자열과의 + 연산은 
// 문자열 접합 처리(Concatenation 두 문자열을 하나로 합친다)를 하므로
// (숨겨진) 부수 효과로서 30을 이와 동등한 문자열 "30"으로 강제변환한다.

// 반면 String() 함수는 값을 인자로 받아 명백히 문자열 타입으로 강제변환 한다.