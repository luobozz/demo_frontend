import api from "@/api/index"
import lodash from "lodash";
import router from "@/router";
import exceptionUtils from "@/utils/exception/index"

const defaultAccount = {
    //	用户id
    uid: "",
    //登录账号
    cn: "",
    //用户姓名
    displayName: "",
    //头像
    avatar: "",
    token: "",
    //账号过期时间
    expireTm: "",
    //最后登录时间
    lastLoginTm: "",
    //	性别
    sex: "",
    // 角色
    roleType: "",
    //角色名称
    roleName: "",
    //菜单列表
    resource: [],
}

const assemblyRoute = (route, parentRoute) => {
    let reRoute = {}
    if (route.menuType === "menu") {
        reRoute = {
            path: `${parentRoute ? parentRoute.path : ""}/${route.resCode}`,
            name: route.resCode,
            meta: {
                title: route.resName,
                icon: route.icon
            },
            type: "route",
            subs: [],
            component: null
        }

        route.children.forEach(p => {
            reRoute.subs.push(assemblyRoute(p, reRoute))
        })

        if (reRoute.subs.length > 0) {
            reRoute.component = ({render: (e) => e("router-view")})
        } else if (reRoute.subs.length === 0 && !lodash.isEmpty(route.resUrl)) {
            reRoute.component = (() => import(`../../views${route.resUrl}`))
        } else {
            exceptionUtils.silentError(`${reRoute.name} 的配置组件地址不能为空，请检查数据 ${JSON.stringify(route)}`)
        }

    } else {
        reRoute = {
            name: "home-setting",
            meta: {
                title: route.resName,
                icon: route.icon
            },
            type: "icon",
        }
    }


    return reRoute;
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
            const {
                login,
                profileResource,
                role
            } = api.main.auth
            return new Promise((resolve, reject) => {
                Promise.all([
                    login({}, {noToast: {all: true}}),
                    profileResource({}, {noToast: {all: true}}),
                    role({}, {noToast: {all: true}})
                ]).then(r => {
                    // console.log(r[0].data, r[1].data, r[2].data)
                    const account = {

                        ...r[1].data.profile,
                        token: r[0].data.token,
                        roleType: r[2].data.map(p => p.roleType),
                        roleName: r[2].data.map(p => p.roleName),
                        resource: r[1].data.resource,
                    }
                    context.commit('LOGIN')
                    context.commit('SET_ACCOUNT', account);
                    resolve(r)
                }).catch(e => {
                    reject(e)
                })
            })
        },
        logout(context, params) {
            context.commit('LOGOUT')
            router.push({name: 'login'})
            router.resetRoute();
            api.main.auth.logout(params, {noToast: {all: true}}).finally(() => {
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
            state.account.cn = lastAccount.cn;
            // if (state.pwdKeeper) {
            //     state.account.createdTime = lastAccount.createdTime
            // }
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
        SET_ROUTES(state) {
            const original_resource = lodash.cloneDeep(state.account.resource)
            original_resource.forEach(fo=>{
                state.routes.push(assemblyRoute(fo,null))
            })
        }
    }
}