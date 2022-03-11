import axios from './axios'
import apiUtil from "@/utils/api"
import exception from "@/utils/exception";
import throttler from "@/utils/data/throttler"
import lodash from "lodash";


const initCustom = (custom, url, type) => {
    const defaultCustom = {
        throttle: true,
        throttleTimes: 200,
        noProcess: false,
        noToast: {
            all: false,
            success: false,
            error: false,
        }
    }
    return {
        url: url,
        type: type,
        throttle: custom?.throttle ? custom.throttle : defaultCustom.throttle,
        throttleTimes: custom?.throttleTimes ? custom.throttleTimes : defaultCustom.throttleTimes,
        noProcess: custom?.noProcess ? custom.noProcess : defaultCustom.noProcess,
        noToast: custom?.noToast ? custom.noToast : defaultCustom.noToast
    }
}

const customBefore = (custom) => {
    return new Promise((resolve, reject) => {
        if (custom.throttle) {
            //节流处理
            if (throttler(custom.throttleTimes).throttle(`api_${custom.type}_${custom.url}`)) {
                //被节流
                reject(`请求节流，您点击的太快啦`)
                exception.toastError(`请求节流，您点击的太快啦`, true);
            } else {
                //没被节流
                resolve()
            }
        } else {
            //不需要节流
            resolve()
        }
    })
}

const customAfter = (axiosTh, custom) => {
    if (custom?.noProcess) {
        return axiosTh;
    } else {
        return new Promise((resolve, reject) => {
            axiosTh.then(response => {
                const res = response.data
                apiUtil.resultHandle(res, custom).then(res => {
                    resolve(res)
                }).catch(e => {
                    reject(e)
                })
            }).catch((error) => {
                exception.toastError(`网络错误`, true);
                reject(error)
            })
        })
    }
}

export default {
    get(url, headers, data, custom, responseType) {
        let options = {}

        options.params = data || {}
        if (headers) {
            options.headers = headers
        }
        if (responseType) {
            options.responseType = responseType
        }
        custom = initCustom(custom, url, "get")
        return new Promise((resolve, reject) => {
            customBefore(custom).then(r => {
                customAfter(axios().get(url, options), custom).then(r => {
                    resolve(r)
                }).catch(e => {
                    reject(e)
                })
            }).catch(e => {
                reject(e)
            })
        })
    },
    post(url, headers, data, custom) {
        let options = {}
        if (headers) {
            options.headers = headers
        }
        custom = initCustom(custom, url, "post")
        return instance(axios().post(url, data, options), custom)
    },
    put(url, headers, data, custom) {
        let options = {}
        if (headers) {
            options.headers = headers
        }
        custom = initCustom(custom, url, "put")
        return instance(axios().put(url, data, options), custom)
    },
    delete(url, headers, data, custom) {
        let options = {}
        options.params = data || {}
        if (headers) {
            options.headers = headers
        }
        custom = initCustom(custom, url, "delete")
        return instance(axios().delete(url, options), custom)
    }
}