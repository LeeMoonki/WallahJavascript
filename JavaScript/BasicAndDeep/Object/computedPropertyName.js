// ES6 부터 객체를 초기화 할 때 계산된 속성명을 지원한다.
// 객체의 속성 이름을 정의할 때 []안에 속성이름을 정의하면 결과는 속성명이 된다.

var param = 'size';
var config = {
    [param]: 12,
    ['mobile' + param.charAt(0).toUpperCase() + param.slice(1)]: 4
};

console.log(config); // { size: 12, mobileSize: 4 }