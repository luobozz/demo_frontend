import moment from "moment";
import momentConfig from "@/config/moment.config";

const methods = {
    init() {
        this.initCurd({
            list: this.$httpApi.ews.student.getStudent,
            add: (param)=>{
                param.admissionTime=moment(param.admissionTime)
                return this.$httpApi.ews.student.addStudent(param)
            },
            edit: (param)=>{
                param.admissionTime=moment(param.admissionTime)
                return this.$httpApi.ews.student.editStudent(param)
            },
            delete: this.$httpApi.ews.student.deleteStudent
        });
    },
    onOpen(record){
        if(record.birthday){
            record.birthday=moment(record.birthday)
        }
        if(record.admissionTime){
            record.admissionTime=moment(record.admissionTime).format(momentConfig.format.onlyYear)
        }
    }
}

export default methods