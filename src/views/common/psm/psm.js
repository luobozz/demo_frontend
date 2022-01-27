const methods = {
    init() {
        this.initCurd({
            list: this.$httpApi.ews.psm.getPsm,
            add:  this.$httpApi.ews.psm.addPsm,
            edit:  this.$httpApi.ews.psm.editPsm,
            delete:  this.$httpApi.ews.psm.deletePsm
        })
    }
}
export default methods