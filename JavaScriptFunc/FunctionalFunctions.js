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

// insertIndexFilter
// If list.length is large and we need to approach to a filtered data, knowing index of it is very useful.
// This function is for it. The index will be recorded in each of result's object.
function insertIndexFilter(list, predicate) {
	var indexInsertedObject, new_list = [];
	for (var i = 0, len = list.length; i < len; i++) {
		if (predicate(list[i])) {
			indexInsertedObject = list[i];
			indexInsertedObject.index = i;
			new_list.push(indexInsertedObject);
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

// identity
function identity(v) {
    return v;
}

// not
function not(v) {
    return !v;
}

// beq
function beq(a) {
    return function(b) {
        return a === b;
    }
}

// positive
function positive(list) {
    return find(list, identity);
}

// negativeIndex
function negativeIndex(list) {
    return findIndex(list, not);
}

// some
function some(list) {
    return not(not(positive(list)));
}

// every
function every(list) {
    return beq(negativeIndex(list));
}

// compose
function compose() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
        var i = start;
        var result = args[start].apply(this, arguments);
        while (i--) {
            result = args[i].call(this, result);
        }
        return result;
    }
}