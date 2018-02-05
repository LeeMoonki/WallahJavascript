// toJSON()이 JSON문자열 표현형을 반환하리라 넘겨짚는 건 오해다.
// toJSON()은 적절히 평범한 실제 값을 반환하고 문자열화 처리는 JSON.stringify()이 담당한다.

// 다시 말해, toJSON()의 역할은 '문자열화하기 적당한 JSON 안전 값으로 바꾸는 것'이지 
// 'JSON 문자열로 바꾸는 것'이 아니다.

var a = {
    val: [1, 2, 3],

    toJSON: function () {
        return this.val.slice(1);
    }
};

var b = {
    val: [1, 2, 3],

    toJSON: function () {
        return "[" + this.val.slice(1).join() + "]";
    }
};

console.log("JSON.stringify(a) : ", JSON.stringify(a)); // "[2,3]"
console.log("JSON.stringify(b) : ", JSON.stringify(b)); // ""[2,3]""
// 두 번째 호출 코드는 배열 자체가 아니라 반환된 문자열을 다시 문자열화 한다.


// # JSON.stringify()의 유용한 기능

// 1. 배열 혹은 함수 형태의 대체자(Replacer)를 JSON.stringify()의 두 번째 선택 인자로 지정하여 
// 객체를 재귀적으로 직렬화하면서 필터링 하는 방법이 있다.

// 대체자가 함수면 처음 한 번은 객체 자신에 대해, 다음엔 각 객체 프로퍼티별로 한 번씩 실행하면서 
// 매번 키와 값, 두 인자를 전달한다. 직렬화 과정에서 해당 키를 건너 뛰려면 undefined를, 그 외엔 해당 값을 반환한다.

var c = {
    d: 30,
    e: "30",
    f: [1,2,3]
};

// 대체자가 배열이면 배열의 모든 원소는 문자열이어야 하고 각 원소는 객체 직렬화의 대상 프로퍼티명이다.
console.log('JSON.stringify(c, ["e", "f"]) : ', JSON.stringify(c, ["e", "f"]));
// "{"e":"30","f":[1,2,3]}"

console.log('JSON.stringify(c, function (key, value) { if (key !== "e") { return value; } }) : ',
            JSON.stringify(c, function (key, value) { if (key !== "e") { return value; } }))

// "{"d":30,"f":[1,2,3]}"

// 대체자가 함수인 경우 최초 호출 시 (객체 자신을 전달하므로, 여기에서는 c) 키 인자 key는 undefined이다.
// 대체자는 if 문에서 키가 "e"인 프로퍼티를 솎아낸다. 문자열화(stringify)는 재귀적으로 이루어지므로
// 배열 [1,2,3]의 각 원소(1,2,3)은 value로, 인덱스(0,1,2)sms key로 각각 대체자 함수에 전달된다.


// 2. JSON.stringify()의 세 번째 선택 인자는 스페이스(Space)라고 하며 
// 사람이 읽기 쉽도록 들여쓰기를 설정하는 인자이다.
// 들여 쓰기를 할 빈 공간의 개수를 숫자로 지정하거나 문자열(10자 이상이면 앞에서 10자까지만 잘라 사용한다)을
// 지정하여 각 들여 쓰기 수준에 사용한다.

console.log("\n");
console.log(JSON.stringify(c, null, 4));
console.log("\n");
console.log(JSON.stringify(c, null, '------'));


// JSON.stringify()는 직접적인 강제변환의 형식은 아니지만 두 가지 이유로 
// ToString 강제변환과 연관된다.

// 1. 문자열, 숫자, 불리언, null 값이 JSON으로 문자열화하는 방식은 
// ToString 추상 연산의 규칙에 따라 문자열 값으로 강제변환되는 방식과 동일하다.

// 2. JSON.stringify()에 전달한 객체가 자체 toJSON() 메서드를 갖고 있다면,
// 문자열화 전 toJSON()이 자동 호출되어 JSON 안전 값으로 '강제변환'된다.