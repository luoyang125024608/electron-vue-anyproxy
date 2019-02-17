<template>
  <layout id="app">
    <header-menu slot="header"></header-menu>
    <keep-alive slot="content">
      <router-view></router-view>
    </keep-alive>
  </layout>
</template>

<script>
  import layout from './components/layout'
  import headerMenu from './components/header-menu'

  export default {
    components: { layout, headerMenu },
    name: 'electron-vue-anyproxy'
  }
</script>

<style>
  /* CSS */
</style>
