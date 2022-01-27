import moment from "moment";
import uiUtils from "../../../utils/ui";

const methods = {
    init() {
        this.initCurd({
            list: this.$httpApi.ews.laboratory.getSubscribeRecordAll,
            edit: (data) => {
                return new Promise((resolve, reject) => {
                    this.updateApproval(data)
                    resolve();
                })
            }
        }, {}, {edit: ["uuid", "approvalStatus", "rejectReason", "toApprovalStatus"]})
    },
    updateApproval(record, toApprovalStatus) {
        this.modal.reject.loading=true;
        this.$httpApi.ews.laboratory.editSubscribeRecordApproval({
            uuid: record.uuid,
            rejectReason: record.rejectReason,
            approvalStatus: record.toApprovalStatus || toApprovalStatus
        }).then((res) => {
            this.crudBatchHandle().list();
        }).finally(f=>{
            this.modal.reject.loading=false;
        });
    }, editOpen(record, status) {
        record.toApprovalStatus = status
    }
}

export default methods