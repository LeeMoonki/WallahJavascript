// #객체 상수
// writable: false 와 configurable: false 를 같이 쓰면 객체 프로퍼티를 상수처럼 쓸 수 있다.
var myObject = {};
Object.defineProperty(myObject, "CONST_NUMBER", {
    value: 30,
    writable: false,
    configurable: false
});
// 별도로 정의하지 않으면 false로 설정되지만 이렇게 명시적을 적어주도록 한다.
console.log(Object.getOwnPropertyDescriptor(myObject, "CONST_NUMBER"));

// #확장 금지
// 객체에 더는 프로퍼티를 추가할 수 없게 차단하고 현재 프로퍼티는 있는 그대로 놔두고 싶을 때 
// Object.preventExtensions() 를 호출한다.

Object.preventExtensions(myObject);
myObject.b = 3;
console.log(myObject.b); // undefined

// 비엄격모드에서는 undefined가 되지만 엄격 모드에서는 새로운 객체가 만들어져야 하면 에러를 발생시킨다


// #봉인
// Object.seal() 은 봉인된 객체를 생성한다.
// 즉, 어떤 객체에 대해 Object.preventExtensions()를 실행하고
// 프로퍼티를 전부 configurable: false 처리한다.

// #동결
// Object.freeze() 는 Object.seal() 을 적용하고 데이터 접근자(Data Accessor) 프로퍼티를 모두 writable: false 처리해
// 값도 바꾸지 못하도록 한다.
// Object.freeze() 를 적용하면 지금까지 전혀 영향을 받지 않았던 해당 객체가 참조하는 모든 객체를
// 재귀 순회하면서 Object.freeze()를 적용하여 깊숙이 동결한다.
// 하지만 자칫 의도하지 않은 다른 공유된 객체까지 동격시킬 수 있어 주의해야 한다.
