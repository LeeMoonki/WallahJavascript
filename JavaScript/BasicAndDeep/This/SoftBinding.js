// browser에서 사용

if (!Function.prototype.softBind) {
    Function.prototype.softBind = function(obj) {
        var fn = this;
        var curried = [].slice.call(arguments, 1); // 커링된 인자는 죄다 포착한다.
        var bound = function() {
            // 호출 시점에 this를 체크하여 전역 객체나 undefined일 경우 미리 준비한 기본 객체(obj)로 세팅.
            // 그 이외의 경우에는 손대지 않는다.
            // 그리고 커링 기능도 넣는다.
            return fn.apply(
                (!this || this === (window || global)) ? obj : this,
                curried.concat.apply(curried, arguments)
            );
        };
        bound.prototype = Object.create(fn.prototype);
        return bound;
    };
}

function foo() {
    console.log("name : " + this.name);
}

var obj1 = { name: "obj1" },
    obj2 = { name: "obj2" },
    obj3 = { name: "obj3" };

var fooOBJ = foo.softBind(obj1);
fooOBJ(); // name : obj1

obj2.foo = foo.softBind(obj1);
obj2.foo(); // name : obj2

fooOBJ.call(obj3); // name : obj3
setTimeout(obj2.foo, 10); // name : obj1