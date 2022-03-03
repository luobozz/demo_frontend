import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {Button, Select} from 'element-ui';
import '@/assets/css/theme_vars/index.scss'
[Button, Select].forEach(fo => {
    Vue.use(fo)
})


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
