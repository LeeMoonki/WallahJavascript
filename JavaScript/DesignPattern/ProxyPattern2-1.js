(function () {
    function wrap (func, wrapper) {
        return function () {
            var args = [func].concat(Array.prototype.slice.call(arguments));
            
            return wrapper.apply(this, args);
        };
    }

    function existingFunction () {
        console.log("Existring function is called with arguments");
        console.log(arguments);
    }

    // 비슷하게 호출되는 소스를 수정하고 싶지 않을 때는 정의된 함수 위에
    // 같은 이름의 변수를 할당해서 사용하는 방법도 있다.
    // 다음처럼 기존 함수 위에 기존 함수를 다른 변수에 백업해두고 (_existingFunction)
    // 같은 이름의 변수명을 정의하면 변수 접근 우선순위에 따라서 변수에 먼저 접근해서 사용한다.
    var _existingFunction = existingFunction
        , existingFunction = wrap(existingFunction, function (func) {
            console.log("Wrapper function is called with arguments");
            console.log(arguments);
    
            func.apply(this, Array.prototype.slice.call(arguments, 1));
        });

    console.log("1. Calling existing function(_existingFunction)");
    _existingFunction("First argument", "Second argument", "Third argument");

    console.log("\n2. Calling wrapped function(existingFunction)");
    existingFunction("First argument", "Second argument", "Third argument");

}());