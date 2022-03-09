import Vue from 'vue'
import {Button, Select, Divider,Checkbox,Menu,Breadcrumb,Dropdown,Form,Input} from 'ant-design-vue';
//TODO 为啥不能动态引入css
[Button, Select, Divider,Checkbox,Menu,Breadcrumb,Dropdown,Form,Input].forEach(fo => {
    Vue.use(fo)
})