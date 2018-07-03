var $ = Object.create(null);
$.ajax = function(option) {
    setTimeout(function() { option.success(undefined, option.type + ' ' + option.url) }
    , 5000);
};

// -------------------------------------------------------------------------------------------------------------------

function foo(x, y, cb) {
    $.ajax({
        url: 'http://some.url.1/?x=' + x + '&y=' + y,
        type: 'get',
        success: cb
    });
}

foo(1, 2, function(error, url) {
    if (error) {
        console.log('error : ', error);
    } else {
        console.log('url : ', url);
        console.log('callback is called'); 
    }
});

// 이 콜백방식에서는 동기/순차적 처리는 없다. 
// 항상 비동기성을 염두해두어야 한다.

// -------------------------------------------------------------------------------------------------------------------

// 이 코드의 흐름을 제너레이터를 사용하면 다음과 같이 된다

function genFoo(x, y) {
    $.ajax({
        url: 'http://some.url.1/?x=' + x + '&y=' + y,
        type: 'get',
        success: function(error, url) {
            if (error) {
                // *main() 으로 에러를 던진다
                it.throw(error);
            } else {
                // 수신한 url 로 *main()을 재개한다
                it.next(url); // 2) text에 url 전달. 즉, yield genFoo(10, 20) 이 url 로 바뀌면서 var text = url 이 된다.
            }
        }
    });
}

function *main() {
    try {
        var text = yield genFoo(10, 20); // 여기에서 yield는 메시지 전달 수단이 아닌 멈춤/중단을 위한 흐름제어 수단이다
        console.log('main text : ', text);
    } catch (error) {
        console.log('main error : ', error);
    }
}

var it = main();
// 모두 시작한다
it.next(); // 1) genFoo(10, 20) 실행, 즉 비동기 함수를 실행한다. genFoo의 반환값이 없으므로 yield undefined 이다. 이 it.next()는 undefined 메시지를 전달받는다.

// 이렇게 처리를 하면 main 함수에서 genFoo 의 결과를 text로 받아 console.log 를 실행하는 것 처럼
// 비동기를 동기/순차적 처리가 가능하다