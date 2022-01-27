import qs from 'qs'
import dataUtils from '../utils/data/index'
import Mock from 'mockjs'
import httpConfig from "../config/http.config"

const responseBody=httpConfig.responseMessage;

export const builder = (data, message, code = 0, headers = {}) => {
    responseBody.data = data
    if (message !== undefined && message !== null) {
        responseBody.msg = message
    }
    if (code !== undefined && code !== 0) {
        responseBody.code = code
        responseBody._status = code
    }
    if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
        responseBody._headers = headers
    }
    responseBody.total =responseBody.data.length;
    return responseBody
}

export const getData=(res)=>{
    return qs.parse(res.url.split('?')[1])
}

export const randomUuid=()=>{
    return dataUtils.replaceAll(Mock.Random.uuid(),'-','')
}

export const randomData=(data)=>{
    const round = Mock.Random.natural(0, data.length-1)
    return data[round];
}