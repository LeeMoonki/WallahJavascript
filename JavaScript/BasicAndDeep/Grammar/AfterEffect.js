// 표현식의 부수 효과

// 대부분의 표현식에는 부수효과가 없다. 예를 들어

var a = 2;
var b = a + 3;

// 표현식 a + 3 자체는 a 값을 바꾸는 등의 부수 효과가 전혀 없다.
// 단지 b = a + 3 문에서 결과값 5가 b에 할당될 뿐이다.

// 다음 함수 호출 표현식은 부수 효과를 가진(혹은 가졌을지 모를) 표현식의 전형적인 예다.

function foo() {
    c = c + 1;
}

var c = 1;
foo();
console.log("c : ", c); // 결과 값 : undefined, 표현식, 부수효과 : c가 변경됨

// 부수효과의 다른 예는 다음과 같다
var p = 30;
var q = p++;
// 표현식 p++이 하는 일은 두 가지다. 1) p의 현재 값 30을 반환(그리고 b에 할당하는 것까지)하고 2) p 값을 1만큼 증가(부수 효과)시킨다.

// delete 역시 부수 효과를 일으키는 연산자다. 
// delete는 객체의 프로퍼티를 없애거나 배열에서 슬롯을 제거할 때 쓴다.
// 하지만 단독 문(Standalone Statement)으로 더 많이 쓴다.

var obj = {
    a: 30
};

console.log("obj.a : ", obj.a); // 30
console.log("delete obj.a : ", delete obj.a); // true
console.log("obj.a : ", obj.a); // undefined

// delete 연산자의 결과값은 유효한/허용된 연산일 경우 true, 그 외에는 false다.
// 이 연산의 부수 효과는 바로 프로퍼티(또는 배열 슬록)를 제거하는 것이다.