var users = [
    { id: 1, name: "ID", age: 32 },
    { id: 2, name: "HA", age: 25 },
    { id: 3, name: "BJ", age: 41 },
    { id: 4, name: "PJ", age: 28 },
    { id: 5, name: "JE", age: 27 },
    { id: 6, name: "JM", age: 33 },
    { id: 7, name: "HI", age: 24 }
];

function filter(list, predicate) {
    var new_list = [];
    for (var i = 0, len = list.length; i < len; i++) {
        if (predicate(list[i])) {
            new_list.push(list[i]);
        }
    }
    return new_list;
}

var user_under_30 = filter(users, function (user) {
    return user.age < 30;
});

console.log(user_under_30);

var ages = [];
for (var i = 0, len = user_under_30.length; i < len; i++) {
    ages.push(user_under_30[i].age);
}
console.log(ages);

var user_over_30 = filter(users, function (user) {
    return user.age >= 30;
});

console.log(user_over_30);

var names = [];
for (var i = 0, len = user_over_30.length; i < len; i++) {
    names.push(user_over_30[i].name);
}
console.log(names);