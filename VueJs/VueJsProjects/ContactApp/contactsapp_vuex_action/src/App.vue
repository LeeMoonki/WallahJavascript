<template>
    <div>
        <search placeholder="두 글자 이상 입력 후 엔터"></search>
        <contact-list></contact-list>
    </div>
</template>

<script type="text/javascript">
    import ContactList from './components/ContactList.vue';
    import Search from './components/Search.vue';

    export default {
        name: 'app',
        components: { ContactList, Search }
    }
</script>

<style></style>