// axios를 이용해 접근할 URL을 미리 상수로 정의한다.
// 이렇게 상수로 정의하면 URL이 변경되더라도 신속하게 유지보수할 수 있다.

var BASE_URL = "/api";

export default {
    // 한 페이지에 보여줄 페이지 사이즈
    PAGESIZE: 5,
    // 전체 연락처 데이터 요청
    FETCH: BASE_URL + "/contacts",
    // 연락처 추가
    ADD: BASE_URL + "/contacts",
    // 연락처 업데이트
    UPADTE: BASE_URL + "/contacts/${no}",
    // 연락처 한 건 조회
    FETCH_ONE: BASE_URL + "/contacts/${no}",
    // 연락처 삭제
    DELETE: BASE_URL + "/contacts/${no}",
    // 연락처 사진 업로드 -> 변경
    UPDATE_PHOTO: BASE_URL + "/contacts/${no}/photo"
}