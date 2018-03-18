<template>
    <div id="app">
        <layout>
            <h1 slot="header">헤더 영역</h1>

            <div slot="sidebar">
                <ul class="menu">
                    <li v-for="sidebar in sidebars">
                        <a :href="sidebar.link">{{ sidebar.menu }}</a>
                    </li>
                </ul>
            </div>

            <div slot="content">
                <h2>컨텐트 영역</h2>
                <p>동해물과 백두산이 마르고 닳도록, 하느님이 보우하사 우리나라 만세</p>
                <p>동해물과 백두산이 마르고 닳도록, 하느님이 보우하사 우리나라 만세</p>
                <p>동해물과 백두산이 마르고 닳도록, 하느님이 보우하사 우리나라 만세</p>
                <p>동해물과 백두산이 마르고 닳도록, 하느님이 보우하사 우리나라 만세</p>
                <p>동해물과 백두산이 마르고 닳도록, 하느님이 보우하사 우리나라 만세</p>
            </div>

            <p slot="footer">Footer text</p>
        </layout>
    </div>
</template>

<script>
    import Layout from './components/NamedSlot.vue';

    export default {
        data() {
            return {
                sidebars: [
                    { menu: "Home", link: "#" },
                    { menu: "About", link: "#" },
                    { menu: "Contact", link: "#" },
                    { menu: "Vue.js", link: "#" }
                ]
            };
        },
        components: { Layout }
    }
</script>