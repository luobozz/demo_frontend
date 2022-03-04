<template>
  <div class="content">
    <div class="login-box">
      <div class="login">
        <div class="head mg-b-lg flex jc-sb al-fe text-bd">
          <div class="slogan">欢迎使用!</div>
          <div class="title">{{ systemName }}</div>
        </div>
        <div class="main">
          <div class="tabs flex mg-b-lg mg-t-md">
            <div class="tab pd-b-min active">登录账户</div>
          </div>
          <div class="input account flex column mg-b-md">
            <div class="title mg-b-min">账户</div>
            <input class="account" type="text"/>
          </div>
          <div class="input account flex column mg-b-md">
            <div class="title mg-b-min">密码</div>
            <input class="password" type="password"/>
          </div>
          <div :class="{'remember-password cur-pointer flex al-ct  mg-b-max':true,'keep-pwd':this.pwdKeeper}"
               @click="keepPwd">
            <lb-icon class="mg-r-xs" :type="!this.pwdKeeper?'fa-square-o':'fa-check-square-o'"/>
            <span>记住我</span>
          </div>
          <el-button class="login-btn mg-b-lg" type="primary" round>登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import methods from "./login.js";

export default {
  name: "login",
  components: {},
  data() {
    return {
      pwdKeeper: false
    }
  },
  created() {
  },
  computed: {},
  methods: methods
}
</script>

<style lang="scss" scoped>
@import "src/views/login/login";
</style>