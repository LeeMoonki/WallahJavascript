function Car(name) {
  this.name = name;
}

Car.prototype.getName = function() {
  return this.name;
};

function KIA(name, serialNumber) {
  Car.call(this, name);
  this.serialNumber = serialNumber;
}

KIA.prototype = Object.create(Car.prototype);
// Object.setPrototypeOf(KIA.prototype, Car.prototype);

Object.defineProperty(KIA.prototype, 'constructor', {
  enumerable: false,
  writable: true,
  configurable: true,
  value: KIA,
});



KIA.prototype.getSerialNumber = function() {
  return this.serialNumber;
};

// 만약 enumerable을 false로 설정하지 않으면 다음 식에서 constructor가 튀어나온다

let kia = new KIA('foo', 'bar');

for (let key in kia) {
  console.log('key of kia : ', key);
}

