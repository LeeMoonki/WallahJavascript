// 쿼리에서 매개변수값을 가져온다
// 출처 : https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
// 사용 예
// query string: ?foo=lorem&bar=&baz
// var foo = getParameterByName('foo'); // "lorem"
// var bar = getParameterByName('bar'); // "" (present with empty value)
// var baz = getParameterByName('baz'); // "" (present with no value)
// var qux = getParameterByName('qux'); // null (absent)
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}