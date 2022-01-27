const methods = {
    init() {
        this.initCurd({
            list: (param) => {
                param.onlyNoRes = 1;
                return this.$httpApi.ews.system.account.getAccount(param);
            }
        })
    },
    onclose() {
        this.$emit("close", false)
    },
    editAccountHandle(record){
        const param={}
        param.uuid=record.uuid;
        param.logicTag="teacher";
        param.resUuid=this.teacher.uuid;
        return this.$httpApi.ews.system.account.editAccount(param).then(res=>{
            this.onclose();
        });
    }

}

export default methods