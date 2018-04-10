// - The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'
import VueFire from 'vuefire'
import * as filters from './utils/filters'

Vue.config.productionTip = false

Object.keys(filters).forEach(filterName => {
  Vue.filter(filterName, filters[filterName])
})

Vue.use(VueResource)
Vue.use(VeeValidate)
Vue.use(VueFire)

Vue.http.options.root = process.env.API

Vue.router = router

Vue.use(require('@websanova/vue-auth'), {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/vue-resource.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  rolesVar: 'role',
  loginData: {url: 'authenticate?panel-trainer', method: 'POST', redirect: '/', fetchUser: true},
  fetchData: {url: 'account', method: 'GET'},
  refreshData: {url: 'api/auth/refresh', method: 'GET', enabled: false},
  parseUserData: (data) => {
    return data || {}
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
