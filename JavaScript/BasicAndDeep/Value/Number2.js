// 큰 숫자는 보통 지수형으로 표시한다
var onethousand = 1E3; // 1 X 10^3
var onemilliononehundredthousand = 1.1E6; // 1.1 * 10^6
console.log("onethousand : ", onethousand);
console.log("onemilliononehundredthousand : ", onemilliononehundredthousand);

// 숫자 리터럴은 2진, 8진, 16진 등 다른 진법으로도 나타낼 수 있다.
console.log("\ntypeof 0xf3 : ", typeof 0xf3);
console.log("\n0xf3 : ", 0xf3); // 243의 16진수
console.log("0Xf3 : ", 0Xf3); // 243의 16진수

console.log("\n0363 : ", 0363); // 243의 8진수
console.log("00363 : ", 00363);
// 숫자 앞에 0을 붙이면 8진수로 인식한다. 따라서 숫자 맨 앞에 0을 붙이지 말고 0o를 사용하자.
console.log("0o363 : ", 0o363);
console.log("0O363 : ", 0O363);

console.log("\n0b11110011 : ", 0b11110011); // 243의 2진수
console.log("0B11110011 : ", 0B11110011);

// 10진수를 2, 8, 16 진수로 변환하고자 할때는 .toString()
var a = 243;
console.log("\na : ", a);
console.log("typeof a.toString(16) : ", typeof a.toString(16));
console.log("a.toString(16) : ", a.toString(16)); // "f3"
console.log("a.toString(8) : ", a.toString(8)); // "363"
console.log("a.toString(2) : ", a.toString(2)); // "11110011"

// 부동 소수점

// 작은 소수 값
console.log("\n0.1 + 0.2 === 0.3 : ", 0.1 + 0.2 === 0.3);

// 이러한 경우에는 어떻게 해야 하는가?
// 가장 일반적으로는 미세한 '반올림 오차'를 허용 공차(Tolerance)로 처리하는 방법이 있다.
// 이렇게 미세한 오차를 '머신 입실론(Machine Epsilon)이라고 하는데, 자바스크립트의 머신 입실론은
// 2^-52 (2.220446049250313e-16) 이다.
// ES6부터는 이 값이 Number.EPSILON으로 미리 정의되어 있으므로 필요시 사용하면 되고,
// ES6이전 브라우저는 다음과 같이 폴리필(Polyfill)을 대신 사용한다. 

// Polyfill of Number.EPSILON
if (!Number.EPSILON) {
    Number.EPSILON = Math.pow(2, -52);
}

// Number.EPSILON 을 통한 두 숫자의 Equality 비교
function numbersCloseEnoughToEqual (n1, n2) {
    return Math.abs(n1 - n2) < Number.EPSILON;
}

var a = 0.1 + 0.2;
var b = 0.3;

console.log("\nnumbersCloseEnoughToEqual(a, b) : ", numbersCloseEnoughToEqual(a, b));
console.log("numbersCloseEnoughToEqual(0.00000001, 0.00000002) : ", numbersCloseEnoughToEqual(0.00000001, 0.00000002));

// 큰 소수 값
// 부동 소수점 숫자의 최댓값은 대략 1.798e+308이고 Number.MAX_VALUE로 정의하며
// 최솟값은 5e-324로 음수는 아니지만 거의 0에 가까운 숫자고 Number.MIN_VALUE로 정의한다.
console.log("Number.MAX_VALUE : ", Number.MAX_VALUE);
console.log("Number.MIN_VALUE : ", Number.MIN_VALUE);