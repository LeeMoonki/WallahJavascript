// 태그 찾기
var imgTags = '<img class="bgImg" id="bgImg" src="~/images/bgImg(1).jpg" />and<img class="bgImg" id="bgImg" src="~/images/bgImg(1).jpg" />';
var imgTags1 = '<img class="bgImg" id="bgImg" src="~/images/bgImg(1).jpg" />\nand\n<img class="bgImg" id="bgImg" src="~/images/bgImg(1).jpg" />';

var foundTags = imgTags.match(/<img.+\/>/g);
var foundTags1 = imgTags.match(/<img.+\/>/g);

console.log("greedy : length " + foundTags.length + " match " + foundTags[0]);
console.log("greedy : length " + foundTags1.length + " match " + foundTags1[0]);

// *, +, {n,} 은 탐욕적(greedy)이기 때문에 가능한한 큰 덩어리를 찾으려고 하고 위와 같은 문제가 발생한다.
// 따라서 최소로 일치시켜주는 게으른(lazy) 수량자(quantifier)를 사용해야 한다. *?, +?, {n,}?

foundTags = imgTags.match(/<img.+?\/>/g);
foundTags1 = imgTags.match(/<img.+?\/>/g);

console.log("\n");
console.log("lazy : length " + foundTags.length + " match " + foundTags[0]);
console.log("lazy : length " + foundTags1.length + " match " + foundTags1[0] + "\n");

// // 태그 찾기

// 값 찾기

// 값을 찾을 때는 전방탐색과 후방탐색을 활용한다.
// 전방탐색 연산자 : (?=)
// 후방탐색 연산자 : (?<=)
// 전방탐색의 예 : "http:".match(/.+(?=:)/g) -> http (: 를 포함하여 찾았지만 결과에 반환하지 않는다)
// 후방탐색의 예 : "$987".match(/(?<=\$)[0-9.]+/g) -> 987 ($ 를 포함하여 찾았지만 결과에 반환하지 않는다)
// 전방,후방탐색의 예 : "<h1>Hi</h1>".match(/(?<=<[hH]1>).*(?=<\/[hH]1>)/g) -> Hi

var strTag = '<img class="bgImg" id="bgImg" src="~/images/bgImg(1).jpg" />';

var foundVal = strTag.match(/(?<=src=['"]).+?(?=['"])/g);

console.log("getting value : ", foundVal[0]);

var fileName = foundVal[0].match(/(?<=.*?(\/|\\))[\w\(\)]+\.(jpg|png)/g);

console.log("getting file name : ", fileName[0]);

// // 값 찾기