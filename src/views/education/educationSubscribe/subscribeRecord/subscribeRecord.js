import lodash from "lodash";
import momentConfig from "@/config/moment.config"
import moment from "moment";

const methods = {
    init() {
        this.initCurd({
            list: this.$httpApi.ews.laboratory.getSubscribeRecordAccount,
        })
    },
    editBookHandle(record) {
        this.book.switch = true;
        this.book.data = lodash.cloneDeep(record)
        if(this.book.data.useDay){
            this.book.data.useDay=moment(this.book.data.useDay).format(momentConfig.format.onlyDate)
        }

    }
}

export default methods