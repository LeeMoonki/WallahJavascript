(function () {
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
        func.apply(this, Array.prototype.slice.call(arguments, 1));
        // Array.prototype.slice([1, 2, 3], 1) -> []
        // Array.prototype.slice.call([1, 2, 3], 1) -> [2, 3]
    });

    // 위의 var rwappedFunction = wrap(...)... 는 다음과 같다
    // var wrappedFunction = function () {
    //     var args = [existingFunction].concat(Array.prototype.slice.call(arguments));

    //     console.log("wrap's args : ");
    //     console.log(args);

    //     return (function (args) {
    //         console.log("Wrapper function is called with arguments");
    //         console.log(arguments);
    //         existingFunction.apply(this, Array.prototype.slice.call(arguments, 1));
    //     });
    // }

    console.log("1. Calling existing function");
    existingFunction("First argument", "Second argument", "Third argument");

    console.log("\n2. Calling wrapped function");
    wrappedFunction("First argument", "Second argument", "Third argument");
}());