import lodash from "lodash"

const methods = {
    init() {
        this.initCurd({
            list: (param) => {
                param.status = [0]
                return this.$httpApi.ews.laboratory.getSubscribeRecordAll(param)
            },
            add: (param) => {
                return this.$httpApi.ews.laboratory.editLaboratoryRecord(param)
            }
        })
    },
    onEditOpen(record) {
        this.modal.subscribeRecord.loading = true;
        this.modal.subscribeRecord.switch=true;
        this.$httpApi.ews.laboratory.getLaboratoryRecord({
            bookUuid: record.uuid
        }).then(res => {
            this.crudSingleHandle().add(this.modal.subscribeRecord, {
                bookUuid: record.uuid,
                recorder: res.code == 200 ? res.data[0].recorder : this.defaultSubscribeRecord.recorder,
                description: res.code == 200 ? res.data[0].description : this.defaultSubscribeRecord.description,
            })
        }).catch(e => {
            this.$util.ui.modalDelayClose(this.modal.subscribeRecord, () => {
            }, {});
        }).finally(f => {
            this.modal.subscribeRecord.loading = false;
        })
    },
}

export default methods