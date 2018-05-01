// bloop: bind loop 를 통해 함수를 만들기

var _ = require("./underscore.js");

function bloop(new_data, body) {
    return function(data, iteratee) {
        var result = new_data(data);
        if (_.isArrayLike(data)) {
            for (var i = 0, len = data.length; i < len; i++) {
                body(iteratee(data[i], i, data), result);
            }
        } else {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    body(iteratee(data[key], key, data), result);
                }
            }
        }
        return result;
    };
}

var map = bloop(function() {
    return [];
}, function(val, obj) {
    return obj.push(val);
});

console.log(map([ 1, 2, 3 ], function(v){
    return v * 2;
}));