// 


var constructString = new String("wallah");
constructString.FullName = "wallah baba";

console.log(constructString.FullName);
console.log(constructString.FullName === "wallah baba");

var primitiveString = "wallah";
primitiveString.FullName = "wallah baba";

console.log(primitiveString.FullName === undefined);

console.log(constructString);
console.log(primitiveString);

String.prototype.newTrim = function () {
    return this.replace(/^\s+|\s+$/g, "");
}

console.log("     wallah     ");
console.log("     wallah     ".newTrim() === "wallah");