// 여기서 할 것은 비동기 코드가 동기식으로 실행되는 것을 한다

// 우선 함수가 실행되는 사이에 무언가를 할 수 있도록 함수로 한 번 감싸서 공간을 만든다.
// wrap에게 함수를 전달하여 함수를 반환 받으면 원래 기능을 유지하면서 코드 사이에 공간이 생긴다.

// like Proxy Pattern
function wrap(func) {
    
    return function() {

        // 새로운 공간이 생겨서 나중에 함수를 실행했을 때 이 부분을 거쳐감

        return func.apply(null, arguments);
    };
}

var add = wrap(function(a, b, callback) {
    setTimeout(function() {
        callback(a + b);
    }, 1000);
});

add(5, 10, function(r){
    console.log(r); // 15
});
