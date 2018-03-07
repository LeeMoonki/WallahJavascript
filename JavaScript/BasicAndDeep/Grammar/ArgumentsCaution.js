// arguments에 대해 조심해야할 사항!
function par(a) {
    a = 30;
    console.log(arguments[0]);
}

par(10); // 30
par(); // undefined

// 인자를 넘기면 arguments의 슬롯과 인자가 연결되면서 항상 같은 값이 할당되지만
// 인자 없이 호출하면 연결되지 않는다.

// 따라서 "인자와 이 인자에 해당하는 arguments 슬롯을 동시에 참조하지 마라"
// 다음처럼 안전하게 사용해야 한다.

function foo(a) {
    console.log(a + arguments[1]);
}

foo(10, 30); // 40