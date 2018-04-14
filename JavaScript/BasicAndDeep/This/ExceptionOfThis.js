// 바인딩의 예외

// #this 무시
// call, apply, bind 메서드에 첫 번째 인자로 null 또는 undefined를 넘기면
// this 바인딩이 무시되고 default 바인딩이 적용된다.

function foo() {
    console.log(this.a);
}

var a = 2;
foo.call(null); // 2

// 이렇게 사용하는 대표적인 경우는 
// 1. apply()로 함수호출 시 다수의 잉ㄴ자를 배열 값으로 펼쳐 보내는 용도로 자주 쓰인다.
// 2. bind() 는 인자들을 커링하는 메서드로 많이 사용한다.

function boo(a, b) {  
    console.log("a: " + a + ", b: " + b);
}

// 인자들을 펼친다.
boo.apply(null, [2, 3]); // a: 2, b: 3

// bind로 커링한다.
var bar = boo.bind(null, 2);
bar(3); // a: 2, b: 3


// 더 안전한 this
// 더 안전하게 이러한 방식을 사용하고 싶다면 DMZ Object (DMZ 객체)를 사용하는게 좋다.
// (내용이 하나도 없으면서 전혀 위임되지 않은(Nondelegated) 객체)
// this 바인딩을 신경 쓰지 않고 싶을 때마다 이 DMZ 객체를 전달하면, 받는 쪽에서 this를 어찌 사용하든지
// 어차피 대상은 빈 객체로 한정되므로 최소한 전역 객체를 건드리는 부작용은 방지할 수 있다.

var ø = Object.create(null); // DMZ 객체 생성

// 인자들을 펼친다.
boo.apply(ø, [2, 3]); // a: 2, b: 3

// bind로 커링한다.
bar = boo.bind(ø, 2);
bar(3); // a: 2, b: 3