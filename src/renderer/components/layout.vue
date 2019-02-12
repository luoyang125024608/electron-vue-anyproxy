<template>
  <a-layout class="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider
      collapsible
      v-model="collapsed"
    >
      <div class="logo"></div>
      <a-menu theme="dark" :defaultSelectedKeys="['1']" mode="inline">
        <a-menu-item key="1">
          <router-link to="/">
            <a-icon type="pie-chart"></a-icon>
            <span>抓包列表</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/rule/list">
            <a-icon type="desktop"></a-icon>
            <span>拦截修改</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="9">
          <router-link to="/setting">
            <a-icon type="setting"></a-icon>
            <span>设置</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff;">
        <slot name="header"></slot>
      </a-layout-header>
      <a-layout-content style="margin: 16px">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <slot name="content"></slot>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
  import { Layout, Icon, Menu } from 'ant-design-vue'

  export default {
    name: 'layout',
    components: {
      [Layout.name]: Layout,
      [Layout.Header.name]: Layout.Header,
      [Layout.Footer.name]: Layout.Footer,
      [Layout.Sider.name]: Layout.Sider,
      [Layout.Content.name]: Layout.Content,
      [Icon.name]: Icon,
      [Menu.name]: Menu,
      [Menu.Item.name]: Menu.Item,
      [Menu.SubMenu.name]: Menu.SubMenu
    },
    data () {
      return {
        collapsed: false
      }
    }
  }
</script>

<style lang="scss">
  .components-layout-demo-side .logo {
    height: 32px;
    background: rgba(255, 255, 255, .2);
    margin: 16px;
  }
</style>
