import 'es6-promise/auto';

import Vue from 'vue'
import VueRouter from 'vue-router';
import VueTouch from 'vue-touch';

import App from './components/App.vue';
import routes from './routes';
import store from './store';

Vue.use(VueRouter);
Vue.use(VueTouch);

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

window.addEventListener('touchmove', e => e.preventDefault());
