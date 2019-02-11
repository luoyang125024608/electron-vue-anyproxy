<style scoped lang="scss">

</style>

<template>
  <div>
    <a-form>
      <a-form-item v-bind="formItemLayout"
                   label="规则示例"
      >
        <a-select style="width: 200px" @change="ruleSelectChange">
          <a-select-option :value="item.value" v-for="(item, index) in ruleOptions" :key="index">{{item.label}}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-if="ruleKey.name" v-bind="formItemLayout"
                   label="自定义名称"
      >
        <a-input v-model="ruleKey.name"></a-input>
      </a-form-item>
      <a-form-item v-if="ruleKey.name" v-bind="formItemLayout"
                   label="规则内容"
      >
        <div class="rules-editor__cont" v-if="ruleValue">
          <codemirror v-model="ruleValue" :options="editorOption"></codemirror>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import { ruleOptions } from '../../lib/rule/const'
  import ruleApi from '../../lib/rule/rule-api'
  import { Form, Select, Input } from 'ant-design-vue'
  import _ from 'lodash'
  import { codemirror } from 'vue-codemirror/src/index'
  import 'codemirror/lib/codemirror.css'
  import 'codemirror/mode/javascript/javascript.js'
  import 'codemirror/theme/monokai.css'
  function generateUUIDv4 () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0
      var v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  export default {
    components: {
      codemirror,
      [Form.name]: Form,
      [Input.name]: Input,
      [Select.name]: Select,
      [Select.Option.name]: Select.Option,
      [Form.Item.name]: Form.Item
    },
    name: 'rule-edit',
    data () {
      return {
        ruleKey: { // 样例的id和name列表
          id: '',
          name: ''
        },
        ruleName: '', // 样例规则的名称
        ruleValue: '', // 样例的代码字符串
        ruleOptions,
        mode: 'add',
        formItemLayout: {
          labelCol: { span: 4 },
          wrapperCol: { span: 16 }
        },
        editorOption: {
          mode: 'text/javascript',
          lineNumbers: true,
          theme: 'monokai'
        }
      }
    },
    methods: {
      ruleSelectChange (value) {
        ruleApi.fetchSampleRule(value).then((data) => {
          this.ruleKey = {
            id: generateUUIDv4(),
            name: this.ruleOptions[_.findIndex(this.ruleOptions, ['value', value])]['label']
          }
          this.ruleValue = data
        }, () => {
        })
      }
    },
    created () {
      this.mode = this.$route.path.indexOf('/rule/add') + 1 ? 'add' : 'edit'
    },
    computed: {}
  }
</script>
