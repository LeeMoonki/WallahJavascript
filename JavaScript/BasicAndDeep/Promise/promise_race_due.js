// 만약 비동기 상황에서 결과를 기다리는 시간을 설정하고 싶다면 delay를 race와 함께 사용한다.

function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time);
    });
}

var $ = Object.create(null);
$.ajax = function(option) {
    setTimeout(function() { option.success(option.type + ' ' + option.url + '?title=' + option.data.title) }
    , 5000);
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

// 다음처럼 설정하면 ajax는 5초, delay는 3초 만에 수행되므로 delay만이 race에서 resolve 된다.
Promise.race([ 
    delay(3000).then(() => { console.log("delay"); return 1; }), 
    ajaxreq('/api/articles', 'get', { title: "HelloPromise!" }).then((value) => { console.log(value); return 2; }) 
])  
.then(function(value) {
    console.log(value);
});

// 주의사항은 promise_all_race.js 에서 볼 수 있는 것 처럼
// race에서 빠른 것만 resolve 한다고 해서 다른 것들을 자체적으로 resolve 하지 않는 것은 아니다.
// race에서만 제일 빠르게 완료된 것을 resolve 하지 
// 각각의 Promise 객체는 각자 자기만의 resolve를 수행한다.

// 따라서 위의 경우 race의 then은 delay를 통해 resolve 하지만
// delay와 ajax 모두 각각 resolve 하는 것을 알 수 있다.