import moment from "moment";
import lodash from "lodash";
import momentConfig from "../../../config/moment.config"

const methods = {
    init() {
        this.initCurd({
            list: this.$httpApi.ews.classCollective.getClassCollective,
            add: (data) => {
                data.year=moment(data.year)
                return this.$httpApi.ews.classCollective.addClassCollective(data);
            },
            edit: (data) => {
                data.year=moment(data.year)
                return this.$httpApi.ews.classCollective.editClassCollective(data);
            },
            delete:  this.$httpApi.ews.classCollective.deleteClassCollective
        })
    },
    onOpen(record){
        if(record.headTeacherInfo){
            record.headTeacher={
                key:record.headTeacherInfo.uuid,
                label:record.headTeacherInfo.name
            }
        }
        if(record.year){
            record.year=moment(record.year).format(momentConfig.format.onlyYear)
        }
    },
    classCollectiveMemberModalHandle(record){
        this.modal.classCollectiveMember.data=[];
        this.modal.classCollectiveMember.data={
            ...record
        }
        this.modal.classCollectiveMember.switch=true
    },
    teacherSelectList(){
        if (lodash.isEmpty(this.modal.classCollective.select.teacher.data)) {
            this.modal.classCollective.select.teacher.loading = true;
            this.$httpApi.ews.teacher.getTeacher({
                pageNo: 1,
                maxResults: this.modal.classCollective.select.teacher.defaultPageSize,
            }).then(res => {
                this.modal.classCollective.select.teacher.data = this.modal.classCollective.select.teacher.data.concat(res.data);
            }).finally(f => {
                this.modal.classCollective.select.teacher.loading = false;
            })
        }
    }
}

export default methods
