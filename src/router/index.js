import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import NProgress from 'nprogress'
import '../assets/css/nprogress.less'
import {constantRouter} from '../config/router.config'
import exception from '../utils/exception'
import routerUtil from './util'
import {Modal} from "ant-design-vue"

NProgress.configure({showSpinner: false})

const routerPush = VueRouter.prototype.push


VueRouter.prototype.setPathJob=function (vm,to){
    routerUtil.bindKeyBoard(to.name,vm)
}

VueRouter.prototype.push = function push(location) {
    routerUtil.addHome(router);
    return routerPush.call(this, location).catch(error => error)
}

VueRouter.prototype.resetRoute=function resetRoute(){
    this.matcher =  createRouter().matcher
}


Vue.use(VueRouter)

export const createRouter = () => new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: constantRouter
})

const router = createRouter()
const constantRouterName = constantRouter.map(p => p.name);

router.beforeEach((to, from, next) => {
    Modal.destroyAll();
    NProgress.start()
    if (store.getters.isLogin) {
        routerUtil.addHome(router);
        if (to.name === "login") {
            next({name: 'home'})
            NProgress.done()
        } else {
            //review 权限更新策略
            if (store.getters.routes.length === 0) {
                routerUtil.getRoutes(router).then((res) => {
                    next({path: to.path})
                });
            } else {
                next();
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
})


router.afterEach((to,from) => {
    if (to.matched.length > 0) {
        // console.log(to)
        NProgress.done()
    } else {
        router.push({name: '404', params: {}})
        NProgress.done()
        return
    }
})

router.onError((error)=>{
    console.error(error)
})

export default router
