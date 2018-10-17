(function() {
    var self = this;

    var uts = function() {
        var instance = this;
        this.rootEle = undefined;
        this.rootEleId = undefined;
        this.createdElements = [];

        uts = function() {
            return instance;
        };
    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = uts;
        }
        exports.uts = uts;
    } else {
        self.uts = uts;
    }

    function checkIfElement(element, checkOne) {
        if (!checkOne && typeof element.length === 'number' && element.length > 0) {
            for (var i = 0; i < element.length; i++) {
                if (!(element[i] instanceof Element)) return false;
            }
            return true;
        }
        if (element instanceof Element) return true;
        return false;
    }

    function removeIt(element) {
        element.parentElement.removeChild(element);
    }

    uts.prototype.setRootElement = function(element) {
        var old, 
            ele, 
            id = 'test-root-element-' + (new Date().getMilliseconds());
        if (this.rootEle !== undefined) {
            old = this.rootEle;
            old.innerHTML = '';
            old.parentElement.removeChild(old);
        }
        if (element !== undefined) { 
            this.rootEle = element; 
            if (element.id) { id = element.id; }
        }
        else {
            ele = document.createElement('div');
            ele.style.position = 'absolute';
            ele.style.visibility = 'hidden';
            ele.style.overflow = 'hidden';
            ele.style.left = '0';
            ele.style.top = '0';
            ele.style.width = '0.1px';
            ele.style.height = '0.1px';
            ele.setAttribute('id', id);
            this.rootEle = ele;
        }
        this.rootEleId = id;
        document.getElementsByTagName('body')[0].appendChild(this.rootEle);
    };

    uts.prototype.createElement = function(tagName, options) {
        if (this.rootEle === undefined) throw 'The rootEle is not an Element. Set the rootEle with uts.setRootElement().';
        var ele = document.createElement(tagName);

        if (options) {
            if (options.id) { ele.setAttribute('id', options.id); }
            if (options.class) { ele.setAttribute('class', options.class); }
            if (options.style) {
                var s = options.style;
                for (var key in s) {
                    if (s.hasOwnProperty) {
                        ele.style[key] = s[key];
                    }
                }
            }
            
            if (options.parentEle) {
                options.parentEle.appendChild(ele);
            } else {
                this.rootEle.appendChild(ele);
            }
        } else {
            this.rootEle.appendChild(ele);
        }
        this.createdElements.push(ele);
    };

    uts.prototype.cleanUp = function(alsoRoot) {
        var len = this.createdElements.length;
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                removeIt(this.createdElements[i]);
            }
            this.createdElements.length = 0;
        }
        if (alsoRoot && this.rootEle !== undefined) {
            old = this.rootEle;
            this.rootEle.innerHTML = '';
            removeIt(this.rootEle);
            this.rootEle = undefined;
            this.rootEleId = undefined;
        }
    };
}.call(this));