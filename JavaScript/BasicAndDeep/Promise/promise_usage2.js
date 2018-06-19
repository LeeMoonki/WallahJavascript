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