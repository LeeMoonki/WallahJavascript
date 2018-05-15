<template>
    <div>
        <p class="addnew">
            <button class="btn btn-primary" @click="addContact()">새로운 연락처 추가하기</button>
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
                    <tr v-for="c in contactlist.contacts">
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
    </div>
</template>
<script>
    import eventBus from "../EventBus.js";

    export default {
        name: 'contactList',
        props: [ 'contactlist' ],
        methods: {
            addContact: function () {
                eventBus.$emit("addContactForm");
            },
            editContact: function(no) {
                eventBus.$emit("editContactForm", no);
            },
            deleteContact: function(no) {
                if (confirm("정말 삭제하시겠습니까?") == true) {
                    eventBus.$emit('deleteContact', no);
                }
            },
            editPhoto: function(no) {
                eventBus.$emit("editPhoto", no);
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