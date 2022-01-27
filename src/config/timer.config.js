/**
 * type:"interval"||"timeout"
 * @author chenlingyu
 */
import httpConfig from "./http.config"
import store from '../store'
import httpApi from "../api"
import uiUtils from "../utils/ui";

export default {
    timers: [{
        name: httpConfig.httpTimer.heartbeat.name,
        handle: () => {
            httpApi.ews.system.account.heartbeat({});
        },
        timeout: store.getters.tokenExpire,
        type: "timeout",
    }, {
        name: httpConfig.httpTimer.messageListen.name,
        handle: () => {
            store.dispatch("getMessage")
        },
        ImmediatelyStart:store.getters.isLogin,
        startDoFirst:true,
        timeout: httpConfig.httpTimer.messageListen.timeOut,
        type: "interval",
    }]
}