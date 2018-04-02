<!--
    ScopedSlot.vue는 자식 컴포넌트이지만 자체 x, y 데이터를 갖고있다.
    이 데이터는 텍스트 필드에 v-model 디렉티브로 바인딩되어 있기 때문에
    사용자가 값을 변경하는 경우 데이터 옵션에 즉시 반영된다.

    하지만 자식 컴포넌트의 x, y 데이터를 부모 컴포넌트로 전달하여 부모 컴포넌트에서
    출력 형식을 지정하기 원할 때가 있다.
    이런 경우 범위 슬롯(Scoped Slot)이 사용될 수 있다.
    여기에서는 cx, cy라는 이름의 속성으로 부모 컴포넌트 쪽에 전달한다.

    부모 컴포넌트에서는 각각 p1, p2라는 이름으로 자식 컴포넌트로부터 속성을 전달받는다.
    p1, p2는 해당 template 안에서만 사용할 수 있다. 
    그렇기 때문에 범위 슬롯이라는 이름을 사용하는 것이다.
    이 범위 슬롯을 이용해 자식 컴포넌트를 통해 출력할 내용을
    부모 컴포넌트 측에서 직접 조작할 수 있다.
-->
<template>
    <div class="parent">
        <child>
            <template slot="type1" slot-scope="p1">
                <div>{{ p1.cx }} + {{ p1.cy }} = {{ parseInt(p1.cx) + parseInt(p1.cy) }}</div>
            </template>
            <template slot="type2" slot-scope="p2">
                <div>{{ p2.cx }} 더하기 {{ p2.cy }} 는 {{ parseInt(p2.cx) + parseInt(p2.cy) }} 입니다.</div>
            </template>
        </child>
    </div>
</template>
<script>
    import Child from "./components/ScopedSlot.vue"

    export default {
        components: { Child }
    }
</script>
<style>
    .parent { border:2px dashed black;padding:5px; }
</style>