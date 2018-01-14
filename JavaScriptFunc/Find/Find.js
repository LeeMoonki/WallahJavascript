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

function User(id, name, age) {
    this.getId = function () { return id; }
    this.getName = function () { return name; }
    this.getAge = function () { return age; }
}

var users2 = [
    new User(1, "ID", 32),
    new User(2, "HA", 25),
    new User(3, "BJ", 41),
    new User(4, "PJ", 28),
    new User(5, "JE", 27),
    new User(6, "JM", 33),
    new User(7, "HI", 24)
];
// //data

// filter, map

function filter(list, predicate) {
    var new_list = [];
    for (var i = 0, len = list.length; i < len; i++) {
        if (predicate(list[i])) {
            new_list.push(list[i]);
        }
    }
    return new_list;
}

function map(list, iteratee) {
    var new_list = [];
    for (var i = 0, len = list.length; i < len; i++) {
        new_list.push(iteratee(list[i]));
    }
    return new_list;
}

// //filter, map


function findBy (key, list, val) {
    for (var i = 0, len = list.length; i < len; i++) {
        if (list[i][key] === val) { return list[i]; }
    }
}

console.log("user width ID 3 using findBy :", findBy("id", users, 3));


// 하지만 findBy는 다음과 같은 기능을 제공하지 않는다
//
// 1. key가 아닌 메서드를 통해 값을 얻어야 할 때
// 2. 두 가지 이상의 조건이 필요할 때
// 3. === 이 아닌 다른 조건으로 찾고자 할 때
// 다음을 살펴보자

console.log("user with Age 25 in users2 using findBy : ", findBy("age", users2, 25)); // undefined

// 따라서 filter나 map처럼, 인자로 key와 val 대신 함수를 사용해 보자

function find (list, predicate) {
    for (var i = 0, len = list.length; i < len; i++) {
        if (predicate(list[i])) { return list[i]; }
    }
}

console.log("\nuser's name whose age is 33 in users2 : ", 
            find(users2, function (user) { return user.getAge() === 33; }).getName()
        );

console.log("user whose id is 4 in users : ",
            find(users, function (user) { return user.id === 4; })
        );

console.log("use whose name have P in name : ", 
            find(users, function (user) { return user.name.indexOf("P") !== -1; })
        );

// 값 대신 함수를 받아서 if 안쪽에서 할 수 있는 일이 많아졌다.