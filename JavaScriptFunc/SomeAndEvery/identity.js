// function
// filter
function filter(list, predicate) {
    var new_list = [];
    for (var i = 0, len = list.length; i < len; i++) {
        if (predicate(list[i])) {
            new_list.push(list[i]);
        }
    }
    return new_list;
}

// find
function find (list, predicate) {
    for (var i = 0, len = list.length; i < len; i++) {
        if (predicate(list[i])) { return list[i]; }
    }
}
// // function

// identity
function identity(v) {
    return v;
}

// 받은 인자를 그대로 내밷는 함수.
console.log(filter([true, 0, 10, 'a', false, null], identity)); // [true, 10, 'a']

// 이렇게 사용하면 결과는 truthy value이다.

// 다음처럼 응용도 가능하다.
// some은 배열에 들어있는 값 중 하나라도 truthy이면 true를 반환한다.
// every는 배열에 있는 모든 값이 truthy이어야 true를 반환한다.

// some
function some(list) {
    return !!find(list, identity);
}

// every
function every(list) {
    return filter(list, identity).length === list.length;
}

console.log("\n");
console.log(some([0, null, 2])); // true
console.log(some([0, null, false])); // false
console.log(every([0, null, 2])); // false
console.log(every([{}, true, 2])) // true