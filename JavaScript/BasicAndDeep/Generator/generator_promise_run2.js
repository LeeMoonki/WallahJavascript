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
            console.log('value: ',value);
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

function *main() {
    var p1 = ajaxreq('http://genpromise', 'get', { title: 'p1' }, 3000);
    var p2 = ajaxreq('http://genpromise', 'get', { title: 'p2' }, 5000);

    console.time('timestamp');
    console.time('timestamp1');
    var r1 = yield p1;
    console.timeEnd('timestamp1');
    console.time('timestamp2');
    var r2 = yield p2;
    
    console.log(r1 + '\n' + r2);
    console.timeEnd('timestamp2');

    var r3 = yield ajaxreq('http://genpromise', 'get', { title: 'p3' }, 5000);

    console.log(r3);
    console.timeEnd('timestamp');

    console.log('##################################################');
}

// 다음과 같이 Promise.all 을 사용해도 된다.
function *main1() {

    var results = yield Promise.all([
        ajaxreq('http://genpromise', 'get', { title: 'p100' }, 100),
        ajaxreq('http://genpromise', 'get', { title: 'p200' }, 12000)
    ]);

    var r1 = results[0];
    var r2 = results[1];
    
    console.log(r1 + '\n' + r2);

    var r3 = yield ajaxreq('http://genpromise', 'get', { title: 'p300' }, 100);

    console.log(r3);
}

run(main);
run(main1);