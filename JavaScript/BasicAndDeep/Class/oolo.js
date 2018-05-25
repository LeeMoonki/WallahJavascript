// OOLO; Objects Linked to Other Objects

var Foo = {
    init: function(who) {
        this.me = who;
    },
    identify: function() {
        return "I am " + this.me;
    }
};

var Bar = Object.create(Foo);
Bar.speak = function() {
    console.log("Hello, " + this.identify() + ".");
};

var b1 = Object.create(Bar);
b1.init("b1");

var b2 = Object.create(Bar);
b2.init("b2");

b1.speak(); // Hello, I am b1.
b2.speak(); // Hello, I am b2.