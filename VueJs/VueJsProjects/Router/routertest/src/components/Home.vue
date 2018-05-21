<template>
    <div>
        <h1>Home</h1>
    </div>
</template>
<script>
    export default {
        name: "home",
        created: function () {
            console.log(this.$route);
        }
    }
</script>