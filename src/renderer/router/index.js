import Vue from 'vue'
import Router from 'vue-router'
import network from '@/pages/network.vue'
import setting from '@/pages/setting.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'network',
      component: network
    },
    {
      path: '/network',
      name: 'network',
      component: network
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting
    }
  ]
})
