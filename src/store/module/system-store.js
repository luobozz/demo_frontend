
const defaultLayout = {
    menuCollapse:false
}
export default {
    state: {
        layout:defaultLayout
    },
    actions: {
        menuCollapse(context) {
            context.commit('MENU_COLLAPSE');
        }
    },
    mutations: {
        MENU_COLLAPSE(state){
            state.layout.menuCollapse=!state.layout.menuCollapse
        }
    }
}