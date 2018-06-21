// Promise의 resolved value 는 (fulfill or reject) 하나 뿐이다.
// Promise에서 resolve(), reject() 를 호출할 때 인자는 하나만 넘길 수 있다.

Promise.resolve({
    then: function(resolve, reject) {
        resolve(1, 2, 3);
    }
}).then((value) => {
    console.log("plain argument1 : ", value); // 1
});

Promise.resolve({
    then: function(resolve, reject) {
        resolve(1, 2, 3);
    }
}).then((value1, value2) => {
    console.log("plain argument2 : ", value1, value2); // 1 undefined
});

// 따라서 여러개의 인자를 넘기고 싶다면 
// 배열 또는 객체로 싸서 넘겨줘야 한다.

Promise.resolve({
    then: function(resolve, reject) {
        resolve([ 1, 2, 3 ]);
    }
}).then((value) => {
    console.log("array argument : ", value); // [ 1, 2, 3 ]
});

Promise.resolve({
    then: function(resolve, reject) {
        resolve({ one: 1, two: 2, three: 3 });
    }
}).then((value) => {
    console.log("object argument : ", value); // { one: 1, two: 2, three: 3 }
});


// resolve 하는 value는 하나이기 때문에 
// 여러 값을 하나로 묶는 작업이 필요하다.
// 단, 전달하는 값 중에 비동기 작업이 존재한다면 이걸 또 Promise로 처리하고 다시 묶는 작업이 필요한데
// 다음 두 가지 방법이 있다.

// y는 x의 3배를 하는 작업
function getY(x) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() { resolve(3 * x); }, 100);
    });
}

// 1.

function foo1(a, b) {
    var x = a * b;

    return getY(x)
    .then(function(y) {
        return [ x, y ];
    });
}

foo1(10, 20)
.then(function(msgs) {
    var x = msgs[0];
    var y = msgs[1];
    console.log(x, y); // 200 600
});


// 2.

function foo2(a, b) {
    var x = a * b;

    return [
        Promise.resolve(x),
        getY(x)
    ];
}

Promise.all(foo2(10, 20))
.then(function(msgs) {
    var x = msgs[0];
    var y = msgs[1];
    console.log(x, y); // 200 600
});