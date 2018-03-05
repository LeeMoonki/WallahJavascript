// 콘텍스트 규칙

function bar() { }

// a는 할당의 대상이므로 L-Value, { }는 할당의 원본(Source) 값이므로 R-Value라고 한다.
var a = {
    foo: bar()
};

{
    foo: bar()
}
// 여기에서 { }는 평범한 코드 블록이다. 
// 그리고 foo는 bar() 문의 레이블이다. 그리고 이러한 기능을 '레이블 문(label statement)'이라고 한다.

// 레이블 문을 통해 '레이블 점프(label jump)'라는 특별한 기능을 제공한다.

// 레이블 점프1 : 'foo' 레이블 루프
foo: for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        // 두 루프의 반복자가 같을 때마다 바깥쪽 루프를 continue 한다.
        if (i == j) {
            // 다음 순회시 'foo'붙은 루프로 점프한다. 
            continue foo; // 'foo'의 다음 루프를 진행한다.
        }

        // 홀수 배수는 건너뛴다.
        if ((j * i) % 2 == 1) {
            // 평범한 (레이블 없는), 안쪽 루프의 continue
            continue; // j 루프의 다음 루프를 진행한다
        }

        console.log(i, j);
    }
}

// 1 0
// 2 0
// 2 1
// 3 0
// 3 2

console.log("\n");
// 레이블 점프2 : 'poo' 레이블 루프
poo: for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        if ((i * j) >= 3) {
            console.log("멈추려고 하는 지점 : ", i, j);

            // break poo는 "poo"라는 레이블이 붙은 블록의 밖으로 나가 그 이후부터 계속하라"라는 뜻
            break poo;
        }

        console.log(i, j);
    }
}

// 0 0
// 0 1
// 0 2
// 0 3
// 1 0
// 1 1
// 1 2
// 멈추려고 하는 지점 : 1 3


// 레이블 루프/블록은 가능한 사용하지 않는 것이 좋다.