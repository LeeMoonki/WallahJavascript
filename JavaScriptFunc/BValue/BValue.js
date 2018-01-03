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
function bvalue(key) {
    return function(obj) {
        return obj[key];
    }
}

var result = bvalue("a")({a: "hi", b: "hello"});
console.log(result);