<!--
    <style module></style> 의 스타일은 Vue 인스턴스 내에서 $style 이라는 계산형 속성(Computed Property)을
    통해서 이용할 수 있다.

    여러개의 CSS 클래스를 적용하고 싶다면 배열 문법을 통해 한 번에 적용시킬 수 있다.
-->
<template>
    <div>
        <button :class="$style.hand">CSS Module을 적용한 버튼</button>
        <div :class="[$style.box, $style.border]"></div>
    </div>
</template>
<script>
    export default {
        created() {
            console.log(this.$style);
        }
    }
</script>

<style module>
    .hand { cursor:pointer; background-color:purple; color:yellow; }
    .box { width: 200px; height: 150px; }
    .border { border: 3px solid #e0f872; }
</style>