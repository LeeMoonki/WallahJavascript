var myObject = {
    a: 2
};

console.log(myObject.a); // 2, 프로퍼티 접근(Property Access)
console.log(myObject["a"]); // 2, 키 접근(Key Access)

// . 연산자는 뒤에 식별자 호환(Identifier-Compatible; 식별자에는 _와 $를 제외한 특수문자와 공백을 사용할 수 없다.) 프로퍼티 명이 와야 하지만
// [" "] 구문은 UTF-8/유니코드 호환 문자열이라면 모두 프로퍼티명으로 쓸 수 있다.

// 또한 객체의 프로퍼티명은 언제나 문자열이다.
// 즉, 문자열 이외의 다른 원시 값을 쓰면 우선 문자열로 변환된다.

var obj1 = {};
var arr1 = [];

obj1[0] = 1;
arr1['0'] = 1;
obj1["key"] = "value";
arr1["key"] = "value";

console.log(obj1, obj1.length); // { '0': 1, key: 'value' } undefined
console.log(arr1, arr1.length); // [ 1, key: 'value' ] 1
console.log(obj1[0], arr1[0]); // 1 1
console.log(obj1["key"], arr1["key"]); // value value

