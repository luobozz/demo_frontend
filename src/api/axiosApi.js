import axios from './axios'
import apiUtil from "../utils/api"
import exception from "@/utils/exception";
import lodash from "lodash";

const throttleArr=[],throttleTimes=200;

const initCustom=(custom,url,type)=>{
    const defaultCustom={
        throttle:true,
        noProcess:false,
        noToast:{
            all:false,
            success:false,
            error:false,
        }
    }
    return {
        url:url,
        type:type,
        throttle:custom?.throttle?custom.throttle:defaultCustom.throttle,
        noProcess:custom?.noProcess?custom.noProcess:defaultCustom.noProcess,
        noToast:custom?.noToast?custom.noToast:defaultCustom.noToast
    }
}

let instance = (axiosTh, custom) => {
    if(custom.throttle){
        const throttleMap=`${custom.type}-${custom.url}`
        if(throttleArr.includes(throttleMap)){
            return new Promise((resolve, reject) => {
                // exception.toastError(`请求节流，您点击的太快啦`, {all:true});
                reject(`请求节流，您点击的太快啦`)
            });
        }
        throttleArr.push(throttleMap)
        setTimeout(()=>{
            lodash.remove(throttleArr, p => {
                return p=== throttleMap
            })
        },throttleTimes)
    }

    if(custom?.noProcess){
        return axiosTh;
    }else {
        return new Promise((resolve, reject) => {
            axiosTh.then(response => {
                const res=response.data
                apiUtil.resultHandle(res,custom).then(res=>{
                    resolve(res)
                }).catch(e=>{
                    reject(e)
                })
            }).catch((error) => {
                exception.toastError(`网络错误`);
                reject(error)
            })
        })
    }
}

export default {
    get(url, headers, data, custom,responseType){
        let options = {}

        options.params = data || {}
        if (headers) {
            options.headers = headers
        }
        if(responseType){
            options.responseType=responseType
        }
        custom=initCustom(custom,url,"get")
        return instance(axios().get(url, options), custom)
    },
    post(url, headers, data, custom) {
        let options = {}
        if (headers) {
            options.headers = headers
        }
        custom=initCustom(custom,url,"post")
        return instance(axios().post(url, data, options), custom)
    },
    put(url, headers, data, custom) {
        let options = {}
        if (headers) {
            options.headers = headers
        }
        custom=initCustom(custom,url,"put")
        return instance(axios().put(url, data, options), custom)
    },
    delete(url, headers, data, custom){
        let options = {}
        options.params = data || {}
        if (headers) {
            options.headers = headers
        }
        custom=initCustom(custom,url,"delete")
        return instance(axios().delete(url, options), custom)
    }
}