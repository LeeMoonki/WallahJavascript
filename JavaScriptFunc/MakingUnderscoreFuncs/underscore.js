(function() {
    var _ = function(){};

    var root = this;

    var _ = function(obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };
    
    // Export the Underscore object for **Node.js**, with
    // backwards-compatibility for the old `require()` API. If we're in
    // the browser, add `_` as a global object.
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }


    var MAX_ARRAY_INDEX = Number.MAX_SAFE_INTEGER;

    // getLength
    function getLength(list) {
        return list == null ? void 0 : list.length;
    }

    // isArrayLike
    _.isArrayLike = function(list) {    
        var length = getLength(list);
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };

    // identity
    _.identity = function(v) {
        return v;
    };
    _.idtt = _.identity;

    // args
    _.args0 = _.identity;
    _.args1 = function(a, b) {
        return b;
    };

    // values
    _.values = function(list) {
        return _.map(list, _.identity);
    };

    // keys
    _.keys = function(list) {
        return _.map(list, _.args1);
    };

    // map
    _.map = function(data, iteratee) {
        var new_list = [];
        if (_.isArrayLike(data)) {
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

    // each
    _.each = function(data, iteratee) {
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
}.call(this));