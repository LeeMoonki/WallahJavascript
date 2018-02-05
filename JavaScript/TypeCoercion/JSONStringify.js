// 대부분 단순 값들은 직렬화 결과가 반드시 문자열이라는 점을 제외하고는, JSON 문자열화나
// toString() 변환이나 기본적으로 같은 로직이다.

console.log("JSON.stringify(30) : ", JSON.stringify(30)); // "30"
console.log('JSON.stringify("30") : ', JSON.stringify("30")); // ""30""
console.log("JSON.stringify(null) : ", JSON.stringify(null)); // "null"
console.log("JSON.stringify(true) : ", JSON.stringify(true)); // "true"

// JSON 안전 값(JSON-Safe-Value)(JSON 표현형;Representation 으로 확실히 나타낼 수 있는 값)은 모두
// JSON.stringigy()로 문자열화할 수 있다.

// JSON 안전 값이 아닌 것들을 반대로 따져보자.
// 예 : undefined, 함수, Symbol, 환형 참조(Circular Reference)객체
// 이들은 모두 다른 언어로 이식하여 JSON 값으로 쓸 수 없는, 표준 JSON 규격을 벗어난 값이다.

// JSON.stringify()는 인자가 undefined, 함수, Symbol 값이면 자동으로 누락시키며 
// 이런 값들이 만약 배열에 포함되어 있으면 null로 바꾼다.
// 만약 이런 값들이 객체 프로퍼티에 있으면 지워버린다.

console.log("\n");
console.log("JSON.stringify(undefined) : ", JSON.stringify(undefined)); // undefined
console.log("JSON.stringify(function () {}) : ", JSON.stringify(function () {})); // undefined

console.log("JSON.stringify([1, undefined, function(){}, 4]) : ", 
            JSON.stringify([1, undefined, function(){}, 4])); // "[1,null,null,4]"

console.log("JSON.stringify({ a: 2, b: function(){} }) : ", 
            JSON.stringify({ a: 2, b: function(){} })); // "{"a":2}"

// 혹시라도 JSON.stringify()에 환형 참조 객체를 넘기면 에러가 발생한다.
// 객체 자체에 toJSON() 메서드가 정으되어 있다면, 먼저 이 메서드를 호출하여 직렬화한 값을 반환한다.
// 따라서 부적절한 JSON 값이나 직렬화하기 곤란한 객체 값을 문자열화하려면 toJSON() 메서드를 따로 정의해야 한다.

var o = {};

var a = {
    b: 42,
    c: o,
    d: function () {}
};

// 'a'를 환형 참조 객체로 만든다
o.e = a;

// 다음처럼 환형 참조 객체는 JSON 문자열화 시 에러가 난다
// JSON.stringify(a); // TypeError: Converting circular structure to JSON

// JSON 값으로 직렬화하는 함수를 따로 정의한다.
a.toJSON = function () {
    // 직렬화에 프로퍼티 'b'만 포함시킨다.
    return { b: this.b };
};

console.log("JSON.stringify(a) : ", JSON.stringify(a));