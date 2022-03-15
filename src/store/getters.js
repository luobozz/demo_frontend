const getters = {
    token: state => state.accountStore.account.token,
    isLogin: state => state.accountStore.isLogin,
    routes:state=>state.accountStore.routes,
}

export default getters
