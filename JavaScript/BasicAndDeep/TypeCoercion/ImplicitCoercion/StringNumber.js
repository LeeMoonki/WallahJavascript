// 암시적 강제변환 : 문자열 < - > 숫자

// 숫자 -> 문자열

var a = "30";
var b = "0";

var c = 30;
var d = 0;

console.log("a + b : ", a + b); // "300"
console.log("c + d : ", c + d); // 30

var e = [1, 2];
var f = [3, 4];

console.log("e.toString() : ", e.toString()); // "1,2"
console.log("JSON.stringify(e) : ", JSON.stringify(e)); // "[1,2]"

console.log("e + f : ", e + f); // "1,23,4"

// 위에서 e + f의 작업이 ToNumber 추상 연산이 객체를 다루는 방법과 정확히 일치한다. (ExplicitCoercion의 ToNumber 참고)
// valueOf()에 배열을 넘기면 단순 원시 값을 반환할 수 없으므로 이제 toString()으로 넘어간다.
// 그래서 두 배열은 각각 "1,2"와 "3,4"가 되고, + 는 두 문자열을 붙여 "1,23,4" 라는 결과가 된다.

// 즉, + 연산의 한쪽 피연산자가 문자열이면 + 는 문자열 붙이기 연산을 한다.
// 이외에는 모두 숫자 덧셈을 한다.

// 참고
console.log("\n");
console.log("{a: 1,b: 2} + [3,4] : ", {a: 1,b: 2} + [3,4]);
console.log("[1,2] + {c: 3, d: 4} : ", [1,2] + {c: 3, d: 4});

// 숫자는 공백 문자열 ""와 더하면 문자열로 강제변환된다.

var num = 30;
var str = num + "";

console.log("\nstr, typeof str : ", str, typeof str); // "30" string

// 주의할 사항은 다음과 같다.
// 만약 평범한 원시 숫자 값이 아닌 객체라면 결과값(문자열)이 달라질 수 있다.

var notNormalPrimitiveValue = {
    valueOf: function() { return 30; },
    toString: function() { return 3; }
};

console.log("\n");
console.log(notNormalPrimitiveValue + ""); // "30"
console.log(String(notNormalPrimitiveValue)); // "3"


// 문자열 -> 숫자

var a = "3.14";
var b = a - 0;

console.log("b, typeof b : ", b, typeof b); // 3.14 number

// - 연산자는 숫자 뺄셈 기능이 전무이므로 a - 0 은 a 값을 숫자로 강제변환한다.
// 자주 쓰이지는 않지만 a * 1 이나 a / 1 의 연산자 역시 숫자 연산만 하므로 마찬가지다.

// 객체 값에 - 연산을 하면 위의 + 와 비슷하다.

var c = [3];
var d = [1];

console.log("\nc - d : ", c - d); // 2

// 두 배열은 우선 문자열로 강제변환된 뒤(toString()으로 직렬화) 숫자로 강제변환된다.
// 그리고 마지막에 - 연산을 한다.