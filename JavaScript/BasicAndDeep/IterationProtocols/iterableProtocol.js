// 출처 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Iteration_protocols

// iterable protocol 은 JS 객체들이 for ... of 와 같은 루프에서 어떻게 반복될지 정의하고 커스터마이즈 하도록 한다.
// iterable 이 되기 위해선 객체는 Symbol.iterator constant에 의해 사용가능한 @@iterator 키 속성을 가진 @@iterator 메서드를 반드시 갖고있어야 한다.

// [Symbol.iterator] : iterator protocol을 따르고 객체를 반환하는 인자없는 함수

// 객체가 반복될때 @@iterator 메서드는 인자없이 호출되며 반환된 iterator는 반복되는 값들을 얻기위해 사용된다.


// # iterable 예시

// # 내장 iterable

// String, Array, TypedArray, Map, Set 들은 모두 내장 iterable이다. 이들은 각각 @@iterator 메서드를 수행하는 prototype 객체들을 갖고있다.

// # 사용자 정의 iterable

var myIterable = {};

myIterable[Symbol.iterator] = function *() {
    yield 1;
    yield 2;
    yield 3;
};
console.log([...myIterable]); // [ 1, 2, 3 ]


// # iterable을 받는 내장 API

// Map([iterable]), WeakMap([iterable]), Set([iterable]), WeakSet([iterable])

var myObj = {};

var map = new Map([[1, 'a'], [2, 'b'], [3, 'c']]);
console.log(map.get(2)); // b

var wmap = new WeakMap([[{}, 'a'], [myObj, 'b'], [{}, 'c']]);
console.log(wmap.get(myObj)); // b

var set1 = new Set([1, 2, 3]);
console.log(set1.has(3)); // true

var set2 = new Set('123');
console.log(set2.has('2')); // true

var wset = new WeakSet(function *() {
    yield {};
    yield myObj;
    yield {};
}());
console.log(wset.has(myObj)); // true

// Promise.all(iterable), Promise.race(iterable), Array.from() 역시 iterable을 받는다


// # iterable과 함께 사용되는 문법

// 몇몇 구문(statement)과 표현식(expression)은 iteralbe과 함께 사용된다.
// 예를 들어, for ... of, spread 문법, yield*, destructing assignment 가 있다.

for (let val of [ 'a', 'b', 'c' ]) {
    console.log(val); // a b c
}

console.log([...'abc']); // [ 'a', 'b', 'c' ]

function *gen() { 
    yield *[ 'a', 'b', 'c' ];
}
console.log(gen().next()); // { value: 'a', done: false }

[ a, b, c ] = new Set([ 1, 2, 3 ]);
console.log(b); // 2


// # Non-Well-formed iterables

// 만약 iterable의 @@iterator 메서드가 iterator 객체를 반환하지 않는다면 
// iterable은 non-well-formed iterable이라고 한다.

var nonWellFormedIterable = {};
nonWellFormedIterable[Symbol.iterator] = function () { return 1; }
console.log([...nonWellFormedIterable]);

// TypeError: Result of the Symbol.iterator method is not an object