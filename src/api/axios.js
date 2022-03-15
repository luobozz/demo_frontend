import axios from 'axios'
import qs from 'qs'
import store from '../store'
import httpConfig from "../config/http.config"
import Moment from "moment";

let service = axios.create({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        "Accept": "*/*"
    },
    timeout: 8000
})

const checkParams=(params)=>{
    if (params&&!params.timestamp) {
        params.timestamp = new Date().getTime()
    }
    for(let i in params){
        if(params[i] instanceof Moment){
            params[i]=params[i].valueOf()
        }
    }
}

// 添加请求拦截器
service.interceptors.request.use(
    config => {

        if (config.method === 'get') {
            checkParams(config.params)
            config.params = qs.stringify(config.params)
            config.url = config.url + "?" + config.params;
            config.params= {}
        }
        if (config.method === 'post') {
            checkParams(config.data)
            config.data = qs.stringify(config.data)
        }
        if (config.method === 'put') {
            checkParams(config.data)
            config.data = qs.stringify(config.data)
        }

        if(config.url.indexOf(httpConfig.url.apiUrl)>-1){
            config.headers[httpConfig.header.Authorization] = store.getters.token;
        }
        return config
    },
    (error) => {
        // 请求错误处理
        return Promise.reject(error)
    }
)

// 添加响应拦截器
service.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // console.log(error.response)
        // const msg = error.response?.statusText || '网络错误';
        // throw new Error(msg)
        return error
    }
)

export default function () {
    return service
}