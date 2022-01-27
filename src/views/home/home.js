const methods = {
    init() {

    },
    routerMethod(method,...param){
        const routerVue= this.$refs["layoutBody"].$refs["layoutRouter"].$refs["routerView"].$children?.[0];
        if(routerVue){
            routerVue.$options.methods[method].call(routerVue,param)
        }
    }
}

export default methods