// onlyForNumber 클래스를 적용한 input은 숫자만 입력가능하다.
// jQuery를 이용해 element 선택
// https://stackoverflow.com/questions/33251052/allow-only-numbers-and-ctrla-ctrlv-ctrlc-to-a-textbox

$("input.onlyForNumber").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and . (dot . is 190)
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
        // Allow: Ctrl/cmd+A
        (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+C
        (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+X
        (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
    }
}).change(function (e) {
    // Chrome의 경우 한글은 e.preventDefault를 뚥고 나온다
    // 따라서 아래와 같이 별도로 더 처리해준다
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
});