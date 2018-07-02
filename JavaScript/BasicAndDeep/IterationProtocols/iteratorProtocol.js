// iterator protocol은 값의 순열(sequence of values)을 생산하는 표준을 정의한다.
// 다음과 같은 next() 메서드를 갖고있는 객체는 iterator이다.

// next()
// 다음과 같은 두 개의 속성을 갖고있는 객체를 반환하는 인자없는 함수이다.

// 1. done (boolean) :  
// iterator가 반복되는 순열의 마지막을 지났다면 true
// iterator가 순열의 다음 값을 생성 할 수 있다면 false. 이 경우는 done 속성을 특정하지 않은 것과 동일하다

// 2. value
// iterator에 의해 반환되는 JavaScript 값. done이 true 이면 생략가능하다.

// next 메서드는 done과 value를 속성으로 포함한 객체를 반환해야 한다.


// # iterator 예시

function makeIterator(array) {
    var nextIndex = 0;

    return {
        next: function() {
            return nextIndex < array.length ?
                { value: array[nextIndex++], done: false } :
                { done: true };
        }
    };
}

var it = makeIterator(['yo', 'ya']);
console.log(it.next()); // { value: 'yo', done: false }
console.log(it.next()); // { value: 'ya', done: false }
console.log(it.next()); // { done: true }

// # infinite iterator 예시

function idMaker() {
    var index = 0;

    return {
        next: function() {
            return { value: index++, done: false };
        }
    };
}

it = idMaker();

console.log(it.next()); // { value: 0, done: false }
console.log(it.next()); // { value: 1, done: false }
console.log(it.next()); // { value: 2, done: false }
//...

// # gernerator 와 iterator 예시

function *makeSimpleGenerator(array) {
    var nextIndex = 0;

    while (nextIndex < array.length) {
        yield array[nextIndex++];
    }
}

var gen = makeSimpleGenerator(['yo', 'ya']);

console.log(gen.next()); // { value: 'yo', done: false }
console.log(gen.next()); // { value: 'ya', done: false }
console.log(gen.next()); // { value: undefined, done: true }

function *genIdMaker() {
    var index = 0;
    while (true) {
        yield index++;
    }
}

gen = genIdMaker();

console.log(gen.next()); // { value: 0, done: false }
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
// ...


// # ES6 class 예시

class SimpleClass {
    constructor(data) {
        this.index = 0;
        this.data = data;
    }

    [Symbol.iterator]() {
        return {
            next: () => {
                if (this.index < this.data.length) {
                    return { value: this.data[this.index++], done: false };
                } else {
                    this.index = 0; // 한 번의 순회가 끝나고 수동적으로 index를 세팅하지 않고 다시 순회하기 위해
                    return { done: true };
                }
            }
        };
    }
}

const simple = new SimpleClass([1,2,3,4,5]);

for (const val of simple) {
    console.log(val); // 1 2 3 4 5
}