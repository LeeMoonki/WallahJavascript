// 자바스크립트는 값의 타입만으로 값-복사(Value-Copy), 레퍼런스-복사(Reference-Copy) 둘 중 한쪽이 결정된다.

// null, undefined, string, number, boolean 그리고 ES6의 symbol 같은 
// 단순 값(스칼라 원시값; Scalar Primitive)은 언제나 값-복사 방식으로 할당/전달된다.

// 객체(배열과 박싱된 객체 래퍼 전체)나 함수 등 합성 값(Compound Values)은 할당/전달시
// 반드시 레퍼런스 사본을 생성한다.

var a = 2;
var b = a; // 'b'는 언제나 'a'에서 값을 복사한다.

// a, b는 스칼라 원시 값이므로 a에는 이 값의 초기 사본이 들어가고, b에는 또 다른 사본이 자리잡는다.
// 따라서 b를 바꿈으로써 a까지 동시에 값을 변경할 방법은 없다.
console.log("a : ", a); // 2
console.log("b : ", b); // 2
console.log("b++ : ", b++); // 2
console.log("a : ", a); // 2
console.log("b : ", b); // 3

var c = [1, 2, 3];
var d = c; // 'd'는 공유된 [1, 2, 3]값의 레퍼런스다.

// c와 d는 모두 합성 값이자 동일한 공유 값 [1, 2, 3]에 대한 개별 레퍼런스다.
// 여기서 기억해야 할 점은 c와 d가 [1, 2, 3]을 '소유'하는 것이 아니라 
// 단지 이 값을 동등하게 참조만 한다는 사실이다.
// 따라서 레퍼런스로 실제 공유한 배열 값이 변경되면, 이 공유 값 한 군데에만 영향을 미치므로
// 두 레퍼런스는 갱신된 값 [1, 2, 3, 4]을 동시에 바라보게 된다.
console.log("\nc : ", c); // [1, 2, 3]
console.log("d : ", d); // [1, 2, 3]
d.push(4);
console.log("c after d.push(4) : ", c); // [1, 2, 3, 4]
console.log("d after d.push(4) : ", d); // [1, 2, 3, 4]

// 레퍼런스는 변수가 아닌 값 자체를 가리키므로 A 레퍼런스로 B 레퍼런스가 가리키는 대상을 변경할 수는 없다.

var e = [1, 2, 3];
var f = e;
console.log("\ne : ", e); // [1, 2, 3]
console.log("f : ", f); // [1, 2, 3]
f = [4, 5, 6];
console.log("e : ", e); // [1, 2, 3]
console.log("f : ", f); // [4, 5, 6]
// f = [4, 5, 6]으로 할당해도 e가 참조하는 [1, 2, 3]은 영향을 받지 않는다.

// 함수의 인자

console.log();
function foo (x) {
    x.push(4);
    console.log("x after x.push(4) in foo : ", x);

    x = [4, 5, 6];
    x.push(7);
    console.log("x after x = [4,5,6] and x.push(7) in foo : ", x);
}

var g = [1, 2, 3];
foo(g);
console.log("g after g = [1,2,3] and foo(g) : ", g); // [1, 2, 3, 4]

// g를 인자로 넘기면 g의 레퍼런스 사본이 x에 할당된다. x와 a는 모두 동일한 [1, 2, 3] 값을 가리키는 별도의 레퍼런스다.
// 함수 내부에서 이 레퍼런스를 이용해 값 자체를 변경한다. 그 후 x = [4, 5, 6]으로 새 값을 할당해도
// 초기 레퍼런스 g가 참조하고 있던 값에는 아무런 영향이 없다. 
// 즉, g 레퍼런스는 여전히 [1, 2, 3, 4] 값을 바라보고 있다.

// 레퍼런스 x로 g가 가리키고 있는 값을 바꿀 도리는 없다. 다만 g와 x 둘 다 가리키는 공유 값의 내용만 바꿀 수 있다.
console.log();
function bar (y) {
    y.push(4);
    console.log("y after y.push(4) in bar : ", y);

    // 다음은 새 배열을 만드는 것이 아니라 이미 두 변수가 공유한 배열을 변경하는 코드이므로
    // 인자로 보낸 변수는 새로운 값을 가리키게 된다.
    y.length = 0; // 기존 배열을 즉시 비운다
    y.push(4, 5, 6, 7);
    console.log("y after y.length = 0 and y.push(4, 5, 6, 7) : ", y);
}

var h = [1, 2, 3];
bar(h);
console.log("h after h = [1,2,3] and bar(h) : ", h); // [4, 5, 6, 7]

// (배열 같은) 합성 값을 값-복사에 의해 효과적으로 전달하려면 손수 값의 사본을 만들어
// 전달한 레퍼런스가 원본을 가리키지 않게 하면 된다.
console.log();
var p = [1, 2, 3];
bar(p.slice());
console.log("p after p = [1,2,3] and bar(p.slice()) : ", p); // [1, 2, 3]
// .slice()를 호출하면 전혀 새로운 배열의(얕은 복사Shallow Copy) 사본을 만든다.
// 이렇게 복사한 사본만을 가리키는 레퍼런스를 전달하니 bar()는 p의 내용을 건드릴 수 없다.

// 반대로 스칼라 원시 값을 레퍼런스처럼 바뀐 값이 바로바로 반영되도록 넘기려면 
// 원시 값을 다른 합성 값(객체, 배열 등)으로 감싸야 한다.
console.log();
function poo (wrapper) {
    wrapper.q = 42;
}

var obj = {
    q: 2
};
poo(obj);
console.log("q after poo(obj) : ", obj.q); // 42
// obj는 스칼라 원시 프로퍼티 q를 감싼 래퍼(wrapper)로 poo() 함수에 obj 레퍼런스 사본이 전달되고
// 래퍼 인자의 값을 바꾼다. 이제 래퍼 레퍼런스로 공유된 객체에 접근하여 프로퍼티를 수정할 수 있다. 
// 함수가 종료되면 obj.q는 수정된 값 42다.


