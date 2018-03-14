<template>
    <div class="main">{{ msg }}</div>
</template>
<script>
    export default {
        name: "child2",
        data () {
            return {
                msg: "Child2"
            }
        }
    }
</script>
<!-- scoped를 적용하지 않으면 서도 다른 컴포넌트에서 같은 이름의 스타일을 갖고있고, 같은 부모에서 사용되면 -->
<!-- 각각 정의된 스타일이 적용되는 것이 아니라 어느 하나의 스타일이 동일하게 적용된다. -->
<style scoped>
.main { border: 1px solid black; background-color: aqua; }
</style>