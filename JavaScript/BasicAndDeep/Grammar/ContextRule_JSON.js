// JSON은 자바스크립트 고유의 하위 집합이 아니다.
// 따라서 JSON 문자열, 예를 들어 JSON 규칙에 따라 프로퍼티 명을 따옴표로 감싼 { "a": 30 }이
// 유효한 자바스크립트 프로그램이라고 착각하는데, 그렇지 않다. 즉, 위처럼 작성하면 에러가 발생한다.

// 이유는 자바스크립트 문의 레이블은 따옴표로 감싸면 안 되기 때문에 "a"는 문법에 맞는 레이블이 아니며
// :이 그 뒤에 오면 안 된다.
// 따라서 JSON은 자바스크립트 구문의 하위 집합이라 할 수 있지만, 그 자체로 올바른 자바스크립트 문법이 아니다.

// JSON에 관한 너무나 흔한 오해 중 하나는 
// 내용이 JSON 문자열로만 가득 채워진 파일을 
// <script src=...></script> 태그로 읽어 들여도 정상적인 자바스크립트 코드로 인식될 거란 것이다.
// 직접 해보면 알겠지만 이런 파일은 프로그램에서 접근조차 할 수 없다.
// 그래서 보통 JSON-P(JSON 데이터를 foo({"a": 30}) 와 같은 함수 호출로 감싸는 패턴 ) 방식으로 
// 자바스크립트 함수 중 하나에 이 값을 인자로 실어 보내면 접근이 안 도는 문제를 해결할 수 있다고 한다.

// 하지만 사실은 그렇지 않다.
// { "a": 30 } 은 완전히 올바른 JSON 값이지만, 그 자체로는 레이블이 잘못된
// 문 블록으로 해석되어 에러가 난다. 하지만 foo({ "a": 30 }) 는 함수 내부에서
// { "a": 30 } 이 foo() 에 전달된 객체 리터럴이므로 유효한 자바스크립트 코드다.
// 따라서 제대로 표현하자면 JSON-P가 JSON을 문법에 맞는 자바스크립트 코드로 옷을 갈아입혀 주는 셈이다.