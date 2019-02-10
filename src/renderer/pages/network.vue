<style scoped lang="scss">

</style>

<template>
  <div>
    <a-table :columns="columns"
             :dataSource="list"
             :pagination="{ pageSize: 50 }"
             :scroll="{ y: 480 }"
             :customRow="customRow"
             rowKey="id"
    >
      <template slot="code" slot-scope="{statusCode}">
        <span :class="[codeClassName(statusCode)]">{{statusCode}}</span>
      </template>
      <template slot="start" slot-scope="{startTime}">
        <span>{{dateFormatter(startTime)}}</span>
      </template>
    </a-table>
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
        list: [],
        customRow: (record) => {
          return {
            on: { // 事件
              click: () => {
                this.rowClick(record)
              } // 点击行
            }
          }
        }
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
