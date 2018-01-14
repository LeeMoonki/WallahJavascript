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
// // data

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


console.log(
    map(
        filter(users, function (user) { return user.age >= 30; }),
        function (user) { return user.name; }
    )
);

console.log(
    map(
        filter(users2, function (user) { return user.getAge() >= 30; }),
        function (user) { return user.getName(); }
    )
);