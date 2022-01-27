import axios from '../../axiosApi'
import url from '../urls'

const header = {}
export default {
    getStudent(data) {
        return axios.get(url.student, header, data)
    },
    addStudent(data){
        return axios.post(url.student, header,data);
    },
    editStudent(data){
        return axios.put(url.student, header, data);
    },
    deleteStudent(data){
        return axios.delete(url.student, header, data);
    },
    getEducationResult(data){
        return axios.get(url.student+"/education/result", header, data);
    },
}
