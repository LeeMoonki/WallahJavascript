<template>
    <div class="main">{{ msg }}</div>
</template>
<script>
    export default {
        name: "child1",
        data () {
            return {
                msg: "Child1"
            }
        }
    }
</script>
<style scoped>
.main { border: 1px solid black; background-color: yellow; }
</style>