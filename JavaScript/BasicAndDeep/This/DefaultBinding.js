// browser에서 실행하는 것과 node 에서 실행하는 것은 다르다.
// 아래의 내용들은 browser에서 실행해보자

//  #1. Default Binding
function foo() {
    console.log(this.a);
}

var a = 2;

// foo 은 그대로 호출되면서 기본 바인딩이 적용된다.
// this == window
foo(); // 2