<style scoped lang="scss">

</style>
<template>
  <a-drawer
    width=640
    placement="right"
    @close="onClose"
    :visible="value"
  >
    <a-tabs defaultActiveKey="Request">
      <a-tab-pane tab="Request" key="Request">
        <a-collapse :activeKey="['1','2','3','4']" :bordered="false">
          <a-collapse-panel header="General" key="1">
            <div><b>Request URL: </b>{{headers.url}}</div>
            <div><b>Request Method: </b>{{headers.method}}</div>
            <div><b>Protocol: </b>{{headers.protocol}}</div>
          </a-collapse-panel>
          <a-collapse-panel header="Header" key="2">
            <div v-for="(value, key) in headers.reqHeader" v-if="key !== 'Cookie'">
              <b>{{key}}: </b>{{value}}
            </div>
          </a-collapse-panel>
          <a-collapse-panel header="Body" key="3">
            <div>
              <b>{{headers.reqBody || ''}}</b>
            </div>
          </a-collapse-panel>
          <a-collapse-panel header="Cookie" key="4">
            <a-table :columns="cookieColumns"
                     :dataSource="cookies"
                     rowKey="name"
            >
            </a-table>
          </a-collapse-panel>
        </a-collapse>
      </a-tab-pane>
      <a-tab-pane tab="Response" key="Response" forceRender>
        <a-collapse :activeKey="['1','2','3']" :bordered="false">
          <a-collapse-panel header="General" key="1">
            <div>
              <b>Status Code: </b>
              <span :class="[codeClassName(headers.statusCode)]">{{headers.statusCode}}</span>
            </div>
          </a-collapse-panel>
          <a-collapse-panel header="Header" key="2">
            <div v-for="(value, key) in headers.resHeader">
              <b>{{key}}: </b>{{value}}
            </div>
          </a-collapse-panel>
          <a-collapse-panel header="Body" key="3">
            <a-tabs type="card">
              <a-tab-pane tab="Raw" key="1">
                <div v-html="preview"></div>
              </a-tab-pane>
              <a-tab-pane tab="Preview" key="2" v-if="jsonPreview">
                <json-viewer :value="jsonPreview"></json-viewer>
              </a-tab-pane>
            </a-tabs>
          </a-collapse-panel>
        </a-collapse>
      </a-tab-pane>
    </a-tabs>
  </a-drawer>
</template>

<script>
  import hljs from 'highlight.js'
  import 'highlight.js/styles/github.css'
  import JsonViewer from 'vue-json-viewer'
  import { Drawer, Collapse, Tabs, Table } from 'ant-design-vue'
  // highlight code 缓存，避免二次渲染
  const highlightCache = {}
  const cookieColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 120
    }, {
      title: 'Value',
      dataIndex: 'value',
      width: 120
    }
  ]
  export default {
    props: {
      value: Boolean,
      detailContent: {
        type: Object,
        default () {
          return {}
        }
      },
      headers: {
        type: Object,
        default () {
          return {
            url: '',
            method: '',
            statusCode: '',
            protocal: '',
            reqHeader: {},
            resHeader: {}
          }
        }
      }
    },
    components: {
      JsonViewer,
      [Table.name]: Table,
      [Drawer.name]: Drawer,
      [Collapse.name]: Collapse,
      [Collapse.Panel.name]: Collapse.Panel,
      [Tabs.name]: Tabs,
      [Tabs.TabPane.name]: Tabs.TabPane
    },
    name: 'network-detail',
    data () {
      return {
        cookieColumns
      }
    },
    methods: {
      onClose () {
        this.$emit('input', false)
      },
      codeClassName (statusCode) {
        if (parseInt(statusCode) >= 400) {
          return 'red'
        } else if (parseInt(statusCode) === 200) {
          return 'green'
        }
        return 'orange'
      }
    },
    computed: {
      cookies () {
        let cookies = this.headers.reqHeader.cookie || this.headers.reqHeader.Cookie
        if (cookies) {
          return cookies.split(';').map((item) => {
            return {
              name: item.split('=')[0],
              value: item.split('=')[1]
            }
          })
        }
        return []
      },
      jsonPreview () {
        let detail = this.detailContent
        let type = detail.type || ''

        if (type.match('json')) {
          try {
            return JSON.parse(detail.content)
          } catch (err) {
            return detail.content
          }
        } else {
          return ''
        }
      },
      preview () {
        let detail = this.detailContent
        let type = detail.type || ''
        if (type.match(/css|javascript|html/)) {
          return highlightCache[detail.id] ||
            (highlightCache[detail.id] =
                '<pre><code>' + hljs.highlightAuto(detail.content).value + '</code></pre>'
            )
        } else if (type.match('image')) {
          return '<img src="' + this.headers.url + '">'
        } else {
          return detail.content
        }
      }
    }
  }
</script>
