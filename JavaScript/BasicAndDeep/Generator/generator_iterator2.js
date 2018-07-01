// generator는 값을 생성하는 일종의 공장이며, 이렇게 만들어진 값들은 
// iterator interface의 next() 를 호출하여 한 번에 하나씩 추출할 수 있다.

// 그러므로 무한 수열 생산기 something은 다음과 같이 구현할 수 있다.

function *something() {
    var nextVal;

    return function() {
        while (true) {
            if (nextVal === undefined) { nextVal = 1; }
            else { nextVal = (3 * nextVal) + 6; }
            yield nextVal;
        }
    };
}