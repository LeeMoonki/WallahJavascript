// 필요 함수
// -------------------------------------------------------------------------------------------------------------------
var $ = Object.create(null);
$.ajax = function(option) {
    if (!option.time) { option.time = 5000; }

    // setTimeout(function() { option.success(option.type + ' ' + option.url + '?title=' + option.data.title); }
    // , option.time);

    setTimeout(function() { option.success(option.data.title); }
    , option.time);
};

function ajaxreq(url, type, data, timecounter) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: url,
            type: type,
            data: data,
            success: resolve,
            error: reject,
            time: timecounter
        });
    });
}

function run(gen) {
    var args = [].slice.call(arguments, 1), it;

    it = gen.apply(this, args);

    return Promise.resolve()
        .then(function handleNext(value) {
            var next = it.next(value);

            return (function handleResult(next) {
                if (next.done) {
                    return next.value;
                } else {
                    return Promise.resolve(next.value)
                        .then(
                            handleNext,
                            function handleErr(err) {
                                return Promise.resolve(
                                    it.throw(err)
                                )
                                .then(handleResult);
                            }
                        );
                }
            })(next);
        });
}
// -------------------------------------------------------------------------------------------------------------------

// 위임-재귀

function *foo(val) {
    if (val > 1) {
        val = yield *foo(val - 1);
        console.log(val);
    }
    return yield ajaxreq('http://recursive', 'get', { title: val }, 1000);
}

function *bar() {
    var r1 = yield *foo(3);
    console.log(r1);
}

run(bar);



