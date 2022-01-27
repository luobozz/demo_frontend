import lodash from "lodash";

const methods = {
    init() {
        this.initCurd({
            list: this.$httpApi.ews.laboratory.getLaboratory,
            add: this.$httpApi.ews.laboratory.addLaboratory,
            edit: this.$httpApi.ews.laboratory.editLaboratory,
            delete: this.$httpApi.ews.laboratory.deleteLaboratory
        })
    },
    videoClickHandle(record) {
        this.modal.videoModal.title = record.name;
        this.modal.videoModal.switch = true;
        this.modal.videoModal.loading = true;

        this.$httpApi.ews.laboratory.getCaptureDevice({
            labUuid: record.uuid
        }).then(res => {
            if (res.code == 404) {
                this.$util.exception.toastError("没有摄像头");
            } else {
                this.modal.videoModal.data = res.data;
                this.initStream();
            }
        }).finally(f => {
            this.modal.videoModal.loading = false;
        })
    },
    initStream() {
        this.modal.videoModal.data.forEach((p, index) => {
            p.loading = true;
            this.$httpApi.ews.laboratory.getCaptureDeviceLiveStream({
                uuid: p.uuid,
            }).then((res) => {
                p.videoRes = lodash.isEmpty(res.data[0].liveStreamUrl) ? "error" : res.data[0].liveStreamUrl;
                p.hasAudio = false;
                p.isLive = true;
                p.videoType = "flv";
                p.autoPlay = true;
                p.lcdUuid = p.uuid;

                // p.videoRes="/psm/2021/5/22/1/v122.mp4";
                // p.isLive = false;
                // p.videoType = "mp4";
                this.$refs["videoModalMultiple"].setVideo(index, p)
            })
        })

    },
    vmmCloseHandle(e) {
        this.modal.videoModal.switch = e;
    },
    subjectsSelectList() {
        if (lodash.isEmpty(this.modal.laboratory.select.subjects.data)) {
            this.modal.laboratory.select.subjects.loading = true;
            this.$httpApi.ews.laboratory.getSubjects({
                pageNo: 1,
                maxResults: this.modal.laboratory.select.subjects.defaultPageSize,
            }).then(res => {
                this.modal.laboratory.select.subjects.data = this.modal.laboratory.select.subjects.data.concat(res.data);
            }).finally(f => {
                this.modal.laboratory.select.subjects.loading = false;
            })
        }
    },
    editOpen(record) {
        record.labSubjects = []
        record.subjectUuids=[]
        record.labSubjectsList?.forEach(p => {
            record.labSubjects.push({key: p.uuid, label: p.name})
            record.subjectUuids.push(p.uuid)
        })
    },
}

export default methods