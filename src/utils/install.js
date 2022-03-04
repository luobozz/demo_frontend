import utils from './index'
import httpApi from '../api'

const install = function (Vue) {
    Vue.prototype.$util = utils;
    Vue.prototype.$httpApi = httpApi;
}

export default {
    install
}
