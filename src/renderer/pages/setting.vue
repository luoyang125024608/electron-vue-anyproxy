<style scoped lang="scss">

</style>

<template>
  <a-form>
    <a-form-item v-bind="formItemLayout"
                 label="本机全局启用"
    >
      <a-switch
        checkedChildren="开"
        unCheckedChildren="关"
        @click="globalChange"
        v-model="global"
      >
      </a-switch>
    </a-form-item>
  </a-form>
</template>

<script>
  import { Form, Switch } from 'ant-design-vue'
  import globalProxy from '@/lib/global-proxy'

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
          globalProxy.enable('127.0.0.1', 8001, 'http').then((stdout) => {
            console.log(stdout)
          }).catch((error) => {
            console.log(error)
          })
          globalProxy.enable('127.0.0.1', 8001, 'https').then((stdout) => {
            console.log(stdout)
          }).catch((error) => {
            console.log(error)
          })
        } else {
          globalProxy.disable('http').then((stdout) => {
            console.log(stdout)
          }).catch((error) => {
            console.log(error)
          })
          globalProxy.disable('https').then((stdout) => {
            console.log(stdout)
          }).catch((error) => {
            console.log(error)
          })
        }
      }
    },
    computed: {}
  }
</script>
