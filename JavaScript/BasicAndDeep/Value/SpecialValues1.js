// #값 아닌 값
// Undefined 타입의 값은 undefined 밖에 없다. 
// null 타입도 값은 null 뿐이다.
// 그래서 이 둘은 타입과 값이 항상 같다.

// #Undefined
// 느슨한 모드에서는 전역 스코프에서 undefined란 식별자에 값을 할당할 수 있다. (하면 안 된다)

// 즉, 다음이 가능
function foo () {
    undefined = 2; // 하지만 절대 하지 말자!
}
foo();

function bar () {
    "use strict";
    // strict 모드에서는  전역 스코프에서 undefined에 값을 할당할 수 없다.
    // undefined = 2; // Error!

    // 하지만 undefined라는 이름을 갖는 지역변수는 생성할 수 있다.
    var undefined = 2; // 하지만 절대 하지 말자!
    console.log("value of local variable 'undefined' : ", undefined);
}
bar();

// # void 연산자
// undefined는 내장 식별자로 값은 undefined지만, 이 값은 void 연산자로도 얻을 수 있다.
// 표현식 void 는 어떤 값이든 '무효로 만들어(void)' 항상 결과값을 undefined로 만든다. 
// 기존 값은 건드리지 않고 연산 후 값을 복구할 수 없다.

var a = 42;
console.log("\na : ", a);
console.log("void a : ", void a);
console.log("a : ", a);

// 관례에 따라 void만으로 undefined 값을 나타내려면 void 0이라고 쓴다.
// void 0, void 1, undefined 모두 같다.
console.log("\nvoid 0 === undefined : ", void 0 === undefined);

// void 연산자는 어떤 표현식의 결과값이 없다는 걸 확실히 밝혀야 할 때 유용하다.

var ready = false;

function doSomething () {
    if (!ready) {
        
        ready = true; // 이게 없으면 무한루프
        return void setTimeout(doSomething, 1000);
        // 보통 다음처럼 처리한다.
        // setTimeout(doSomething, 100);
        // return;
    }

    var result;
    // 별도 처리 수행
    result = "Hi";
    return result;
}

// 제대로 처리했나?
var b = doSomething();
if (b) {
    // 다음 작업 바로 실행
    console.log("\ndoSomething's result : ", b);
} else {
    console.log("\ndeSomething is faild : ", b);
}

// return; 은 undefined를 반환한다.
function poo () {
    return;
}
console.log("\nreturn;'s value : ", poo());

// 정리하면 void 연산자는 값이 존재하는 곳에서 그 값이 undefined가 되어야 좋은 경우에만 사용하도록 한다.