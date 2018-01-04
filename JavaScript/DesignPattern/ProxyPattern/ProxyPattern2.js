(function () {
    // wrap 은 wrapper를 통해 func을 실행하게 함으로써
    // 먼저 wrapper가 실행되고 (proxy역할)
    // 그 다음에 wrap된 func을 실행하도록 하는 것이다.

    // 첫 번째 인자는 기존 함수이고
    // 두 번째 인자는 기존 함수를 호출하기 전에 먼저 호출할 wrapper 함수이다.
    function wrap (func, wrapper) {
        return function () {
            var args = [func].concat(Array.prototype.slice.call(arguments));

            console.log("wrap's args : ");
            console.log(args);

            return wrapper.apply(this, args);
        };
    }

    function existingFunction () {
        console.log("Existring function is called with arguments");
        console.log(arguments);
    }

    var wrappedFunction = wrap(existingFunction, function (func) {
        // wrapper

        // wrap에서 wrapper에 보내는 매개변수는 
        // func, args 이다.
        // 여기에서 func은 wrap의 대상
        // 즉, 이 위치에서 func 은 existingFunction 이고, 
        // Array.prototype.slice.call(arguments, 1) 은 args 이다.

        console.log("Wrapper function is called with arguments");
        console.log(arguments);

        // 이 예에서는 로그를 찍고 기존 함수를 그대로 호출하지만,
        // 응용할 때는 wrapper 함수 안에서
        // 즉, 이 위치에서 현재 입력으로 들어오는 인자들의 조건에 따라서 
        // 기존 함수 호출 여부를 결정하면 된다.

        func.apply(this, Array.prototype.slice.call(arguments, 1));
        // Array.prototype.slice([1, 2, 3], 1) -> []
        // Array.prototype.slice.call([1, 2, 3], 1) -> [2, 3]
    });

    // 위의 var rwappedFunction = wrap(...)... 는 다음과 같다
    // var wrappedFunction = function () {
    //     var args = [existingFunction].concat(Array.prototype.slice.call(arguments));
    //
    //     console.log("wrap's args : ");
    //     console.log(args);
    //
    //     return (function (args) {
    //         // wrapper 함수
    //
    //         console.log("Wrapper function is called with arguments");
    //         console.log(arguments);
    //
    //         // 기존 함수
    //         existingFunction.apply(this, Array.prototype.slice.call(arguments, 1));
    //
    //         // 결과적으로 wrapper를 먼저 실행하고 기존함수를 실행한다.
    //     });
    // }

    console.log("1. Calling existing function");
    existingFunction("First argument", "Second argument", "Third argument");

    console.log("\n2. Calling wrapped function");
    wrappedFunction("First argument", "Second argument", "Third argument");

    // Result : 

    // 1. Calling existing function
    // Existring function is called with arguments
    // { '0': 'First argument',
    // '1': 'Second argument',
    // '2': 'Third argument' }

    // 2. Calling wrapped function
    // wrap's args :
    // [ [Function: existingFunction],
    // 'First argument',
    // 'Second argument',
    // 'Third argument' ]
    // Wrapper function is called with arguments
    // { '0': [Function: existingFunction],
    // '1': 'First argument',
    // '2': 'Second argument',
    // '3': 'Third argument' }
    // Existring function is called with arguments
    // { '0': 'First argument',
    // '1': 'Second argument',
    // '2': 'Third argument' }
}());