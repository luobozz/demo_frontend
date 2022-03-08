import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import systemStore from './module/system-store.js'
import accountStore from './module/account-store.js'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    systemStore,
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
          systemStore: {
            layout:val.systemStore.layout
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
