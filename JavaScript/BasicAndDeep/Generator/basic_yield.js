function *baz(x) {
    var y = x * (yield);
    return y;
}

var it1 = baz(6); // baz 는 generator 이고 it1 은 iterator 이다. 
// 이렇게 iterator를 생성하는 것으로 제너레이터는 실행되지 않는다.
// 다음처럼 iterator를 동작시켜야 한다.
it1.next(); // baz를 시작
// yield 부분에서 baz의 실행을 멈추고, yield 표현식에 해당하는 결괏값을 호출부 코드에 요청한다
var res1 = it1.next(7).value; // 42
console.log(res1);

// -------------------------------------------------------------------------------------------------------------------

function *foo(x) {
    var y = x * (yield 'hello');
    return y;
}

var it2 = foo(6);

// it.next()의 의미는 *foo() generator 는 다음에 어떤 값을 줄건지를 묻는 것이다.
// 이에 대한 반환 값은 yield 'hello' 표현식이다.
// 즉, it2.next()는 iterator를 동작시키고, yield에서 멈추게 되며, yield의 표현식을 반환받게 된다.
// 위의 baz 는 yield 뒤에 값이 없기 때문에 it1.next()를 하게 되면 undefined가 반환된다
var res2 = it2.next().value; // hello
console.log(res2);

// 이렇게 하면 yield의 표현식 결괏값으로 7을 전달해 실행하도록 한다.
// 즉, var y = x * 7; 이 되도록하고 다음 멈춤까지 실행하도록 한다.
// 첫 yield 다음의 멈춤은 return 이다. 즉, 함수를 전부 실행하는 것이다.
// 만약 return 이 없다면 return undefined로 간주하고 undefined를 반환한다.
res2 = it2.next(7).value; // 42
console.log(res2);

// -------------------------------------------------------------------------------------------------------------------

function *bar(x) {
    var y = x * (yield 'hello');
    return y;
}

var it3 = bar(6);
var res3 = it3.next(7).value; // hello
console.log(res3);

// -------------------------------------------------------------------------------------------------------------------

function *poo(x) {
    var y = x * (yield);
}

var it4 = poo(6);
var res4 = it4.next().value; // undefined , yield 뒤에 값이 없기 때문
console.log(res4);
res4 = it4.next(7).value; // undefined , return 이 없기 때문
console.log(res4);