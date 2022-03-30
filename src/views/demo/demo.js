import demo from "@/model/demo"

const methods = {
    init() {
        this.initCurd({
            list: this.$httpApi.main.auth.getSysOrmRole,
            add: this.$httpApi.main.auth.addSysOrmRole,
            edit: this.$httpApi.main.auth.editSysOrmRole,
            delete: this.$httpApi.main.auth.delSysOrmRole,
        }, "模板", demo, {}, {})
    }
}

export default methods