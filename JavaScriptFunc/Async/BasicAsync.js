// 기본적인 비동기 상황

console.log(1);
setTimeout(function (){
    console.log(3);
}, 1000);
console.log(2);

// 1
// 2
// 3

// 코드 라인 순서와 달리 1 2 3 이 출력되었다

var add = function(a, b, callback) {
    setTimeout(function() {
        callback(a + b);
    }, 1000);
};

// 콜백함수로 결과 받기
add(10, 5, function(r){
    // 새로 생성된 공간
    // add를 실행한 스코프 내부에서 add의 결과를 받을 수 있다
    console.log(r); // 15
});

