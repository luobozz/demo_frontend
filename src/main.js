import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//UI框架按需引入
import "@/config/element.demand.config"

// 全局mixin负责系统crud逻辑部分
import mixin from '@/mixin/global/mixin'
Vue.mixin(mixin)

import lbIcon from '@/components/global/lbIcon/lbIcon'
import lbAvatar from '@/components/global/lbAvatar/lbAvatar'
import layoutCard from '@/components/layout/layoutCard'
Vue.component('lb-icon', lbIcon)
Vue.component('lb-avatar', lbAvatar)
Vue.component('layout-card', layoutCard)

import util from './utils/install'
Vue.use(util)

Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
