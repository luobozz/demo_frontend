import axios from '../../../axiosApi'
import url from '../../urls'

const header = {}
export default {
    getMessage(data) {
        return axios.get(url.system.message, header, data,{noToast:{all:true}})
    },
    getMessageListen(data) {
        return axios.get(url.system.message+"/listen", header, data,{noToast:{all:true}})
    },
    messageRead(data) {
        return axios.post(url.system.message+"/read", header, data,{noToast:{success:true}})
    },
    messageReadAll(data) {
        return axios.post(url.system.message+"/read/all", header, data,{noToast:{success:true}})
    },
}
