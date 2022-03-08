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
                this.login().finally(f => {
                    this.form.login.loading = false
                })
            })()
        })
    }
}

export default methods