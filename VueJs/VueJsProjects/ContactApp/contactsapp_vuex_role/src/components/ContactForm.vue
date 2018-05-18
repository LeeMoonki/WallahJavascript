<template>
<div class="modal">
    <div class="form" @keyup.esc="cancelEvent">
        <h3 class="heading">:: {{ headingText }}</h3>
        <div v-if="mode=='update'" class="form-group">
            <label>일련번호</label>
            <input type="text" name="no" class="long" disabled v-model="contact.no">
        </div>
        <div class="form-group">
            <label>이름</label>
            <input type="text" name="name" class="long" v-model="contact.name" ref="name" placeholder="이름을 입력하세요">
        </div>
        <div class="form-group">
            <label>전화번호</label>
            <input type="text" name="tel" class="long" v-model="contact.tel" placeholder="전화번호를 입력하세요">
        </div>
        <div class="form-group">
            <label>주소</label>
            <input type="text" name="address" class="long" v-model="contact.address" placeholder="주소를 입력하세요">
        </div>
        <div class="form-group">
            <div>&nbsp;</div>
            <input type="button" class="btn btn-primary" v-bind:value="btnText" @click="submitEvent()">
            <input type="button" class="btn btn-primary" value="취 소" @click="cancelEvent()">
        </div>
    </div>
</div>
</template>

<script>
    import Constant from '../constant.js';
    import { mapState } from 'vuex';
    import _ from 'underscore';

    export default {
        name: "contactForm",
        computed: _.extend({
            btnText: function() {
                if (this.mode != 'update') return '추 가';
                else return '수 정';
            },
            headingText: function() {
                if (this.mode != 'update') return '새로운 연락처 추가'
                else return '연락처 변경';
            }
            },
            mapState([ 'mode', 'contact' ])
        ),
        mounted: function() {
            this.$refs.name.focus();
        },
        methods: {
            submitEvent: function() {
                if (this.mode == "update") {
                    this.$store.dispatch(Constant.UPDATE_CONTACT);
                } else {
                    this.$store.dispatch(Constant.ADD_CONTACT);
                }
            },
            cancelEvent: function() {
                this.$store.dispatch(Constant.CANCEL_FORM);
            }
        }
    }
</script>

<style scoped>
    .modal { display:block;position:fixed;z-index:1;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:rgb(0,0,0);background-color:rgba(0,0,0,0.4); }
    .form { background-color:white;margin:100px auto;max-width:400px;min-width:200px;font-size:13px;font-family:"verdana";padding:10px; }
    .form div { padding:0;display:block;margin-top:10px; }
    .form label { text-align:left;margin-bottom:3px;padding:0;display:block;font-weight:bold; }
    .form input, textarea, select { box-sizing:border-box;border:1px solid #bebebe;padding:7px;margin:0;outline:none; }
    .form .long { width:100%; }
    .form .button { background-color:#2b798d;padding:8px 15px;border:none;color:#fff; }
    .form .button:hover { background-color:$4691a4; }
    .form .heading { background-color:#33a17f;font-weight:300;text-align:left;padding:20px;color:#fff;margin:5px 0 30px 0;padding:10px;min-width:200px;max-width:400px; }
</style>