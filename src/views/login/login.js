import {mapActions} from "vuex";
import encryption from "../../utils/encryption";
import lodash from "lodash";
import storage from "@/utils/data/storage";
import storageConfig from "@/config/storage.config";

const methods = {
    ...mapActions(['login', 'keepPwd']),
    init() {
        this.form.loginForm.data.account = {
            account: !lodash.isEmpty(this.accountState.account) ? this.accountState.account : "",
            password: this.pwdLast ? storage.get(storageConfig.PWD_STORAGE.name, "") : "",
        }
        this.form.loginForm.useLastPwd = this.pwdKeeper
    },
    loginSubmitHandle() {
        const {
            login,
            form,
            $refs,
            $router
        } = this;
        $refs.loginForm?.validate(valid => {
            if (valid) {
                this.form.loginForm.loading = true;
                const param = lodash.cloneDeep(form.loginForm.data.account);
                param.iv = this.form.loginForm.useLastPwd ? {
                    useLastPwd: true,
                    iv: this.accountState.createdTime
                } : {}
                login(param)
                    .finally((res) => {
                        this.form.loginForm.loading = false;
                    })
            }
        });
    },
}

export default methods