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
// //data

// 회원 목록 중에 특정 조건을 가진 회원 한 명을 찾고 싶다.
// 그렇다면 먼저 다음과 같이 찾을 수 있다.

var user = filter(users, function (user) { return user.id === 3 })[0];
console.log("user with ID 3 : ", user);

// 위처럼 filter를 이용해 찾을 수 있지만 filter 함수는 무조건 list.length만큼 predicate가 실행되기 때문에 효율적이지 못하고
// 동일 조건에 값이 두 개 이상이라면 두 개 이상의 값을 찾는다. 따라서 다음과 같은 코드가 적절해보인다.

for (var i = 0, len = users.length; i < len; i++) {
    if (users[i].id === 3) {
        user = users[i];
        break;
    }
}

// 이제 이 코드를 함수로 만들어서 재사용이 가능하도록 만든다.
function findById(list, id) {
    for (var i = 0, len = list.length; i < len; i++) {
        if (list[i].id === id) { return list[i]; }
    }
}

console.log("user width ID 3 using findById : ", findById(users, 3));

// 이를 이용해여 다음과 같은 함수들도 만들 수 있다

function findByName (list, name) {
    for (var i = 0, len = list.length; i < len; i++) {
        if (list[i].name === name) { return list[i]; }
    }
}

function findByAge (list, age) {
    for (var i = 0, len = list.length; i < len; i++) {
        if (list[i].age === age) { return list[i]; }
    }
}

// 위 함수들 덕분에 for와 if 등이 감춰졌지만 findById, findByName, findByAge 사이에 중복이 있다.
// 즉, 함수형적이지 않다.
// 다음과 같이 인자를 하나 더 늘리면 중복을 제거할 수 있다

function findBy (key, list, val) {
    for (var i = 0, len = list.length; i < len; i++) {
        if (list[i][key] === val) { return list[i]; }
    }
}

console.log("user width ID 3 using findBy :", findBy("id", users, 3));