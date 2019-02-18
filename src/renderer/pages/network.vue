<style scoped lang="scss">
  .host {
    width: 170px;
  }

  .path {
    flex: 1;

  }

  .mime {
    width: 130px;
  }
</style>

<template>
  <div>
    <div class="flex flex-justify-between margin-bottom">
      <span class="host inline-block lines-1 padding-left">Host</span>
      <span class="path inline-block lines-1 margin-left padding-left">Path</span>
      <span class="mime inline-block lines-1">Mime</span>
    </div>
    <a-list
      @mouseenter="enableAuto=false"
      @mouseleave="enableAuto=true"
      class="border padding margin-bottom"
    >
      <virtual-scroller
        style="height: 520px"
        :items="filterList"
        :item-height="32"
        ref="scroller"
      >
        <a-list-item slot-scope="{item}" @click="rowClick(item)" style="padding: 0">
          <p class="mt-5 border-bottom pb-5 flex flex-justify-between pointer full-width">
            <span class="host inline-block lines-1">{{item.host}}</span>
            <span class="path inline-block lines-1 margin-left">{{item.path}}</span>
            <span class="mime inline-block lines-1 margin-left padding-left">{{item.mime}}</span>
          </p>
        </a-list-item>
      </virtual-scroller>
    </a-list>
    <div class="flex padding-top flex-align-center">
      <div style="width: 50px">过滤：</div>
      <div class="flex" style="flex:1">
        <a-input placeholder="Host" v-model="filterKey.host" class="red"></a-input>
        <a-input placeholder="Path" v-model="filterKey.path" class="margin-left red"></a-input>
        <a-input placeholder="Mime" v-model="filterKey.mime" class="margin-left red"></a-input>
      </div>
    </div>
    <network-detail v-model="showDetail"
                    :detailContent="detailContent"
                    :headers="headers"
    ></network-detail>
  </div>
</template>

<script>
  import { RecycleScroller } from 'vue-virtual-scroller'
  import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
  import proxyApi from '@/lib/proxy/proxy-api'
  import networkDetail from './components/network-detail.vue'
  import { List, Input } from 'ant-design-vue'
  import { mapState } from 'vuex'

  export default {
    components: {
      'virtual-scroller': RecycleScroller,
      networkDetail,
      [Input.name]: Input,
      [List.name]: List,
      [List.Item.name]: List.Item
    },
    name: 'network',
    data () {
      return {
        headers: {
          reqHeader: {},
          resHeader: {}
        },
        detailContent: {},
        showDetail: false,
        list: [],
        enableAuto: true,
        filterKey: {
          host: '',
          path: '',
          mime: ''
        }
      }
    },
    created () {
      this.$bus.$on('updateList', (item) => {
        if (item.method !== 'CONNECT' && item.statusCode) {
          this.list.push(item)
          if (this.autoScroll && this.enableAuto) {
            this.$nextTick(() => {
              this.$refs.scroller.scrollToItem(this.list.length - 1)
            })
          }
        }
      })
      this.$bus.$on('clearList', () => {
        this.list = []
      })
    },
    methods: {
      rowClick (record) {
        Promise.all([proxyApi.getSingleLog(record.id), proxyApi.fetchBody(record.id)]).then((res) => {
          this.headers = res[0]
          this.detailContent = res[1]
          this.showDetail = true
        }, () => { this.$error({ title: '错误', content: '没有该请求日志' }) })
      }
    },
    computed: {
      ...mapState({
        autoScroll: state => state.setting.autoScroll
      }),
      filterList () {
        let { host, path, mime } = this.filterKey
        if (!(host || path || mime)) {
          return this.list
        } else {
          return this.list.filter((item) => {
            for (let key in this.filterKey) {
              let keyword = this.filterKey[key]
              if (keyword && item[key].indexOf(keyword) + 1) {
                return true
              }
            }
            return false
          })
        }
      }
    }
  }
</script>
