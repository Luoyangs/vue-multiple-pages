import Vue from 'vue'
import App from './app.vue'
import store from '../../store'

new Vue({
  store,
  render: h => h(App)
}).$mount('#root')
