import lodash from "lodash";
import moment from "moment";
import momentConfig from "../../../../config/moment.config"

const methods = {
    init() {
        this.initCurd({
            list: (param) => {
                param.classUuid = this.classCollective.uuid;
                return this.$httpApi.ews.classCollective.getClassCollectiveMember(param);
            },
            delete:this.$httpApi.ews.classCollective.deleteClassCollectiveMember
        },{},{},true)
    },
    onclose() {
        this.$emit("close", false)
    },
    getStudent() {
        this.modal.addMember.loading = true;
        this.$httpApi.ews.student.getStudent({
            ...this.modal.addMember.conditions,
            current: this.modal.addMember.current,
            defaultPageSize: this.modal.addMember.defaultPageSize,
            excludeClassUuid: this.classCollective.uuid
        }).then(res => {
            this.modal.addMember.data = res.data
        }).finally(f => {
            this.modal.addMember.loading = false;
        })
    },
    getTeacher() {
    },
    checkMemberHandle(uuid) {
        const check = lodash.cloneDeep(this.modal.addMember.addMemberUuid)

        if (lodash.includes(check, uuid)) {
            lodash.remove(check, p => {
                return p === uuid
            })
            this.modal.addMember.addMemberUuid = check;
        } else {
            this.modal.addMember.addMemberUuid.push(uuid)
        }
    },
    addMemberHandle() {
        this.modal.addMember.loading = true;
        this.$httpApi.ews.classCollective.addClassCollectiveMember({
            classUuid: this.classCollective.uuid,
            memberUuids: this.modal.addMember.addMemberUuid,
            type: this.modal.addMember.type
        }).then(res => {
            this.crudBatchHandle().list();
        }).finally(f => {
            this.modal.addMember.loading = false;
            this.modal.addMember.switch = false;
        })
    }
}

export default methods