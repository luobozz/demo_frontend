/**
 * 动态路由
 * @type { *[] }
 */
export const asyncRouter = [
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/home/home.vue'),
        children: [
        ]
    }
]
/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouter = [{
    name: "",
    path: '/', // 默认地址
    redirect: '/login'
}, {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/login.vue'),
}, {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "about" */ '../views/system/error/404/error404.vue'),
},{
    path: '/demo',
    name: 'demo',
    component: () => import(/* webpackChunkName: "about" */ '../views/demo/demo.vue'),
}]
