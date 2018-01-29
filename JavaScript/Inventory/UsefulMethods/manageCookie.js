// 쿠키이름과 값, 그리고 유효날짜를 파라미터로 받아서 쿠키를 설정
function setCookie(cookieName, value, exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var cookieValue = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toGMTString());
	document.cookie = cookieName + "=" + cookieValue;
}

// 쿠키이름만 받아서 그 쿠키의 유효기간을 이용하여 유효하지 않게 만들어서 삭제
function deleteCookie(cookieName) {
	var expireDate = new Date();
	expireDate.setDate(expireDate.getDate() - 1);
	document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}

// 쿠키이름을 받아서 그 쿠키에 들어있는 값을 반환
function getCookie(cookieName) {
	cookieName = cookieName + '=';
	var cookieData = document.cookie;
	var start = cookieData.indexOf(cookieName);
	var cookieValue = '';
	if (start != -1) {
		start += cookieName.length;
		var end = cookieData.indexOf(';', start);
		if (end == -1) end = cookieData.length;
		cookieValue = cookieData.substring(start, end);
	}
	return unescape(cookieValue);
}