(function () {

    // 함수를 객체로 관리하는 경우에는 일괄적으로 프락시 패턴을 적용해서
    // 추가적인 전처리 로직을 삽입할 수 있다.
    // 이러한 기능들은 디버깅이나 사용자의 행동 패턴 분석, 
    // 또는 라이브러리의 활용도를 통계적으로 분석하고자 할 때 활용할 수 있다.
    var car = {
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
    
    function wrap (func, wrapper) {
        return function () {
            var args = [func].concat(Array.prototype.slice.call(arguments));
            
            return wrapper.apply(this, args);
        };
    }

    function wrapObject (obj, wrapper) {
        // 래퍼를 활용한 로그 기록 구현

        // 일일이 래퍼를 사용하는 것도 방법이지만,
        // 모듈이나 객체의 속성으로 있는 함수를 호출하게 될 때는 수작업이 아니라
        // 자동으로 전체 함수에 대한 래퍼 함수를 설정할 수 있다.
        var prop;

        for (prop in obj) {
            // 아래의 if문은 아주 중요한 역할을 한다
            if (obj.hasOwnProperty(prop) && typeof obj[prop] === "function") {
                obj[prop] = wrap(obj[prop], wrapper);
            }
        }
    }

    wrapObject(car, function (func) {
        console.log(func.name + " has been invoked");

        func.apply(this, Array.prototype.slice.call(arguments, 1));
    });

    car.accelerator();
    car.beep();
    car.brake();
}());