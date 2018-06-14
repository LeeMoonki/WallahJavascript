// 출처 : JavaScript Promise, 한빛미디어, azu지음/주우영 옮김

// Promise의 세 가지 상태

// "unresolved" - Pending : 성공도 실패도 아닌 상태, promise 객체가 생성된 초기 상태
// "has-resolution" - Fulfilled : 성공(resolve)했을 때의 상태. onFulfilled가 호출된다.
// "has-rejected" - Rejected : 실패(reject)했을 때의 상태, onRejected가 호출된다.

var pr = new Promise(function(resolve, reject) {
    // unresolved / pending
});

pr.then(function() {
    // has-resolution / fulfilled
}, function() {
    // has-rejected / rejected
});

// Promise 객체 상태는 Pending 상태로 시작해 Fulfilled나 Rejected 상태가 되면 다시 변하지 않는다.
// 따라서 Fulfilled와 Rejected 상태를 묶어 Settled 상태라고 한다.