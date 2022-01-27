import utils from './index'
import eCharts from './echarts'
import httpApi from '../api'

const install = function (Vue) {
    Vue.prototype.$util = utils;
    Vue.prototype.$echarts=eCharts;
    Vue.prototype.$httpApi = httpApi;
}

export default {
    install
}
