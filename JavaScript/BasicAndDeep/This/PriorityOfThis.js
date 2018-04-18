// #5. Priority

// 우선순위 순서
// 1. new 로 함수를 호출(new 바인딩) -> 새로 생성된 객체가 this다. ( var bar = new foo(); )
// 2. call과 apply로 함수를 호출했다면 -> 명시적으로 지정된 객체가 this다. ( var bar = foo.call(obj2); )
// 3. 함수를 콘텍스트(암시적 바인딩), 즉 객체를 소유 또는 포함하는 형태로 호출 했다면 -> 이 콘텍스트 객체가 this다. ( var bar = obj1.foo(); )
// 4. 그 외의 경우에 this는 기본값으로 세팅된다. (기본 바인딩) ( var bar = foo(); )

// #new, 명시적 바인딩 비교
// new가 명시적 바인딩보다 우선순위가 높다
function foo(something) {
    this.a = something;
}

var obj1 = {};

var bar = foo.bind(obj1); // bar 는 obj1에 하드 바인딩. new bar(3) 실행 후에도 obj1.a 값은 3으로 바뀌지 않는다.
bar(2);
console.log(obj1.a); // 2

var baz = new bar(3);
console.log(obj1.a); // 2
console.log(baz.a); // 3

console.log("----------");

// #new, 암시적 바인딩 비교
// new 가 암시적 바인딩보다 우선순위가 높다.
function foo1(something) {
    this.a = something;
}

var object1 = {
    foo1: foo1
};

var object2 = {};

object1.foo1(2);
console.log(object1.a); // 2

object1.foo1.call(object2, 3);
console.log(object2.a); // 3

var bar1 = new object1.foo1(4);

console.log(object1.a); // 2
console.log(bar1.a); // 4

console.log("----------");

// #암시적, 명시적 바인딩 비교
// 명시적 바인딩이 암시적 바인딩보다 우선순위가 높다

function func() {
    console.log(this.a);
}

var obj10 = { a: 2, func: func };
var obj20 = { a: 3, func: func };

obj10.func(); // 2 
obj20.func(); // 3

obj10.func.call(obj20); // 3
obj20.func.call(obj10); // 2