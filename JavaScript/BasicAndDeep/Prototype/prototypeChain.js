var myObject = {
    a: 2
};

console.log(myObject.a); // 2
console.log(myObject.hasOwnProperty('a')); // true

var myObject1 = Object.create(myObject);

console.log(myObject.a); // 2
console.log(myObject1.hasOwnProperty('a')); // false

// . 연산자를 통해 property를 탐색하는 것은 prototype chain을 이용한다.
// 즉, 자신에게 없으면 prototype chain 을 따라 올라가 탐색하고 없다면 같은 과정을 반복한다.
// 끝에 다다랐을 때까지 없다면(Object.prototype) 없다는 신호를 보낸다(undefined).

// for ... in 루프는 객체를 순회할 때 prototype chain 탐색 과정과 비슷한 방식으로 탐색한다

for (var k in myObject1) {
    console.log(k + " 를 발견!"); // a 를 발견!
}

// 만약 myObject1.a 에 값을 할당하면 prototype chain에서 myObject의 a는 가려지게 된다.

myObject1.a++; // myObject1.a = myObject1.a + 1;

console.log(myObject.a); // 2
console.log(myObject1.a); // 3, myObject.a 는 가려진다
console.log(myObject1.hasOwnProperty('a')); // true