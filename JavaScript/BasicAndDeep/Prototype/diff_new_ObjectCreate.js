var obj = function() {
    this.a = 2;
};

var obj1 = new obj();
var obj2 = Object.create(obj);

console.log(obj1); // obj { a: 2 }
console.log(obj2); // Function {}

// obj1
// obj {a: 2}
//     a: 2
//     __proto__: Object

// obj2
// Function {}
//     __proto__: f ()
//         ...
//         name: "obj"
//         prototype: {constructor: f}
//         __proto__: f ()

var obj = { a: 2, func: function() { console.log("hi"); } };

try {
    var obj1 = new obj();
} catch (e) {
    console.log(e);
}

var obj2 = Object.create(obj);

// obj2
// {}
//     __proto__: Object
//         a: 2
//         func: f ()
//             name: "func"
//         __proto__: Object

console.log(obj2.a); // 2
obj2.func(); // "hi"