// 특수 숫자

// #NaN
// 수학 연산 시 두 피연산자가 전부 숫자(또는 평범한 숫자로 해석 가능한 10진수 또는 16진수)가 아닐 경우
// 유효한 숫자가 나올 수 없으므로 그 결과는 NaN이다.

var a =  2 / "foo";
console.log('2 / "foo" : ', 2 / "foo"); // NaN
console.log('typeof (2 / "foo") : ', typeof (2 / "foo")); // number

// NaN은 경계 값(Sentinel Value)의 일종으로 (또는 특별한 의미를 부여한 평범한 값으로) 숫자 집합 내에서
// 특별한 종류의 에러 상황을 나타낸다.

// NaN은 null, undefined와 달리 직접 비교가 불가능하다.

console.log('\n(2 / "foo") == NaN : ', (2 / "foo") == NaN); // false
console.log('(2 / "foo") === NaN : ', (2 / "foo") === NaN); // false

// NaN은 다른 어떤 NaN과도 동등하지 않다.
// 따라서 NaN 여부를 판단하기 위해서는 isNaN() 함수를 사용한다.

console.log('isNaN(2 / "foo") : ', isNaN(2 / "foo")); // true

// isNaN() 의 단점이 있는데 이 함수는 '인자 값이 숫자인지 여부를 평가'하는 함수여서
// NaN이 아닌 다른 숫자가 아닌 값을 인자로 넘겨도 true를 반환한다.

console.log('\nisNaN(2 / "foo") : ', isNaN(2 / "foo"));
console.log('isNaN("foo") : ', isNaN("foo")); // "foo"는 숫자가 아니지만 NaN도 아니다. 그럼에도 true를 반환

// ES6부터는 isNaN() 함수 대신 Number.isNaN()을 사용하면 위의 문제를 해결할 수 있으며
// ES6 이전 버전은 다음 폴리필을 사용하면 된다.

if (!Number.isNaN) {
    Number.isNaN = function (n) {
        return (
            typeof n === "number" && isNaN(n)
        );
    };
}

console.log('\nNumber.isNaN(2 / "foo") : ', Number.isNaN(2 / "foo")); // true
console.log('Number.isNaN("foo") : ', Number.isNaN("foo")); // false

// NaN은 "자기가 아닌 다른 어떤 값도 항상 자신과 동등한" 유일한 값임을 이용하여
// 위 폴리필을 다음과 같이 작성할 수 있다.

if (!Number.isNaN) {
    Number.isNaN = function (n) {
        return n !== n;
    };
}


// #무한대

console.log("\n1 / 0 : ", 1 / 0); // Infinity, Number.POSITIVE_INFINITY
console.log("-1 / 0 : ", -1 / 0); // -Infinity, Number.NEGATIVE_INFINITY

var a = Number.MAX_VALUE;
console.log("\na : ", a); // 1.7976931348623157e+308
console.log("a + a : ", a + a); // Infinity
console.log("a + Math.pow(2, 970) : ", a + Math.pow(2, 970)); // Infinity
console.log("a + Math.pow(2, 969) : ", a + Math.pow(2, 969)); // 1.7976931348623157e+308

// IEEE 754 명세에 따르면, 덧셈 등의 연산 결과가 너무 커서 표현하기 곤란할 땐
// '가장 가까운 수로 반올림'모드가 결과값을 정한다.
// Number.MAX_VALUE + Math.pow(2, 969)는 무한대보다는 Number.MAX_VALUE에 가깝기 때문에 '버림'처리하고
// Number.MAX_VALUE + Math.pow(2, 970)는 무한대에 더 가깝기 때문에 '올림' 처리한다.

// 무한대 / 무한대 는 NaN이다.
var b = Number.POSITIVE_INFINITY;
console.log("\nInfinity / Infinity : ", b / b); // NaN
console.log("1 / Infinity : ", 1 / b); // 0
console.log("-1 / Infinity : ", -1 / b); // -0

console.log("\n0 / -3 : ", 0 / -3); // -0
console.log("0 * -3 : ", 0 * -3); // -0
// Node와 IE에서는 0으로 보여준다. 즉, 보여주기는 0이지만 동작은 -0이다.

var c = 0 / -3; // -0

console.log("c : ", c);
console.log("c.toString() : ", c.toString()); // "0"
console.log("c + '' : ", c + ''); // "0"
console.log("String(c) : ", String(c)); // "0"
console.log("JSON.stringify(c) : ", JSON.stringify(c)); // "0"

console.log('\n+"-0" : ', +"-0"); // -0
console.log('Number("-0") : ', Number("-0")); // -0
console.log('JSON.parse("-0") : ', JSON.parse("-0")); // -0

var pzero = 0;
var mzero = 0 / -3;

console.log("\npzero : ", pzero);
console.log("mzero : ", mzero);
console.log("mzero == pzero : ", mzero == pzero);
console.log("-0 == mzero : ", -0 == mzero);
console.log("mzero === pzero : ", mzero === pzero);
console.log("-0 === mzero : ", -0 === mzero);
console.log("0 > -0 : ", 0 > -0);
console.log("pzero > mzero : ", pzero > mzero);

// 확실하게 -0과 0을 구분하고 싶다면 다음을 사용한다

function isNegZero (n) {
    n = Number(n);
    return (n === 0) && (1 / n === -Infinity);
}

console.log("\nisNegZero(-0) : ", isNegZero(-0));
console.log("isNegZero(0) : ", isNegZero(0));

// +0, -0은 어떤 변수값이 0에 도달하여 부호가 바뀌는 순간, 그 직전까지 이 변수의 이동 방향을 알려준다.


// #Object.is()
// ES6 부터는 잡다한 예외를 걱정하지 않아도 두 값이 절대적으로 동등한지를 확인하는 새로운 유틸리티를 지원한다.
// 바로 Object.is() 다.

// ES6 이전 환경을 위한 폴리필은 다음과 같다.

if (!Object.is) {
    Object.is = function (v1, v2) {
        // -0 test
        if (v1 === 0 && v2 === 0) {
            return 1 / v1 === 1 / v2;
        }
        // NaN test
        if (v1 !== v2) {
            return v2 !== v2;
        }
        // etc
        return v1 === v2;
    };
}

var val1 = 2 / "foo";
var val2 = -3 * 0;

console.log("\nval1 : ", val1);
console.log("val2 : ", val2);
console.log("Object.is(val1, NaN) : ", Object.is(val1, NaN)); // true
console.log("Object.is(val2, -0) : ", Object.is(val2, -0)); // true
console.log("Object.is(val2, 0) : ", Object.is(val2, 0)); // false

// == 또는 === 이 안전하다면 굳이 Object.is()는 사용하지 않는 편이 좋다.