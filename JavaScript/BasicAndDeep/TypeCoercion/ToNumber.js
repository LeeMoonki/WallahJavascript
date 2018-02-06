// 숫자 아닌 값 -> 수식 연산이 가능한 숫자 변환

// 예를 들어
// true -> 1
// false -> 0
// undefined -> NaN
// null -> 0

// ToNumber 규칙 :
// 문자열 값에 ToNumber를 적용하면 대부분 숫자 규칙/구문과 비슷하게 작동한다.
// 변환이 실패하면 결과는 (숫자 리터럴 구문 에러가 아닌) NaN이다.
// 한 가지 차이는 0이 앞에 붙은 8진수는 ToNumber에서 올바른 숫자 리터럴이라도 8진수로 처리하지 않는다. (대신 일반 10진수로 처리한다.)

// 객체 (그리고 배열)는 일단 동등한 원시 값으로 변환 후 그 결과값(아직 숫자가 아닌 원시 값)을
// 앞서 설명한 ToNumber 규칙에 의해 강제변환한다.

// 동등한 원시 값으로 바꾸기 위해 ToPrimitive 추상 연산 과정에서 해당 객체가 valueOf() 메서드를
// 구현했는지 (DefaultValue 연산을 내부적으로 이용하여 - ES5 Chapter 8.12.8) 확인한다.
// valueOf()를 쓸 수 있고 반환 값이 원시 값이면 그대로 강제변환하되, 그렇지 않을 경우
// (toString()메서드가 존재하면) toString()을 이용하여 강제변환한다.
// 어찌해도 원시값으로 바꿀 수 없을 때는 TypeError 오류를 던진다.

var a = {
    valueOf: function() {
        return "30";
    }
};

var b = {
    toString: function() {
        return "30";
    }
};

var c = [3, 0];
c.toString = function() {
    return this.join(""); // "30"
};

console.log("Number(a) : ", Number(a)); // 30
console.log("Number(b) : ", Number(b)); // 30
console.log("Number(c) : ", Number(c)); // 30
console.log('Number("") : ', Number("")); // 0
console.log("Number([]) : ", Number([])); // 0
console.log('Number(["abc"]) : ', Number(["abc"])) // NaN