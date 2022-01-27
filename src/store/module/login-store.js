import httpApi from "../../api/"
import encryption from "../../utils/encryption"
import lodash from "lodash";
import timer from "../../utils/data/timer";
import httpConfig from "../../config/http.config";
import storageConfig from "../../config/storage.config";
import router from "../../router";
import storage from "@/utils/data/storage"

const assemblyRoute = (route) => {
    const reRoute = {
        uuid: route.uuid,
        path: route.path,
        name: route.sign,
        meta: {
            title: route.name,
            icon: route.icon
        },
        parentUuid: route.parentUuid,
        subs: []
    }
    reRoute.component = lodash.isEmpty(route.parentUuid) ? ({render: (e) => e("router-view")}) : (() => import(`../../views${route.component}`))

    return reRoute;
}

const findChildrenRoute = (route, routes) => {
    return lodash.unionBy(route.children, routes.filter(p =>
        p.parentUuid === route.uuid
    ), "uuid")

}

const getPwd = (data) => {
    if (data.iv.useLastPwd) {
        return encryption.AES.decrypt(data.password, data.iv.iv);
    } else {
        return data.password;
    }
}

const defaultAccount = {
    account: "",
    tel: "",
    image: "",
    status: "",
    token: "",
    expire: -1,
    logicPersonInfo: {},
    roleVos: [],
    createdTime: "",
}

export default {
    state: {
        account: defaultAccount,
        isLogin: false,
        routes: [],
        pwdKeeper: false,
    },
    actions: {
        login(context, data) {
            let ms = new Date().getTime();
            const password=getPwd(data)
            const params = {
                account: data.account,
                password:encryption.AES.encrypt(password, ms),
                timestamp: ms
            }
            return new Promise((resolve, reject) => {
                httpApi.ews.system.account.login(params).then(res => {
                    context.commit('SET_ACCOUNT', res.data[0]);
                    context.commit('LOGIN')
                    context.commit('SAVE_PWD', {
                        password:password,
                        iv: res.data[0].createdTime
                    })
                    const heartbeatTimer = timer.getTimer(httpConfig.httpTimer.heartbeat.name);
                    heartbeatTimer.handle();
                    const messageTimer = timer.getTimer(httpConfig.httpTimer.messageListen.name);
                    timer.restartTimer(messageTimer);
                    router.push({name: 'home', params: {}})
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        logout(context, params) {
            context.commit('LOGOUT')
            const heartbeatTimer = timer.getTimer(httpConfig.httpTimer.heartbeat.name);
            timer.stopTimer(heartbeatTimer);
            const messageTimer = timer.getTimer(httpConfig.httpTimer.messageListen.name);
            timer.stopTimer(messageTimer);
            router.push({name: 'login'})
            router.resetRoute();
            httpApi.ews.system.account.logout(params).finally(() => {
                context.commit('LOGOUT_TOKEN')
            });
        },
        getRoutes(context) {
            return new Promise((resolve, reject) => {
                try {
                    context.commit('SET_ROUTES');
                    resolve("success");
                } catch (e) {
                    reject(e)
                }
            })
        },
        keepPwd(context,data){
            context.commit('KEEP_PWD',data);
        }
    },
    mutations: {
        LOGIN(state) {
            state.isLogin = true
        },
        LOGOUT(state) {
            state.isLogin = false
            let lastAccount = lodash.cloneDeep(state.account);
            state.account = lodash.cloneDeep(defaultAccount);
            state.routes = [];
            state.account.token = lastAccount.token
            state.account.account = lastAccount.account;
            if (state.pwdKeeper) {
                state.account.createdTime = lastAccount.createdTime
            }
        },
        LOGOUT_TOKEN(state) {
            state.account.token = "";
        },
        SET_ACCOUNT(state, payload) {
            for (let i in state.account) {
                if (payload[i] != undefined) {
                    state.account[i] = payload[i];
                }
            }
        },
        KEEP_PWD(state,payload) {
            state.pwdKeeper = payload?payload:!state.pwdKeeper
        },
        SAVE_PWD(state, payload) {
            let password = state.pwdKeeper ? encryption.AES.encrypt(payload.password, payload.iv) : ""
            storage.set(storageConfig.PWD_STORAGE.name, password)
        },
        SET_ROUTES(state) {
            const roleVos = lodash.cloneDeep(state.account.roleVos)
            const rolesRouteVos = roleVos.map(p => p.routeVos);
            let routesVos = [], parentRoutes = [], routes = [];
            rolesRouteVos.forEach(p => {
                routesVos = lodash.unionBy(routesVos, p, "uuid")
            })
            routesVos.forEach(p => {
                if (lodash.isEmpty(p.uuid)) {
                    return false;
                }
                let route = assemblyRoute(p);
                if (lodash.isEmpty(p.parentUuid)) {
                    parentRoutes.push(route)
                } else {
                    routes.push(route)
                }
            })
            parentRoutes.forEach(p => {
                p.subs = findChildrenRoute(p, routes);
                state.routes.push(p)
            })
        }
    }
}