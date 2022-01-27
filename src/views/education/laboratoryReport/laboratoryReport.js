const methods = {
    init() {
        this.initCurd({
            list:(param)=>{
                param.status=[0]
                return this.$httpApi.ews.laboratory.getSubscribeRecordAll(param)
            },
        })
    },reportSourceHandle(record){
        this.modal.reportSource.data=[];
        this.modal.reportSource.data={
            ...record
        }
        this.modal.reportSource.switch=true
    }
}

export default methods