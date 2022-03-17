/**
 * @author chenlingyu
 */
import {homeName, asyncRouter} from "@/config/routes.config";
import store from '../store'
import lodash from "lodash"

const getHome = () => {
    return lodash.cloneDeep(asyncRouter[0])
}

const traverseAddRoutes = (route, children) => {

    route.children=[]
    children.filter(fi => fi.type === 'route').forEach(p => {
        route.children.push(p)
        if (p.subs.length > 0) {
            traverseAddRoutes(p, p.subs)
        }
    })
    return route
}

export default {
    homeName,
    getRoutes: () => {
        return new Promise((resolve, reject) => {
            store.dispatch("getRoutes").then((res) => {
                if (store.getters.routes.length === 0) {
                    reject("获取到的权限为空")
                } else {
                    resolve(traverseAddRoutes(getHome(), store.getters.routes))
                }
            }).catch((error) => {
                reject(error);
            })
        });
    },
    tabStack(route){
        store.dispatch("addTab",route)
    }
}
