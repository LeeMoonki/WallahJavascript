// '안전하게' 표현할 수 있는(즉, 표현한 값과 실제 값이 정확하게 일치한다고 장담할 수 있는) 정수는 다음과 같다.
// 최대 2^53 - 1 (9,007,199,254,740,991) ; ES6에서 Number.MAX_SAFE_INTEGER로 정의
// 최소 -(2^53 - 1) (-9,007,199,254,740,991) ; ES6에서 Number.MIN_SAFE_INTEGER로 정의
console.log("Number.MAX_SAFE_INTEGER : ", Number.MAX_SAFE_INTEGER); // === Math.pow(2, 53) - 1
console.log("Number.MIN_SAFE_INTEGER : ", Number.MIN_SAFE_INTEGER);

// 정수인지 확인

// ES6부터는 Number.isInteger()로 어떤 값의 정수 여부를 확인한다.

// ES6 이전 버전을 위한 폴리필은 다음과 같다.

if (!Number.isInteger) {
    Number.isInteger = function (num) {
        return typeof num == "number" && num % 1 == 0;
    };
}

console.log("\nNumber.isInteger(42) : ", Number.isInteger(42)); // true
console.log("Number.isInteger(42.0) : ", Number.isInteger(42.0)); // true
console.log("Number.isInteger(42.3) : ", Number.isInteger(42.3)); // false

// ES6부터 안전한 정수 여부는 Number.isSageInteger()로 체크한다.

// ES6 이전 버전을 위한 폴리필은 다음과 같다.

if (!Number.isSafeInteger) {
    Number.isSafeInteger = function (num) {
        return Number.isInteger(num) && Math.abs(num) <= Number.MAX_SAFE_INTEGER;
    };
}

console.log("Number.isSafeInteger(Number.MAX_SAFE_INTEGER) : ", Number.isSafeInteger(Number.MAX_SAFE_INTEGER));
console.log("Number.isSafeInteger(Math.pow(2, 53)) : ", Number.isSafeInteger(Math.pow(2, 53)));
console.log("Number.isSafeInteger(Math.pow(2, 53) - 1) : ", Number.isSafeInteger(Math.pow(2, 53) - 1));

// 32비트 (부호 있는) 정수

// 정수의 안전 범위가 대략 9천 조(53비트)에 이르지만, 
// (비트 연산 Bitwise Operation 처럼) 32비트 숫자에만 가능한 연산이 있으므로 실제 범위는 훨씬 줄어든다. 

// 따라서 정수의 안전 범위는 Math.pow(-2, 31)에서 Math.pow(2, 31) - 1 까지다.
// Math.pow(-2, 31) <= Safe Integer for 32 bit <= Math.pow(2, 31) - 1
// -2,147,483,648 <= Safe Integer for 32 bit <= 2,147,483,647

console.log("Math.pow(-2, 31) : ", Math.pow(-2, 31));
console.log("Math.pow(-2, 31) - 1 : ", Math.pow(2, 31) - 1);

// a | 0 과 같이 쓰면 '숫자 -> 32비트 부호 있는 정수'로 강제변환을 한다.
// | 비트 연산자는 32비트 정수 값에만 쓸 수 있기 때문에 (즉, 32비트까지만 관심을 갖기 때문에 그 상위 비트는 소실됨)
// 가능한 방법이다. 0과의 OR 연산은 본질적으로 NOOP 비트 연산과 같다.
// NOP 또는 NOOP는 어셈블리 언어의 명령어 중 하나로, 명령 자체의 길이만큼 프로그램 카운터를 증가시킬 뿐
// 아무런 실행도 하지 않는다. 0과의 OR 연산 역시 값은 변하지 않으므로 이에 비유한 것이다.

// NaN, Infinity 등 일부 특수 값은 "32비트에서 안전하지 않다."
// 이들을 비트 연산하면 ToInt32 추상 연산을 통해 비트 연산 본연의 기능을 수행하고 결과는 +0이 된다.

// Performs the OR operation on each pair of bits. a OR b yields 1 if either a or b is 1
// 0 | 0 : 0
// 1 | 0 : 1
// 0 | 1 : 1
// 1 | 1 : 1

var a = 243.23;
var b = -243.25;

console.log("243.23 | 0 : ", a | 0);
console.log("-243.25 | 0 : ", b | 0);
// https://jsperf.com/or-vs-floor/2 에 따르면 Math.floor 연산보다 OR 연산의 속도가 더 빠르다.