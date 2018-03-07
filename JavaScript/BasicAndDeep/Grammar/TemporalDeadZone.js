// ES6 부터는 TDZ(Temporal Dead Zone)이 존재한다.
// TDZ는 아직 초기화를 하지 않아 변수를 찹조할 수 없는 코드 영역이다.

{
    // 블록 내부 시작라인부터 let a; 전까지가 a에 대한 TDZ
    // a = 2; // a is not defined
    let a;
}

// typeof 연산자는 선언되지 않은 변수 앞에 붙여도 오류는 나지 않는데
// TDZ 참조 시에는 이러한 안전장치가 없다.
{
    typeof a; // undefined
    // typeof b; // b is not defined
    let b;
}

// 함수 인자의 디폴트 값은 하나씩 좌측 -> 우측 순서로 let 선언을 한 것과 동일하게 처리된다.
// 따라서 모든 디폴트 값을 가진 인자들은 일단 무조건 TDZ에 속한다.

var b = 3;
function foo(a = 30, b = a + b + 5) {
    console.log(a, b);
}

// foo(); // b is not defined


// 함수의 디폴트 값은 함수에 인자를 넘기지 않거나 undefined를 전달했을 때 적용된다.

function bar(a = 40, b = a + 1) {
    console.log(a, b);
}

bar(); // 40 41
bar(undefined); // 40 41
bar(5); // 5 6
bar(void 0, 7); // 40 7
bar(null); // null 1

function poo(a = 30, b = a + 1) {
    console.log(arguments.length, a, b, arguments[0], arguments[1]);
}

poo(); // 0 30 31 undefined undefined
poo(10); // 1 10 11 10 undefined
poo(10, undefined); // 2 10 11 10 undefined
poo(10, null); // 2 10 null 10 null

// 아무런 인자도 넘기지 않으면 디폴트값은 a, b에 적용되지만 
// arguments 배열에는 원소가 없다.