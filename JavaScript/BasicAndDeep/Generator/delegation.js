function *foo() {
    console.log('*foo() 시작');
    yield 3;
    yield 4;
    console.log('*foo() 종료');
}

function *bar() {
    yield 1;
    yield 2;
    yield *foo();
    yield 5;
}

var it = bar();
console.log(it.next()); // { value: 1, done: false }
console.log(it.next()); // { value: 2, done: false }
console.log(it.next()); // *foo() 시작, { value: 3, done: false }
console.log(it.next()); // { value: 4, done: false }
console.log(it.next()); // *foo() 종료, { value: 5, done: false }
console.log(it.next()); // { value: undefined, done: true }

// yield * 가 내어주는 건 iterator 제어권이지 generator 제어권이 아니다.
// *foo() generator를 시작할 때 이미 iterator에 yield-delegation 을 하기 때문이다.
// yield-delegation은 다음과 같이 모든 iterable에 가능하다.

function *baz() {
    yield 1;
    yield 2;
    yield *[ 3, 4 ];
    yield 5;
}

var here = baz();
console.log(here.next()); // { value: 1, done: false }
console.log(here.next()); // { value: 2, done: false }
console.log(here.next()); // { value: 3, done: false }
console.log(here.next()); // { value: 4, done: false }
console.log(here.next()); // { value: 5, done: false }
console.log(here.next()); // { value: undefined, done: true }