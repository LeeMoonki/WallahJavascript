function *foo() {
    console.log('*foo() 내부: ', yield 'B');
    console.log('*foo() 내부: ', yield 'C');
    return 'D';
}

function *bar() {
    console.log('*bar() 내부: ', yield 'A');
    console.log('*bar() 내부: ', yield *foo());
    console.log('*bar() 내부: ', yield 'E');
    return 'F';
}

var it = bar();
console.log('외부: ', it.next().value); // 외부: A
console.log('외부: ', it.next(1).value); // *bar() 내부: 1, 외부: B
console.log('외부: ', it.next(2).value); // *foo() 내부: 2, 외부: C
console.log('외부: ', it.next(3).value); // *foo() 내부: 3, *bar() 내부: D, 외부: E
console.log('외부: ', it.next(4).value); // *bar() 내부: 4, 외부: F
console.log('외부: ', it.next(5).value); // 외부: undefined


// 배열 양방향 메시지
console.log('------------------------------------------------------');

function *baz() {
    console.log('*baz() 내부: ', yield 'a');
    console.log('*baz() 내부: ', yield *[ 'b', 'c', 'd' ]);
    console.log('*baz() 내부: ', yield 'e');
    return 'f';
}

it = baz();

console.log('외부: ', it.next().value); // 외부: a
console.log('외부: ', it.next(1).value); // *baz() 내부: 1, 외부: b
console.log('외부: ', it.next(2).value); // 외부: c
console.log('외부: ', it.next(3).value); // 외부: d
console.log('외부: ', it.next(4).value); // *baz() 내부: undefined, 외부: e
console.log('외부: ', it.next(5).value); // *baz() 내부: 5, 외부: f
console.log('외부: ', it.next(6).value); // 외부: undefined


// 에러 양방향 메시지
console.log('------------------------------------------------------');

function *inerr() {
    try { yield 'B'; }
    catch (err) {
        console.log('*inerr() 에서 붙잡힌 에러: ', err);
    }
    yield 'C';
    throw 'D';
}

function *outerr() {
    yield 'A';
    try { yield *inerr(); }
    catch (err) {
        console.log('*outerr() 에서 붙잡힌 에러: ', err);
    }
    yield 'E';
    yield *err();

    yield 'G'; // 이 값을 받을 방법이 없다.
}

function *err() {
    throw 'F';
}

it = outerr();

console.log('외부: ', it.next().value); // 외부: A
console.log('외부: ', it.next(1).value); // 외부: B
console.log('외부: ', it.throw(2).value); // *inerr() 에서 붙잡힌 에러: 2, 외부: C
console.log('외부: ', it.next(3).value); // *outerr() 에서 붙잡힌 에러: D, 외부: E
try {
    console.log('외부: ', it.next(4).value);
} catch (error) {
    console.log('외부에서 붙잡힌 에러: ', error); // 외부에서 붙잡힌 에러: F
} 