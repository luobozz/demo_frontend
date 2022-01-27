import lodash from "lodash";

const methods = {
    init() {
        this.initCurd({
            list: this.$httpApi.ews.system.account.getRole,
            add: this.$httpApi.ews.system.account.addRole,
            edit: this.$httpApi.ews.system.account.editRole,
            delete:  this.$httpApi.ews.system.account.deleteRole
        })
    },
    assignRouteModalHandle(uuid) {
        const {
            modal,
            $httpApi,
            $util
        } = this;
        this.modal.assignRoute.switch = true;
        this.modal.assignRoute.roleUuid = uuid;
        this.modal.assignRoute.loading = true;

        const assemblyRoute = (route) => {
            const parentRoutes = [], routes = [];

            route.forEach(p => {
                if (lodash.isEmpty(p.parentUuid)) {
                    parentRoutes.push(p)
                } else {
                    routes.push(p)
                }
            })

            parentRoutes.forEach(p => {
                p.children = lodash.unionBy(p.children, routes.filter(o =>
                    o.parentUuid === p.uuid
                ), "uuid");
            })
            return parentRoutes;
        }

        const getRoute = () => {
            return new Promise((resolve, reject) => {
                $httpApi.ews.system.account.getRoute({
                    pageNo: modal.assignRoute.pagination.current,
                    maxResults: modal.assignRoute.pagination.defaultPageSize
                }).then((res) => {
                    $httpApi.ews.system.account.getRouteGlobal({}).then((res2) => {
                        resolve({
                            routes: res.data,
                            global:res2.data[0]
                        })
                    }).catch(e => {
                        reject(e);
                    })
                }).catch(e => {
                    reject(e);
                })
            })
        }

        const getRoutePermission = (routes,global) => {
            return new Promise((resolve, reject) => {
                $httpApi.ews.system.account.getRoutePermission({
                    routeUuIds: routes.map(p => p.uuid),
                    permissionUuIds: []
                }).then((res) => {
                    routes.forEach(p => {
                        const resRoute = lodash.find(res.data, o => {
                            return p.uuid == o.uuid;
                        });
                        p.permissions = resRoute?.permissions || []
                        p.routePermissions = resRoute?.routePermissions.map(p => p.uuid) || []
                    })

                    this.modal.assignRoute.data = assemblyRoute(routes);

                    global.routePermissions = global.routePermissions.map(p => p.uuid) || []

                    this.modal.assignRoute.data.unshift(global)


                    resolve();
                }).catch(e => {
                    reject(e);
                })
            })
        }

        const getChecked = () => {
            return new Promise((resolve, reject) => {
                $httpApi.ews.system.account.getRoleRoutePermission({
                    roleUuIds: modal.assignRoute.roleUuid,
                }).then((res) => {
                    this.modal.assignRoute.checkRpUuid = res.data.map(p => p.rpUuid);
                    $httpApi.ews.system.account.getRoleRoute({
                        roleUuIds: modal.assignRoute.roleUuid,
                    }).then((res) => {
                        this.modal.assignRoute.checkRouteUuid = res.data.map(p => p.routeUuid);
                        resolve();
                    }).catch(e => {
                        reject(e);
                    })
                }).catch(e => {
                    reject(e);
                })
            })
        }

        getRoute().then(res=> {
            getRoutePermission(res.routes,res.global).then(res2 => {
                getChecked().finally(f => {
                    this.modal.assignRoute.loading = false;
                });
            })
        }).catch((error) => {
            $util.ui.modalDelayClose(this.modal.assignRoute, () => {
            }, {});
        })


    },
    assignRpCheckHandle(rpUuid) {
        const check = lodash.cloneDeep(this.modal.assignRoute.checkRpUuid)

        if (lodash.includes(check, rpUuid)) {
            lodash.remove(check, p => {
                return p === rpUuid
            })
            this.modal.assignRoute.checkRpUuid = check;
        } else {
            this.modal.assignRoute.checkRpUuid.push(rpUuid)
        }
    },
    assignRouteCheckHandle(uuid) {
        const check = lodash.cloneDeep(this.modal.assignRoute.checkRouteUuid)

        if (lodash.includes(check, uuid)) {
            lodash.remove(check, p => {
                return p === uuid
            })
            this.modal.assignRoute.checkRouteUuid = check;
        } else {
            this.modal.assignRoute.checkRouteUuid.push(uuid)
        }
    },
    assignRouteEditHandle() {
        const {
            modal,
            $httpApi,
            $util
        } = this;
        this.modal.assignRoute.loading = true;
        this.$httpApi.ews.system.account.editRoleRoutePermission({
            roleUuid: modal.assignRoute.roleUuid,
            routeUuIds:this.modal.assignRoute.checkRouteUuid,
            rpUuIds:this.modal.assignRoute.checkRpUuid,
        }).finally(() => {
            this.modal.assignRoute.switch = false;
            this.modal.assignRoute.loading = false;
        })
    }
}

export default methods