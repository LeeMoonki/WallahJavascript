(function() {
    var self = this;

    var nonn = function() {

    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = new nonn();
        }
        exports.nonn = nonn;
    } else {
        self.nonn = new nonn();
    }

    nonn.prototype.outerHeight = function(element) {
        var height = element.offsetHeight;
        var style = getComputedStyle(element);
        if (!style.marginTop) return 0;

        return height + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
    };

    nonn.prototype.outerWidth = function(element) {
        var width = element.offsetWidth;
        var style = getComputedStyle(element);

        return width + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    };
}.call(this));