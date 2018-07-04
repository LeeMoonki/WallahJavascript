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

// 여기에서 ajaxreq 는 ajax 호출 이후 프라미스를 반환한다.

// iterator가 promise로 할 수 있는 일은 다음과 같다.
// iterator는 promise가 resolve되기를 기다리고 있다가 generator를 resolve 메시지로 재개하든지
// 아니면 generator로 reject 사유로 채워진 에러를 던진다.

// 이걸 반영하면 다음과 같다.

function *main() {
    try {
        var result = yield ajaxreq('http://genpromise', 'get', { title: 'hellothere' });
        console.log('console.log in generator main : \n', result);
    } catch (error) {
        console.log(error);
    }
}

// generator 이면에서 값을 yield 하고 내보내는 건 구현 상세 로직이므로 어떤 일들이 일어나는지 관심가질 필요가 없다.

var it = main();

var p = it.next().value;

p
.then(function(value) {
    console.log('promise is resolved');
    it.next(value);
}, function(error) {
    console.log('promise is rejected');
    it.throw(error);
});