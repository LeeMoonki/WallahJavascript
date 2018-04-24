var myObject = { a: 2 };

console.log(Object.getOwnPropertyDescriptor(myObject)); // undefined
console.log(Object.getOwnPropertyDescriptor(myObject, "a")); // { value: 2, writable: true, enumerable: true, configurable: true }

// 만약 프로퍼티 서술자의 특성을 직접 수정하고 싶다면 다음을 통해 수정한다.
myObject = {};
Object.getOwnPropertyDescriptor(myObject, "a", {
    value: 2,
    writable: true,
    configurable: true,
    enumerable: true
});

// writable은 쓰기 가능을 의미한다. false를 주면 쓰기 금지가 되고 수정해도 수정되지 않는다. 엄격 모드에서는 에러가 발생한다.
// configurable이 true이면 defineProperty()로 프로퍼티 서술자를 변경할 수 있다.
// defineProperty()를 통해 writable을 테스트해보자.
console.log("-------------------------------------");
Object.defineProperty(myObject, "a", {
    writable: false
});
console.log(Object.getOwnPropertyDescriptor(myObject, "a")); // { value: undefined, writable: false, enumerable: false, configurable: false }

// 위에서 configurable: false가 되었기 때문에 myObject의 프로퍼티 a를 defineProperty를 통해 바꾸려고 하면 redefine 할 수 없다고 에러가 발생한다.
console.log("-------------------------------------");
myObject.b = 3;
Object.defineProperty(myObject, "b", {
    value: 4,
    writable: false,
    configurable: true,
    enumerable: true
});
console.log(Object.getOwnPropertyDescriptor(myObject, "b"));
myObject.b = 5;
console.log(myObject.b); // 4
console.log("-------------------------------------");
Object.defineProperty(myObject, "b", {
    value: 5,
    writable: false,
    configurable: true,
    enumerable: true
});
console.log(myObject.b); // 5

// configurable이 false이면 delete 도 동작하지 않는다.

console.log("-------------------------------------");
Object.defineProperty(myObject, "c", {
    value: 6,
    writable: true,
    configurable: false,
    enumerable: true
});
delete myObject.c;
console.log(myObject.c); // 6