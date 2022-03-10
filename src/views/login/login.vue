<template>
  <div class="content">
    <div class="login-box">
      <div class="login">
        <div class="head mg-b-md flex jc-sb al-fe text-bd">
          <div class="slogan mg-b-xs" v-show="isSuitMedia('pc')">欢迎使用!</div>
          <div class="title al-end">{{ system.name }}</div>
        </div>
        <div class="main">
          <div class="tabs flex mg-b-lg mg-t-sm">
            <div class="tab pd-b-min active">登录账户</div>
          </div>
          <a-form-model
              :model="form.login.data"
              :rules="form.login.rule"
              :ref="form.login.ref">
            <div class="input account flex column mg-b-min">
              <div class="title mg-b-min">账户</div>
              <a-form-model-item prop="account">
                <a-input class="account" v-model="form.login.data.account"></a-input>
              </a-form-model-item>
            </div>
            <div class="input account flex column mg-b-min">
              <div class="title mg-b-min">密码</div>
              <a-form-model-item prop="password">
                <a-input-password class="password" v-model="form.login.data.password"></a-input-password>
              </a-form-model-item>
            </div>
          </a-form-model>

          <div :class="{'remember-password cur-pointer flex al-ct  mg-b-lg':true,'keep-pwd':pwdKeeper}">
            <a-checkbox class="mg-r-xs" v-model="pwdKeeper"></a-checkbox>
            <span @click="keepPwd">记住我</span>
          </div>
          <a-button class="login-btn mg-b-lg  mg-t-md" type="primary" shape="round" size="large" :loading="form.login.loading"
                    @click="loginHandle">
            登录
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import methods from "./login.js";
import systemMixin from "@/mixin/section/system.mixin";

export default {
  name: "login",
  components: {},
  data() {
    return {
      pwdKeeper: false,
      loginLoading: false,
      form: {
        login: {
          loading: false,
          ref: "loginForm",
          data: {
            account: "1",
            password: "1"
          },
          rule: {
            account: [{required: true, message: '需要一个账户', trigger: 'blur'}],
            password: [{required: true, message: '需要密码', trigger: 'blur'}]
          }
        }
      }
    }
  },
  mixins: [systemMixin],
  created() {
    // this.$uiUtils.toast("123")
    // this.$uiUtils.toast("123")
  },
  computed: {},
  methods: methods
}
</script>

<style lang="less" scoped>
@import "./login";
</style>