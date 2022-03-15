import httpApi from '@/api/index'
import ui from '@/utils/ui'
import exception from '@/utils/exception'

export default (Vue)=> {
    Vue.prototype.$httpApi = httpApi;
    Vue.prototype.$uiUtils = ui;
    Vue.prototype.$exceptionUtils = exception;
}