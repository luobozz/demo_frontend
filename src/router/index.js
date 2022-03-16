import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

NProgress.configure({showSpinner: false})
import '@/assets/css/nprogress.less'
import store from '../store'
import {constantRouter, asyncRouter, homeName} from "@/config/routes.config"
import exception from "@/utils/exception";
import routerUtil from "./util"

Vue.use(VueRouter)

VueRouter.prototype.resetRoute = function resetRoute() {
    this.isAsyncRoute = false
    this.matcher = createRouter().matcher
}

VueRouter.prototype.isAsyncRoute = false

VueRouter.prototype.asyncRoute = function resetRoute() {

    return new Promise((resolve, reject) => {
        if (store.getters.routes.length === 0) {
            routerUtil.getRoutes().then(r => {
                this.matcher = new VueRouter({
                    mode: 'history',
                    base: process.env.BASE_URL,
                    routes: constantRouter.concat(r)
                }).matcher
                this.isAsyncRoute = true
                resolve("success")
            }).catch(e => {
                reject(e)
            });
        }
    })
}

const routerPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}


VueRouter.prototype.getParams = function getParams() {
    return Object.assign({}, this.currentRoute.params, this.currentRoute.query)
}

export const createRouter = () => new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: constantRouter.concat(asyncRouter)
})

const router = createRouter(), constantRouterName = constantRouter.map(p => p.name);

router.beforeEach((to, from, next) => {
    NProgress.start()
    // console.log(to.name, router.getRoutes())
    if (store.getters.isLogin) {
        if (to.name === "login") {
            console.log("ls", router.getRoutes())
            next({name: homeName})
        } else if (constantRouterName.indexOf(to.name) > -1) {
            next()
        } else {
            if (!router.isAsyncRoute) {
                router.asyncRoute().then(r => {
                    next({path: to.path})
                }).catch(e => {
                    exception.silentError(e)
                    exception.toastError("权限获取,错误重新登录尝试", true)
                    next({path: '/500', query: {pattern: "logout"}})
                })
            } else {
                next()
            }
        }
    } else {
        if (constantRouterName.indexOf(to.name) > -1) {
            next()
        } else {
            //未登录
            exception.toastError("请先登录")
            next({name: 'login'})
        }
    }
    //
})

router.afterEach((to, from) => {
    if (to.matched.length === 0) {
        router.push({name: '404', params: {}})
    }


    NProgress.done()
})

router.onError((error) => {
    console.error(error)
})

export default router
