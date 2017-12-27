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

function SUV() {
    this.beep = "WANK!";
};
SUV.prototype= new Car();

var truck = new Truck(),
    suv = new SUV();