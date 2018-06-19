// thenable 에서 error의 순서에 대한 처리 차이

// 에러가 결정 보다 앞에 있는 경우
var thenable = { then: function(resolve) {
    throw new Error("Throwing Error");
    resolve('Resolving');
} };

var pr_before = Promise.resolve(thenable);
pr_before.then(function(value) {
    // not called
}, function(error) {
    console.log(error); // Throwing Error
});

// 에러가 결정보다 뒤에 있는 경우
var thenable = { then: function(resolve) {
    resolve('Resolving');
    throw new Error("Throwing Error");
} };

var pr_after = Promise.resolve(thenable);
pr_after.then(function(value) {
    console.log(value); // Resolving
}, function(error) {
    // not called
}); 