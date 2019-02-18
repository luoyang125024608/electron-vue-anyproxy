<template>
  <a-layout class="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider
      collapsible
      v-model="collapsed"
    >
      <div class="logo overflow-hide">
        <span class="white bold" v-if="collapsed">E V A</span>
        <span class="white bold" v-else>Electron Vue Anyproxy</span>
      </div>
      <div class="text-center mb-5">
        <div class="circles" :class="[ serverRunStatus? 'active':'stop' ]">
          <span class="circle1"></span>
          <span class="circle2"></span>
          <span class="circle3"></span>
          <span class="circle4"></span>
          <span class="circle5"></span>
          <span class="circle6"></span>
          <span class="circle7"></span>
        </div>
      </div>
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
        serverRunStatus: false,
        collapsed: false
      }
    },
    created () {
      this.$bus.$on('serverRunStatus', (bool) => {
        this.serverRunStatus = bool
      })
    }
  }
</script>

<style lang="scss">
  .components-layout-demo-side .logo {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
</style>
<style lang="less">
  @keyframes lightBulb {
    from {
      opacity: 1
    }
    to {
      opacity: 0.1
    }
  }

  @total-duration: 5s;
  @single-duration: 0.7s;
  .circles {
    display: inline-block;

    span {
      display: block;
      float: left;
      width: 3px;
      height: 3px;
      background-color: #10A1FF;
      margin: 0 4px;
      border-radius: 50%;
      opacity: 0.3;
    }

    &.stop {
      .circle1, .circle7 {
        opacity: 0.2;
      }

      .circle2, .circle6 {
        opacity: 0.4;
      }

      .circle3, .circle5 {
        opacity: 0.8;
      }

      .circle4 {
        opacity: 1;
      }
    }

    &.active {
      span {
        animation: lightBulb @total-duration infinite;
      }

      .circle7 {
        animation-delay: (1*@single-duration);
      }

      .circle6 {
        animation-delay: (2*@single-duration);
      }

      .circle5 {
        animation-delay: (3*@single-duration);
      }

      .circle4 {
        animation-delay: (4*@single-duration);
      }

      .circle3 {
        animation-delay: (5*@single-duration);
      }

      .circle2 {
        animation-delay: (6*@single-duration);
      }

      .circle1 {
        animation-delay: (7*@single-duration);
      }
    }
  }
</style>
