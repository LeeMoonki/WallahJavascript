(function() {
    var self = this;

    var nonn = function(elements) {
        this._elements = [];
        if (elements instanceof Array) this._elements = elements;
    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = new nonn();
        }
        exports.nonn = nonn;
    } else {
        self.nonn = new nonn();
    }

    var MAX_ARRAY_INDEX = Number.MAX_SAFE_INTEGER;

    // Error code and message store.
    var errors = {
        code101: { code: -101, msg: 'Wrong Arguments' }
    };

    // Make error and show it.
    // code: Error code in the error store. It can be negative number.
    // additionalErrorMsg : An error messsage added to suffix of the error message in the store.
    function makeError(code, additionalErrorMsg) {
        code = (code + '').replace('-', '');
        additionalErrorMsg = !additionalErrorMsg ? '' : additionalErrorMsg;
        console.error(errors['code' + code].msg, additionalErrorMsg);
    }

    // getLength
    function getLength(list) {
        return list == null ? void 0 : list.length;
    }

    // isArrayLike
    function isArrayLike(list) {    
        var length = getLength(list);
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };

    // map
    function map(data, iteratee) {
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

    function checkAndReturnElements(context, element) {
        if (!element || !(element instanceof Element)) return context._elements;
        return [ element ];
    }

    nonn.prototype.getChildrenWithClass = function(className, element) {
        if (element !== undefined && !(element instanceof Element)) { 
            makeError(101, arguments);
            return [];
        }

        var elements = checkAndReturnElements(this, element);

        var children,
            childrenList = [],
            classNames,
            i, j, len_i, len_j;

        for (i = 0, len_i = elements.length; i < len_i; i++) {
            children = elements[i].children;
            for (j = 0, len_j = children.length; j < len_j; j++) {
                classNames = children[j].className.split(' ');
                if (classNames.includes(className)) childrenList.push(children[j]);
            }
        }

        return new nonn(childrenList);
    };

    nonn.prototype.getChildrenWithTag = function(tagName, element) {
        if (element !== undefined && !(element instanceof Element)) { 
            makeError(101, arguments);
            return [];
        }

        var elements = checkAndReturnElements(this, element);
        console.log(elements);

        var children, 
            childrenList = [], 
            regexp = new RegExp("^" + tagName + "$", "i"),
            i, j, len_i, len_j;

        for (i = 0, len_i = elements.length; i < len_i; i++) {
            children = elements[i].children;
            for (j = 0, len_j = children.length; j < len_j; j++) {
                if (regexp.test(children[j].tagName)) childrenList.push(children[j]);
            }
        }

        return new nonn(childrenList);
    };
    

    nonn.prototype.outerHeight = function(element) {
        var height = element.offsetHeight;
        var style = getComputedStyle(element);
        if (!style.marginTop) return 0;

        return height + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
    };

    nonn.prototype.outerWidth = function(element) {
        var width = element.offsetWidth;
        var style = getComputedStyle(element);
        if (!style.marginLeft) return 0;

        return width + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    };
}.call(this));