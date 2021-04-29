import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 初始化EventBus为vue实例对象
Vue.prototype.$EventBus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
