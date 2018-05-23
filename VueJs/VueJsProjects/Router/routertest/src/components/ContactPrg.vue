<!-- 프로그래밍 방식의 라우팅 제어 -->
<template>
    <div>
        <h1>Contact</h1>
        <div class="wrapper">
            <div class="box" v-for="c in contacts" :key="c.no" style="background-color:#dedede;">
                <span @click="navigate(c.no)" style="cursor:pointer;">[ {{ c.name }} ]</span>
            </div>
        </div>
        <!-- Contact.vue에서 자식 컴포넌트인 ContactByNo 컴포넌트를 렌더링하여 보여줌 -->
        <router-view></router-view>
    </div>
</template>
<script>
    import contactlist from '../ContactList.js'

    export default {
        name: "contactprg",
        data: function () {
            return {
                contacts: contactlist.contacts
            };
        },
        created: function () {
            console.log(this.$route);
        },
        methods: {
            navigate(no) {
                if (confirm("상세 정보를 보시겠습니까?")) {
                    this.$router.push({ name: 'contactbyno1', params: { no: no }, query: { pageno:1, paegsize:no } }, function() {
                        console.log("/contactsprg/" + no + " 로 이동 완료!");
                    });
                }
            }
        }
    }
</script>

<style>
    .wrapper { background-color:#fff;clear:both;display:table; }
    .box { float:left;background-color:aqua;border-radius:5px;padding:10px;margin:3px;text-align:center;font-size:120%;width:100px;font-weight:bold; }
    a:link, a:visited { text-align:center;text-decoration:none;display:inline-block; }
</style>