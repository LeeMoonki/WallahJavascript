// function
// find
function find (list, predicate) {
    for (var i = 0, len = list.length; i < len; i++) {
        if (predicate(list[i])) { return list[i]; }
    }
}

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
// // function


// 함수가 가능하면 한 가지 일만 하게끔 함수를 더 쪼개보자.

// positive
function positive(list) {
    return find(list, identity);
}

// negativeIndex
function negativeIndex(list) {
    return findIndex(list, not);
}

// some
function some(list) {
    return not(not(positive(list)));
}

// every
function every(list) {
    return beq(negativeIndex(list));
}