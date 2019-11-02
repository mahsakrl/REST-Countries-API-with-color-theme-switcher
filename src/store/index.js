import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    darkMode: false,
    routingParams: {}
  },
  plugins: [createPersistedState()],
  mutations: {
    darkMode (state, payload) {
      state.darkMode = payload.payload
    },
    params (state, payload) {
      state.routingParams = { ...payload.payload }
      console.log('mut', state.routingParams)
    }
  },
  actions: {
    darkMode ({ commit, state }, payload) {
      console.log(state)
      commit('darkMode', payload)
    },
    params ({ commit }, payload) {
      console.log('dark', payload)
      commit('params', payload)
    }
  },
  modules: {
  }
})
