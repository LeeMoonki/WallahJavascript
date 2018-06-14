// 출처 : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve

// The Promise.resolve(value) method returns a Promise object that is resolved with the given value. 
// If the value is a promise, that promise is returned; if the value is a thenable (i.e. has a "then" method), 
// the returned promise will "follow" that thenable, adopting its eventual state; 
// otherwise the returned promise will be fulfilled with the value.

// Promise.resolve(value) 메서드는 주어진 value로 결정된 Promise 객체를 반환한다.
// 만약 value가 반환된 promise 이거나 또는 thenable(즉 then 메서드를 갖고있는)이면 
// Promise.resolve(value)를 통해 반환된 promise는 최종 상태를 채택한 thenable을 따른다.
// 그렇지 않다면 반환된 promise는 value와 함께 이행(fulfilled)된다.

// Syntax
// Promise.resolve(value);
// Promise.resolve(promise);
// Promise.resolve(thenable);

// value : Argument to be resolved by this 'Promise'. Can also be a 'Promise' or a 'thenable' to resolve
// Return value : A 'Promise' that is resolved with the given value, or the promise passed as value, if the value was a promise object.

// argument가 value인 경우 : 정적인 Promise.resolve 메서드의 사용
var pr = Promise.resolve("Hello thenable!!");
pr.then(function(data) {
    console.log(data); // Hello thenable
});

// argument가 Promise인 경우
var original = Promise.resolve(12);
var cast = Promise.resolve(original);
cast.then(function(value) {
    console.log("value : " + value); // value : 12
});
console.log("original === cast : " + (original === cast)); // original === cast

// argument가 thenable인 경우

var p = Promise.resolve({
    then: function(resolve, reject) { resolve("fulfilled!"); }
});
console.log(p instanceof Promise); // true

p.then(function(value) {
    console.log(value); // fulfilled!
}, function(error) {
    // not called
});


// thenable 에서 error의 순서에 대한 처리 차이

// 에러가 결정 보다 앞에 있는 경우
var thenable = { then: function(resolve) {
    throw new Error("Throwing Error");
    resolve('Resolving');
} };

var pr_before = Promise.resolve(thenable);
pr_before.then(function(value) {
    // not called
}, function(error) {
    console.log(error); // Throwing Error
});

// 에러가 결정보다 뒤에 있는 경우
var thenable = { then: function(resolve) {
    resolve('Resolving');
    throw new Error("Throwing Error");
} };

var pr_after = Promise.resolve(thenable);
pr_after.then(function(value) {
    console.log(value); // Resolving
}, function(error) {
    // not called
}); 