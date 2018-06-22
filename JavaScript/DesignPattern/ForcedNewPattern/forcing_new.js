function Car(name, year) {
    this.name = name;
    this.year = year;
}

Car.prototype.engineStart = function() {
    console.log(this.name + ' ' + this.year +  " engine start");
}

// 위와 같은 (생성자)함수가 있다면 자바스크립트는 (생성자)함수를 new로 (즉 생성자 함수로서)
// 사용하도록 강제하지 않는다. 따라서 강제할 방법을 구현할 필요가 있다.

// new를 통해 생성자를 호출하면 생성자의 this가 새로 생성된 this로 바인딩 된다
// 만약 new를 통해 생성하지 않는다면 this는 context가 된다.


// 1. 에러를 통한 강제

function CarError(name, year) {
    if(!(this instanceof CarError)) {
        throw new Error("this function must be called with 'new'");
    }
    this.name = name;
    this.year = year;
}

try {
    var returnValue = CarError('k7', '2016');
} catch(e) {
    console.log(e); // this function must be called with 'new'
}


// 2. new 바인딩을 통한 강제

function CarForcingNew(name, year) {
    if(!(this instanceof CarForcingNew)) {
        return new CarForcingNew(name, year);
    }
    this.name = name;
    this.year = year;
}

var bmw = CarForcingNew('BMW', '2012');
var audi = new CarForcingNew('아우디', '2014');

console.log(bmw.name, bmw.year); // BMW 2012
console.log(audi.name, audi.year); // 아우디 2014



// new를 바인딩을 통한 강제의 경우 코드의 일관성이 떨어진다.
// 그런 측면에서 보면 첫 번째 처럼 에러를 통해 일관성을 강제하는 것이 더 좋은 방법일 수 있다.