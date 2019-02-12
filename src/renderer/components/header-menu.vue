<style scoped lang="scss">
</style>

<template>
  <div class="flex flex-align-center full-height">
    <a-button type="primary" icon="play-circle" @click="proxyStart()">启动</a-button>
  </div>
</template>

<script>
  import proxyApi from '@/lib/proxy/proxy-api'
  import { mapState } from 'vuex'

  export default {
    components: {},
    name: 'header-menu',
    data () {
      return {}
    },
    created () {
      this.proxyInit()
    },
    methods: {
      async proxyInit () {
        await this.$store.dispatch('INIT_PROXY_RULE')
        let ruleIds = this.rulesData.filter(rule => rule.enable).map(rule => rule.id)
        proxyApi.init(ruleIds)
      },
      proxyStart () {
        proxyApi.start((item) => {
          this.$bus.$emit('updateList', item)
        })
      }
    },
    computed: {
      ...mapState({
        rulesData: state => state.rule.proxy_rules
      })
    }
  }
</script>
