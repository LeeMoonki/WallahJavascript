var $ = Object.create(null);
$.ajax = function(option) {
    setTimeout(function() { option.success('error shooting', option.type + ' ' + option.url) }
    , 5000);
};

function genFoo(x, y) {
    $.ajax({
        url: 'http://some.url.1/?x=' + x + '&y=' + y,
        type: 'get',
        success: function(error, url) {
            if (error) {
                // *inside() 으로 에러를 던진다
                it_inside.throw(error); 
            } else {
                // 수신한 url 로 *inside()을 재개한다
                it_inside.next(url); 
            }
        }
    });
}

function *inside() {
    try {
        var text = yield genFoo(10, 20);
        console.log('inside text : ', text);
    } catch (error) {
        console.log('inside error : ', error);
    }
}

var it_inside = inside();
// 모두 시작한다
it_inside.next(); 


// genFoo 함수 내의 ajax는 비동기이므로 에러처리를 동기적으로 수행하는 것은 어려움이 있다.
// 하지만 generator를 사용해서 다음과 같이 it.throw(error); 를 실행하면

// if (error) {
//     // *inside() 으로 에러를 던진다
//     it.throw(error); 
// }

// main 의 catch에서 에러를 잡아낸다.

// 즉, generator의 yield-멈춤 기능은 비동기 함수 호출로부터 넘겨받은 값을 동기적인 형태로
// return하게 해줄 뿐만 아니라 비동기 함수 실행 중 발생한 에러를 동기적으로 
// catch할 수 있게도 해준다.

// -------------------------------------------------------------------------------------------------------------------

// inside() 처럼 에러를 안쪽으로 던질 수도 있지만 (try ... catch를 generator 내부에서 처리) 바깥으로 처리할 수도 있다.

function *outside() {
    var x = yield 'hello world';
    yield x.toLowerCase(); // throw error !
}
var it_outside = outside();
console.log(it_outside.next().value);
try {
    console.log(it_outside.next(72));
} catch (error) {
    console.log('outside error : ', error);
}

// 결과 
// hello world
// inside error : TypeError: x.toLowerCase is not a function

// -------------------------------------------------------------------------------------------------------------------

// generator에 던진 에러는 없지만 외부에서 it.throw()를 통해 에러를 던질 경우 별도 처리를 해야한다.

function *test() {
    var x = yield 'hello world~!';
    
    // 이 밑으로 실행되지 않는다
    console.log(x);
    console.log('was x shown up?');
}

var it_test = test();
console.log(it_test.next().value);

try {
    it_test.throw('what the..');
} catch (error) {
    console.log("test error : ", error);
}

// 순회가 끝났기 때문에 x에 값을 넣으려는 시도( it_test.next(82) )는 되지 않고 console.log(x) 등도 실행되지 않는다.
// 즉, var x = yield 'hello world~!' 에서 멈춰있는다.
console.log('are you okay? : ', it_test.next(82)); // { value: undefined, done: true }

//결과 
// hello world~!
// test error : what the..
// { value: undefined, done: true }