import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/style/common.scss'
import { Button } from 'ant-design-vue'
import bus from './lib/bus'

Vue.use(Button)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
Vue.prototype.$bus = bus
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
