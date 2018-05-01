var _ = require("./underscore.js");

// identity
var identity = function(v) {
    return v;
};
var idtt = _.identity;

// args
var args0 = _.identity;
var args1 = function(a, b) {
    return b;
};

// values
var values = function(list) {
    return _.map(list, _.identity);
};

// keys
var keys = function(list) {
    return _.map(list, _.args1);
};

console.log(values({ id: 5, name: "MK", age: 30 }));
console.log(keys({ id: 5, name: "MK", age: 30 }));
console.log(keys([ 1, 2, 3 ]));