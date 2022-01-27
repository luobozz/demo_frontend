import axios from '../../axiosApi'
import url from '../urls'

const header = {}
export default {
    getClassCollective(data) {
        return axios.get(url.classCollective, header, data)
    },
    getClassCollectiveMember(data) {
        return axios.get(url.classCollective+"/member", header, data)
    },
    addClassCollective(data){
        return axios.post(url.classCollective, header,data);
    },
    addClassCollectiveMember(data) {
        return axios.post(url.classCollective+"/member", header, data)
    },
    editClassCollective(data){
        return axios.put(url.classCollective, header, data);
    },
    deleteClassCollective(data){
        return axios.delete(url.classCollective, header, data);
    },
    deleteClassCollectiveMember(data) {
        return axios.delete(url.classCollective+"/member", header, data)
    },
}
