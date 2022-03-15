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
            const resData = res.data || {}, afterHandle = (isSuccess, isToast, toastContent) => {
                return {
                    isSuccess,
                    isToast,
                    toastContent
                }
            }
                , statusHandle = {
                401: () => {
                    //状态码 401 登录权限 先刷新token，如果还失败跳回登录页
                    return afterHandle(false, true, "401")
                },
                403: () => {
                    //状态码 403 接口权限 提示无权限
                    return afterHandle(false, true, "接口无权限")
                },
                500: () => {
                    //状态码 500 统一提示 服务器异常，不输出msg
                    return afterHandle(false, false, null)
                },
                200: () => {
                    //状态码 200 succeed:false 业务异常，直接输出msg
                    //状态码 200 succeed:true 成功，直接输出msg
                    return afterHandle(resData.succeed || false, true, resData.msg || "业务异常")
                },
                400: () => {
                    //状态码 400 参数解析异常 可以直接输出msg
                    return afterHandle(false, true, resData.msg || "参数解析异常")
                },
                default: () => {
                    //其他状态码，输出异常(网络错误)
                    return afterHandle(false, true, "网络错误")
                }
            }
            const f = statusHandle[res.status] || statusHandle.default
            const fr = f();
            if (fr.isSuccess) {
                if (!(custom?.noToast?.all || custom?.noToast.success) && fr.isToast) {
                    uiUtils.toast({
                        type: lodash.isEmpty(resData.data) ? "warning" : "success",
                        message: fr.toastContent
                    })
                }
                resolve(resData)
            } else {
                if (!(custom?.noToast?.all || custom?.noToast?.error) && fr.isToast) {
                    exception.toastError(res, false);
                } else {
                    exception.silentError(`${res.code}:${res.message}`)
                }
                reject(res)
            }
            console.log(f())
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
            exception.toastError(`连接失败,事由[${err}]`,false);
        })
    }

}