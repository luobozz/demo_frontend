const methods = {
    init() {
        this.initCurd({
            list: this.$httpApi.ews.laboratory.getRegulations,
            details:this.$httpApi.ews.laboratory.getRegulation,
            add:  this.$httpApi.ews.laboratory.addRegulation,
            edit:this.$httpApi.ews.laboratory.editRegulation,
            delete:this.$httpApi.ews.laboratory.deleteRegulation
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