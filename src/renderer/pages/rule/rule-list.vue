<style scoped lang="scss">
</style>

<template>
  <div>
    <router-link to="/rule/add">
      <a-button icon="plus">添加规则</a-button>
    </router-link>
    <a-table :columns="columns"
             :dataSource="rulesData"
             rowKey="id"
             class="margin-top"
    >
      <template slot="title" slot-scope="{name,enable}">
        <span :class="{'green':enable,'grey-9':!enable}">{{name}}</span>
      </template>
      <template slot="operation" slot-scope="{id,enable}">
        <a-button @click="edit(id)">编辑</a-button>
        <a-button type="danger" @click="del(id)">删除</a-button>
        <a-button @click="use(id)">
          <span :class="{'green':!enable,'red':enable}">{{enable?'停用':'启用'}}</span>
        </a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { Table } from 'ant-design-vue'

  const columns = [
    {
      title: '规则名字',
      scopedSlots: { customRender: 'title' },
      width: 150
    },
    {
      title: '操作',
      width: 100,
      scopedSlots: { customRender: 'operation' }
    }
  ]
  export default {
    components: {
      [Table.name]: Table
    },
    name: 'rule',
    data () {
      return {
        columns
      }
    },
    created () {
      this.$store.dispatch('INIT_PROXY_RULE')
    },
    methods: {
      edit (id) {
        this.$router.push('/rule/edit/' + id)
      },
      del (id) {
        this.$confirm({
          title: '提示',
          content: `确定要删除吗？`,
          onOk: async () => {
            this.$store.dispatch('DELETE_RULE', id)
          }
        })
      },
      async use (id) {
        await this.$store.dispatch('TOGGLE_ENABLE_RULE', id)
        this.$bus.$emit('proxyReload')
      }
    },
    computed: {
      ...mapState({
        rulesData: state => state.rule.proxy_rules
      })
    }
  }
</script>
