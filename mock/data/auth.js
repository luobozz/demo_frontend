export default {
    login: [{
        token: "mock_admin_token/N0pbfY2dkc9xjvJl",
        profile: {
            uid: "mock_1",
            //登录账号
            cn: "mock_admin",
            //用户姓名
            displayName: "mock_admin",
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
                icon: "fa-home",
                menuType: "menu",
                resCode: "cpdu",
                resName: "设备管理",
                resOrder: 0,
                resUrl: "/system/about/about.vue",
                children: []
            },
            {
                icon: "fa-microchip",
                menuType: "menu",
                resCode: "system",
                resName: "系统管理",
                resOrder: 1,
                resUrl: "",
                children: [
                    {
                        icon: "fa-user-circle",
                        menuType: "menu",
                        resCode: "account",
                        resName: "账号管理",
                        resOrder: 1,
                        resUrl: "/system/about/about.vue",
                        children: []
                    }, {
                        icon: "fa-group",
                        menuType: "menu",
                        resCode: "role",
                        resName: "角色管理",
                        resOrder: 2,
                        resUrl: "/system/about/about.vue",
                        children: []
                    }, {
                        icon: "fa-map",
                        menuType: "menu",
                        resCode: "route",
                        resName: "路由管理",
                        resOrder: 3,
                        resUrl: "/system/about/about.vue",
                        children: []
                    }, {
                        icon: "fa-map",
                        menuType: "menu",
                        resCode: "operation",
                        resName: "操作管理",
                        resOrder: 4,
                        resUrl: "/system/about/about.vue",
                        children: []
                    }, {
                        icon: "fa-map",
                        menuType: "menu",
                        resCode: "setting",
                        resName: "全局参数设置",
                        resOrder: 5,
                        resUrl: "/system/about/about.vue",
                        children: []
                    }, {
                        icon: "fa-map",
                        menuType: "menu",
                        resCode: "version",
                        resName: "软件版本记录",
                        resOrder: 6,
                        resUrl: "/system/about/about.vue",
                        children: []
                    }, {
                        icon: "fa-map",
                        menuType: "menu",
                        resCode: "region",
                        resName: "区域管理",
                        resOrder: 7,
                        resUrl: "/system/about/about.vue",
                        children: []
                    },
                ]
            },
            {
                icon: "fa-user-circle",
                menuType: "menu",
                resCode: "message",
                resName: "消息管理",
                resOrder: 2,
                resUrl: "",
                children: [
                    {
                        icon: "fa-qq",
                        menuType: "menu",
                        resCode: "announcement",
                        resName: "公告管理",
                        resOrder: 1,
                        resUrl: "/system/about/about.vue",
                        children: []
                    },
                    {
                        icon: "fa-qq",
                        menuType: "menu",
                        resCode: "message_manager",
                        resName: "系统消息管理",
                        resOrder: 1,
                        resUrl: "/system/about/about.vue",
                        children: []
                    },
                    {
                        icon: "fa-qq",
                        menuType: "menu",
                        resCode: "my_message",
                        resName: "我的消息",
                        resOrder: 1,
                        resUrl: "/system/about/about.vue",
                        children: []
                    },
                ]
            },
        ],
        role: [
            {
                roleName: "系统管理员",
                roleType: 0
            },
        ]
    }, {
        token: "mock_maintenance_personnel_token/N0pbfY2dkc9xjvJl",
        profile: {
            uid: "mock_2",
            //登录账号
            cn: "mock_maintenance_personnel",
            //用户姓名
            displayName: "mock_maintenance_personnel",
            //头像
            avatar: "https://img1.baidu.com/it/u=1645832847,2375824523&fm=253&fmt=auto&app=138&f=JPEG?w=480&h=480",
            //账号过期时间
            expireTm: "4077240648000",
            //最后登录时间
            lastLoginTm: "1647327066000",
            //	性别
            sex: "male",
        },
        resource: [
            {
                icon: "fa-home",
                menuType: "menu",
                resCode: "index",
                resName: "首页",
                resOrder: 0,
                resUrl: "/system/about/about.vue",
                children: []
            }, {
                icon: "fa-home",
                menuType: "menu",
                resCode: "cpdu",
                resName: "设备管理",
                resOrder: 0,
                resUrl: "/system/about/about.vue",
                children: []
            },
            {
                icon: "fa-home",
                menuType: "menu",
                resCode: "station",
                resName: "机房管理",
                resOrder: 0,
                resUrl: "/system/about/about.vue",
                children: []
            },
            {
                icon: "fa-microchip",
                menuType: "menu",
                resCode: "report",
                resName: "报表",
                resOrder: 1,
                resUrl: "",
                children: [
                    {
                        icon: "fa-map",
                        menuType: "menu",
                        resCode: "report1",
                        resName: "测试报表",
                        resOrder: 4,
                        resUrl: "/system/about/about.vue",
                        children: []
                    }
                ]
            },
            {
                icon: "fa-microchip",
                menuType: "menu",
                resCode: "system",
                resName: "系统管理",
                resOrder: 1,
                resUrl: "",
                children: [
                    {
                        icon: "fa-map",
                        menuType: "menu",
                        resCode: "operation",
                        resName: "操作管理",
                        resOrder: 4,
                        resUrl: "/system/about/about.vue",
                        children: []
                    }
                ]
            },
            {
                icon: "fa-user-circle",
                menuType: "menu",
                resCode: "message",
                resName: "消息管理",
                resOrder: 2,
                resUrl: "",
                children: [
                    {
                        icon: "fa-qq",
                        menuType: "menu",
                        resCode: "announcement",
                        resName: "公告管理",
                        resOrder: 1,
                        resUrl: "/system/about/about.vue",
                        children: []
                    },
                    {
                        icon: "fa-qq",
                        menuType: "menu",
                        resCode: "my_message",
                        resName: "我的消息",
                        resOrder: 1,
                        resUrl: "/system/about/about.vue",
                        children: []
                    },
                ]
            },
        ],
        role: [{
            roleName: "维护人员",
            roleType: 0
        }]
    }],
}
