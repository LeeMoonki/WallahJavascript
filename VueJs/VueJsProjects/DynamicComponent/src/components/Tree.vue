<!--
    Tree 컴포넌트에서는 subs 속성(props)를 정의해서 보여줄 데이터를 받아온다.
    서브 목록에 다시 subs 속성이 있다면 이것을 다시 Tree 컴포넌트에 전달하여 하위 트리를 출력하도록 한다.
    주의할 점은 재귀 참조를 위해 name 옵션을 정의하고 이 옵션을 이용해 재귀적으로 참조해야 한다.
-->
<template>
    <ul>
        <li v-for="s in subs" :class="s.type">
            {{ s.name }}
            <tree :subs="s.subs"></tree>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "tree",
        props: ["subs"]
    }
</script>