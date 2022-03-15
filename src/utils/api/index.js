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
                    return afterHandle(false, true, "服务器异常")
                },
                200: () => {
                    //状态码 200 succeed:false 业务异常，直接输出msg
                    //状态码 200 succeed:true 成功，直接输出msg
                    return afterHandle(resData.succeed || false, true, resData.msg || resData.succeed ? "" : "业务异常")
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
                    exception.toastError(fr.toastContent, false);
                } else {
                    exception.silentError(fr.toastContent, null, fr.toastContent)
                }
                reject(res)
            }
        })
    },
}