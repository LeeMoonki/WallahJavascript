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