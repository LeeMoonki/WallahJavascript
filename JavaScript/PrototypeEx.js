function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.getName = function () {
    return this.name;
};

Person.prototype.getAge = function () {
    return this.age;
};

var wallah = new Person("wallah", 30);
var stranger = new Person("stranger", 40);

console.log(wallah.getName());
console.log(stranger.getName());

// Person 의 prototype 에 함수를 새로 추가해도 생성된 객체들이 이를 공유한다.
Person.prototype.introduce = function () {
    console.log("Hi, my name is " + this.name + " and " + this.age + " year olds.");
};

wallah.introduce();
stranger.introduce();

// Person 의  prototype 에 변수도 추가하여 공유한다.
Person.prototype.gender = "male";

console.log(wallah.gender);

// 생성된 객체의 변수를 수정해도 부모 혹은 다른 자식의 값은 수정되지 않는다. 즉, 완전한 공유는 아니다
stranger.gender = "female"; // 사실 이 행동은 수정이 아니라 stranger 의 객체에 gender 를 추가하는 것이다

// stranger.gender = "female" 전 => stranger : Person {name: "stranger", age: 40}
// stranger.gender = "female" 후 => stranger : Person {name: "stranger", age: 40, gender: "female"}

console.log("Person's gender : " + Person.prototype.gender);
console.log("wallah's gender : " + wallah.gender);
console.log("stranger's gender : " + stranger.gender);

// 아래는 에러 발생

// wallah.prototype.getOlder = function (year) {
//     this.age = this.age + year;
// };

// wallah.prototype => undefined
// wallah.__proto__ === Person.prototype => true

