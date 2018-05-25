<template>
  <div>
    <div class="header">
      <h1 class="headerText">(주)OpenSG</h1>
      <nav>
        <ul>
          <li><router-link :to="{ name: 'home' }">Home</router-link></li>
          <li><router-link :to="{ name: 'about' }">About</router-link></li>
          <li><router-link to="/contacts">Contacts</router-link></li>
          <li><router-link to="/contactsprg">ProgrammingRoute</router-link></li>
          <li><router-link to="/contactsgrd">NavigationGuard</router-link></li>
          <li><router-link :to="{ name: 'contactsparam' }">RouteInfoParam</router-link></li>
        </ul>
      </nav>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Home from './components/Home.vue';
  import About from './components/About.vue';
  import Contacts from './components/Contact.vue';
  import Contacts1 from './components/Contact1.vue';
  import ContactsPrg from './components/ContactPrg.vue'
  import ContactsGrd from './components/ContactGrd.vue';
  import ContactByNo from './components/ContactByNo.vue';
  import ContactByNoGrd from './components/ContactByNoGrd.vue';
  import ContactByNoParam from './components/ContactByNoParam.vue';
  import NotFound from './components/NotFound.vue';

  import VueRouter from 'vue-router';

  // mode의 default 값은 browswer에서 hash, node.js 에서 abstract 이다. 
  // 이 둘은 URL Hash를 이용하여 전체 URL을 simulate 하므로 URL이 변경될 때 페이지가 다시 로드되지 않는다
  // Hash모드인 상태에서 개발자도구를 열어 Network를 살펴보면 URL입력을 통한 페이지 이동간에 네트워크 발생이 없다

  // Hash를 지우기위해 mode를 history로 수정한다
  // 그리고 URL을 수정하여 페이지를 이동해보면 네트워크가 발생하고 페이지가 로드된다
  // 이 경우 라우트가 존재하지 않아도 오류가 발생하지 않는다. 따라서 별도 처리를 해줘야 한다.

  const router = new VueRouter({
    mode: 'history',
    routes: [
      { path: '/', component: Home },
      { path: '/home', name: 'home', component: Home },
      { path: '/about', name: 'about', component: About },
      { path: '/contacts', name: 'contacts', component: Contacts,
        children: [
          { path: ':no', name: 'contactbyno', component: ContactByNo }
        ] 
      },
      { path: '/contactsprg', name: 'contactsprg', component: ContactsPrg,
        children: [
          { path: ':no', name: 'contactbyno1', component: ContactByNo }
        ] 
      },
      { path: '/contactsgrd', name: 'contactsgrd', component: ContactsGrd,
        children: [
          { path: ':no', name: 'contactbynogrd', component: ContactByNoGrd,
            beforeEnter: (to, from, next) => {
              // 렌더링하는 라우트 이전에 호출되는 훅이다.
              // 이 훅이 호출되는 시점에는 Vue 인스턴스가 만들어지지 않았기 때문에 this를 이용할 수 없다
              console.log("@@ beforeEnter! : " + from.path + " --> " + to.path);
              console.log("'this' at beforeEnter : ", this);
              if (from.path.startsWith("/contactsgrd")) next();
              else next("/home");
            }
          }
        ] 
      },
      { path: '/contactsparam', name: 'contactsparam', component: Contacts1,
        children: [
          { path: ':no', name: 'contactbynoparam', component: ContactByNoParam, props: true }
        ]
      },
      { path: '*', component: NotFound }
    ]
  });

  // props: true
  // 로 설정함으로써 URI 경로상의 :no 값이 해당 컴포넌트의 속성(props)로 전달된다

  router.beforeEach((to, from, next) => {
    console.log("\n** beforeEach **");
    next();
  });

  router.afterEach((to, from) => {
    console.log("** afterEach **");
  });

  export default {
    name: 'app',
    router
  }

  // Navigation Guard 순서
  // 1. 네비게이션 시작
  // 2. 비활성화된 컴포넌트가 있다면 Guard 기능 호출
  // 3. 전역 수준의 beforeEach 호출
  // 4. 재사용되는 컴포넌트의 beforeRouteUpdate 훅 호출
  // 5. 라우트 전보 수준의 beforeEnter 호출
  // 6. 활성화된 컴포넌트에서 beforeRouteEnter 훅 호출
  // 7. 네비게이션 완료
  // 8. 전역 afterEach 훅 호출
  // 9. DOM 갱신 trigger
  // 10. 인스턴스들의 beforeRouteEnter 훅에서 next에 전달된 콜백 호출(콜백 사용시에만)
</script>

<style>
  @import url("https://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.css");

  .header { background-color:aqua;padding-top:10px; }
  .headerText { padding:0px 20px; }
  ul { list-style-type:none;margin:0;padding:0;overflow:hidden;background-color:purple; }
  li { float:left; }
  li a { display:block;color:yellow;text-align:center;padding:14px 16px;text-decoration:none; }
  li a:hover { background-color:aqua;color:black; }
</style>