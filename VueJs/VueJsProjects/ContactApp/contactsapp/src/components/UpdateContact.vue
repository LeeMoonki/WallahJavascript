<template>
    <contactForm mode="update" :contact="contact"></contactForm>
</template>

<script>
    import ContactForm from './ContactForm.vue'

    export default {
        name: "updateContact",
        components: { ContactForm },
        props: [ 'contact' ]
    }
</script>

<style>

</style>