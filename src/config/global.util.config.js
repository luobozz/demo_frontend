import httpApi from '@/api/index'
import ui from '@/utils/ui'

export default (Vue)=> {
    Vue.prototype.$httpApi = httpApi;
    Vue.prototype.$uiUtils = ui;
}