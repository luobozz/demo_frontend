import lodash from "lodash";
import regular from "@/utils/data/regular";
import encryption from "@/utils/encryption";

const methods = {
    init() {
        this.initCurd({
            list: this.$httpApi.ews.system.account.getAccount,
            add: (params)=>{
                let ms = new Date().getTime();
                params.timestamp = ms;
                params.password = encryption.AES.encrypt(params.password, params.timestamp)
                return this.$httpApi.ews.system.account.addAccount(params)
            },
            edit: this.$httpApi.ews.system.account.editAccount,
        }, {}, {
            add: ["account", "tel", "password", "image", "roleUuids"],
            edit: ["uuid", "image", "roleUuids"]
        })
    },
    accountSelectList() {
        if (lodash.isEmpty(this.modal.account.select.roles.data)) {
            this.modal.account.select.roles.loading = true;
            this.$httpApi.ews.system.account.getRole({
                pageNo: 1,
                maxResults: this.modal.account.select.roles.defaultPageSize,
            }).then(res => {
                this.modal.account.select.roles.data = this.modal.account.select.roles.data.concat(res.data);
            }).finally(f => {
                this.modal.account.select.roles.loading = false;
            })
        }
    },
    editOpen(record) {
        record.roles = []
        record.roleUuids=[]
        record.roleVos?.forEach(p => {
            record.roles.push({key: p.uuid, label: p.name})
            record.roleUuids.push(p.uuid)
        })
    },
    validatorPwdConfirm(rule, value, callback) {
        if (value === '') {
            callback(new Error('请再次确定密码!'));
        } else if (value !== this.crudList.data.password) {
            callback(new Error("两次密码填写不一致!"));
        } else {
            callback();
        }
    }
}

export default methods