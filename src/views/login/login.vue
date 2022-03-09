<template>
  <div class="content">
    <div class="login-box">
      <div class="login">
        <div class="head mg-b-lg flex jc-sb al-fe text-bd">
          <div class="slogan" v-show="isSuitMedia('pc')">欢迎使用!</div>
          <div class="title al-end">{{ system.name }}</div>
        </div>
        <div class="main">
          <div class="tabs flex mg-b-lg mg-t-md">
            <div class="tab pd-b-min active">登录账户</div>
          </div>
          <el-form :model="form.login.data" :rules="form.login.rule" :ref="form.login.ref">
            <div class="input account flex column mg-b-min">
              <div class="title mg-b-min">账户</div>
              <el-form-item prop="account">
                <el-input v-model="form.login.data.account"></el-input>
              </el-form-item>
            </div>
            <div class="input account flex column mg-b-min">
              <div class="title mg-b-min">密码</div>
              <el-form-item prop="password">
                <el-input v-model="form.login.data.password"></el-input>
              </el-form-item>
            </div>
          </el-form>

          <div :class="{'remember-password cur-pointer flex al-ct  mg-b-max':true,'keep-pwd':pwdKeeper}">
            <el-checkbox class="mg-r-xs" v-model="pwdKeeper"></el-checkbox>
            <span @click="keepPwd">记住我</span>
          </div>
          <el-button class="login-btn mg-b-lg" type="primary" round :loading="form.login.loading" @click="loginHandle">
            登录
          </el-button>
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

<style lang="scss" scoped>
@import "src/views/login/login";
</style>