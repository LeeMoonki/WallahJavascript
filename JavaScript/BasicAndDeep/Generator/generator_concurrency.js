// 필요 함수
// -------------------------------------------------------------------------------------------------------------------
var $ = Object.create(null);
$.ajax = function(option) {
    if (!option.time) { option.time = 5000; }

    setTimeout(function() { option.success(option.type + ' ' + option.url + '?title=' + option.data.title); }
    , option.time);

    // setTimeout(function() { option.success(option.data.title); }
    // , option.time);
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
// -------------------------------------------------------------------------------------------------------------------


// 제너레이터 동시성

// 상이한 2개의 ajax 응답 처리기를 데이터 통신 과정에서 경합 조건이 발생하지 않게 잘 조정하는 시나리오
// 예를 들어,

// function response(data) {
//     if (data.url === 'http://url.1') { res[0] = data; }
//     else if (data.url === 'http://url.2') { res[1] = data; }
// }

// 와 같이 ajax 응답을 res 배열에 구분해 넣는다.

var res = [];

function *reqData(url) {
    res.push(
        yield ajaxreq(url, 'get', { title: 'hi' }, 1000)
    );
}

var it1 = reqData('http://url1.co.kr');
var it2 = reqData('http://url2.co.kr');

var p1 = it1.next().value;
var p2 = it2.next().value;

p1
.then(function(data) {
    it1.next(data);
    return p2;
})
.then(function(data) {
    it2.next(data);
    console.log('res : ', res);
});


// -------------------------------------------------------------------------------------------------------------------

// 다음과 같이 개선할 수 있다.
// 위 예에서는 첫 번째 generator 인스턴스가 끝난 다음에 두 번째 인스턴스에 데이터를 넘겼지만
// 이번 개선 버전은 두 인스턴스가 동시에, 독립적으로 실행된다

var res1 = [];

function *reqData1(url) {
    var data = yield ajaxreq(url, 'get', { title: 'hi' }, 2000);

    yield; // Promise.all 에 제어권을 넘긴다. 즉, 외부로 제어권을 넘긴다.

    res1.push(data);
}

var it11 = reqData1('http://url11.co.kr');
var it22 = reqData1('http://url22.co.kr');

var p11 = it11.next().value;
var p22 = it22.next().value;

p11.then(function(data) {
    it11.next(data);
});

p22.then(function(data) {
    it22.next(data);
})

Promise.all([ p11, p22 ])
.then(function() {
    // 넘긴 제어권을 통해 res1에 값을 push 한다.
    it11.next();
    it22.next();
    console.log('res1 : ', res1);
});