// * -> 불리언
// 암시적 강제변환은 어떤 값이 강제로 바뀌어야 하는 방향으로 사용할 때 발생한다는 것을 기억하자.

// 다음은 불리언으로의 (암시적인) 강제변환이 일어나는 표현식을 열거한 것이다.

// 1. if () 문의 조건 표현식
// 2. for ( ; ; ) 에서 두 번째 조건 표현식
// 3. while () 및 do ... while() 루프의 조건 표현식
// 4. ? : 삼항 연산 시 첫 번째 조건 표현식
// ||(논리 OR) 및 &&(논리 AND)의 좌측 피연산자(테스트 표현식 역할을 한다)

// 이런 컨텍스트에서 불리언이 아닌 값이 사용되면, ToBoolean 추상 연산 규칙에 따라
// 일단 불리언으로 암시적 강제변환된다.

// && 와 || 연산자
// 자바스크립트에서 이 두 연산자는 다른 언어와 달리 실제로 결과값이 논리 값(불리언)이 아니다.
// 이 연산자의 결과 값은 두 피연산자 중 한쪽 값이다.

var truthy1 = 30;
var falsy1 = null;
var truthy2 = "abc";
var falsy2 = undefined;

// || 연산자는 그 결과가 true이면 첫 번째 피연산자 값을, false이면 두 번째 피연산자 값을 반환한다.
// -> 결과가 true이면 true인 인자를 반환한다. 둘 다 true이면 왼쪽을 반환한다.
console.log("truthy1 || falsy1 : ", truthy1 || falsy1); // 30
console.log("falsy1 || truthy1 : ", falsy1 || truthy1); // 30
console.log("falsy1 || falsy2 : ", falsy1 || falsy2); // undefined
console.log("truthy2 || truthy1 : ", truthy2 || truthy1); // "abc"

console.log("\n");
// && 연산자는 true이면 두 번째 피연산자 값을 반환하고, 둘 다 false이면 왼쪽을, 하나만 false이면 false인 인자를 반환한다.
console.log("truthy1 && falsy1 : ", truthy1 && falsy1); // null
console.log("falsy1 && truthy1 : ", falsy1 && truthy1); // null
console.log("falsy2 && falsy1 : ", falsy2 && falsy1); // undefined
console.log("truthy2 && truthy1 : ", truthy2 && truthy1); // 30

// 사실 위처럼 왼쪽 오른쪽을 따지는 것 보다, Grammar의 단락 평가(Short Circuiting)을 참고하는 게 더 이해하기 좋다.