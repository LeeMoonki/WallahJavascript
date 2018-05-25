<template>
    <div>
        <p class="addnew">
            <router-link class="btn btn-primary" :to="{ name: 'addcontact' }">
                새로운 연락처 추가하기
            </router-link>
        </p>
        <div id="example">
            <table id="list" class="table table-striped table-bordered table-hover">
                <colgroup>
                    <col style="width:200px;">
                    <col style="width:150px;">
                    <col style="width:250px;">
                    <col style="width:60px;">
                    <col style="width:150px;">
                </colgroup>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>전화번호</th>
                        <th>주소</th>
                        <th>사진</th>
                        <th>편집/삭제</th>
                    </tr>
                </thead>
                <tbody id="contacts">
                    <tr v-for="c in contactlist.contacts" :key="c.no">
                        <td>{{ c.name }}</td>
                        <td>{{ c.tel }}</td>
                        <td>{{ c.address }}</td>
                        <td><img class="thumbnail" :src="c.photo" @click="editPhoto(c.no)"></td>
                        <td>
                            <button class="btn btn-primary" @click="editContact(c.no)">편집</button>
                            <button class="btn btn-primary" @click="deleteContact(c.no)">삭제</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <paginate ref="pagebuttons"
        :page-count="totalpage"
        :page-range="7"
        :margin-pages="3"
        :click-handler="pageChanged"
        :prev-text="'이전'"
        :next-text="'다음'"
        :container-class="'pagination'"
        :page-class="'page-item'">
        </paginate>
        <router-view></router-view>
    </div>
</template>
<script>
    import Constant from '../constant.js';
    import { mapState } from 'vuex';
    import Paginate from 'vuejs-paginate';
    import _ from 'underscore';

    // beforeRouteUpdate(to, from, next) {
    //     if (to.query.page && to.query.page != this.contactlist.pageno) {
    //         var page = to.query.page;
    //         this.$store.dispatch(Constant.FETCH_CONTACTS, { pageno:page });
    //         this.$refs.pagebuttons.selected = page - 1;

    //         next();
    //     }
    // },

    // watch 대신 beforeRouteUpdate를 사용하게되면 
    // contactlist route의 경우 정상동작 하지만
    // 다른 route로 이동하려는 경우 막혀버린다. 
    // 왜냐하면 next()에 대해 조건이 걸려있기 때문인데, 
    // 위에 있는 next()에 대한 조건문은 contactlist를 위한 조건문이라
    // 의도치 않게 다른 component의 route를 막아버린다
    // 따라서 watch 대신 beforeRouteUpdate를 사용하고자 하면 조건문을 수정해야 한다

    export default {
        name: 'contactList',
        components: { Paginate },
        computed: _.extend( 
            {
                totalpage: function() {
                    var totalcount = this.contactlist.totalcount;
                    var pagesize = this.contactlist.pagesize;
                    return Math.floor((totalcount - 1) / pagesize) + 1;
                }
            }, 
            mapState([ 'contactlist' ])
        ),
        mounted: function() {
            var page = 1;
            if (this.$route.query && this.$route.query.page) {
                page = this.$route.query.page - 0;
            }
            this.$store.dispatch(Constant.FETCH_CONTACTS, { pageno: page });
            this.$refs.pagebuttons.selected = page - 1;
        },
        watch: {
            '$route': function(to, from) {
                if (to.query.page && to.query.page != this.contactlist.pageno) {
                    var page = to.query.page;
                    this.$store.dispatch(Constant.FETCH_CONTACTS, { pageno:page });
                    this.$refs.pagebuttons.selected = page - 1;
                }
            }
        },
        methods: {
            pageChanged: function(page) {
                this.$router.push({ name: 'contacts', query: { page: page } });
            },
            editContact: function(no) {
                console.log("$route : ", this.$route);
                console.log("$router : ", this.$router);
                //this.$router.push({ name: 'updatecontact', params: { no: no } });
            },
            deleteContact: function(no) {
                if (confirm("정말로 삭제하시겠습니까?")) {
                    this.$store.dispatch(Constant.DELETE_CONTACT, { no: no });
                    this.$router.push({ name: 'contacts' });
                }
            },
            editPhoto: function(no) {
                this.$router.push({ name: 'updatephoto', params: { no: no } });
            }
        }
    }
</script>
<style>
    .addnew { margin:10px auto;max-width:820px;min-width:820px;padding:40px 0 0 0;text-align:left; }
    #example { margin:10px auto;max-width:820px;min-width:820px;padding:0;position:relative;font-size:13px;font-family:"verdana"; }
    #example .long { width:100%; }
    #example .short { width:50%; }
    #example input, textarea, select { box-sizing:border-box;border:solid 1px #bebebe;padding:7px;margin:0; }
    #list { width:800px;font-size:13px;font-family:"verdana"; }
    #list thead tr { color:yellow;background-color:purple; }
    #list th { padding:10px 5px; }
    #list tr { border-bottom:1px solid black; }
    #list td, #list th { text-align:center;vertical-align:middle; }
    img.thumbnail { width:48px;height:48px;margin-top:auto;margin-bottom:auto;display:block;cursor:pointer; }
</style>