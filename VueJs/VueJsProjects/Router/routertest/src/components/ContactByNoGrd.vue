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

    // 

    export default {
        name: 'contactbynogrd',
        data: function() {
            return {
                no: 0,
                contacts: contactlist.contacts
            };
        },
        created: function() {
            console.log('-- ContactByNoGrd.vue --');
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
        beforeRouteEnter(to, from, next) {
            // beforeRouteEnter 와 beforeRouteLeave 는 한 번씩만 호출된다.
            // beforeRouteEnter는 최초 ContactByNoGrd --> ContactByNoGrd 변경시 호출 된다

            console.log("** beforeRouteEnter **");
            next((vm) => {
                // 만약 beforeRouteEnter 에서 Vue 인스턴스를 이용하고 싶다면
                // 콜백 함수를 이용해 비동기 처리를 수행해야 한다
                console.log(">> Vue instance : ", vm);
            });
        },
        beforeRouteUpdate(to, from, next) {
            // 이미 렌더링된 컴포넌트의 경로가 변경될 때 호출되는 훅 (이 ContactByNoGrd --> ContactByNoGrd 변경시 호출)
            // 이미 현재 컴포넌트의 Vue 인스턴스가 만들어져 있어서 재사용될 때는 beforeRouteEnter 훅은 호출되지 않고
            // beforeRouteUpdate 훅이 호출된다.
            // 이 훅 대신에 $route 옵션에 대해 관찰 속성(watched property)을 사용할 수 있다.
            // (ContactByNo.vue 참고)

            console.log("** brforeRouteUpdate **");
            console.log(">> beforeRouteUpdate this : ", this);
            this.no = to.params.no;
            next();
        },
        beforeRouteLeave(to, from ,next) {
            // 현재 경로에서 다른 경로로 빠져나갈 때 호출되는 훅
            // ContactGrd 에서 다른 경로로 빠져나가면 호출
            console.log("** beforeRouteLeave **");
            next();
        }
    }
</script>

<style>
    table.detail { margin-top:10px;width:400px; }
    .divider { height:3px;margin:0 auto;background-color:#ff0066;color:#ff0066;border:0; }
</style>