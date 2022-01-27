import lodash from "lodash";

const methods = {
    init() {
        this.initCurd({
            list: this.$httpApi.ews.system.account.getRoute,
            add: this.$httpApi.ews.system.account.addRoute,
            edit: this.$httpApi.ews.system.account.editRoute,
            delete:  this.$httpApi.ews.system.account.deleteRoute
        })
    },
    assignPermissionModalHandle(uuid) {
        const {
            modal,
            $httpApi,
            $util
        } = this;
        this.modal.assignPermission.switch = true;
        this.modal.assignPermission.loading = true;
        this.modal.assignPermission.routeUuid = uuid;
        this.modal.assignPermission.checkSign = [];
        $httpApi.ews.system.account.getPermission({
            pageNo: this.modal.assignPermission.pagination.current,
            maxResults: this.modal.assignPermission.pagination.defaultPageSize
        }).then((res) => {
            this.modal.assignPermission.data = res.data;
            let permissionUuIds=[];
            this.modal.assignPermission.data.forEach(p => {
                p.signSplit=this.$util.data.split(p.sign,",")
                p.uuidSplit=this.$util.data.split(p.uuid,",");
                permissionUuIds=permissionUuIds.concat(p.uuidSplit)
            })
            $httpApi.ews.system.account.getRoutePermission({
                routeUuIds: [modal.assignPermission.routeUuid],
                permissionUuIds:permissionUuIds
            }).then((res2) => {
                this.modal.assignPermission.checkSign = res2.data[0].permissions.map(p => p.uuid)
            }).finally(() => {
                this.modal.assignPermission.loading = false;
            })
        }).catch((error) => {
            $util.ui.modalDelayClose(this.modal.assignPermission, () => {
            }, {});
        });
    },
    assignPermissionCheckHandle(uuid) {
        const checkSign=lodash.cloneDeep(this.modal.assignPermission.checkSign)

        if (lodash.includes(this.modal.assignPermission.checkSign, uuid)) {
            lodash.remove(checkSign, p => {
                return p === uuid
            })
            this.modal.assignPermission.checkSign=checkSign;
        } else {
            this.modal.assignPermission.checkSign.push(uuid)
        }
    },
    assignPermissionEditHandle() {
        const {
            modal,
            $httpApi,
            $util
        } = this;
        this.modal.assignPermission.loading = true;
        this.$httpApi.ews.system.account.editRoutePermission({
            routeUuid: modal.assignPermission.routeUuid,
            permissionUuIds:this.modal.assignPermission.checkSign
        }).finally(() => {
            this.modal.assignPermission.switch = false;
            this.modal.assignPermission.loading = false;
        })
    }
}

export default methods