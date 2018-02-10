// 명시적 강제변환의 목적 중 하나는 
// 코드를 명확하게하여 다른 개발자가 내 코드를 보더라도 쓸데없이 내 의도를 추론할 필요없이 이해하도록 하는 것이다.

// String()과 Number() 외에 문자열<->숫자 의 명시적인 타입변환 방법이 또 있다.

var a = 42;
var b = a.toString();

var c = "3.14";
var d = +c;

console.log("typeof b : ", typeof b);
console.log("typeof d : ", typeof d);

// 여기에서 a.toString() 호출은 겉보기에는 명시적이지만, 
// 몇 가지 암시적인 요소가 감춰져 있다.
// 원시 값 42에는 toString() 메서드가 없으므로 엔진은 toString()을 사용할 수 있게
// 자동으로 42를 객체 래퍼로 '박싱'한다.
// 말하자면 '명시적으로, 암시적인(Explicitly Implicit)'작동이다.

// +c의 +는 단항 연산자(Unary Operator)다. +는 피연산자를 숫자로 명시적 강제변환 한다.