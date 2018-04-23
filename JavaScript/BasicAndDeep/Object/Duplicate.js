function anotherFunction() {  }
var anotherObject = {
    c: true,
};
var anotherArray = [];

var myObject = {
    a: 2,
    b: anotherObject,
    c: anotherArray,
    d: anotherFunction
};

anotherArray.push(anotherObject, myObject); // 이렇게 하면 anotherArray와 myObject의 c사이에 환형 참조가 생성된다.

// 얕은 복사(Shallow Copy) 후 생성된 새 객체의 a 프로퍼티는 원래 값 2가 그대로 복사되지만,
// b, c, d 프로퍼티는 원 객체(Origin Object)의 레퍼런스와 같은 대상을 가리키는 또 다른 레퍼런스다.

// 깊은 복사(Deep Copy)를 하면 myObject는 물론이고 anotherObject와 anotherArray까지 모조리 복사한다.

// 하지만 여기서 문제는 anotherArray가 anotherObject와 myObject를 가리키는 레퍼런스를 갖고 있으므로
// 원래 레퍼런스가 보존되는게 아니라 이들까지 함께 복사된다. 결국, 환형 참조(Circular Reference) 형태가 되어
// 무한 복사의 구렁텅이에 빠지고 만다.

// JSON-Safe ([JSON 문자열 <-> 객체 직렬화 및 역직렬화]를 해도 구조와 값이 같은) 객체는 쉽게 복사할 수 있으므로 하나의 대안이 될 수는 있다.

var newObj = JSON.parse(JSON.stringify(someObj));
// 물론 100% JSON-Safe 객체여야 한다.