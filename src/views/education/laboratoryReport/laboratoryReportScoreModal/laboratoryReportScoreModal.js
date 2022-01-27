import lodash from "lodash";
import moment from "moment";
import exception from "@/utils/exception";

const methods = {
    init() {
        this.initCurd({
            list: (param) => {
                param.bookUuid = this.useBook.uuid
                return this.$httpApi.ews.laboratory.getReportScore(param)
            },
        }, {}, {
            add: ["bookUuid", "studentUuid", "gradeclassUuid", "groupsInfo", "score", "description"],
            edit: ["uuid", "groupsInfo", "score", "description"]
        }, true)
        this.modal.addStudent.conditions.classYear = this.dateYearSection[0]
    },
    onclose() {
        this.$emit("close", false)
    },
    getData() {
        this.modal.addStudent.loading = true
        this.getClassList().then(res => {
            this.getStudent().finally(f => {
                this.modal.addStudent.loading = false
            })
        }).catch(e => {
            this.modal.addStudent.loading = false
        })
    },
    changeClass(classCollective) {
        this.modal.addStudent.currentClass = classCollective;
        this.modal.addStudent.loading = true
        this.getStudent().finally(f => {
            this.modal.addStudent.loading = false
        })
    },
    getStudent() {
        return new Promise((resolve, reject) => {
            if (!lodash.isEmpty(this.modal.addStudent.currentClass )) {
                this.$httpApi.ews.student.getStudent({
                    current: this.modal.addStudent.current,
                    defaultPageSize: this.modal.addStudent.defaultPageSize,
                    classUuid: this.modal.addStudent.currentClass.uuid,
                    excludeBookFilter: this.useBook.uuid
                }).then(res => {
                    this.modal.addStudent.studentData = res.data
                    resolve()
                }).catch(e => {
                    reject()
                })
            } else {
                this.modal.addStudent.studentData = []
                reject();
            }

        })
    },
    getClassList() {
        return new Promise((resolve, reject) => {
            this.$httpApi.ews.classCollective.getClassCollective({
                year: moment(this.modal.addStudent.conditions.classYear)
            }).then(res => {
                this.modal.addStudent.classData = res.data
                this.modal.addStudent.currentClass = res.data[0] || {}
                resolve()
            }).catch(f => {
                this.modal.addStudent.loading = false;
                reject()
            })
        })
    },
    checkStudentHandle(student) {
        const check = lodash.cloneDeep(this.modal.addStudent.addStudentUuid)
        const scoreInfo = lodash.cloneDeep(this.modal.addStudent.addStudentScoreInfo)
        const uuid = student.uuid

        if (lodash.includes(check, uuid)) {
            lodash.remove(check, p => {
                return p === uuid
            })
            lodash.remove(scoreInfo, p => {
                return p.studentUuid === uuid
            })
            this.modal.addStudent.addStudentUuid = check;
            this.modal.addStudent.addStudentScoreInfo = scoreInfo;
        } else {
            this.modal.addStudent.addStudentUuid.push(uuid)
            this.modal.addStudent.addStudentScoreInfo.push(
                {
                    uuid: `newAdd_${uuid}`,
                    studentUuid: uuid,
                    gradeclassUuid: this.modal.addStudent.currentClass.uuid,
                    groupsInfo: "",
                    description: "",
                    source: 0,
                    classCollectiveInfo: this.modal.addStudent.currentClass,
                    studentInfo: student,
                    type: "newAdd",
                    loading:false,
                }
            )
        }
    },
    addHandle(data) {
        console.log(data)
        this.$refs[`scoreForm_${data.uuid}_score`]?.validate(validSource => {
            this.$refs[`scoreForm_${data.uuid}_groupsInfo`]?.validate(validGroupsInfo => {
                if (validGroupsInfo && validSource) {
                    data.loading=true;
                    this.$forceUpdate()
                    data.bookUuid=this.useBook.uuid
                    let param = this.crudConditionsHandle().subParamHandle(data, this.crudList.subParam.add)
                    this.$httpApi.ews.laboratory.addReportScore(param).then(r => {
                        this.checkStudentHandle(data.studentInfo)
                        this.crudList.dataList.push(data)
                        data.type='normal'
                        this.$forceUpdate()
                    }).finally(f=>{
                        data.loading=false;
                        this.$forceUpdate()
                    })
                }
            });
        });
    }, editSubHandle(data) {
        this.$refs[`scoreForm_${data.uuid}_score`]?.validate(validSource => {
            this.$refs[`scoreForm_${data.uuid}_groupsInfo`]?.validate(validGroupsInfo => {
                if (validGroupsInfo && validSource) {
                    data.loading=true;
                    this.$forceUpdate()
                    let param = this.crudConditionsHandle().subParamHandle(data, this.crudList.subParam.edit)
                    this.$httpApi.ews.laboratory.editReportScore(param).then(r => {
                        // this.checkStudentHandle(data.uuid)
                        data.type='normal'
                        this.$forceUpdate()
                    }).finally(f=>{
                        data.loading=false;
                        this.$forceUpdate()
                    })
                }
            });
        });
    }, editOpenHandle(record) {
        record.type='edit'
        this.$forceUpdate()
    },
    cancelHandle(record){
        if (record.type==="edit"){
            record.type='normal'
            this.$forceUpdate()
        }else if(record.type==="newAdd"){
            this.checkStudentHandle(record.studentInfo)
        }
    }
}


export default methods