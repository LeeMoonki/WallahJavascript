<!--
  <component> 요소를 <template>에 작성하고 v-bind 디렉티브를 이용해
  is 특성값으로 어떤 컴포넌트를 그 위에 나타낼지 결정하면 된다.
-->
<template>
    <div>
      <div class="header">
        <h1 class="headerText">(주) VueStudy</h1>
        <nav>
          <ul>
            <li><a href="#" @click="changeMenu('home')">Home</a></li>
            <li><a href="#" @click="changeMenu('about')">About</a></li>
            <li><a href="#" @click="changeMenu('contact')">Contact</a></li>
          </ul>
        </nav>
      </div>

      <!--
        다음 동적 컴포넌트를 살펴보면 메뉴를 클릭할 때마다 출력되는 시간 정보가 변경되는 것을 볼 수 있다.
        이것은 해당 컴포넌트를 만들어내는 작업을 매번 한다는 것이다.
      -->
      <div class="container">
        <component :is="currentView"></component>
      </div>
      <!--
        만약 <component>로 표현될 자식 컴포넌트들이 정적 콘텐츠라면 매번 실행되는 것은 효율적이지 않다.
        이런 경우에는 <component>를 <keep-alive> 요소로 감싸서 캐싱하면 된다.
        만일 특정 컴포넌트만 캐싱하거나 캐싱하고 싶지 않다면 include, exclude 특성을 콤마로 구분하여 나열하면 된다.
        (콤마사이에 띄어쓰기를 하면 안되고 이름의 대소문자를 구분한다)
        이때 컴포넌트마다 지정된 이름이 있어야 하므로 각 컴포넌트마다 name 옵션을 부여해야한다.
      -->
      <div class="container">
        <keep-alive include="name_about,name_home">
          <component :is="currentView"></component>
        </keep-alive>
      </div>
    </div>
</template>
<script>
  import Home from "./components/Home.vue"
  import About from "./components/About.vue"
  import Contact from "./components/Contact.vue"

  export default {
    components: { Home, About, Contact },
    data() {
      return { currentView: "home" }
    },
    methods: {
      changeMenu(view) {
        this.currentView = view;
      }
    }
  }
</script>
<style scoped>
  .header { background-color:aqua;padding-top:10px; }
  .headerText { padding:0 20px; }
  ul { list-style-type:none;margin:0;padding:0;overflow:hidden;background-color:purple; }
  li { float:left; }
  li a { display:block;color:yellow;text-align:center;padding:14px 16px;text-decoration:none; }
  li a:hover { background-color: aqua;color:black; }
</style>