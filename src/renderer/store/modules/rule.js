import ruleApi from '../../lib/rule/rule-api'

const state = {
  proxy_rules: [] // 代理配置规则
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
  },
  DELETE_RULE (state, id) {
    ruleApi.deleteCustomRuleFile(id)
    state.proxy_rules = state.proxy_rules.filter((item) => {
      return item.id !== id
    })
    ruleApi.saveRulesIntoFile(state.proxy_rules)
  },
  TOGGLE_ENABLE_RULE (state, id) {
    state.proxy_rules.forEach((item) => {
      if (item.id === id) {
        item.enable = !item.enable
      }
    })
    ruleApi.saveRulesIntoFile(state.proxy_rules)
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
  },
  DELETE_RULE ({ commit }, id) {
    commit('DELETE_RULE', id)
  },
  TOGGLE_ENABLE_RULE ({ commit }, id) {
    commit('TOGGLE_ENABLE_RULE', id)
  }
}

export default {
  state,
  mutations,
  actions
}
