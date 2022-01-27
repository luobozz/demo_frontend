import store from "@/store";

const methods = {
    init() {
        this.initCurd({
            list: (param) => {
                if (this.readType>=0){
                    param.readType = this.readType;
                }
                return this.$httpApi.ews.system.message.getMessage(param);
            }
        })
    },readMessageHandle(item) {
        this.$httpApi.ews.system.message.messageRead({uuid: item.uuid}).then(res => {
            item.readStatus=1;
        })
    },
}

export default methods