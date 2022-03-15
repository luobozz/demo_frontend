export default {
    login: {
        token: "mock_token/N0pbfY2dkc9xjvJl"
    },
    profileResource: {
        profile: {
            uid: "mock_1",
            //登录账号
            cn: "mock_cn",
            //用户姓名
            displayName: "mock_user",
            //头像
            avatar: "https://img0.baidu.com/it/u=246044998,1727062021&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
            //账号过期时间
            expireTm: "4077240648000",
            //最后登录时间
            lastLoginTm: "1647327066000",
            //	性别
            sex: "male",
        },
        resource: [
            {
                icon: "fa-qq",
                menuType: "menu",
                resCode: "system",
                resName: "系统管理",
                resOrder: 1,
                resUrl: "",
                children: [
                    {
                        icon: "fa-qq",
                        menuType: "menu",
                        resCode: "account",
                        resName: "账号管理",
                        resOrder: 1,
                        resUrl: "./views/system/about/about.vue",
                        children: []
                    }, {
                        icon: "fa-qq",
                        menuType: "menu",
                        resCode: "role",
                        resName: "角色管理",
                        resOrder: 2,
                        resUrl: "./views/system/about/about.vue",
                        children: []
                    }, {
                        icon: "fa-qq",
                        menuType: "menu",
                        resCode: "route",
                        resName: "路由管理",
                        resOrder: 1,
                        resUrl: "./views/system/about/about.vue",
                        children: []
                    },
                ]
            }
        ]
    },
    role: [
        {
            roleName: "系统管理员",
            roleType: 0
        }
    ]
}