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
        exports.nonn = new nonn();
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

    // functions for nonn

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

    function checkAndReturnElements(context, element, oneToOne) {
        if (!element || !(element instanceof Element)) return context._elements;
        return oneToOne ? element : [ element ];
    }

    function getOuterHeight(element) {
        var style = getComputedStyle(element);
        if (!style.marginTop) { throw 'The element is not an element or not rendered.'; }
        return element.offsetHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
    }

    function getOuterWidth(element) {
        var style = getComputedStyle(element);
        if (!style.marginTop) { throw 'The element is not an element or not rendered.'; }
        return element.offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    }

    function getArrayFromNodeList(elements) {
        if (!elements.length) return [];
        var result = [];
        for (var i = 0, len = elements.length; i < len; i++) {
            result.push(elements[i]);
        }
        return result;
    }
    // //// functions for nonn

    // get nonn object's elements
    nonn.prototype.getAll = function() {
        return this._elements;
    };

    // get a nonn object's element
    // index : the index of  nonn object's elements
    nonn.prototype.getAt = function(index) {
        if (index >= this._elements.length || index < 0) { return undefined; }
        return this._elements[index];
    };

    // find elements with selector query
    // query : selector query
    nonn.prototype.find = function(query) {
        var elements = this._elements, len = elements.length, result = [];
        if (!query) return new nonn();
        
        // if nonn object has no elements
        if (this._elements.length === 0) return new nonn(getArrayFromNodeList(document.querySelectorAll(query)));
        else {
            for (var i = 0; i < len; i++) {
                result = result.concat(getArrayFromNodeList(elements[i].querySelectorAll(query)));
            }
        }
        return new nonn(result);
    };

    // find children has certain class
    // className : class name
    // parentElement : the parent element. If do not assign it, the this._elements will be the parent.
    // return : nonn object which has children
    nonn.prototype.getChildrenWithClass = function(className, parentElement) {
        if (parentElement !== undefined && !(parentElement instanceof Element)) { 
            makeError(101, arguments);
            return new nonn();
        }

        var elements = checkAndReturnElements(this, parentElement);

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

    // find children has certain tag
    // tagName : tag name
    // parentElement : the parent element. If do not assign it, the this._elements will be the parent.
    // return : nonn object which has children
    nonn.prototype.getChildrenWithTag = function(tagName, parentElement) {
        if (parentElement !== undefined && !(parentElement instanceof Element)) { 
            makeError(101, arguments);
            return new nonn();
        }

        var elements = checkAndReturnElements(this, parentElement);

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
    
    // get height of element(s)
    // element : HTML element
    // return : If pass the element, the height of it. If not, the height of caller's _elements.
    nonn.prototype.height = function(element) {
        var elements = checkAndReturnElements(this, element);
        if (elements.length === 1) {
            // an element
            return parseFloat(getComputedStyle(elements[0]).height);
        } 
        if (elements.length > 1) {
            return map(elements, function(ele, index) {
                return parseFloat(getComputedStyle(ele).height);
            });
        }
        return undefined;
    };

    // get width of element(s)
    // element : HTML element
    // return : If pass the element, the width of it. If not, the width of caller's _elements.
    nonn.prototype.width = function(element) {
        var elements = checkAndReturnElements(this, element);
        if (elements.length === 1) {
            // an element
            return parseFloat(getComputedStyle(elements[0]).width);
        } 
        if (elements.length > 1) {
            return map(elements, function(ele, index) {
                return parseFloat(getComputedStyle(ele).width);
            });
        }
        return undefined;
    }

    // get outerHeight of element(s)
    // element : HTML element
    // return : If pass the element, the outerHeight of it. If not, the outerHeight of caller's _elements.
    nonn.prototype.outerHeight = function(element) {
        var elements = checkAndReturnElements(this, element);
        if (elements.length === 1) {
            return getOuterHeight(elements[0]);
        }
        if (elements.length > 1) {
            return map(elements, function(ele, index) {
                return getOuterHeight(ele);
            });
        }
        return undefined;
    };

    // get outerWidth of element(s)
    // element : HTML element
    // return : If pass the element, the outerWidth of it. If not, the outerWidth of caller's _elements.
    nonn.prototype.outerWidth = function(element) {
        var elements = checkAndReturnElements(this, element);
        if (elements.length === 1) {
            return getOuterWidth(elements[0]);
        }
        if (elements.length > 1) {
            return map(elements, function(ele, index) {
                return getOuterWidth(ele);
            });
        }
        return undefined;
    };

    // hide element from the view
    // element : An element to hide. Default value is its _elements
    nonn.prototype.hide = function(element) {
        var elements = checkAndReturnElements(this, element);
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
    };

    // show element from the view
    // element : An element to show. Default value is its _elements
    nonn.prototype.show = function(element) {
        var elements = checkAndReturnElements(this, element);
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = '';
        }
    }
}.call(this));