<template>
  <div class="content">
    <div class="login-box">
      <div class="login">
        <div class="head mg-b-lg flex jc-sb al-fe text-bd">
          <div class="slogan">欢迎使用!</div>
          <div class="title">{{ system.name }}</div>
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
          <div :class="{'remember-password cur-pointer flex al-ct  mg-b-max':true,'keep-pwd':pwdKeeper}">
            <el-checkbox class="mg-r-xs" v-model="pwdKeeper"></el-checkbox>
            <span @click="keepPwd">记住我</span>
          </div>
          <el-button class="login-btn mg-b-lg" type="primary" round>登录</el-button>
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
      pwdKeeper: false
    }
  },
  mixins:[systemMixin],
  created() {
  },
  computed: {},
  methods: methods
}
</script>

<style lang="scss" scoped>
@import "src/views/login/login";
</style>