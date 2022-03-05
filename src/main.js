import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//UI框架按需引入
import "@/config/element.demand.config"
import '@/assets/css/theme_vars/index.scss'

// 全局mixin负责系统crud逻辑部分
// import mixin from '@/mixin/global/mixin'
// Vue.mixin(mixin)

import lbIcon from '@/components/global/lbIcon/lbIcon'
import lbAvatar from '@/components/global/lbAvatar/lbAvatar'
Vue.component('lb-icon', lbIcon)
Vue.component('lb-avatar', lbAvatar)


Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
