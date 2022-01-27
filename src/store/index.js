import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import loginStore from './module/login-store.js'
import messageStore from './module/message-store.js'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        loginStore,
        messageStore,
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
                    loginStore: {
                        account: val.loginStore.account,
                        isLogin: val.loginStore.isLogin,
                        pwdKeeper: val.loginStore.pwdKeeper
                    }
                }
            }
        })],
    getters,
    mutations: {
    }
})
