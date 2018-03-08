function _async(func) {

    return function() {
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