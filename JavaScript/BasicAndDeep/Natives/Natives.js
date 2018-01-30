// 네이티브란 특정 환경(브라우저 등의 클라이언트 프로그램)에 종속되지 않은, ECMAScript 명세의
// 내장 객체를 말한다.

// 가장 많이 사용되는 네이티브들은 다음과 같다.

// 1) String()
// 2) Number()
// 3) Boolean()
// 4) Array()
// 5) Object()
// 6) Function()
// 7) RegExp()
// 8) Date ()
// 9) Error()
// 10) Symbol() -- ES6에서 추가

// toString()은 /JavaScript/Inventory/toString.js 참고

var str = "abc";
var strObj = new String("abc");
console.log("typeof str : ", typeof str); // "string"
console.log("typeof strObj : ", typeof strObj); // "object"
console.log("strObj instanceof String : ", strObj instanceof String); // true
console.log("Object.prototype.toString.call(strObj) : ", Object.prototype.toString.call(strObj));

// new String("abc") 은 "abc"를 감싸는 문자열 래퍼를 생성하며 원시 값 "abc"는 래퍼로 감싸져있지 않다.


// 내부 [[Class]]

// typeof 의 결과가 "object"인 값에는 [[Class]]라는 내부 프로퍼티(전통적인 클래스 지향(Class-Oriented)개념에서의
// 클래스라기 보단 내부 분류법(Classification)의 일부라고 보자)가 추가로 붙는다.
// 이 프로퍼티는 직접 접근할 수 없고 Object.prototype.toString() 메서드에 값을 넣어 호출함으로써 엿볼수 있다.

console.log("\nObject.prototype.toString.call([1, 2, 3]) : ", 
            Object.prototype.toString.call([1, 2, 3])); // [object Array]
console.log("Object.prototype.toString.call(/regex-literal/i) : ", 
            Object.prototype.toString.call(/regex-literal/i)); // [object RegExp]

// 위의 예에서, 내부 [[Class]] 값이 배열은 "Array", 정규표현식은 "RegEx" 임을 알 수 있다.
// 대부분 내부 [[Class]]는 해당 값과 관련된 내장 네이티브 생성자(Native Constructor)를 가리키지만,
// 다음과 같은 경우 new Null(), new Undefined() 처럼 쓸 수 있는 네이티브 생성자가 없음에도
// null과 undefined는 [[Class]] 값으로 "Null"과 "Undefined"를 갖는다.

console.log("\nObject.prototype.toString.call(null) : ", 
            Object.prototype.toString.call(null)); // [object Null]
console.log("Object.prototype.toString.call(undefined) : ", 
            Object.prototype.toString.call(undefined)); // [object Undefined]

// 그 밖의 문자열, 숫자, 불리언 같은 단순 원시 값은 이른바 '박싱(Boxing)' 과정을 거친다.

console.log('\nObject.prototype.toString.call("abc") : ', Object.prototype.toString.call("abc")); // [object String]
console.log('Object.prototype.toString.call(30) : ', Object.prototype.toString.call(30)); // [object Number]
console.log('Object.prototype.toString.call(true) : ', Object.prototype.toString.call(true)); // [object Boolean]

// 내부 [[Class]] 값이 (new String()처럼 생성자를 사용해 인스턴스로 만든 것이 아님에도) 각각 
// String, Number, Boolean으로 표시된 것으로 보아
// 단순 원시 값은 해당 객체 래퍼로 자동 박싱됨을 알 수 있다.