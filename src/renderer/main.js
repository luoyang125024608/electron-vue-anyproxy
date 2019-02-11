import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/style/common.scss'
import { Button, message, notification, Modal } from 'ant-design-vue'
import bus from './lib/bus'

Vue.use(Button)
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$bus = bus
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
