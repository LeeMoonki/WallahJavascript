// iteration protocol 사용 예시

// String 은 내장된 iterable object 한 예다.

var someString = 'hi';
console.log(typeof someString[Symbol.iterator]); // function

// String 의 default iterator 는 문자열의 code points를 하나씩 반환한다.

var iterator = someString[Symbol.iterator]();
console.log(iterator.toString()); // [object String Iterator]

console.log(iterator.next()); // { value: 'h', done: false }
console.log(iterator.next()); // { value: 'i', done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// spread operator 와 같은 내장 구조들은 동일한 iteration protocol을 사용한다.

console.log([...someString]); // [ 'h', 'i' ]

// @@iterator를 커스터마이즈하여 반복 행동을 재정의할 수 있다.

var someStr = new String('hi'); // auto-boxing을 피하기 위해 명시적으로 String object를 생성해야 한다.

someStr[Symbol.iterator] = function() {
    return {
        // 이 객체는 문자열 bye라는 유일한 요소를 반환하는 iterator 객체이다.
        next: function() {
            if (this._first) {
                this._first = false;
                return { value: 'bye', done: false };    
            } else {
                return { done: true };
            }
        },
        _first: true
    }
};

console.log([...someStr]); // [ 'bye' ]
console.log(someStr.toString()); // hi


// generator object 는 iterator이고 iterable 이다.

var aGeneratorObject = function *() {
    yield 1;
    yield 2;
    yield 3;
}();

console.log(typeof aGeneratorObject.next); // function, next 메서드를 갖고있다. 즉, iterator 이다.
console.log(typeof aGeneratorObject[Symbol.iterator]); // function, @@iterator 메서드를 갖고 있다. 즉, iterable 이다.

console.log(aGeneratorObject[Symbol.iterator]() === aGeneratorObject); // true, @@iterator 메서드가 자기 자신(iterator)를 반환하기 때문에 true 이다. 
// 그래서 이 제너레이터는 well-formed iterable 이다.

console.log([...aGeneratorObject]); // [ 1, 2, 3 ]