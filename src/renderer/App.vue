<template>
  <layout id="app">
    <header-menu slot="header"></header-menu>
    <router-view slot="content"></router-view>
  </layout>
</template>

<script>
  import layout from './components/layout'
  import headerMenu from './components/header-menu'

  export default {
    components: { layout, headerMenu },
    name: 'http-toolkit'
  }
</script>

<style>
  /* CSS */
</style>
