function foo() {
    try {
        return 30;
    }
    finally {
        console.log("Hello");
    }

    console.log("can not reach it");
}

console.log(foo());
// Hello
// 30

// try 절의 실행이 종료되면서 곧바로 finally 절로 넘어간다.
// 그 후 foo() 함수 전체의 실행이 끝나고 완료 값은 호출부 console.log() 문에 반환된다.

function bar() {
    try {
        throw 30;
    }
    finally {
        console.log("Hello");
    }

    console.log("can not reach it");
}

// console.log(bar());
// Hello
// Uncaught Exception: 30

function poo() {
    try {
        return 30;
    }
    finally {
        throw "oops";
    }

    console.log("can not reach it");
}

// console.log(poo());
// Uncaught Exception: "oops"

// 만약 finally 절에서 예외가 던져지면, 이전의 실행 결과는 모두 무시한다.

// continue나 break 같은 비선형 제어문 역시 return과 throw와 비슷하게 작동한다.
console.log("\n");

for (var i = 0; i < 10; i++) {
    try { continue; }
    finally { console.log(i); }
}
// 0 1 2 3 4 5 6 7 8 9