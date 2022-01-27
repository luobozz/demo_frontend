import axios from '../../axiosApi'
import url from '../urls'

const header = {}
export default {
    getPsm(data) {
        return axios.get(url.psm, header, data)
    },
    addPsm(data){
        return axios.post(url.psm, header,data);
    },
    editPsm(data){
        return axios.put(url.psm, header, data);
    },
    deletePsm(data){
        return axios.delete(url.psm, header, data);
    }
}
