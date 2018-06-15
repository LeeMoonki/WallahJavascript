function delay(time, timeEnd) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time);
    });
}

// Promise.all() 의 arguments 들은 비동기로 처리되기 때문에 다음과 같이 실팽하면 8초가 걸리는 것이 아니라 약 5초가 소요된다

console.time("time check");

var pr_all = Promise.all([delay(5000), delay(1000), delay(2000)]);
pr_all.then(function(values) {
    
    console.log("all done");

    console.timeEnd("time check");
});