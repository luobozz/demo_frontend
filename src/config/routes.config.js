export const homeName = "home"

export const asyncRouter = [
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/home.vue'),
        children: []
    }
]

export const constantRouter = [
    {
        name: "",
        path: '/', // 默认地址
        redirect: '/login'
    }, {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "about" */ '@/views/login/login.vue'),
    }, {
        path: '/500',
        name: '500',
        component: () => import(/* webpackChunkName: "about" */ '@/views/system/error/500/500.vue'),
    }, {
        path: '/404',
        name: '404',
        component: () => import(/* webpackChunkName: "about" */ '@/views/system/error/404/404.vue'),
    },
    // {
    //     path: '/home',
    //     name: 'home',
    //     component: () => import('../views/home/home.vue'),
    //     children: [
    //         {
    //             path: '/home/about',
    //             name: 'about',
    //             component: () => import(/* webpackChunkName: "about" */ '@/views/system/about/about.vue'),
    //         },
    //     ]
    // }
]