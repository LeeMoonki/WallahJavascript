// generator는 값을 생성하는 일종의 공장이며, 이렇게 만들어진 값들은 
// iterator interface의 next() 를 호출하여 한 번에 하나씩 추출할 수 있다.

// 그러므로 무한 수열 생산기 something은 다음과 같이 구현할 수 있다.

function *something() {
    var nextVal;

    while (true) {
        if (nextVal === undefined) { nextVal = 1; }
        else { nextVal = (3 * nextVal) + 6; }
        yield nextVal;
    }
}

// 이렇게 만들면
// 1. 호출할 때마다 변수 상태값을 보존하기 위해 습관적으로 클로저 구문을 남발할 필요가 없다.
// 2. 개발자가 직접 이터레이터 인터페이스를 작성할 필요가 없으므로 단순할 뿐만 아니라 내용을 더 분명하게 한다.

for (var v of something()) {
    console.log(v);

    if (v > 500) { break; }
}
// 1 9 33 105 321 969


// generator_iterator1 의 something 처럼 for (var v of something()) 이 아니라 for (var v of something) 으로 호출하면 
// something is not iterable 이라는 에러가 뜬다.
// something 은 generator 이지 iterable이 아니므로 something() 을 호출해서 for ... of 루프가 순회할 생산기를 만들어야 한다.

// generator의 iterator에서 Symbol.iterator 함수가 있고 기본적으로 return this를 한다.
// 즉, generator도 iterator도 iterable 이다.