// string과 달리 String은 protortype에 메서드를 추가할 수 있고
// 이 메서드를 string type의 값에서 직접 불러 사용할 수 있다


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