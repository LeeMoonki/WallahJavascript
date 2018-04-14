// #4. New Binding

// new 는 생성자를 호출하는 함수이고 
// 생성자 함수 (Constructor Function)가 아니라 
// 함수를 생성하는 호출 (Construction Calls Of Functions)이라고 해야 한다.

// new 를 붙여 생성자 호출을 하면 다음과 같은 일들이 발생한다.
// 1. 새 객체가 만들어진다.
// 2. 새로 생성된 객체의 [[Prototype]]이 연결된다.
// 3. 새로 생성된 객체는 해당 함수 호출 시 this로 바인딩 된다.
// 4. 이 함수가 자신의 또 다른 객체를 반환하지 않는 한 new와 함께 호출된 함수는 자동으로 새로 생성된 객체를 반환한다.

function foo(a) {
    this.a = a;
}

var bar = new foo(2);
console.log(bar.a); // 2

// 앞에 new 를 붙여 foo()를 호출했고 새로 생성된 객체(bar)는 foo 호출 시
// this에 바인딩 된다. 따라서 결국 new 는 함수 호출 시 this를 새 객체와 바인딩 하는 방법이다.