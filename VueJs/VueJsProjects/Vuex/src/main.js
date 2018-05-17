import Vue from 'vue'
import store from './store'
import TodoList from './components/TodoList.vue'

// Vue 인스턴스에 store를 주입
new Vue({
  store,
  el: '#app',
  render: h => h(TodoList)
})
