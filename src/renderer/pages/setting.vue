<style scoped lang="scss">

</style>

<template>
  <a-form>
    <!--<a-form-item v-bind="formItemLayout"-->
                 <!--label="本机全局代理"-->
    <!--&gt;-->
      <!--<a-switch-->
        <!--checkedChildren="开"-->
        <!--unCheckedChildren="关"-->
        <!--@change="globalChange"-->
        <!--v-model="global"-->
      <!--&gt;-->
      <!--</a-switch>-->
      <!--<span class="margin-left font-12 grey-9">可能与翻墙软件冲突</span>-->
    <!--</a-form-item>-->
    <a-form-item v-bind="formItemLayout"
                 label="自动滚屏"
    >
      <a-switch
        checkedChildren="开"
        unCheckedChildren="关"
        @change="autoSrollChange"
        :checked="autoScroll"
      >
      </a-switch>
      <span class="margin-left font-12 grey-9">抓包列表自动滚到底部</span>
    </a-form-item>
  </a-form>
</template>

<script>
  import { Form, Switch } from 'ant-design-vue'
  import localProxy from '../lib/global-proxy/local-proxy.js'
  import { mapState } from 'vuex'

  export default {
    components: {
      [Switch.name]: Switch,
      [Form.name]: Form,
      [Form.Item.name]: Form.Item
    },
    name: 'setting',
    data () {
      return {
        formItemLayout: {
          labelCol: { span: 6 },
          wrapperCol: { span: 14 }
        },
        global: false
      }
    },
    methods: {
      globalChange (bool) {
        if (bool) {
          localProxy.enable()
        } else {
          localProxy.disable()
        }
      },
      autoSrollChange (bool) {
        this.$store.dispatch('TOGGLE_AUTO_SCROLL', bool)
      }
    },
    computed: {
      ...mapState({
        autoScroll: state => state.setting.autoScroll
      })
    }
  }
</script>
