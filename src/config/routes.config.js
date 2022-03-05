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
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/home/home.vue'),
        children: [
            {
                path: '/home/about',
                name: 'about',
                component: () => import(/* webpackChunkName: "about" */ '@/views/system/about/about.vue'),
            },
        ]
    }
]