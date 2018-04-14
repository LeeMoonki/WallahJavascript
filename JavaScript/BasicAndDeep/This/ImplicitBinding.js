// #2. Implicit Binding
function foo1() {
    console.log(this.a);
}

var obj = {
    a: 2,
    foo: foo1
};
obj.foo(); // 2

// 중요한 것은 obj가 선언한 함수 foo1를 foo에서 참조하느냐, foo를 obj에서 새로 선언하느냐가 아니다.
// 호출부( obj.foo() )가 obj의 context로 foo1()를 참조하므로 obj 객체는 함수 호출 시점에서
// 함수의 reference를 '소유'하거나 '포함'한다고 볼 수 있다.

// 다음처럼 객체 프로퍼티 참조가 체이닝(Chaining)된 형태라면 최상위/최하위 수준의 정보만 호출부와 연관된다.

var obj2 = {
    a: 42,
    foo: foo1
};

var obj3 = {
    a: 2,
    obj2: obj2
};

obj3.obj2.foo(); // 42

// 이해를 해보면 먼저 obj3의 obj2를 참조, obj2에서 foo를 참조. foo의 this는 최종적으로 참조한 obj2의 a를 가져온다.

// #암시적 소실
// 암시적으로 바인딩된 함수에서 바인딩이 소실되는 경우가 있다.

var bar = obj.foo; // 함수 레퍼런스 / 별명
var a = "It is global";

bar(); // It is global

// bar 는 obj의 foo를 참조하는 변수처럼 보이지만 사실은 foo를 직접 가리키는 또 다른 레퍼런스다.


// 콜백 함수를 전달하는 경우에는 좀 더 애매하게 실행된다.

function doFoo(fn) {
    // fn 은 foo의 또 다른 레퍼런스(별명)일 뿐이다.
    fn(); // 호출부
}

doFoo(obj.foo); // It is global

// setTimeout() 같은 내장 함수의 경우도 마찬가지다.