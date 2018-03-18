<!--
  props는 단순한 값을 전달하는 경우에 사용이 편리하지만 HTML 마크업을 전달하기에는 불편하다.
  또한 여러개의 CSS 클래스를 적용하려면 이것들을 속성으로 하나씩 전달해야하고
  SpeechBox 컴포넌트에 많은 수의 props가 정의되어야 한다.

  반면 Slot을 이용하면 이 문제는 간단하게 해결된다.
  다음처럼 <speech-box></speech-box> 컴포넌트의 내용으로 전달한 태그들은 
  자식 컴포넌트의 <slot></slot>에 나타나게 된다.

  태그들을 한 번에 전달하므로 props에 비해 편리하다. 또한 CSS 클래스도
  직접 지정할 수 있으므로 개발자는 속성의 작성과 관리에 크게 신경쓰지 않아도 된다.
-->
<template>
  <div id="app">
    <speech-box :header-text="A.header" :footer-text="A.footer">
      <div>
        <p>
          {{ A.message }}
        </p>
      </div>
    </speech-box>
    <speech-box class="dinner" :header-text="B.header" :footer-text="B.footer">
      <div>
        <p class="dinner-content">
          {{ B.message }}
        </p>
      </div>
    </speech-box>
  </div>
</template>
<script>
  import SpeechBox from './components/SpeechBox.vue'

  export default { 
    name: 'app',
    components: { SpeechBox },
    data: function() {
      return {
        A: {
          header: "아침 인사",
          footer: "2018.01.01",
          message: "좋은 아침입니다."
        },
        B: {
          header: "저녁 인사",
          footer: "2018.01.02",
          message: "오늘 하루 고생했습니다."
        }
      };
    }
   }
</script>

<style scoped>
  .dinner { background-color: antiquewhite; }
  .dinner-content { text-decoration: underline; }
</style>