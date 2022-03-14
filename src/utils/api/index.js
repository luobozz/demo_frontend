import router from "../../router";
import lodash from "lodash";
import store from "../../store"
import httpConfig from "../../config/http.config";
import uiUtils from "../ui";
import exception from "../exception"
import axios from '../../api/axiosApi'

export default {

    URL: {
        getParam() {
            const location = router.currentRoute || {};
            let params = {
                ...location.query
            };
            if (location.params != {}) {
                Object.assign(params, location.params);
            }
            return lodash.cloneDeep(params)
        },
        toTimestamp() {

        }
    },
    resultHandle(res, custom) {
        return new Promise((resolve, reject) => {
            const statusHandle={
                403:()=>{},
                401:()=>{},
                500:()=>{},
                400:()=>{},
                default:()=>{}
            }
            const f=statusHandle[res.status]||statusHandle.default
            console.log(f)
            // if (res.code == 200 || res.code == 404) {
            //     const type = res.code == 200 ? "success" : "warning"
            //     resolve(res);
            //     if (!(custom?.noToast?.all || custom?.noToast.success)) {
            //         uiUtils.toast({
            //             type: type,
            //             message: res.message
            //         })
            //     }
            // } else if (res.code == 413) {
            //     if (store.getters.isLogin) {
            //         exception.toastError(`${res.message}`);
            //         store.dispatch("logout", {})
            //     }
            // } else {
            //     if (!(custom?.noToast?.all || custom?.noToast?.error)) {
            //         exception.toastError(`${res.code}:${res.message}`, false);
            //     } else {
            //         exception.silentError(`${res.code}:${res.message}`)
            //     }
            //     reject(res)
            // }
        })
    },
    getSystemHeader() {
        let header = {};
        header[httpConfig.header.ACCESS_ORIGIN] = router.currentRoute.name;
        header[httpConfig.header.ACCESS_TOKEN] = store.getters.token;
        return header;
    },
    ping(url) {
        const pingUrl = url.startsWith("http://") ? url : `http://${url}`
        axios.get(`${pingUrl}`, {}, {}, {noProcess: true}).then(p => {
            uiUtils.toast({
                type: "success",
                message: `${url} 连接成功`
            })
        }).catch(err => {
            exception.toastError(`连接失败,事由[${err}]`);
        })
    }

}