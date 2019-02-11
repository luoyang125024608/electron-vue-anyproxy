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
    ></a-table>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { Table } from 'ant-design-vue'

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 150
    },
    {
      title: 'Operation',
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
    methods: {},
    computed: {
      ...mapState({
        rulesData: state => state.rule.proxy_rules
      })
    }
  }
</script>
