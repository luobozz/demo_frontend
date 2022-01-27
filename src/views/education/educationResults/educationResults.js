import moment from "moment"
import lodash from "lodash";
import momentConfig from "@/config/moment.config"
const methods = {
    init() {
        this.initCurd({
            list:(data)=>{
                data.year=moment(data.year)
                if(data.pickTime?.[0]){
                    data.startTime=moment(data.pickTime[0].format(momentConfig.format.eraseHMS))
                }
                if(data.pickTime?.[1]){
                    data.endTime=moment(data.pickTime[1].format(momentConfig.format.eraseHMS))
                }
                data.pickTime=null
                return this.$httpApi.ews.student.getEducationResult(data)
            }
        },{
            year:this.dateYearSection[0],
            laboratorySelectInfo:{},
            classCollectiveSelectInfo:{},
            teacherSelectInfo:{},
            subjectSelectInfo:{}
        }, {
            list: ["year","pickTime","laboratoryUuid","studentName","studentNo","gradeUuid","classCollectiveUuid","teacherUuid","subjectUuid"]
        })
        // this.crudList.conditions.year = this.dateYearSection[0]
    },
    labSelectList() {
        if (lodash.isEmpty(this.conditionSelect.laboratory.data)) {
           this.conditionSelect.laboratory.loading = true;
            this.$httpApi.ews.laboratory.getLaboratory({
                pageNo: 1,
                maxResults:this.conditionSelect.laboratory.defaultPageSize,
            }).then(res => {
               this.conditionSelect.laboratory.data =this.conditionSelect.laboratory.data.concat(res.data);
            }).finally(f => {
               this.conditionSelect.laboratory.loading = false;
            })
        }
    },
    classCollectiveSelectList() {
        if (lodash.isEmpty(this.conditionSelect.classCollective.data)&&!lodash.isEmpty(this.crudList.conditions.gradeUuid)&&!lodash.isEmpty(this.crudList.conditions.year)) {
            this.conditionSelect.classCollective.loading = true;
            this.$httpApi.ews.classCollective.getClassCollective({
                pageNo: 1,
                maxResults:this.conditionSelect.classCollective.defaultPageSize,
                gradeUuid:this.crudList.conditions.gradeUuid,
                year:moment(this.crudList.conditions.year)
            }).then(res => {
                this.conditionSelect.classCollective.data =this.conditionSelect.classCollective.data.concat(res.data);
            }).finally(f => {
                this.conditionSelect.classCollective.loading = false;
            })
        }
    },
    teacherSelectList() {
        if (lodash.isEmpty(this.conditionSelect.teacher.data)) {
            this.conditionSelect.teacher.loading = true;
            this.$httpApi.ews.teacher.getTeacher({
                pageNo: 1,
                maxResults: this.conditionSelect.teacher.defaultPageSize,
            }).then(res => {
                this.conditionSelect.teacher.data = this.conditionSelect.teacher.data.concat(res.data);
            }).finally(f => {
                this.conditionSelect.teacher.loading = false;
            })
        }
    },
    subjectSelectList(){
        if (lodash.isEmpty(this.conditionSelect.subject.data)) {
            this.conditionSelect.subject.loading = true;
            this.$httpApi.ews.laboratory.getSubjects({
                pageNo: 1,
                maxResults: this.conditionSelect.subject.defaultPageSize,
            }).then(res => {
                this.conditionSelect.subject.data = this.conditionSelect.subject.data.concat(res.data);
            }).finally(f => {
                this.conditionSelect.subject.loading = false;
            })
        }
    },
    resetClassCollectiveSelect() {
        this.conditionSelect.classCollective.data = [];
        this.crudList.conditions.classCollectiveSelectInfo = {}
    }

}

export default methods