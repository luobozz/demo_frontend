import axios from '../../axiosApi'
import url from '../urls'

const header = {}
export default {
    getTeacher(data) {
        return axios.get(url.teacher, header, data)
    },
    addTeacher(data){
        return axios.post(url.teacher, header,data);
    },
    editTeacher(data){
        return axios.put(url.teacher, header, data);
    },
    deleteTeacher(data){
        return axios.delete(url.teacher, header, data);
    }
}
