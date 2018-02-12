// function
// findIndex
function findIndex(list, predicate) {
    for (var i = 0, len = list.length; i < len; i++) {
        if (predicate(list[i])) { return i; }
    }
    return -1;
}

// identity
function identity(v) {
    return v;
}
// // function


// not
function not(v) {
    return !v;
}

// beq
function beq(a) {
    return function(b) {
        return a === b;
    }
}

// 이제 some과 every를 개선해보자

function some(list) {
    return !!find(list, identity);
}

function every(list) {
    return beq(-1)(findIndex(list, not));
}

// 이제 every는 falsy 한 값이 하나라도 있으면 false를, 모두 truthy면 true를 반환한다.
// 여기서 not은 연산자 !가 아닌 함수이기 때문에 findIndex와 함께 사용할 수 있다.