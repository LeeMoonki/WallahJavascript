// _.each, _.map 등에서 사용하는 객체는 2가지에서 4가지 정도다
// {}, [], arguments, ArrayLike

// 1. {}
var d1 = { name: 'MK', age: 30 };

// 2. []
var d2 = [ 1, 2, 3 ];

// 3. arguments
var d3 = function() {
    return arguments;
}(1, 2, 3);

// 4. ArrayLike
//var d4 = $("div");
var d5 = { length: 3 };
d5[0] = 1, d5[1] = 2, d5[2] = 3;
var d6 = "hi";


function getLength(list) {
    return list == null ? void 0 : list.length;
}

var isArrayLike = function(list) {
    var MAX_ARRAY_INDEX = Number.MAX_SAFE_INTEGER;
    var length = getLength(list);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};