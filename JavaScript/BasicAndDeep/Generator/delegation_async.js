// generator_promise_run2.js 를 참고

function ajaxreq() {
    // ajax 요청을 하는 비동기 함수

}

function runc() { }


// -------------------------------------------------------------------------------------------------------------------

// 이렇게 Promise 로직을 숨김으로써 비동기 관련 부분을 감추고 세부적인 수정이 가능하며
// 상위 수준의 작업을 표현하기 좋다.

function abstraction(url1, url2) {
    return Promise.all([
        ajaxreq(url1),
        ajaxreq(url2)
    ]);
}

// 다음과 같이 흐름 제어가 많아지면 이 방법이 더욱 효과적이다.

// function abstraction(url1, url2) {
//     return Promise.all([
//         ajaxreq(url1),
//         ajaxreq(url2),
//         Promise.race([  ])
//     ]).then(function() {
//         // ...
//     });
// }

function *body() {
    var results = yield abstraction('http://url1', 'http://url2');

    var r1 = results[0];
    var r2 = results[1];

    var r3 = yield ajaxreq('http://url3');
    console.log(r3);
}

// -------------------------------------------------------------------------------------------------------------------

// 위의 코드는 run()을 활용해 다음과 같이 수정할 수 있다.

function *foo() {
    var r2 = yield ajaxreq();
    var r3 = yield ajaxreq();

    return r3;
}

function *bar() {
    var r1 = yield ajaxreq();

    // 'run()을 통해 *foo()에 위임'
    var r3 = yield run(foo);

    console.log(r3);
}

run(bar);


// -------------------------------------------------------------------------------------------------------------------

// run()에 의존적이지 않고, 위임을 사용하면 다음과 같이 바꿀 수 있다.
// 이 방법은 *yield 체계를 거쳐 직접 반환된다.

function *foo() {
    var r2 = yield ajaxreq();
    var r3 = yield ajaxreq();

    return r3;
}

function *bar() {
    var r1 = yield ajaxreq();

    var r3 = yield *foo();

    console.log(r3);
}

run(bar);