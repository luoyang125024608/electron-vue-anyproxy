<style scoped lang="scss">
</style>

<template>
  <div class="flex flex-align-center full-height">
    <a-button type="primary" icon="play-circle" @click="init()">启动</a-button>
  </div>
</template>

<script>
  import proxyApi from '@/lib/proxy/proxy-api'

  export default {
    components: {},
    name: 'header-menu',
    data () {
      return {}
    },
    methods: {
      init () {
        proxyApi.init()
        proxyApi.start((item) => {
          this.$bus.$emit('updateList', item)
        })
      }
    },
    computed: {}
  }
</script>
