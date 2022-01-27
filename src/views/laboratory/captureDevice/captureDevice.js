import lodash from "lodash";

const methods = {
    init() {
        this.initCurd({
            list: this.$httpApi.ews.laboratory.getCaptureDevice,
            add: this.$httpApi.ews.laboratory.addCaptureDevice,
            edit: this.$httpApi.ews.laboratory.editCaptureDevice,
            delete: this.$httpApi.ews.laboratory.deleteCaptureDevice
        })
    },
    reAddHandle(uuid) {
        this.crudList.loading = true;
        this.$httpApi.ews.laboratory.captureDevicePsmReAdd({
            uuid: uuid,
        }).then((res) => {
            this.crudBatchHandle().list();
        }).catch(e => {
            this.crudList.loading = false;
        })
    },
    videoClickHandle(record) {
        this.modal.videoModal.title = record.name;
        this.modal.videoModal.switch = true;
        this.modal.videoModal.loading = true;
        this.modal.videoModal.videoRes = "";
        this.modal.videoModal.lcdUuid = record.uuid;
        this.$httpApi.ews.laboratory.getCaptureDeviceLiveStream({
            uuid: record.uuid,
        }).then((res) => {
            this.modal.videoModal.videoRes = lodash.isEmpty(res.data[0].liveStreamUrl) ? "error" : res.data[0].liveStreamUrl;
            this.$forceUpdate()
        }).catch(e => {
            this.modal.videoModal.videoRes = "error";
            this.$forceUpdate()
        })
    },
    labSelectList() {
        if (lodash.isEmpty(this.modal.captureDevice.select.lab.data)) {
            this.modal.captureDevice.select.lab.loading = true;
            this.$httpApi.ews.laboratory.getLaboratory({
                pageNo: 1,
                maxResults: this.modal.captureDevice.select.lab.defaultPageSize,
            }).then(res => {
                this.modal.captureDevice.select.lab.data = this.modal.captureDevice.select.lab.data.concat(res.data);
            }).finally(f => {
                this.modal.captureDevice.select.lab.loading = false;
            })
        }
    },
    psmSelectList() {
        if (lodash.isEmpty(this.modal.captureDevice.select.psm.data)) {
            this.modal.captureDevice.select.psm.loading = true;
            this.$httpApi.ews.psm.getPsm({
                pageNo: 1,
                maxResults: this.modal.captureDevice.select.psm.defaultPageSize,
            }).then(res => {
                this.modal.captureDevice.select.psm.data = this.modal.captureDevice.select.psm.data.concat(res.data);
            }).finally(f => {
                this.modal.captureDevice.select.psm.loading = false;
            })
        }
    },
    editOpen(record) {
        record.laboratorySelectInfo = record.laboratoryInfo ? {
            key: record.laboratoryInfo.uuid,
            label: record.laboratoryInfo.name
        } : {}
        record.labUuid=record.laboratoryInfo?record.laboratoryInfo.uuid:""
        record.psmSelectInfo = record.psmInfo ? {
            key: record.psmInfo.uuid,
            label: record.psmInfo.name
        } : {}
        record.psmUuid=record.psmInfo?record.psmInfo.uuid:""
    },
}

export default methods