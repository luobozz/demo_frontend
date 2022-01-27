const methods = {
    init() {

    },
    messageCheckChangeHandle(e){
        this.current=e
        this.$refs[e]?.crudConditionsHandle()?.reset()
    },
    refreshHandle(){
        this.$refs[this.current]?.crudConditionsHandle()?.reset()
    }
}

export default methods