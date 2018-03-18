var strTag = '<img class="bgImg" id="bgImg" src="~/images/bgImg(1).jpg" />';

var arrBgImg = strTag.match(/bgImg/);
console.log("/bgImg/ : ", arrBgImg);
console.log("/bgImg/'s length : ", arrBgImg.length);
console.log("[0] : ", arrBgImg[0]);

arrBgImg = strTag.match(/bgImg/g);
console.log("/bgImg/ : ", arrBgImg);
console.log("/bgImg/'s length : ", arrBgImg.length);
console.log("[0] : ", arrBgImg[0]);
console.log("[0] : ", arrBgImg[1]);
console.log("[0] : ", arrBgImg[2]);