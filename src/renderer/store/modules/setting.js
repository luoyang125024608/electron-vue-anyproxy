/**
 * Created by luoyang on 2019-02-15
 */
const state = {
  autoScroll: false // 自动滚动
}

const mutations = {
  TOGGLE_AUTO_SCROLL (state, bool) {
    state.autoScroll = bool
  }
}

const actions = {
  TOGGLE_AUTO_SCROLL ({ commit }, bool) {
    commit('TOGGLE_AUTO_SCROLL', bool)
  }
}

export default {
  state,
  mutations,
  actions
}
