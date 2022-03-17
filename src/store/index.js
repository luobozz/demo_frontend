import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import layoutStore from './module/layout-store.js'
import accountStore from './module/account-store.js'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    layoutStore,
    accountStore
  },
  plugins: [
    persistedState({
      storage: sessionStorage,
      reducer(val) {
        return {
        }
      }
    }), persistedState({
      storage: localStorage,
      reducer(val) {
        return {
          layoutStore: {
            layout:val.layoutStore.layout,
            tabs:val.layoutStore.tabs,
          },
          accountStore: {
            account: val.accountStore.account,
            isLogin: val.accountStore.isLogin,
            pwdKeeper: val.accountStore.pwdKeeper
          }
        }
      }
    })],
  getters,
  mutations: {
  }
})
