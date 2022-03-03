import Vue from 'vue'
import VueRouter from 'vue-router'
import {asyncRouter,constantRouter} from "@/config/routes.config"

Vue.use(VueRouter)


export const createRouter = () => new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouter
})

const router = createRouter()

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to,from) => {

})

router.onError((error)=>{
  console.error(error)
})

export default router
