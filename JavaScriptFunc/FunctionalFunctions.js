// filter
function filter(list, predicate) {
    var new_list = [];
    for (var i = 0, len = list.length; i < len; i++) {
        if (predicate(list[i])) {
            new_list.push(list[i]);
        }
    }
    return new_list;
}

// map
function map(list, iteratee) {
    var new_list = [];
    for (var i = 0, len = list.length; i < len; i++) {
        new_list.push(iteratee(list[i]));
    }
    return new_list;
}

// bvalue
function bvalue(key) {
    return function(obj) {
        return obj[key];
    }
}

// find
function find (list, predicate) {
    for (var i = 0, len = list.length; i < len; i++) {
        if (predicate(list[i])) { return list[i]; }
    }
}

// findIndex
function findIndex(list, predicate) {
    for (var i = 0, len = list.length; i < len; i++) {
        if (predicate(list[i])) { return i; }
    }
    return -1;
}

// object
function object (key, val) {
    var obj = {};
    obj[key] = val;
    return obj;
}

// match
function match (obj, obj2) {
    for (var key in obj2) {
        if (obj[key] !== obj2[key]) { return false; }
    }
    return true;
}

// bmatch
function bmatch (obj2, val) {
    if (arguments.length === 2) obj2 = object(obj2, val);
    return function (obj) { return match(obj, obj2); }
}