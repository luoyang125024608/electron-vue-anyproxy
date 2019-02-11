import ruleApi from '../../lib/rule/rule-api'

const state = {
  proxy_rules: [], // 代理配置规则
  current_rule: {} // 当前运用规则
}

const mutations = {
  MODIFY_PROXY_RULE (state, payload) {
    console.log('modify')
    state.proxy_rules.splice(payload.index, 1)
    state.proxy_rules.push(payload.rule)
  },
  STORE_PROXY_RULE (state, rule) {
    console.log('store')
    state.proxy_rules.push(rule)
  },
  INIT_PROXY_RULE (state) {
    try {
      state.proxy_rules = JSON.parse(ruleApi.readRulesFromFile())
    } catch (e) {
    }
  },
  SAVE_PROXY_RULE (state, { id, ruleValue }) {
    try {
      ruleApi.saveCustomRuleToFile(id, ruleValue)
      ruleApi.saveRulesIntoFile(state.proxy_rules)
    } catch (e) {
    }
  }
}

const actions = {
  MODIFY_PROXY_RULE ({ commit }, payload) {
    commit('MODIFY_PROXY_RULE', payload)
  },
  STORE_PROXY_RULE ({ commit }, rule) {
    commit('STORE_PROXY_RULE', rule)
  },
  INIT_PROXY_RULE ({ commit }) {
    commit('INIT_PROXY_RULE')
  },
  SAVE_PROXY_RULE ({ commit }, { id, ruleValue }) {
    commit('SAVE_PROXY_RULE', { id, ruleValue })
  }
}

export default {
  state,
  mutations,
  actions
}
