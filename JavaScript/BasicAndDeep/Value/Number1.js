// 자바스크립트 숫자는 10진수가 기본이고 소수점 이하의 0은 떼어낸다.
var a = 42;
var b = 42.3;
console.log("42   : ", a); // 42
console.log("42.3 : ", b); // 42.3

// 자바스크립트의 숫자 리터럴에서 소수점 앞, 뒤 0은 생략이 가능하다.
a = 0.42;
b = .42;
console.log("\n0.42 : ", a); // 0.42
console.log(".42    : ", b); // 0.42

a = 42.0;
b = 42.; // 틀린 코드는 아니지만 이렇게 작성하는 것은 권장하지 않는다.
console.log("\n42.0 : ", a); // 42
console.log("42.    : ", b); // 42

a = 42.3000;
b = 42.0;
console.log("\n42.3000 : ", a); // 42.3
console.log("42.0      : ", b); // 42

// 아주 크거나 아주 작은 숫자는 지수형(Exponent Form)으로 표시하며, 
// .toExponential() method의 결괏값과 같다.

 a = 5E10;
 console.log("\n5E10 : ", a); // 50000000000; 5 X 10^10
 console.log("5E10.toExponential() : ", 5E10.toExponential()); // 5e+10

 b = a * a;
 console.log("\n5E10 * 5E10 : ", b); // 2.5e+21
 console.log("(5E10 * 5E10).toExponential() : ", (5E10 * 5E10).toExponential()); // 2.5e+21

// 숫자 값은 Number Object Wrapper로 Boxing 할수 있기 때문에 Number.prototype method로 접근할 수 있다.
// 예를 들어 .toFixed() method는 지정한 소수점 이하 자릿수까지 숫자를 나타낸다.
a = 42.59;
console.log("\na : ", a);
console.log("a.toFixed(0) : ", a.toFixed(0)); // "43"
console.log("a.toFixed(1) : ", a.toFixed(1)); // "42.6"
console.log("a.toFixed(2) : ", a.toFixed(2)); // "42.59"
console.log("a.toFixed(3) : ", a.toFixed(3)); // "42.590"
console.log("a.toFixed(4) : ", a.toFixed(4)); // "42.5900"
console.log("typeof a.toFixed(0) : ", typeof a.toFixed(0)); // 숫자 값을 문자열 형태로 반환

// .toPrecision()도 기능은 비슷하지만 유효 숫자 개수를 지정할 수 있다.
a = 42.59;
console.log("\na : ", a);
console.log("a.toPrecision(1) : ", a.toPrecision(1)); // "4e+1" (40)
console.log("a.toPrecision(2) : ", a.toPrecision(2)); // "43"
console.log("a.toPrecision(3) : ", a.toPrecision(3)); // "42.6"
console.log("a.toPrecision(4) : ", a.toPrecision(4)); // "42.59"
console.log("a.toPrecision(5) : ", a.toPrecision(5)); // "42.590"
console.log("a.toPrecision(6) : ", a.toPrecision(6)); // "42.5900"

// 숫자 리터럴에서 바로 접근할 수 있는 메서드의 경우 굳이 변수에 할당하여 메서드를 사용하지 않아도 된다.
// 하지만 . 이 소수점일 경우에는 프로퍼티 접근자(property accessor)가 아닌 
// 숫자 리터럴의 일부로 해석되므로 . 연산자를 사용할 때는 조심해야 한다.

// Following has a SyntaxError
// console.log("40.toExponential() : ", 40.toExponential()); 
// 40.toExponential() -> 40.0toExponential() 이 되고 property accessor가 없어
// toExponential()에 접근할 수단이 없어졌다.
console.log("\n(40).toExponential() : ", (40).toExponential());
console.log("0.42.toFixed(3) : ", 0.42.toFixed(3));
console.log("42..toPrecision(3) : ", 42..toPrecision(3));