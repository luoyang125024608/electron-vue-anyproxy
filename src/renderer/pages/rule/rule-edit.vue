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
        <codemirror v-if="ruleValue" v-model="ruleValue" :options="editorOption"></codemirror>
      </a-form-item>
      <a-form-item
        :wrapperCol="{ span: 14, offset: 4 }"
      >
        <a-button type='primary' @click="saveRule">保存</a-button>
        <a-button @click="$router.back()" class="margin-left">取消</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
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
      },
      async saveRule () {
        const rule = {
          id: this.ruleKey.id || generateUUIDv4(),
          name: this.ruleKey.name
        }
        if (!rule.name || !this.ruleValue) {
          this.$error({
            title: '错误',
            content: '请正确填写'
          })
          return
        }
        const nameIndex = _.findIndex(this.rulesData, { name: rule.name })
        const idIndex = _.findIndex(this.rulesData, { id: rule.id })
        if (idIndex !== -1) {
          await this.$store.dispatch('MODIFY_PROXY_RULE', {
            index: idIndex,
            rule: rule
          })
          await this.saveToFile(rule.id)
          this.$success('保存成功')
          this.$router.back()
        } else {
          if (nameIndex !== -1) {
            this.$error({
              title: '错误',
              content: '规则名已存在'
            })
          } else {
            await this.$store.dispatch('STORE_PROXY_RULE', rule)
            await this.saveToFile(rule.id)
            this.$success({
              title: '提示',
              content: '保存成功'
            })
            this.$router.back()
          }
        }
      },
      async saveToFile (id) {
        await this.$store.dispatch('SAVE_PROXY_RULE', { id, ruleValue: this.ruleValue })
        return this.$store.dispatch('INIT_PROXY_RULE')
      }
    },
    created () {
      this.mode = this.$route.path.indexOf('/rule/add') + 1 ? 'add' : 'edit'
    },
    computed: {
      ...mapState({
        rulesData: state => state.rule.proxy_rules
      })
    }
  }
</script>
