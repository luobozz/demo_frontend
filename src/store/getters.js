const getters = {
    token: state => state.loginStore.account.token,
    tokenExpire:state => state.loginStore.account.expire+10*1000,
    isLogin: state => state.loginStore.isLogin,
    permissions:state=>state.loginStore.account.roleVos,
    routes:state=>state.loginStore.routes,
}

export default getters
