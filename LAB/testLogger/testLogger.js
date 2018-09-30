function testLogger() {
    var instance = this;
    if (!(this instanceof testLogger)) {
        instance = new testLogger();   
    }
    testLogger = instance;

    this.classes = [];
}

testLogger.prototype.setClass = function(classes) {
    var arr = undefined;
    if (typeof classes === 'string') {
        arr = classes.trim().split(/\s+/);
        this.classes = this.classes.concat(arr);
    } else if (classes instanceof Array) {
        arr = [];
        for (var i = 0, len = classes.length; i < len; ++i) {
            if (typeof classes[i] === 'string') arr.push(classes[i]);
        }
        this.classes = this.classes.concat(arr);
    } else {
        console.error('The argument of setClass must be a string or an array consists of classe names.');
    }
};