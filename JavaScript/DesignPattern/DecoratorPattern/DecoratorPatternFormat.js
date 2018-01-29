// 캡처링 이벤트 핸들러 설정
// IE8 이하의 경우 이벤트를 추가할 때 attachEvent를 사용
if (document.addEventListener) {
    capturingEventHandler = function (dom, type, fn) {
        dom.addEventListener(type, fn, true);
    }
} else if (document.attachEvent) {
    capturingEventHandler = function (dom, type, fn) {
        dom.attachEvent("on" + type, fn);
        dom.setCapture();
    }
}

capturingEventHandler(
    -- event target 을 적는다 --,
    "click",
    function (event) {
        var evtTarget;

        // IE8 이하의 경우 event.srcElement를 사용
        evtTarget = event.target || event.srcElement;

        -- 이벤트 내용 --

        // IE8 이하의 경우 버블링을 멈추는 방법이 다르다
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    });