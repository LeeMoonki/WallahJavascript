function Car() {
    this.wheel = 4;
    this.beep = "BEEP!";
};
Car.prototype.go = function () {
    alert(this.beep);
};

function Truck() {
    this.Wheel = 6;
    this.beep = "HONK!";
};
Truck.prototype = new Car();
// Truck.prototype 을 new Car()로 덮는다. 
// Car 의 wheel 과 beep 을 가져오고 Car 의 prototype 을 참조하는 __proto__ 를 가져온다

// function 객체를 만들면 함수 객체에 prototype 속성이 생긴다.
// 이 객체를 통해 인스턴스를 만들면 해당 인스턴스는 
// 1) function 객체의 변수 속성
// 2) function.prototype 를 참조하는 __proto__ 속성을 갖는다. 

function SUV() {
    this.beep = "WANK!";
};
SUV.prototype= new Car();

var truck = new Truck(),
    suv = new SUV();