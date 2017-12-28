// 여러가지 상속 방법의 장단점을 확인

// #1
function Person () {
    this.name = "anonymous";
    this.age = 0;
    this.sayHello = function () {
        console.log("Hello, my name is " + this.name);
    };
}

function Wallah() {
    var obj = new Person();
    obj.name = "wallah";
    obj.age = 30;
    return obj;
}

var wallah = new Wallah();
wallah.sayHello();

console.log("wallah instanceof Wallah : " + (wallah instanceof Wallah));
console.log("wallah instanceof Person : " + (wallah instanceof Person));

// 이 방법은 wallah instanceof Wallah 의 값이 false로 떨어지면서 객체지향의 의미가 상실되는 듯 하다.

console.log("\n");

// #2

// person_a 변수를 객체로 생성
var person_a = {
    name: "anonymous",
    sayHello: function () {
        console.log("Hello, my name is " + this.name);
    }
};

function Wallah_A () {
    this.name = "wallah";
}

Wallah_A.prototype = person_a;
var wallah_a = new Wallah_A();
wallah_a.sayHello();
person_a.sayHello();
console.log("wallah_a instanceof Wallah_A : " + (wallah_a instanceof Wallah_A));

// 이 방법의 문제는 wallah_a 변수가 person_a 변수를 상속했다는 것을 
// wallah_a instanceof person_a 와 같은 코드로 확인할 수 없다는 것이다

console.log("\n");

// #3

function Person_B () {
    this.name = "anonymous";
    this.sayHello = function () {
        console.log("Hello, my name is " + this.name);
    };
}

function Wallah_B () {
    this.name= "wallah";
}
Wallah_B.prototype = new Person_B();

var wallah_b = new Wallah_B();
wallah_b.sayHello();

console.log("wallah_b instanceof Wallah_B : " + (wallah_b instanceof Wallah_B));
console.log("wallah_b instanceof Person_B : " + (wallah_b instanceof Person_B));

// 이런식으로 하면 Wallah_B의 인스턴스 wallah_b는 Wallah_B의 prototype을 참조하는 링크를 갖게되는데
// Wallah_B의 prototype은 new Person_B 를 통해 만들어져서 Wallah_B의 constructor가 Wallah_B가 아닌
// Person_B를 가리킨다. 즉, wallah_b의 constructor가 Wallah_B가 아닌 Person_B이다.

// 이렇게 constructor가 깨졌는데도 instanceof 의 연산결과가 모두 true가 나오는 것은
// 자바스크립트에서는 constructor가 아닌 prototype을 통해 상속 여부를 확인하기 때문이다.

// wallah_b.__proto__ 의 끝은 Person_B.prototype
// Wallah_B.prototype.__proto__ 의 끝은 Person_B.prototype

console.log(wallah_b.__proto__ === Wallah_B.prototype);
console.log(Wallah_B.prototype.__proto__ === Person_B.prototype);

console.log("\n");