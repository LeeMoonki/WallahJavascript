function _async(func) {

    return function() {
        // arguments[arguments.length++] 처럼 넣어야
        // 1) 기존 인자를 건드리지 않고 마지막 자리에 callback 함수가 들어간다. length : 2
        // 2) 그리고 arguments.length의 값이 하나 늘어나면서 callbak 에 접근이 가능해진다. length : 3
        arguments[arguments.length++] = function(result) {
            
            _callback(result);
        };
        func.apply(null, arguments);

        var _callback;
        function _async_cb_receiver(callback) {
            _callback = callback;
        }
        return _async_cb_receiver;
    }
}

var add = _async(function(a, b, callback) {
    setTimeout(function() {
        callback(a + b);
    }, 1000);
});

add(20, 30)(function(r){
    console.log(r); // 50
});

// (function(r) { console.log(r); }) 이 arguments[arguments.length++] 에 들어가고
// func.apply(null, arguments); 에 의해
// add(20, 30, function (r) { console.log(r); }); 처럼 실행된다.

// 이렇게 함으로써 _async 함수는 콜백 패턴을 사용하는 비동기 함수를 받아
// 한 번 더 실행하여 결과를 받는 함수로 변경해 주는 함수가 되었다.
// 즉 다음과 같이 사용할 수 있다.

var sub = _async(function(a, b, callback){
    setTimeout(function() {
        callback(a - b)
    }, 1000);
});

var div = _async(function(a, b, callback){
    setTimeout(function() {
        callback(a / b);
    }, 1000);
});

add(10, 15)(function(a){
    sub(a , 5)(function(a){
        div(a, 10)(function(r){
            console.log(r); // 3초 후에 2가 찍힘
        });
    });
});