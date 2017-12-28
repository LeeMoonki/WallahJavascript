function Person (name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.getName = function () {
    return this.name;
}
Person.prototype.getAge = function () {
    return this.age;
}

var wallah = new Person("wallah", 30), prop;
console.log("whole properties of wallah : ");
for (prop in wallah) {
    console.log("wallah[" + prop + "] = " + wallah[prop]);
}
console.log("\nonly wallah's properties : ")
for (prop in wallah) {
    if (wallah.hasOwnProperty(prop)) {
        console.log("wallah[" + prop + "] = " + wallah[prop]);
    }
}