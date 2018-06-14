// 출처 : JavaScript Promise, 한빛미디어, azu지음/주우영 옮김

var pr = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve("Hello Promise!");
    }, 3000);
});

console.log("ready?");

// then : then(onFulfilled, onRejected)
pr.then(function(data) {
    console.log(data); // 1
}, function(error) {
    console.error(error);
});

setTimeout(function() {
    pr.then(function(data) {
        console.log(data + "!!"); // 2
    });
}, 2000);
setTimeout(function() {
    pr.then(function(data) {
        console.log(data + "!!!!"); // 3
    });
}, 5000);

// 에러 처리는 
// then(undefined, onRejected) 로 해도되고
// .catch(onRejected) 를 사용해도 된다

// var pr1 = new Promise(function(resolve, reject) {
//     reject(new Error("I'm Error"));
// });

// pr1.then(undefined, function(error) {
//     console.error(error);
// });

// pr1.catch(function(error) {
//     console.error(error);
// });