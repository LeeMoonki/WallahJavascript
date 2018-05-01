var _ = require("./underscore.js");

var each = function(data, iteratee) {
    if (_.isArrayLike(data)) {
        for (var i = 0, len = data.length; i < len; i++) {
            iteratee(data[i], i , data);
        }
    } else {
        for (var key in data) {
            if (data.hasOwnProperty(key)) iteratee(data[key], key, data);
        }
    }
    
    return data;
};

each([ 1, 2, 3 ], console.log);