// promise_ajax와 promise_delay를 조합

function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time);
    });
}

var $ = Object.create(null);
$.ajax = function(option) {
    option.success(option.type + ' ' + option.url + '?title=' + option.data.title)
    //setTimeout(option.success(option.type + ' ' + option.url + '?title=' + option.data.title), 5000); --> 이 방법은 ajax를 delay 시키지 못함을 발견
    // 즉 resolve가 실행되면 setTimeout에도 불고하고 resolve 한다
};

function ajaxreq(url, type, data) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: url,
            type: type,
            data: data,
            success: resolve,
            error: reject
        });
    });
}

// Promise.all()은 arguments로 Promise 객체로 이루어진 배열을 받는다

var pr_all = Promise.all([delay(5000), ajaxreq('/api/articles', 'get', { title: "HelloPromise!" })]);
pr_all.then(function(values) {
    // values 에는 배열로 전달받은 Promise.all 의 arguments 들이 반환한 값들이 모인 배열이다

    console.log("\n\nall done");
    console.log("values : ", values);
});