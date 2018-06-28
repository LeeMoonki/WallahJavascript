function *foo() {
    var x = yield 2;
    z++;
    var y = yield (x * z);
    console.log(x, y, z);
}

var z = 1;
var it1 = foo();
var it2 = foo();

var val1 = it1.next().value; // 2 , yield 2 의 2
var val2 = it2.next().value; // 2

val1 = it1.next(val2 * 10).value; // 40 , yield 2의 결과 값으로 val2 * 10을 주고, yield (x * z) 까지 진행하고 멈춘 후 x * z를 반환한다.
// 즉, x = val2 * 10 = 2 * 10 -> z++ -> yield (20 * 2) -> 여기까지 구하고 (20 * 2)를 val1에 반환

val2 = it2.next(val1 * 5).value; // 600

// y = val2 / 2 = 600 / 2 -> 다음 yield가 없으므로 함수를 끝까지 실행 -> console.log(20, 300, 3)
// z 가 3인 이유는 val2를 구하기위해 z++를 한 번 더 실행했기 때문
it1.next(val2 / 2); // 20 300 3
it2.next(val1 / 4); // 200 10 3