var $tempTarget;

// 필수 값 확인
$(".required").each(function (index, obj) {
    $tempTarget = $(obj);
    if (!checkRequired($tempTarget, 0)) {
        alert("'" + $tempTarget.attr("data-name") + "'은(는) 필수 값입니다.");
        $tempTarget.focus();
        return false;
    }
});

// required를 적용한 경우 값을 확인한다.
// obj : jQuery 혹은 JS element
// unselectedVal : select 박스의 경우 선택되지 않음의 value 값, default: 0
// radio 버튼의 경우 선택지 중 하나에만 걸어도 된다
function checkRequired(obj, unselectedVal) {
	var resultFlag = false,
		$obj,
		tagName = "",
		iptType = "",
		dataType = "",
		$tempTarget;

	if (obj.tagName === undefined) {
		$obj = obj;
	} else {
		$obj = $(obj);
	}

	if (unselectedVal === undefined) {
		unselectedVal = 0;
	}

	tagName = $obj.prop("tagName");
	dataType = $obj.attr("data-type");

	if (tagName === "INPUT") {
		iptType = $obj.attr("type");

		if (iptType === "text") {

			if (dataType === "phone") {
				return /^(\d{3,4})-?(\d{4})$/.test($obj.val());
			} else {
				if (newTrim($obj.val()).length > 0) {
					resultFlag = true;
				}
			}

		} else if (iptType === "checkbox") {

			if ($obj.prop("checked")) {
				resultFlag = true;
			}

		} else if (iptType === "radio") {

			$('input[name=' + $obj.attr("name") + ']')
				.each(function (innerIndex, innerObj) {
					if ($(innerObj).prop("checked")) {
						resultFlag = true;
						return false;
					}
				});


		} else if (iptType === "password") {

			if (newTrim($obj.val()).length > 0) {
				resultFlag = true;
			}

		}

	} else if (tagName === "SELECT") {

		if (Number($obj.val()) !== unselectedVal) {
			resultFlag = true;
		}

	}

	return resultFlag;
}