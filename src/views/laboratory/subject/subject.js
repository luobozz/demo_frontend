const methods = {
    init() {
        this.initCurd({
            list: this.$httpApi.ews.laboratory.getSubjects,
            details:this.$httpApi.ews.laboratory.getSubject,
            add: this.$httpApi.ews.laboratory.addSubject,
            edit: this.$httpApi.ews.laboratory.editSubject,
            delete: this.$httpApi.ews.laboratory.deleteSubject
        })
    },
    onEditOpen(record){
        record.quillLoading=true;
        setTimeout(()=>{
            this.$set(this.crudList.data,"quillLoading",false)
        },100)
    }
}

export default methods