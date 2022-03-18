import mediaConfig from "@/config/media.config";
import lodash from "lodash";
import router from "@/router";

const defaultLayout = {
    menuCollapse: false
}
const defaultMedia = {
    media: ""
}

const defaultTabs = []

export default {
    state: {
        media: defaultMedia,
        layout: defaultLayout,
        tabs: []
    },
    actions: {
        responsiveDefault(context) {
            context.commit('RESPONSIVE');
            // context.commit('MENU_COLLAPSE', true);
        },
        responsive(context) {
            context.commit('RESPONSIVE');
        },
        menuCollapse(context) {
            context.commit('MENU_COLLAPSE');
        },
        addTab(context, route) {
            context.commit('ADD_TAB', route);
        },
        clearTabs(context) {
            context.commit("CLEAR_TABS")
        },
        removeTab(context, params) {
            context.commit("REMOVE_TAB", params)
        }
    },
    mutations: {
        RESPONSIVE(state) {
            state.media.media = ""
            for (const keys in mediaConfig) {
                if (document.body.clientWidth <= mediaConfig[keys].source) {
                    state.media.media = keys
                    break
                }
            }
            document.body.className = `media-${state.media.media}`
        },
        MENU_COLLAPSE(state, defaultMedia) {
            if (defaultMedia) {
                state.layout.menuCollapse = state.media.media === "mobile"
            } else {
                state.layout.menuCollapse = !state.layout.menuCollapse
            }
        },
        ADD_TAB(state, route) {
            if (state.tabs.findIndex(p => p.path === route.path) === -1) {
                state.tabs.push({
                    name: route.name,
                    path: route.path,
                    meta: {
                        ...route.meta,
                        locked: route.name === "index"
                    },
                })
            }
        },
        CLEAR_TABS(state) {
            state.tabs = []
        },
        REMOVE_TAB(state, params) {
            const tabs = lodash.clone(state.tabs), {tab, currentPath} = params
            let switchIndex = -1;
            lodash.remove(tabs, (re, index) => {
                if (tab.path === currentPath && re.path === tab.path) {
                    switchIndex = index + 1 === tabs.length ? index - 1 : index + 1
                }
                return re.path === tab.path
            })
            if (switchIndex !== -1) {
                // TODO 增加参数传递
                router.push({path: state.tabs[switchIndex].path})
            }
            state.tabs = JSON.parse(JSON.stringify(tabs))
        }
    }
}
