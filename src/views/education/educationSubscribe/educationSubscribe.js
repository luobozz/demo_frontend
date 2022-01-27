const methods = {
    init() {
    },
    tabChangeHandle(key){
        if(key===2){
            this.$refs["subscribeRecord"].crudConditionsHandle()?.reset()
        }
    }
}

export default methods