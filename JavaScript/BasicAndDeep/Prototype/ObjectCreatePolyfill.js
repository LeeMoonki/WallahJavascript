// Object.create는 
// 인자로 전달한 객체가 prototype에 있는 함수를 만들고
// 이 함수와 연결된 새 객체를 반환한다

if (!Object.create) {

    Object.create = function(o) {
        function F() {}
        F.prototype = o;
        return new F();
    };

}