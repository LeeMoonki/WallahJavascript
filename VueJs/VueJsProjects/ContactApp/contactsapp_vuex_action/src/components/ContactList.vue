<template>
    <div>
        <table id="list">
            <thead>
                <tr>
                    <th>번호</th><th>이름</th><th>전화번호</th><th>주소</th>
                </tr>
            </thead>
            <tbody id="contacts">
                <tr v-for="c in contacts">
                    <td>{{ c.no }}</td>
                    <td>{{ c.name }}</td>
                    <td>{{ c.tel }}</td>
                    <td>{{ c.address }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script type="text/javascript">
    import { mapState } from 'vuex';

    export default {
        name: 'contact-list',
        computed: mapState([ 'contacts' ])
    }
</script>

<style scoped>
    #list { width:600px;border:1px solid #000;border-collapse:collapse; }
    #list td, #list th { border:1px solid #000;text-align:center; }
    #list > thead > tr { color:yellow;background-color:purple; }
</style>