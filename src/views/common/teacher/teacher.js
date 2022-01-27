import moment from "moment";
const methods = {
    init() {
        this.initCurd({
            list: this.$httpApi.ews.teacher.getTeacher,
            add:  this.$httpApi.ews.teacher.addTeacher,
            edit:  this.$httpApi.ews.teacher.editTeacher,
            delete:  this.$httpApi.ews.teacher.deleteTeacher
        })
    },
    assignAccountHandle(record){
        this.modal.account.data=[];
        this.modal.account.data={
            ...record
        }
        this.modal.account.switch=true
    },
    onOpen(record){
        if(record.birthday){
            record.birthday=moment(record.birthday)
        }
    }
}

export default methods