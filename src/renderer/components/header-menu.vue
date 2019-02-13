<style scoped lang="scss">
</style>

<template>
  <div class="flex flex-align-center full-height">
    <a-button v-if="proxyStatus==='off'" type="primary" icon="play-circle"
              @click="proxyStart()"
    >
      启动
    </a-button>
    <a-button v-if="proxyStatus==='on'" @click="proxyClose()"
              type="danger" icon="poweroff"
    >停止
    </a-button>
  </div>
</template>

<script>
  import proxyApi from '@/lib/proxy/proxy-api'
  import { mapState } from 'vuex'

  export default {
    components: {},
    name: 'header-menu',
    data () {
      return {
        proxyStatus: 'off'
      }
    },
    created () {
      this.proxyInit()
      this.$bus.$on('proxyReload', () => {
        this.proxyReload()
      })
    },
    methods: {
      async proxyInit () {
        await this.$store.dispatch('INIT_PROXY_RULE')
        let ruleIds = this.rulesData.filter(rule => rule.enable).map(rule => rule.id)
        proxyApi.init(ruleIds)
      },
      proxyStart () {
        proxyApi.proxyServer.once('ready', () => {
          this.proxyStatus = 'on'
          console.log('启动完成')
        })
        proxyApi.start((item) => {
          this.$bus.$emit('updateList', item)
        })
      },
      proxyClose () {
        this.proxyStatus = 'off'
        proxyApi.close()
      },
      async proxyReload () {
        let cacheStatus = this.proxyStatus
        if (cacheStatus === 'on') {
          this.proxyClose()
        }
        await this.proxyInit()
        if (cacheStatus === 'on') {
          this.proxyStart()
        }
      }
    },
    beforeDestroy () {
      this.proxyClose()
    },
    computed: {
      ...mapState({
        rulesData: state => state.rule.proxy_rules
      })
    }
  }
</script>
