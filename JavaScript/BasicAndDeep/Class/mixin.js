// 믹스인(Mixin)은 다른 언어와 달리 자바스크립트에서
// 누락된 클래스 복사 기능을 흉내 낸 것이다

function mixin(sourceObj, targetObj) {
    for (var key in sourceObj) {
        // 타깃에 없는 프로퍼티만 복사한다
        if (!(key in targetObj)) {
            targetObj[key] = sourceObj[key];
        }
    }
    return targetObj;
}

var Vehicle = {
    engines: 1,
    iginition: function() {
        console.log("엔진을 켠다.");
    },
    drive: function() {
        this.iginition();
        console.log("방향을 맞추고 앞으로 간다!");
    }
};

var Car = mixin(Vehicle , {
    wheel: 4,
    drive: function() {
        Vehicle.drive.call(this);
        console.log(this.wheel + " 개의 바퀴로 굴러간다!");
    }
});

Vehicle.drive();
console.log("\n");
Car.drive();

// 엄밀하게 말하면 함수가 실제로 복사된 것이 아니라
// 원본 함수를 가리키는 레퍼런스만 복사된 것이다

Vehicle.drive = function() {
    this.iginition();
    console.log("방향은 안 맞추고 앞으로 간다!!");
};
console.log("\n");
Vehicle.drive();
console.log("\n");
Car.drive();
