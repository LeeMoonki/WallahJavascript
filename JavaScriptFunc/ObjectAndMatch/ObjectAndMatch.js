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

// map
function map(list, iteratee) {
    var new_list = [];
    for (var i = 0, len = list.length; i < len; i++) {
        new_list.push(iteratee(list[i]));
    }
    return new_list;
}

// find
function find (list, predicate) {
    for (var i = 0, len = list.length; i < len; i++) {
        if (predicate(list[i])) { return list[i]; }
    }
}
// // functions

// 함수로 함수를 만들어 find 함수와 함께 사용하면 코드를 더 간결하게 만들 수 있다.

// bmatch1의 실행 결과는 함수다. key와 val을 미리 받아서 나중에 들어올 obj와 비교하는 익명 함수를 
// 클로저로 만들어 리턴한다.
function bmatch1 (key, val) {
    return function (obj) {
        return obj[key] === val;
    };
}

// bmatch1을 이용해 id, name, age를 비교하는 predicate 3개를 만들어 넘긴다.
// bmatch1은 함수를 리턴하기 때문에 filter나 map과도 조합이 가능하다.
console.log(find(users, bmatch1("id", 1)));
console.log(find(users, bmatch1("name", "HI")));
console.log(filter(users, bmatch1("age", 32)));
console.log(map(users, bmatch1("age", 32)));

// bmatch1은 하나의 key에 대한 value만 비교할 수 있다.
// 다음은 여러 개의 key에 해당하는 value들을 비교하는 함수들이다.

function object (key, val) {
    var obj = {};
    obj[key] = val;
    return obj;
}

function match (obj, obj2) {
    for (var key in obj2) {
        if (obj[key] !== obj2[key]) { return false; }
    }
    return true;
}

function bmatch (obj2, val) {
    if (arguments.length === 2) obj2 = object(obj2, val);
    return function (obj) { return match(obj, obj2); }
}

console.log(
    match(
        find(users, bmatch("id", 3)),
        find(users, bmatch("name", "BJ"))
    )
);

console.log(
    find(users, function (user) { return user.age === 32 && user.name === "ID"; })
);

console.log(
    find(users, bmatch({name: "ID", age: 32}))
);

console.log(
    find(users, bmatch({name: "ID", age: 32, id: 1}))
);

console.log(
    find(users, bmatch("id", 2))
);

// bmatch1을 bmatch로 발전시키면서 유용한 함수인 match와 object도 만들어졌다
// 이처럼 작은 기능을 하는 함수로 쪼개거나 재조합하는 식으로 코드를 발전시키는 것도 좋은 방법이다.