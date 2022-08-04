import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Router  from 'vue-router'
import './plugins/bootstrap'
import './plugins/axios'

Vue.config.productionTip = false
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      // name: "root",
      component: App
    }
  ]
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
