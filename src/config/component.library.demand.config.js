import Vue from 'vue'
import {Button, Select, Divider,Checkbox,Menu,Breadcrumb,Dropdown,FormModel,Input,Layout,Icon,Result} from 'ant-design-vue';
import lodash from "lodash"
//TODO 为啥不能动态引入css
[Button, Select, Divider,Checkbox,Menu,Breadcrumb,Dropdown,FormModel,Input,Layout,Icon,Result].forEach(fo => {
    Vue.use(fo)
    const cssName=lodash.kebabCase(fo.name.replace("A",''))
    import(`ant-design-vue/lib/${cssName}/style`)
})

// import 'ant-design-vue/lib/menu/style'