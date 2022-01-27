const methods = {
    init() {
        this.initCurd({
            list: this.$route.name === 'educationResources' ? this.$httpApi.ews.laboratory.getVideoStar : this.$httpApi.ews.laboratory.getVideo,
            add: this.$httpApi.ews.laboratory.addVideo,
            edit: this.$httpApi.ews.laboratory.editVideo,
            delete: this.$httpApi.ews.laboratory.deleteVideo
        })
    },
    videoClickHandle(video) {
        this.$httpApi.ews.laboratory.addVideoViews({uuid:video.uuid})
        this.modal.videoModal.title = `${video.labUseBookInfo?.name||""} 视频记录`;
        this.modal.videoModal.switch = true;
        this.modal.videoModal.videoRes = video.path;
        this.modal.videoModal.duration = video.timeLength;
    },
    videoStarHandle(video) {
        const param = {
            uuid: video.uuid,
            stared: video.stared == 1 ? 0 : 1
        }

        this.$httpApi.ews.laboratory.addVideoStar(param).then(res => {
            this.crudBatchHandle().list();
        });
    }
}

export default methods