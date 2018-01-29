// 일반적인 숫자를 1000 단위마다 ,를 찍어서 돈 단위로 표시한다
function numberToMoney(num) {
	if (num) {
		return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	}
	else {
		return num;
	}
}