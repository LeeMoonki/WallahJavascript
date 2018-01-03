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

// 위 과정들의 리팩터링 대상은 바로 '중복'이다.
// temp_users에 값을 담는 부분에서 중복되는 for와 if문을 리팩터링한다.
// for -> filter, if -> predicate

// ages와 names에 값을 담는 과정도 리팩터링이 가능하다.
// 어떤 배열 내부 객체의 특정 key를 갖는 값들만 담으므로
// 배열.키 -> map