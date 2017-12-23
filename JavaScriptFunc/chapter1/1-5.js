var users = [
    { id: 1, name: "ID", age: 32 },
    { id: 2, name: "HA", age: 25 },
    { id: 3, name: "BJ", age: 41 },
    { id: 4, name: "PJ", age: 28 },
    { id: 5, name: "JE", age: 27 },
    { id: 6, name: "JM", age: 33 },
    { id: 7, name: "HI", age: 24 }
];

var temp_users = [];
for (var i = 0, len = users.length; i < len; i++) {
    if (users[i].age < 30)
        temp_users.push(users[i]);
}
console.log(temp_users.length);

var ages = [];
for (var i = 0, len = temp_users.length; i < len; i++) {
    ages.push(temp_users[i].age);
}
console.log(ages);

var temp_users = [];
for (var i = 0, len = users.length; i < len; i++) {
    if (users[i].age >= 30)
        temp_users.push(users[i]);
}
console.log(temp_users.length);

var names = [];
for (var i = 0, len = temp_users.length; i < len; i++) {
    names.push(temp_users[i].name);
}
console.log(names);
