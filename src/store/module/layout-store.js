import mediaConfig from "@/config/media.config";

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
                        locked:route.name==="index"
                    },
                })
            }
        },
        CLEAR_TABS(state) {
            state.tabs = []
        }
    }
}
