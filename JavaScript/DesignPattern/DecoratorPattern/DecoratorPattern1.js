// 함수에 추가 기능을 수행하기 위한 decorator 패턴을 적용
// 특히 proxy 패턴에서 살펴봤던 wrapper 기능을 decorator 패턴과
// 함께 사용하면, 해당 함수가 호출되기 전에 여러 가지 함수가
// 호출될 수 있도록 응용할 수 있다.

(function () {
    var monitorTool
        , car
        , wrapperFunction;
    
    monitorTool = (function () {
        var functionSequence = [];
        return {
            decorate: function (name, func) {
                functionSequence.push({
                    name: name,
                    func: func
                });
            },
            monitor: function (func) {
                var length = functionSequence.length
                    , i = 0;
                for (i = 0; i < length; i++) {
                    functionSequence[i].func.apply(this, arguments);
                }
            }
        };
    }());

    monitorTool.decorate("before", function (func) {
        console.log(func.name + " function has started at " + Date.now());
    });
    monitorTool.decorate("decorated", function (func) {
        func.apply(this, Array.prototype.slice(arguments, 1));
    });
    monitorTool.decorate("after", function (func) {
        console.log(func.name + " function has finished at " + Date.now());
    });
    wrapperFunction = monitorTool.monitor;

    car = {
        beep: function beep () {
            console.log("BEEP");
        },
        brake: function brake () {
            console.log("STOP!");
        },
        accelerator: function accelerator () {
            console.log("GO");
        }
    };

    // ProxyPattern2 ~ 2-2.js 참고
    function wrap(func, wrapper) {
        return function () {
            var args = [func].concat(Array.prototype.slice.call(arguments));
            return wrapper.apply(this, args);
        };
    }

    function wrapObject (obj, wrapper) {
        var prop;
        for (prop in obj) {
            if (obj.hasOwnProperty(prop) && typeof obj[prop] === "function") {
                obj[prop] = wrap(obj[prop], wrapper);
            }
        }
    }

    wrapObject(car, wrapperFunction);

    console.log("A. car.accelerator() monitor");
    car.accelerator();
    console.log("\nB. car.beep() monitor");
    car.beep();
    console.log("\nC. car.brake() monitor");
    car.brake();
}());