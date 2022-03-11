import axios from '@/api/axiosApi'
import httpConfig from "@/config/http.config";

export default {
    login(data, custom) {
        return axios.get(`${httpConfig.url.apiUrl}/auth/login`, {}, data, custom)
    },
    loginSms(data, custom) {
        return axios.get(`${httpConfig.url.apiUrl}/auth/login/sms`, {}, data, custom)
    },
    sms(data, custom) {
        return axios.get(`${httpConfig.url.apiUrl}/auth/sms`, {}, data, custom)
    },
    profileResource(data, custom) {
        return axios.get(`${httpConfig.url.apiUrl}/auth/profile/resource`, {}, data, custom)
    },
    role(data, custom) {
        return axios.get(`${httpConfig.url.apiUrl}/auth/role`, {}, data, custom)
    },
}