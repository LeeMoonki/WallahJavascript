// 함수를 값으로 다루는 것의 실용성

// addMaker
function addMaker(fixValue) {
    return function(value) {
        return fixValue + value;
    }
}

var fiveAdder = addMaker(5);
console.log(fiveAdder(8));

// bvalue 함수는 addMaker와 비슷한 구조다
// bvalue에 b를 붙인 이유는 인자를 미리 부분적으로 bind해 둔 함수를 만들고 있음을 간결하게 표현한 것이다.
function bvalue(key) {
    return function(obj) {
        return obj[key];
    }
}

var result = bvalue("a")({a: "hi", b: "hello"});
console.log(result);