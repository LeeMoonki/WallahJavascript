// 객체가 then 메서드를 갖고있다면 thenable 이다.
// 따라서 다음도 thenable이다.
console.log('-------------------------------------');


var isthenable = {
    then: function(cb) {
        cb(12);
    }
};
isthenable
.then(function fulfilled(value) { console.log(value); });

// 잘 동작하는 것 같지만 다음과 같이 변하면 우리가 기대하는 것과 다르다는 것을 알 수 있다.

// 1. rejected가 실행되면 안 되는데 실행된다
var isthenable = {
    then: function(cb, errcb) {
        cb(24);
        errcb('error!');
    }
};
isthenable
.then(function fulfilled(value) { console.log(value); }, function rejected(error) { console.log(error); });
// => 24, error!

// 2. Promise 객체처럼 사용할 수 없다
try {
    var isthenable = {
        then: function(cb, errcb) {
            cb(36);
            errcb('error!');
        }
    };
    isthenable
    .then(function(value) { console.log(value); })
    .catch(function(error) { console.log(error); });
} catch (e) {
    console.log("do not work");
    console.log(e);
}
// => 24, do not work, TypeError: errcb is not a function

// 이 때 Promise.resolve() 를 사용하면 
// thenable을 인자로 받아 Promise 객체를 반환한다. 정상 동작하지 않던 isthenable을 Promise.resolve()를 통해 Promise 객체로 만들어본다.

var isthenable = {
    then: function(cb, errcb) {
        cb(1234);
        errcb('error!');
    }
};
Promise.resolve(isthenable)
.then(function(value) { console.log(value); })
.catch(function(error) { console.log(error); });

// => 1234가 정상적으로 출력되고 밑에 있는 다른 Promise 들과 섞여서 결과가 나온다. 즉 비동기로 호출된다.

console.log('-------------------------------------');

// ---------------- Promise.resolve() ----------------
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

// # argument가 value인 경우 : 정적인 Promise.resolve 메서드의 사용
var pr = Promise.resolve("Hello thenable!!");
pr.then(function(data) {
    console.log(data); // Hello thenable
});

// # argument가 Promise인 경우
var original = Promise.resolve(12);
var cast = Promise.resolve(original);
cast.then(function(value) {
    console.log("value : " + value); // value : 12
});
console.log("original === cast : " + (original === cast)); // original === cast

// # argument가 thenable인 경우
var p = Promise.resolve({
    then: function(resolve, reject) { resolve("fulfilled!"); }
});
console.log(p instanceof Promise); // true

p.then(function(value) {
    console.log(value); // fulfilled!
}, function(error) {
    // not called
});