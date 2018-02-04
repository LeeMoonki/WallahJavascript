// 변수에 적절한 타입의 값이 할당되지 않은 상태에서 
// .prototype을 디폴트 값으로 할당하는 것은 좋은 아이디어이다.

function isThisCool(vals, func, regex) {
    vals = vals || Array.prototype;
    func = func || Function.prototype;
    regex = regex || RegExp.prototype;

    return regex.test(
        vals.map(func).join("")
    );
}

// RegExp.tset(undefined) 는 에러를 발생시킨다
// console.log(isThisCool());

console.log(isThisCool(
    ['a', 'b', 'c'],
    function(v) { return v.toUpperCase(); },
    /D/
)); // false

// ES6 부터는 "vals = vals || 디폴트 값" 식의 구문 트릭은 더이상 필요 없다.
// 왜냐하면 함수 선언부에서 네이티브 구문을 통해 인자의 디폴트 값을 설정할 수 있기 때문이다.

// prototype으로 디폴트 값을 세팅하면 사소하지만 추가적인 이점이 있다.
// .prototype은 이미 생성되어 내장된 상태이므로 단 한번만 생성하면 된다.
// 그러나 [], function(){}, /(?:)/ 를 티폴트 값으로 사용하면 
// isThisCool()을 호출할 때마다 디폴트 값을 다시 생성하므로 그만큼 메모리 /CPU가 낭비된다.

// 그리고 이후에 변경될 디폴트 값으로 Array.prototype을 사용하는 일은
// 없도록 유의하여야 한다. 앞 예제에서 vals는 읽기 전용이지만
// vals 변수 자체를 수정하면 결국 Array.prototype 자체도 수정되어 
// 이미 앞에서 언급했던 함정에 빠지게 된다.