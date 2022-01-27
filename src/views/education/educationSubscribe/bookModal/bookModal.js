import lodash from "lodash";
import moment from "moment";
import momentConfig from "../../../../config/moment.config"

const methods = {
    init() {

    },
    onclose() {
        this.$emit("close", false)
    },
    teacherSelectList() {
        if (lodash.isEmpty(this.select.teacher.data)) {
            this.select.teacher.loading = true;
            this.$httpApi.ews.teacher.getTeacher({
                pageNo: 1,
                maxResults: this.select.teacher.defaultPageSize,
            }).then(res => {
                this.select.teacher.data = this.select.teacher.data.concat(res.data);
            }).finally(f => {
                this.select.teacher.loading = false;
            })
        }
    },
    gradeclassSelectList() {
        if (lodash.isEmpty(this.select.gradeclass.data)) {
            this.select.gradeclass.loading = true;
            this.$httpApi.ews.classCollective.getClassCollective({
                pageNo: 1,
                maxResults: this.select.gradeclass.defaultPageSize,
            }).then(res => {
                this.select.gradeclass.data = this.select.gradeclass.data.concat(res.data);
            }).finally(f => {
                this.select.gradeclass.loading = false;
            })
        }
    },
    subBook() {
        this.loading=true;
        this.$refs["useBookModal"].validate((valid, obj) => {
            if (valid) {
                let param = lodash.cloneDeep(this.book);
                param.useDay = moment(param.useDay)
                param.applicant = !lodash.isEmpty(this.accountState.logicPersonInfo)?this.accountState.logicPersonInfo.name:this.accountState.account;
                const way=param.id?this.$httpApi.ews.laboratory.editSubscribeRecord:this.$httpApi.ews.laboratory.addSubscribeRecord;
                way(param).then(res => {
                    this.modalSwitch = false;
                    this.onclose();
                }).finally(f=>{
                    this.loading=false
                })
            }else {
                this.loading=false
            }
        })
    }
}

export default methods