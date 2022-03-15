/**
 * @author chenlingyu
 */
import {homeName,asyncRouter} from "@/config/routes.config";
import store from '../store'
import exception from "@/utils/exception";

const getHome = () => {
    return asyncRouter[0]
}

const hasHome = (router) => {
    let ret = false, routes = router.getRoutes();
    for (let i = 0; i < routes.length; i++) {
        if (routes[i].name === homeName) {
            ret = true;
            break;
        }
    }
    return ret;
}

const traverseAddRoutes = (router, parentName, children) => {

    children.forEach(p => {
        router.addRoute(parentName, p);
        if (p.subs.length > 0) {
            traverseAddRoutes(router, p.name, p.subs)
        }
    })
}

export default {
    homeName,
    addHome: (router) => {
        if (!hasHome(router)) {
            router.addRoute(getHome())
        }
    },
    getRoutes: (router) => {
        return new Promise((resolve, reject) => {
            store.dispatch("getRoutes").then((res) => {
                if (store.getters.routes.length === 0) {
                    reject("error")
                } else {
                    traverseAddRoutes(router, getHome().name, store.getters.routes);
                    resolve("success")
                }
            }).catch((error) => {
                reject(error);
            })
        });
    },
}
