<style lang="scss">
  .qr-code {
    img {
      display: inline-block;
    }
  }
</style>

<template>
  <div>
    <div class="flex flex-align-center full-height flex-justify-between">
      <div>
        <a-button v-if="proxyStatus==='off'" shape="circle" type="primary" icon="play-circle"
                  @click="proxyStart()"
        >
        </a-button>
        <a-button v-if="proxyStatus==='on'" shape="circle" @click="proxyClose()"
                  type="danger" icon="poweroff"
        >
        </a-button>
      </div>
      <div>
        <a-button @click="onClickDownload" icon="download"
        >
          下载证书
        </a-button>
      </div>
    </div>
    <a-drawer
      width=400
      placement="right"
      :visible="showDownload"
      @close="showDownload=false"
    >
      <div class="text-center">
        <div v-if="isRootCAFileExists">
          <div v-html="CAQrCodeImageDom" class="qr-code"></div>
          <p>Scan to download rootCA.crt to your Phone</p>
          <p class="margin-bottom">{{url}}</p>
          <a v-if="url" :href="url" target="_blank">
            <a-button icon="download" type="primary">Download</a-button>
          </a>
        </div>
        <div v-else>
          <p class="margin-bottom">Your RootCA has not been generated yet, please click the button to generate before you download it.</p>
          <a-button icon="inbox" type="primary" @click="generateCA()">生成证书</a-button>
        </div>
      </div>
    </a-drawer>
  </div>

</template>

<script>
  import proxyApi from '@/lib/proxy/proxy-api'
  import { mapState } from 'vuex'
  import { Drawer } from 'ant-design-vue'

  export default {
    components: {
      [Drawer.name]: Drawer
    },
    name: 'header-menu',
    data () {
      return {
        proxyStatus: 'off',
        showDownload: false,
        loadingCAQr: true,
        CAQrCodeImageDom: '',
        isRootCAFileExists: false,
        url: ''
      }
    },
    created () {
      this.proxyInit()
      this.$bus.$on('proxyReload', () => {
        this.proxyReload()
      })
    },
    methods: {
      getQrCode () {
        this.$axios.get('/api/getQrCode').then((response) => {
          let { qrImgDom, isRootCAFileExists, url } = response.data
          this.loadingCAQr = false
          this.CAQrCodeImageDom = qrImgDom
          this.isRootCAFileExists = isRootCAFileExists
          this.url = url
        }).catch((error) => {
          console.error(error)
          this.$error({
            title: '错误',
            content: error.errorMsg || 'Failed to get the QR code of RootCA path.'
          })
        })
      },
      async proxyInit () {
        await this.$store.dispatch('INIT_PROXY_RULE')
        let ruleIds = this.rulesData.filter(rule => rule.enable).map(rule => rule.id)
        proxyApi.init(ruleIds)
      },
      async proxyStart () {
        if (!proxyApi.proxyServer || !proxyApi.proxyServer.recorder) {
          await this.proxyInit()
        }
        proxyApi.proxyServer.once('ready', () => {
          this.proxyStatus = 'on'
          console.log('启动完成')
          this.getQrCode()
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
      },
      onClickDownload () {
        if (this.proxyStatus === 'off') {
          this.$info({ title: '提示', content: '请先启动服务' })
          return
        }
        this.showDownload = true
      },
      generateCA () {
        this.$axios.post('/api/generateRootCA').then((result) => {
          this.getQrCode()
          this.proxyReload()
        }).catch((error) => {
          console.log(error)
          this.$error({ title: '错误', content: '生成根证书失败,请重试' })
        })
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
