// 출처 : JavaScript Promise, 한빛미디어, azu지음/주우영 옮김

// Promise 객체를 생성할 때 resolve, reject 호출을 설정해주지 않으면
// then에서 역시 호출하지 않는다.
var dependentpr = new Promise(function(resolve, reject) {
    
});
dependentpr.then(function() {
    console.log("dependent onFulfilled");
});

// 아래와 같은 Promise는
var beforeShortPr = new Promise(function(resolve, reject) {
    resolve(12);
});
beforeShortPr.then(function(data) {
    console.log(data);
});

// 다음과 같이 요약할 수 있다.
// Promise.resolve() 는 Fufilled 상태인 Promise 객체를 반환
Promise.resolve(24).then(function(data) {
    console.log(data);
});

// Promise.reject() 역시 같은 방법으로 사용할 수 있다.
// Promise.reject()는 상태가 Rejected 인 Promise 객체를 반환한다.