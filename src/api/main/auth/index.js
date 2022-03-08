import axios from '@/api/axiosApi'
import httpConfig from "@/config/http.config";

export default{
    login(data) {
        return axios.get(`${httpConfig.url.apiUrl}/auth/login`, {}, data)
    },
    loginSms(data) {
        return axios.get(`${httpConfig.url.apiUrl}/auth/login/sms`, {}, data)
    },
    sms(data) {
        return axios.get(`${httpConfig.url.apiUrl}/auth/sms`, {}, data)
    },
    profileResource(data) {
        return axios.get(`${httpConfig.url.apiUrl}/auth/profile/resource`, {}, data)
    },
    role(data) {
        return axios.get(`${httpConfig.url.apiUrl}/auth/role`, {}, data)
    },
}