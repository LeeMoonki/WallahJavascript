// 자바스크립트의 비트 연산자는 오직 32비트 연산만 가능하다.
// 즉, 비트 연산을 하면 피연산자는 32비트 값으로 강제로 맞춰지는데, ToInt32 추상 연산이 이 역할을 맡는다.

// ~ 연산자는 먼저 32비트 숫자로 강제변환한 후 NOT 연산을 한다.
// ~ 는 2의 보수(Complement)를 구한다. 즉, 대략 ~(x+1)과 같다.

// -(x+1)에서 이 연산의 결과를 0으로 만드는 유일한 값은 -1이다.
// 즉 일정 범위 내의 숫자 값에 ~ 연산을 할 경우 입력 값이 -1이면 (false로 쉽게 강제변환할 수 있는)
// falsy한 0, 그 외엔 truthy한 숫자 값이 산출된다.

// 여기에서 -1과 같은 성질의 값을 흔히 '경계 값(Sentinel Value)'라고 일컫는데,
// 동일 타입(숫자)의 더 확장된 값의 집합 내에서 임의의 어떤 의미를 부여한 값이다.
// 예를 들어 C언어의 함수는 대개 -1을 경계 값으로 사용하는데 return >= 0 은 '성공', return -1은 '실패'라는 의미를 각각 부여한다.

// 자바스크립트는 문자열 메서드 indexOf()를 정의할 때 이 전례를 따라 특정 문자를 검색하고 발견하면 
// 0부터 시작하는 숫자 값(인덱스)을, 발견하지 못했을 경우 -1을 반환한다.

var a = "Hello World";

if (a.indexOf("lo") >= 0) { console.log("found it!"); }

if (a.indexOf("lo" !== -1)) { console.log("good. I found"); }

if (a.indexOf("ol") < 0) { console.log("not found!"); }

if (a.indexOf("ol") === -1) { console.log("oh. I couldn't find it"); }

// 여기에서 >= 0 이나 === -1 같은 코드는 '구멍 난 추상화(Leaky Absraction)',
// 즉 (경계 값 -1을 실패로 정해버린) 내부 구현 방식을 내가 짠 코드에 심어놓은 것과 같다.
// 이런 부분은 감추는게 좋다.

// 여기에서 ~ 를 indexOf()에 붙이면 어떤 값을 강제변환하여 불리언 값으로 적절하게 만들 수 있다.

console.log("\n");

if (~a.indexOf("lo")) {
    console.log("I found it!");
}

if (!~a.indexOf("ol")) {
    console.log("I couldn't find it!");
}


// 비트 잘라내기

// 숫자의 소수점 이상 부분을 잘라내기 위해 (즉, 완전수로 강제변환하려고) 더블 틸드(Double Tilde) ~~를 사용하는 개발자들이 있다.
// ~~ 가 하는 일은 ToInt32 강제변환을 적용한 후 각 비트를 거꾸로 한다.
// 그리고 두 번째 ~는 비트를 또 한번 뒤집는데, 결과적으로 원래 상태로 되돌린다.
// 결국 ToInt(32) 강제변환만 하는 셈이다.

// 여기에서 x | 0 대신 ~~x를 써야하는 이유는 연산자 우선순위 때문이다.

console.log("\n");
console.log(1E20);
console.log(~~1E20 / 10);
console.log(1E20 | 0);
console.log((1E20 | 0) / 10);