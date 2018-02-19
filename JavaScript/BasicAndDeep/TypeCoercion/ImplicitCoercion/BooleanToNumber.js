// 불리언 -> 숫자

// onlyOne() 은 인자 중 정확히 하나만 true/truthy인지 아닌지를 확인하는 함수로 
// truthy 체크 시 암시적 강제변환을 하고 최종 반환 값을 포함한 다른 부분은 명시적 강제변환을 한다.

function onlyOne() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        // falsy 값은 건너뛴다.
        // 0으로 취급하는 셈이다. 그러나 NaN은 피해야 한다.
        if (arguments[i]) {
            sum = sum + arguments[i];
        }
    }
    return sum == 1;
}

var a = true;
var b = false;

console.log("1 : ", onlyOne(b, a));
console.log("2 : ", onlyOne(b, a, b, b));
console.log("2 : ", onlyOne(b, a, b, a, b));

// true/truthy를 숫자로 강제변환하면 1이므로 그냥 숫자를 모두 더한 것이 전부이고,
// sum = sum + arguments[i]에서 암시적 강제변환이 일어난다.

// 다음은 onlyOne의 명시적 강제변환 버전이다.

function onlyOne1() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        // !!arguments[i]로 인자 값을 true/false로 강제변환한다.
        sum = sum + Number(!!arguments[i]);
    }
    return sum === 1;
}