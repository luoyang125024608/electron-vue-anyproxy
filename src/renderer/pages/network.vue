<style scoped lang="less">
  @import "../assets/style/network.less";
</style>

<template>
  <div>
    <div className="ant-table ant-table-small ant-table-scroll-position-left">
      <div className="ant-table-content">
        <table className="ant-table-body">

          <thead className="ant-table-thead">
          <tr>
            <th :style="{'width':'70px', 'minWidth': '70px' }">Method</th>
            <th :style="{'width':'100px', 'minWidth': '100px' }">Code</th>
            <th :style="{'width':'70px', 'minWidth': '70px' }">Host</th>
            <th :style="{'width':'200px', 'minWidth': '200px' }">Path</th>
            <th :style="{'width':'auto', 'minWidth': '600px' }">Mime</th>
            <th :style="{'width':'100px', 'minWidth': '100px' }">Start</th>
          </tr>
          </thead>

          <tbody className="ant-table-tbody">

          </tbody>
        </table>
        <virtual-scroller
          class="full-width"
          style="height: 480px"
          :items="list"
          :item-height="30"
        >
          <tr slot-scope="{item}" @click="rowClick(item)">
            <td>{{item.method}}</td>
            <td :class="[codeClassName(item.statusCode)]">{{item.statusCode}}</td>
            <td>{{item.host}}</td>
            <td>{{item.path}}</td>
            <td>{{item.mime}}</td>
            <td>{{dateFormatter(item.startTime)}}</td>
          </tr>
        </virtual-scroller>
      </div>
    </div>
    <network-detail v-model="showDetail"
                    :detailContent="detailContent"
                    :headers="headers"
    ></network-detail>
  </div>
</template>

<script>
  import { Table } from 'ant-design-vue'
  import { RecycleScroller } from 'vue-virtual-scroller'
  import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
  import moment from 'moment'
  import proxyApi from '@/lib/proxy/proxy-api'
  import networkDetail from './components/network-detail.vue'

  const columns = [
    {
      title: 'Host',
      dataIndex: 'host',
      width: 150
    },
    {
      title: 'Path',
      dataIndex: 'path',
      width: 200
    },
    // {
    //   title: '#',
    //   dataIndex: 'id',
    //   width: 100
    // },
    {
      title: 'Code',
      key: 'statusCode',
      width: 100,
      scopedSlots: { customRender: 'code' }
    },
    {
      title: 'Method',
      dataIndex: 'method',
      width: 120
    },
    {
      title: 'Start',
      key: 'startTime',
      width: 100,
      scopedSlots: { customRender: 'start' }
    },
    {
      title: 'Mime',
      dataIndex: 'mime'
    }
  ]
  export default {
    components: {
      [Table.name]: Table,
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
        columns,
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
      codeClassName (statusCode) {
        if (statusCode >= 400) {
          return 'red'
        } else if (statusCode === 200) {
          return 'green'
        }
        return 'orange'
      },
      dateFormatter (startTime) {
        return moment(startTime).format('HH:mm:ss')
      },
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
