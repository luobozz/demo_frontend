import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

NProgress.configure({showSpinner: false})
import '@/assets/css/nprogress.less'
import store from '../store'
import {constantRouter} from "@/config/routes.config"
import exception from "@/utils/exception";
import routerUtil from "./util"

Vue.use(VueRouter)

VueRouter.prototype.resetRoute = function resetRoute() {
    this.matcher = createRouter().matcher
}

VueRouter.prototype.getParams = function getParams() {
    // this.matcher = createRouter().matcher
    console.log(this.matcher.match())
}

export const createRouter = () => new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: constantRouter
})

const router = createRouter(), constantRouterName = constantRouter.map(p => p.name);

router.beforeEach((to, from, next) => {
    NProgress.start()
    // next()
    if (store.getters.isLogin) {
        routerUtil.addHome(router);
        if (constantRouterName.indexOf(to.name) > -1) {
            if (to.name === "login") {
                console.log("login", router.getRoutes())
                next({name: routerUtil.homeName})
            } else {
                next()
            }
        } else {
            //review 权限更新策略
            if (store.getters.routes.length === 0) {
                routerUtil.getRoutes(router).then((res) => {
                    next({path: to.path})
                }).catch(e => {
                    exception.toastError("权限获取,错误重新登录尝试")
                    //TODO 然后去到500页面给手动退出登录
                    router.push({name: '500', params: {}})
                });
            } else {
                next();
            }
        }
    } else {
        if (constantRouterName.indexOf(to.name) > -1) {
            next()
            NProgress.done()
        } else {
            //未登录
            exception.toastError("请先登录")
            next({name: 'login'})
        }
    }
})

router.afterEach((to, from) => {
    // NProgress.done()
    if (to.matched.length > 0) {
        // console.log(to)
        NProgress.done()
    } else {
        router.push({name: '404', params: {}})
        NProgress.done()
        return
    }
})

router.onError((error) => {
    console.error(error)
})

export default router
