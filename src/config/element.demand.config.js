import Vue from 'vue'
import '@/assets/css/theme_vars/index.scss'
import {Button, Select, Divider,Checkbox} from 'element-ui';
//TODO 为啥不能动态引入css
[Button, Select, Divider,Checkbox].forEach(fo => {
    Vue.use(fo)
})
import("element-ui/packages/theme-chalk/src/button.scss")
import("element-ui/packages/theme-chalk/src/select.scss")
import("element-ui/packages/theme-chalk/src/divider.scss")
import("element-ui/packages/theme-chalk/src/checkbox.scss")
