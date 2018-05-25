var obj = function() { this.a = 2; }
obj.prototype.sayhi = function() { console.log("hi"); }

// obj
// f () { this.a = 2; }
// f obj()
//     name: "obj"
//     prototype:
//         sayhi: f ()
//         constructor: f ()
//             name: "obj"
//         __proto__: Object
//     __proto__: f ()

var obj1 = new obj();

// obj1
// obj {a: 2}
//     a: 2
//     __proto__: Object
//         sayhi: f ()
//         constructor: f ()
//             name: "obj"
//         __proto__: Object

console.log(obj.a); // undefined
console.log(obj1.a); // 2
obj1.a = 100;
console.log(obj.a); // undefined
console.log(obj1.a); // 100
console.log(obj1.constructor); // [Function: obj]

// obj1.constructor
// f () { this.a = 2; }