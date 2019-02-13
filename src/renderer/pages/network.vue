<style scoped lang="less">
  @import "../assets/style/network.less";
</style>

<template>
  <div>
    <div className="ant-table ant-table-small ant-table-scroll-position-left">
      <div className="ant-table-content">
        <section className="ant-table-body">
          <div className="ant-table-thead">
            <span :style="{'width':'70px', 'minWidth': '70px' }">Host</span>
            <span :style="{'width':'200px', 'minWidth': '200px' }">Path</span>
            <span :style="{'width':'auto', 'minWidth': '600px' }">Mime</span>
          </div>
          <virtual-scroller
            className="ant-table-tbody"
            style="height: 480px"
            :items="list"
            :item-height="30"
          >
            <p slot-scope="{item}" @click="rowClick(item)">
              <span>{{item.host}}</span>
              <span>{{item.path}}</span>
              <span>{{item.mime}}</span>
            </p>
          </virtual-scroller>
        </section>
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

  export default {
    components: {
      'virtual-scroller': RecycleScroller,
      networkDetail
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
        list: []
      }
    },
    created () {
      this.$bus.$on('updateList', (item) => {
        if (item.method !== 'CONNECT' && item.statusCode) {
          this.list.push(item)
        }
      })
    },
    methods: {
      rowClick (record) {
        Promise.all([proxyApi.getSingleLog(record.id), proxyApi.fetchBody(record.id)]).then((res) => {
          this.headers = res[0]
          this.detailContent = res[1]
          this.showDetail = true
        }, () => {})
      }
    },
    computed: {}
  }
</script>
