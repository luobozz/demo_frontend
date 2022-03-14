import api from "@/api/index"

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
            return Promise.all([login(),role()]).then(r => {
                // console.log(login)

            })
        }
    },
    mutations: {}
}