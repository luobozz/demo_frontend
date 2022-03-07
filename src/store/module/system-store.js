import mediaConfig from "@/config/media.config";

const defaultLayout = {
    menuCollapse: false
}
const defaultMedia = {
    media: ""
}

export default {
    state: {
        media: defaultMedia,
        layout: defaultLayout
    },
    actions: {
        responsiveDefault(context) {
            context.commit('RESPONSIVE');
            context.commit('MENU_COLLAPSE', true);
        },
        responsive(context) {
            context.commit('RESPONSIVE');
        },
        menuCollapse(context) {
            context.commit('MENU_COLLAPSE');
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
        },
        MENU_COLLAPSE(state, defaultMedia) {
            if (defaultMedia) {
                state.layout.menuCollapse = state.media.media === "mobile"
            } else {
                state.layout.menuCollapse = !state.layout.menuCollapse
            }
        }
    }
}