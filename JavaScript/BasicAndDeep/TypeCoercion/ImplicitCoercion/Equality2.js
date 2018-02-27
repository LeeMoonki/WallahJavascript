// 희귀사례

// 내장 네이티브 프로토타입을 변경하면 문제발생!

Number.prototype.valueOf = function () {
    return 3;
};

console.log("new Number(2) == 3 : ", new Number(2) == 3); // true