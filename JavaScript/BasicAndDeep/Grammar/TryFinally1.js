function foo() {
    try {
        return 30;
    }
    finally {
        // 여기에 return 이 없으면 이전 return 동작
    }
}

function bar() {
    try {
        return 30;
    }
    finally {
        // return 30 을 무시한다
        return;
    }
}

console.log(foo()); // 30 
console.log(bar()); // undefined