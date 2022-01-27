/**
 * @author chenlingyu
 */
import {asyncRouter} from '../config/router.config'
import store from '../store'
import {forEach} from "qs.js/src/polyfill/list";
import keyBoardConfig from "../config/keyBoard.config"

const getHome = () => {
    return asyncRouter[0]
}

const homeName = getHome().name;

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
    addHome: (router) => {
        if (!hasHome(router)) {
            router.addRoute(getHome())
        }
    },
    getRoutes: (router) => {
        return new Promise((resolve, reject) => {
            store.dispatch("getRoutes").then((res) => {
                traverseAddRoutes(router, getHome().name, store.getters.routes);
                resolve("success")
            }).catch((error) => {
                reject(error);
            })
        });
    },
    bindKeyBoard(name, app) {
        const bindMap = keyBoardConfig.keyBoard.filter(p => p.name === name)?.[0]?.keyBindMap || {}
        if (bindMap != {}) {
            const keyHandleMap = [];
            for (let bind in bindMap) {
                const doWay = bindMap[bind];
                const bindWay = typeof doWay === "function" ? doWay : typeof doWay === "string" ? app[doWay] ? app[doWay] : () => {
                } : () => {
                };
                const arr = bind.split(",");
                arr.forEach(p => {
                    keyHandleMap.push({
                        key: p,
                        handle: bindWay
                    })
                })
            }

            const keyListener = keyHandleMap.length > 0 ? (e) => {
                let pushCode = "", handled = false;
                const {ctrlKey, shiftKey, altKey, key} = e
                if (ctrlKey && key != "Control") {
                    pushCode += "ctrl+"
                }
                if (shiftKey && key != "Shift") {
                    pushCode += "shift+"
                }
                if (altKey && key != "Alt") {
                    pushCode += "alt+"
                }
                if (key) {
                    pushCode += key
                }
                const keyHandle = keyHandleMap.filter(p => p.key === pushCode)?.[0]?.handle

                if (keyHandle) {
                    e.preventDefault()
                    e.stopPropagation()
                    keyHandle()
                }
            } : () => {
            }
            document.onkeydown = keyListener;
        }
    }
}
