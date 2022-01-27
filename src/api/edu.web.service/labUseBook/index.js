import axios from '../../axiosApi'
import url from '../urls'

const header = {}
export default {
    getLabUseBook(data) {
        return axios.get(url.labUseBook, header, data)
    },
    editLabUseBook(data) {
        return axios.put(url.labUseBook, header, data)
    }
}
