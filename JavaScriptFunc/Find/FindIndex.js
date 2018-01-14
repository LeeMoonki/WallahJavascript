// data
var users = [
    { id: 1, name: "ID", age: 32 },
    { id: 2, name: "HA", age: 25 },
    { id: 3, name: "BJ", age: 41 },
    { id: 4, name: "PJ", age: 28 },
    { id: 5, name: "JE", age: 27 },
    { id: 6, name: "JM", age: 33 },
    { id: 7, name: "HI", age: 24 }
];
// // data

// functions

// object
function object (key, val) {
    var obj = {};
    obj[key] = val;
    return obj;
}

// match
function match (obj, obj2) {
    for (var key in obj2) {
        if (obj[key] !== obj2[key]) { return false; }
    }
    return true;
}

// bmatch
function bmatch (obj2, val) {
    if (arguments.length === 2) obj2 = object(obj2, val);
    return function (obj) { return match(obj, obj2); }
}

// // functions

// find를 조금만 고치면 값 비교만 하는 Array.prototype.indexOf보다 활용도가 높은 
// findIndex를 만들 수 있다.

function findIndex(list, predicate) {
    for (var i = 0, len = list.length; i < len; i++) {
        if (predicate(list[i])) { return i; }
    }
    return -1;
}

console.log(
    findIndex(users, bmatch({name: "JM"}))
);

console.log(
    findIndex(users, bmatch({name: "ID", age: 32}))
);

console.log(
    findIndex(users, bmatch("name", "OK"))
);