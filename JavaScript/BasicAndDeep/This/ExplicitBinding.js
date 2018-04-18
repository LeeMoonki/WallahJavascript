// #3. Explicit Binding
// 명시적 바인딩이란 call()과 apply() 메서드를 이용하여
// this에 바인딩 할 객체를 인자로 전달해 this를 세팅하는 것이다.

function foo1() {
    console.log(this.a);
}

var obj = {
    a: 2
};

foo1.call(obj); // 2

// call() 과 apply()의 차이는 인자 전달 방식이다.
// call(obj, arg1, arg2, ...)
// apply(obj, [arg1, arg2, ...])


// #Hard Binding

var bar = function() {
    foo1.call(obj);
};

bar(); // 2
setTimeout(bar, 100); // 2

var obj2 = {
    a: 30
};

bar.call(obj2); // 2

// 함수 bar()는 내부에서 foo1.call(obj)로 foo1을 호출하면서 obj를 this에 강제로 바인딩하도록 하드 코딩한다.
// 따라서 bar를 어떻게 호출하든 이 함수는 항상 obj를 바인딩 하여 foo를 실행한다.
// 이런 바인딩은 명시적이고 강력해서 '하드 바인딩(Hard Binding)'이라고 한다.

// 하드 바인딩으로 함수를 감싸는 형태의 코드는 인자를 넘기고 반환 값을 돌려받는 창구가 필요할 때 주로 쓰인다.

function foo2(something) {
    console.log(this.a, something);
    return this.a + something;
}

var bar2 = function () {
    return foo2.apply(obj, arguments);
};

var b = bar2(3); // 2 3
console.log(b); // 5


// 재사용 가능한 헬퍼(Helper) 함수를 쓰는 것도 같은 패턴이다.

function bind(fn, obj) {
    return function() {
        return fn.apply(obj, arguments);
    };
}

var boundFunc = bind(foo2, obj);

var c = boundFunc(3); // 2 3
console.log(c); // 5

// 내장된 bind() 함수도 다음과 같이 사용한다.

boundFunc = foo2.bind(obj);
var d = boundFunc(4); // 2 4
console.log(d); // 6


// #API Call Context

// 많은 라이브러리 함수와 자바스크리브 언어 및 호스트 환경에 내장된 여러 새로운 함수는 대개 콘텍스트(context)라 불리는 선택적인 인자를 제공한다.
// 이는 bind()를 써서 콜백 함수의 this를 지정할 수 없는 경우를 대비한 일종의 예비책이다.

// 예를 들어, 다음과 같은 함수는 편의상 내부적으로 call()이나 apply()로 명시적 바인딩을 대신해준다.

function cont(element) {
    console.log(element, this.id);
}

var obj3 = {
    id: "wallah"
};

// cont 호출시 obj3를 this로 사용한다.
[1, 2, 3].forEach(cont, obj3); // 1 'wallah' 2 'wallah' 3 'wallah'