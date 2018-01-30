// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/toString

// 참고 : .toString()
// 모든 객체(object)는 toString()을 갖고 있으며 toString()은 객체가 텍스트로 대표되거나 
// 문자열(string)이 기대되는 수단으로 여겨질 때 자동으로 호출된다.
// 기본적으로 toString() 메서드는 Object의 자손인 모든 객체(object)에의해 상속된다.
// 재정의된 객체(custom object)에서 toString()이 오버라이드 되지 않는다면 
// toString()은 기본적으로 "[object type]"을 반환한다. 여기에서 'type'은 객체(object)의 타입이다.

console.log("{}.toString() : ", {}.toString());
console.log("Object.prototype.toString.call(null) : ", Object.prototype.toString.call(null));
console.log("Object.prototype.toString.call(undefined) : ", Object.prototype.toString.call(undefined));

// Javascript 1.8.5 부터 null에의해 호출된 toString()은 [object Null]
// undefined에의해 호출된 toString()은 [object Undefined]를 반환한다.

var str = new String("Hello JS");
console.log("\nstr.toString() : ", str.toString()); // 이런경우 str은 문자열이 기대되므로 문자열이 출력된다.
console.log("Object.prototype.toString.call(str) : ", Object.prototype.toString.call(str));

var date = new Date();
console.log("\ndate.toString() : ", date.toString()); // Date 타입 역시 출력시 문자열이 기대되므로 문자열이 출력된다.
console.log("Object.prototype.toString.call(date) : ", Object.prototype.toString.call(date));