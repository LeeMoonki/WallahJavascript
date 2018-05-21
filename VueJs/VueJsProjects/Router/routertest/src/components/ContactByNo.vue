<template>
    <div>
        <h1 class="divider"></h1>
        <div>
            <table class="detail table table-borderd">
                <tbody>
                    <tr class="active">
                        <td>일련번호</td>
                        <td>{{ contact.no }}</td>
                    </tr>
                    <tr class="active">
                        <td>이름</td>
                        <td>{{ contact.name }}</td>
                    </tr>
                    <tr class="active">
                        <td>전화</td>
                        <td>{{ contact.tel }}</td>
                    </tr>
                    <tr class="active">
                        <td>주소</td>
                        <td>{{ contact.address }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import contactlist from '../ContactList.js';

    export default {
        name: 'contactbyno',
        data: function() {
            return {
                no: 0,
                contacts: contactlist.contacts
            };
        },
        created: function() {
            console.log(this.$route);
            this.no = this.$route.params.no;
        },
        computed: {
            contact: function() {
                var no = this.no;
                var arr = this.contacts.filter(function(item, index) { return item.no == no; });
                if (arr.length == 1) return arr[0];
                else return {};
            }
        },
        watch: {
            '$route': function(to, from) {
                console.log("watch's to : ", to);
                console.log("watch's from : ", from);
                console.log("watch this.no : ", this.no);
                this.no = to.params.no;
            }
        }
    }
</script>

<style>
    table.detail { margin-top:10px;width:400px; }
    .divider { height:3px;margin:0 auto;background-color:#ff0066;color:#ff0066;border:0; }
</style>