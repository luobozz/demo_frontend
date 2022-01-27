import axios from "@/api/axiosApi";
import url from "@/api/edu.web.service/urls";

/**
 * @author chenlingyu
 */

const getAddr=(ip)=>{
    return `http://${ip}`
}

export default {
    stat(ip) {
        return `${getAddr(ip)}/stat`
    },
}