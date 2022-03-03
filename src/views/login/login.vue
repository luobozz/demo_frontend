<template>
  <div class="content">
    <div class="login-box">
      <div class="login">
        <div class="head mg-b-lg flex jc-fe">
          <div class="title">{{systemName}}</div>
        </div>
        <div class="main">
          <div class="tabs flex mg-b-md">
            <div class="tab pd-b-min active">登 录</div>
          </div>
          <div class="input account flex column mg-b-md">
            <div class="title mg-b-min">account</div>
            <input type="text" />
          </div>
          <div class="input account flex column">
            <div class="title mg-b-min">password</div>
            <input type="password" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import methods from "./login.js";

    export default {
        name: "login",
        components: {
        },
        data() {
            return {}
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