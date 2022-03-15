import {mapActions} from "vuex";

const methods = {
    ...mapActions(['login']),
    keepPwd() {
        this.pwdKeeper = !this.pwdKeeper
    },
    loginHandle() {
        this.$refs.loginForm?.validate(v => {
            v && (() => {
                this.form.login.loading = true
                this.login().then(r => {
                    // console.log("gohome")
                    this.$router.push({name: 'home', params: {}})
                }).catch(e => {
                    this.$exceptionUtils.toastError("登录失败", true);
                }).finally(f => {
                    this.form.login.loading = false
                })
            })()
        })
    }
}

export default methods