import Vue from 'vue'
import App from './App.vue'
import './mock/index'

//基础依赖
import filters from './filters/index.js'
import router from './router'
import store from './store'
// 导入富文本编辑器样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Quill from 'quill'

// 全局组件依赖
import lbIcon from './components/common/lbIcon/lbIcon'
import lbAvatar from './components/common/lbAvatar/lbAvatar'
import authImage from './components/common/authImage/authImage'
import layoutCard from './components/layout/layoutCard/layoutCard'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor';

//全局组件注入
Vue.component('lb-icon', lbIcon)
Vue.component('lb-avatar', lbAvatar)
Vue.component('auth-image', authImage)
Vue.component('layout-card', layoutCard)
// 将富文本编辑器，注册为全局可用组件
Vue.use(VueQuillEditor)


import {Button,Layout,Menu,Dropdown,TreeSelect,Transfer,Switch,Tree,Table,Tabs,Col,Row,Breadcrumb,Tag,Icon,Modal,Form,FormModel,Input,List,DatePicker,Select,Checkbox,Tooltip,Divider,Radio,Pagination,Popover,Statistic,Badge,TimePicker,Card,message,notification,Spin,Upload,Anchor,Result,Empty,Popconfirm,Affix,Cascader,Progress,InputNumber,Timeline,Descriptions,Collapse,Calendar,ConfigProvider,Skeleton} from 'ant-design-vue';
let arr=[Button,Layout,Menu,Dropdown,TreeSelect,Transfer,Switch,Tree,Table,Tabs,Col,Row,Breadcrumb,Tag,Icon,Modal,Form,FormModel,Input,List,DatePicker,Select,Checkbox,Tooltip,Divider,Radio,Pagination,Popover,Statistic,Badge,TimePicker,Card,message,notification,Spin,Upload,Anchor,Result,Empty,Popconfirm,Affix,Cascader,Progress,InputNumber,Timeline,Descriptions,Collapse,Calendar,ConfigProvider,Skeleton];

// Modal.props.maskClosable.default=false
Modal.props.destroyOnClose.default=true
Modal.props.getContainer.default=()=>window.document.getElementById("app")

for(let i in arr){
  Vue.use(arr[i])
}

//全局插件依赖
import util from './utils/install'
//全局插件注入
Vue.use(util)

import timer from "./utils/data/timer";
import timerConfig from "./config/timer.config"

timer.initTimerConfig(timerConfig.timers);

//全局混入
import mixin from './mixin/common/mixin'
Vue.mixin(mixin)

//基础依赖注入
Vue.config.productionTip = false

import exception from "./utils/exception"

Vue.config.errorHandler = exception.silentError

new Vue({
  router,
  store,
  filters,
  render: h => h(App)
}).$mount('#app')
