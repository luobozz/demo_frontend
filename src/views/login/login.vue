<template>
  <div class="content flex al-ct jc-ct">
    <div class="box flex column al-ct jc-ct">
      <div class="bg-img flex al-ct jc-ct">
        <lb-icon type="svg-iconedu" size="500"></lb-icon>
      </div>
      <div class="login-form flex jc-fe">
        <div class="al-end text-h3 mg-l-md">{{ systemName }}</div>
        <a-form-model
            ref="loginForm"
            layout="inline"
            :model="form.loginForm.data.account"
            :rules="form.loginForm.rules">
          <a-form-model-item prop="account">
            <a-input v-model="form.loginForm.data.account.account"  @change="form.loginForm.data.account.password=''" placeholder="账户">
              <a-icon slot="prefix" type="user"/>
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="password">
            <a-input-password v-model="form.loginForm.data.account.password" @change="form.loginForm.useLastPwd=false">
              <a-icon slot="prefix" type="lock"/>
              <lb-icon class="cur-pointer" title="记住密码" @click="keepPwd" slot="addonAfter" :type="!this.pwdKeeper?'fa-square-o':'fa-check-square-o'" />
            </a-input-password>
          </a-form-model-item>
          <a-form-model-item>
            <a-button
                @click="loginSubmitHandle"
                type="primary"
                :loading="form.loginForm.loading"
            >
              登录
            </a-button>
          </a-form-model-item>
        </a-form-model>

      </div>
    </div>


  </div>
</template>

<script>
import methods from "./login.js";
import {mapState} from "vuex";
import storage from "@/utils/data/storage";
import storageConfig from "@/config/storage.config";
import lodash from "lodash";

export default {
  name: "login",
  data() {
    return {
      form: {
        loginForm: {
          useLastPwd:false,
          loading: false,
          data: {
            account: {
              account: "",
              password: "",
            }
          },
          rules: {
            account: [{required: true, message: '需要一个账户', trigger: 'blur'}],
            password: [{required: true, message: '需要密码', trigger: 'blur'}]
          }
        }
      }
    }
  },
  created() {
    this.init()
  },
  computed: {
    ...mapState({
      pwdKeeper: state => state.loginStore.pwdKeeper,
    }),
    pwdLast() {
      return this.pwdKeeper && !lodash.isEmpty(storage.get(storageConfig.PWD_STORAGE.name, ""))
    },
  },
  methods: methods
}
</script>

<style lang="less" scoped>
@import "./login.less";
</style>