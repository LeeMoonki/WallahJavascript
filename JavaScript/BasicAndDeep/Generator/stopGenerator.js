function *something() {
    try {
        var nextVal;
        while (true) {
            if (nextVal === undefined) { nextVal = 1; }
            else { nextVal = (3 * nextVal) + 6; }
            yield nextVal;
        }
    } finally {
        // 정리 코드
        console.log('정리 완료!');
    }
}

var it = something();

for (var v of it) {
    console.log(v);
    if (v > 500) {
        console.log(it.return("Hello Generator!")); // { value: 'Hello Generator!', done: true }
        console.log(it.return("Hello Generator!")); // { value: 'Hello Generator!', done: true }
        console.log(it.return("Hello Generator!").value); // Hello Generator!
    }
}

console.log(it.next()); // { value: undefined, done: true }

// it.return(argument).value 하면 
// 1. generator의 finally 로 넘어가 정리코드를 실행한다.
// 2. argument 값이 value가 되고 done은 true가 된다.
// 3. 그 이후 iterator는 done: true를 반환한다.