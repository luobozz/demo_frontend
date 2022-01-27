import lodash from "lodash";

const methods = {
    init() {
        this.initCurd({
            list: () => {
                if (this.crudList.conditions.onlyGlobal) {
                    return this.$httpApi.ews.system.account.getPermissionGlobal();
                } else {
                    return this.$httpApi.ews.system.account.getPermission();
                }
            },
            add: (data) => {
                const params = {
                    ...data
                }
                params.signs = this.modal.permission.form.addSignList;
                return this.$httpApi.ews.system.account.addPermission(params)
            },
            edit: (data) => {
                const params = {
                    ...data
                }
                params.signs = this.modal.permission.form.addSignList;
                params.uuids= this.modal.permission.form.addUuidList;
                return this.$httpApi.ews.system.account.editPermission(params)
            },
            delete:  this.$httpApi.ews.system.account.deletePermission
        })
    },
    addSignListHandle() {
        return {
            add: () => {
                if (lodash.isEmpty(this.modal.permission.form.addInputSign)) {
                    this.$util.exception.toastError("不能填空");
                    return;
                }
                if (lodash.includes(this.modal.permission.form.addSignList, this.modal.permission.form.addInputSign)) {
                    this.$util.exception.toastError("不能重复添加");
                    return;
                }
                this.crudList.data.sign += `,${this.modal.permission.form.addInputSign}`;
                this.$util.ui.toast({
                    type: 200,
                    message: "添加成功"
                })
                this.modal.permission.form.addInputSign = ""
            },
            delete: (index) => {
                if(this.modal.permission.form.addSignList.length<=1){
                    this.$util.exception.toastError("权限集至少有一个");
                    return;
                }
                let list=lodash.cloneDeep(this.modal.permission.form.addSignList);
                let uuidList=lodash.cloneDeep(this.modal.permission.form.addUuidList);
                lodash.remove(list,(item,i)=>{
                    return i==index;
                })
                lodash.remove(uuidList,(item,i)=>{
                    return i==index;
                })
                this.modal.permission.form.addSignList=list;
                this.modal.permission.form.addUuidList=uuidList;
            }
        }

    }
}

export default methods