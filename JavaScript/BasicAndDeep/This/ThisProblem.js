// this에 대한 잘못된 오해 예제
// this는 함수 내부에서 자기참조를 의미하지 않는다.

function foo (num) {
    console.log("foo : " + num);
    // foo 가 몇 번 호출됐는지 추적한다.
    this.count++;
}

foo.count = 0;
for (var i = 0; i < 10; i++) {
    foo(i);
}

console.log(foo.count);
console.log(count);

// this는 foo 라는 함수 객체를 바라보는 것이 아니다.
// count는 현재 전역 스코프에 있다.
// foo는 전역 객체에 의해 실행되고( foo(i), 즉 foo 내부의 this는 전역 스코프를 가리킨다 ) 
// 전역에는 count가 없는 상태에서 this.count++가 되므로 undefined에 ++ 연산이 되며 이는 NaN이다.
