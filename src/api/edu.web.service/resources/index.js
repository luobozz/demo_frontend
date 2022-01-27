import axios from '../../axiosApi'
import url from '../urls'

const header = {}
export default {
    viewRes(path) {
        return `${url.resources}${path}`
    },
    getRes(path) {
        return axios.get(`${url.resources}`,{},{p:path},{noProcess:true},"blob")
    },
    postImage() {
        return `${url.resources}/image`
    },
    postAttachment() {
        return `${url.resources}/attachment`
    }
}
