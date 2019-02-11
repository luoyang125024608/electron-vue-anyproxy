import Vue from 'vue'
import Router from 'vue-router'
import network from '@/pages/network.vue'
import setting from '@/pages/setting.vue'
import ruleIndex from '@/pages/rule/index.vue'
import ruleEdit from '@/pages/rule/rule-edit.vue'
import ruleList from '@/pages/rule/rule-list.vue'

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
    },
    {
      path: '/rule',
      name: 'rule',
      component: ruleIndex,
      children: [
        {
          path: 'edit/:id',
          component: ruleEdit,
          name: 'rule-edit'
        },
        {
          path: 'add',
          component: ruleEdit,
          name: 'rule-add'
        },
        {
          path: 'list',
          component: ruleList,
          name: 'rule-list'
        }
      ]
    }
  ]
})
