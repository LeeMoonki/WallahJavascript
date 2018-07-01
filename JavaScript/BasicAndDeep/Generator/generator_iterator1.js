// 자신의 앞의 값과 어떤 관계가 분명히 정의된 (예를 들어 a;n = (3 * a;n-1) + 6) 일련의 값들을
// 생산하려고 한다. 그렇게 하려면 일단 가장 마지막에 생산한 값을 기억하는 상태성 생산기(Stateful Producer)가 필요하다.

var gimmeSomething = (function() {
    var nextVal;

    return function() {
        if (nextVal === undefined) { nextVal = 1; }
        else { nextVal = (3 * nextVal) + 6; }
        return nextVal;
    };
})();

console.log(gimmeSomething(), gimmeSomething(), gimmeSomething(), gimmeSomething()); // 1 9 33 105

// 이러한 생산기를 만들 때 이터레이터를 활용하면 좋다.
// 왜냐하면 이터레이터는 생산자로부터 일련의 값들을 받아 하나씩 거치기 위한, 명확한(Well-defined) 인터페이스이기 때문이다.

var something = (function() {
    var nextVal;

    return {
        // "for ... of" 루프에서 필요하다
        // [] 구문은 계산된 프로퍼티명(Computed Property Name)이라 하며 객체 리터럴 정의를 표현식으로 평가하여 그 결과를 프로퍼티명으로 삼는다
        [Symbol.iterator]: function() { return this; },
        // 표준 이터레이터 인터페이스 메서드
        next: function() {
            if (nextVal === undefined) { nextVal = 1; }
            else { nextVal = (3 * nextVal) + 6; }
            return { done: false, value: nextVal }
        }
    };
})();

console.log(something.next().value, something.next().value, something.next().value, something.next().value); // 1 9 33 105

// ES6 는 for ... of 루프를 지원하여 표준 이터레이터를 자동으로 기존 루프 구문 형태로 쓸 수 있다.

for (var v of something) {
    console.log(v); // 321 969
    // 무한 루프가 되지 않도록
    if (v > 500) { break; }
}

// for ... of 루프는 매번 자동으로 next()를 호출하다가 (next()에 아무 값도 넘기지 않는다) done:true 를 받으면 그 자리에서 멈춘다.
// something 이터레이터는 항상 done:false 를 반환하므로 for ... of 는 무한 반복한다.
// 그래서 조건을 설정하여 break를 넣어준다.

// for ... of 를 사용하지 않고 직접 수동으로 순회할 수도 있다.

for (
    var ret;
    (ret = something.next()) && !ret.done;
) {
    console.log(ret.value); // 2913 8745
    // 무한 루프가 되지 않도록
    if (ret.value > 5000) { break; }
}

// ES6 부터 배열 같은 자바스크립트 내장 자료구조 대부분에는 기본 이터레이터가 장착되어 있다.
// 일반 객체에는 없다. 따라서 
// for (var k of Object.keys(obj)) {  }
// 처럼 사용한다.

var arr = [ 1, 3, 5, 7, 11 ];
for (var v of arr) { console.log(v); } // 1 3 5 7 11