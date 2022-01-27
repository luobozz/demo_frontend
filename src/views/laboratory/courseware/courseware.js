import lodash from "lodash";

const methods = {
    init() {
        this.initCurd({
            list: this.$httpApi.ews.laboratory.getCourse,
            add: this.$httpApi.ews.laboratory.addCourse,
            edit: this.$httpApi.ews.laboratory.editCourse,
            delete: this.$httpApi.ews.laboratory.deleteCourse,
        })
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
    editOpen(record) {
        record.teacherSelectInfo={}
        record.quillLoading=true;
        setTimeout(()=>{
            this.$set(this.crudList.data,"quillLoading",false)
        },100)
        if (record.teacherInfo) {
            record.teacherSelectInfo = {
                key: record.teacherInfo.uuid,
                label: record.teacherInfo.name
            }
        }
    },
    getAttachmentName(path){
        const last=path.lastIndexOf("/");
        const name=last>-1?path.substring(last+1,path.length):""
        return name.length>15?name.substring(name.length-15,name.length):name
    },
    getAttachmentSuffix(path){
        const last=path.lastIndexOf(".");
        return last>-1?path.substring(last+1,path.length):""
    },
}

export default methods