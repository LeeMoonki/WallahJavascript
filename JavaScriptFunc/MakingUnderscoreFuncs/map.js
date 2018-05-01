// supporters
var MAX_ARRAY_INDEX = Number.MAX_SAFE_INTEGER;

// getLength
function getLength(list) {
    return list == null ? void 0 : list.length;
}

// isArrayLike
var isArrayLike = function(list) {    
    var length = getLength(list);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};
// // supporters

var map = function(data, iteratee) {
    var new_list = [];
    if (isArrayLike(data)) {
        for (var i = 0, len = data.length; i < len; i++) {
            new_list.push(iteratee(data[i], i, data));
        }
    } else {
        for (var key in data) {
            if (data.hasOwnProperty(key)) new_list.push(iteratee(data[key], key, data));
        }
        
    }
    return new_list;
};

var arr1 = map([1, 2, 3], function(v){
    return v * 2;
});
var arr2 = map({a: 3, b: 2, c: 1}, function(v){
    return v * 2;
});

console.log(arr1);
console.log(arr2);

// underscore.js에서는 세 번째 인자로 iteratee에서 사용할 this를 전달할 수 있지만
// this를 적용한 새로운 함수를 만드는 것은 작은 부하가 있다.
// 그 함수를 실행할 때도 부하가 생긴다. 반복하는 횟수가 많을수록 부하도 쌓이므로
// 개발자에게 iteratee에서의 this 다루기를 위임하고 최대한 깨끗한 함수만 받도록 하자.

var arr3 = map([1, 2, 3], function(v){
    return v * this;
}.bind(5));

console.log(arr3);