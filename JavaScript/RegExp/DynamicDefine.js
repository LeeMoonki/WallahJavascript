// 정규 표현식은 리터럴 형식 (예 : /^a*b+/g)으로 정의할 것을 적극 권장한다.
// 구문이 쉽고 무엇보다 성능상 이점이 있다. (자바스크립트 엔진이 실행 전 정규표현식을 미리 컴파일한 후 캐시한다.)
// RegExp()는 정규 표현식 패턴을 동적으로 정의할 경우 의미있는 유틸리티다.

var name = "Kyle";
var namePattern = new RegExp("\\b(?:" + name + ")+\\b", "ig"); // 정규표현식의 동적 정의

var matches = someText.match(namePattern);

// 이런 코드는 자바스크립트 코드에서 수시로 등장하는데 new RegExp("패턴", "플래그") 형식으로 사용한다.
