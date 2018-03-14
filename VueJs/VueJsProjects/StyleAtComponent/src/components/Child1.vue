<template>
    <div class="main test">
        {{ msg }}
        <child11 />
        {{ msg }}
    </div>
</template>
<script>
    import Child11 from "./Child11.vue"

    export default {
        name: "child1",
        components: { Child11 },
        data () {
            return {
                msg: "Child1"
            }
        }
    }
</script>
<!-- 부모 컴포넌트(Child1)에 적용된 Scoped CSS가 하위 컴포넌트에도 반영된다. -->
<!-- 부모의 data-v-xxxxxx 속성이 자식 컴포넌트에 반영된 것을 확인할 수 있다. -->
<style scoped>
.main { border: 1px solid black; background-color: yellow; }
.test { padding: 10px; text-decoration: underline; border: 1px solid black; }
</style>