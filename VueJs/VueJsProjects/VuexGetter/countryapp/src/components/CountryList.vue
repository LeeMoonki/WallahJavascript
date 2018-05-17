<template>
    <div id="example">
        <table id="list">
            <colgroup>
                <col style="width:100px;">
                <col style="width:150px;">
                <col style="width:150px;">
                <col style="width:120px;">
            </colgroup>
            <thead>
                <tr>
                    <th>번호</th>
                    <th>국가명</th>
                    <th>수도</th>
                    <th>지역</th>
                </tr>
            </thead>
            <tbody id="contacts">
                <tr v-for="c in countries">
                    <td>{{ c.no }}</td>
                    <td>{{ c.name }}</td>
                    <td>{{ c.capital }}</td>
                    <td>{{ c.region }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import Constant from '../Constant.js'
    import { mapGetters } from 'vuex'

    export default {
        name: 'CountryList',
        computed: mapGetters({
            countries: 'countriesByRegion'
        })
    }
</script>

<style>
    #list { width:520px;border:1px solid #000;border-collapse:collapse; }
    #list td, #list th { border:1px solid #000;text-align:center; }
    #list > thead > tr { color:yellow;background-color:purple; }
</style>