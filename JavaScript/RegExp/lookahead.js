/**
 * (?=A)
 * A로 시작(ahead)하는 문자열을 찾고(look) A를 소비하지 않는다.
 */


String.prototype.matchAll = (function () {
  const matchAll = String.prototype.matchAll;

  return function (regexp) {
    const result = matchAll.call(this, regexp);
    let isEmpty = true;

    for (const r of result) {
      isEmpty = false;
      console.log(`matchAll result of ${this} ${regexp} : `, r);
    }

    if (isEmpty) {
      console.log(`matchAll result is null on ${this} ${regexp}`);
    }

    return result;
  };
})();

const str = 'abcabcA';

// null
str.matchAll(/a(?=abc)/g);

// [ 'c', index: 2, input: 'abcabcA', groups: undefined ]
// abc로 시작하는 문자열을 찾고 (첫 번째 abc와 두 번째 abc), 그 문자열 앞에 c가 있는 문자열을 반환한다.
// 단, abc는 소비하지 않으므로 결과에 포함되지 않는다.
str.matchAll(/c(?=abc)/g);

// null
str.matchAll(/(?=abc)A/g);

// [ 'a', index: 0, input: 'abcabcA', groups: undefined ]
// [ 'a', index: 3, input: 'abcabcA', groups: undefined ]
// abc로 시작하는 문자열을 찾고 (첫 번째 abc와 두 번째 abc), 그 문자열을 소비하지 않은 상태로 a가 있는 문자열을 반환한다.
str.matchAll(/(?=abc)a/g);
