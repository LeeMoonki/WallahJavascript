// gen : generator
function run(gen) {
    var args = [].slice.call(arguments, 1), it;

    it = gen.apply(this, args); // 현재 컨텍스트에서 generator 초기화

    return Promise.resolve()
        .then(function handleNext(value) {
            var next = it.next(value); // generator 내부의 yield [value] 에서 [value]가 next로 전달된다. { value: [value], done: false/true }
                                       // 여기에서 [value] 는 주로 비동기 처리 결과인 Promise 객체이다.
            // 처음 실행한 경우 value 는 undefined 이다.
            // 다음부터 순회하여 실행한다면 전에 yield로 부터 받은 값이다. 이 값을 generator 내부로 전달한다.

            return (function handleResult(next) {
                if (next.done) {
                    // generator 실행이 끝났다면
                    return next.value; // 최종 반환 값
                } else {
                    // generator 실행이 끝나지 않았다면
                    return Promise.resolve(next.value)
                        .then(
                            // handleNext(next.value) 를 통해 var next = it.next(next.value) 를 실행한다.
                            // 밑의 코드에서 설명한 것 처럼, next.value로 promise 객체가 넘어오면 resolve 된 값이 fulFillment(value)의 value로 전달된다.
                            // 즉, next.value로 전달된 것은 promise 객체여도 handleNext(value)의 value에 전달되는 값은 resolve된 값이다.
                            handleNext,
                            // next.value, 즉 yield를 통해 받은 Promise 객체가 rejected 된 결과라면
                            // generator 가 내부에서 에러를 처리하도록 한다.
                            function handleErr(err) {
                                return Promise.resolve(
                                    it.throw(err)
                                )
                                .then(handleResult); // handleResult({ value: undefined, done: true })
                            }
                        );
                }
            })(next);
        });
}


// 위 코드를 이해하기 위한 코드들

// -------------------------------------------------------------------------------------------------------------------

function *gen1() {
    var val = yield '2';
    console.log('gen : ', val);
    var val1 = yield '3';
    console.log('gen : ', val1);
}
var it_gen1 = gen1();
console.log(it_gen1.next(9)); // { value: '2', done: false }
console.log(it_gen1.next(10)); // gen : 10, { value: 3, done: false }
console.log(it_gen1.next(11)); // gen : 11, { value: undefined, done: true }
console.log(it_gen1.next(12)); // { value: undefined, done: true }

// -------------------------------------------------------------------------------------------------------------------

function *throwerr() {
    try {
        var val = yield '2';
        console.log('throwerr1 : ', val);
    } catch (err) {
        console.log('throwerr2 : ', err);
    }
}

var it_err = throwerr();
console.log(it_err.next(100)); // { value: '2', done: false }
console.log(it_err.throw('shoot error')); // throwerr : shoot error, { value: undefined, done: true }
console.log(it_err.next(101)); // { value: undefined, done: true }
console.log(it_err.next(102)); // { value: undefined, done: true }

// -------------------------------------------------------------------------------------------------------------------

Promise.resolve(24)
    .then(function(value) { 
        console.log('promise shortcut : ', value); // promise shortcut : 24
     });

// -------------------------------------------------------------------------------------------------------------------

var pobj = Promise.resolve(12);
Promise.resolve(pobj)
.then(function(value) {
    console.log("value : " + value); // value : 12
});