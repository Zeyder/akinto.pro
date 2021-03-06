import 'es6-promise/auto'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import Vue2TouchEvents from 'vue2-touch-events'

import App from './components/App.vue'
import routes from './routes'

import _cloneDeep from 'lodash/cloneDeep'

Vue.use(Vue2TouchEvents)
Vue.use(VueRouter)
Vue.use(VeeValidate)

Vue.config.productionTip = false

Vue.prototype.$appContent = _cloneDeep(window.$appContent || {})

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')