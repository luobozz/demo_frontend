<template>
  <div class="container">
    <router-header class="header"/>
    <div ref="layoutRouter" class="layoutRouter scroll">
      <router-view ref="routerView" class="router"/>
      <router-footer class="footer"/>
    </div>
  </div>
</template>

<script>
import routerFooter from '../routerFooter/routerFooter'
import routerHeader from '../routerHeader/routerHeader'

export default {
  name: 'layoutRouter',
  components: {
    routerFooter,
    routerHeader
  },
  data() {
    return {}
  },
  methods:{
  },
  watch: {
    $route() {
      this.$refs["layoutRouter"].scrollTo(0, 0)
    }
  }
}
</script>

<style lang="less" scoped>
@header-height: 55px;
@footer-height: 50px;
@layout-router-height: calc(100% - @header-height - @padding-lg);
@router-height: calc(100% - @footer-height);

.container {
  height: 100%;
  //padding: 0 @padding-sm 0 @padding-lg+@padding-min;
  font-size: @font-size-base;
  overflow: hidden;

  .header {
    width: 100%;
    padding: @padding-sm @padding-lg;
    background-color: @color-bg-base;
    margin-bottom: @padding-lg;
    height: @header-height;
  }

  .layoutRouter {
    //background: @color-bg-base;
    padding: 0 @padding-lg 0 0;
    margin: 0 0 0 @padding-lg;
    height: @layout-router-height;

    .router {
      height: auto !important;
      min-height: @router-height !important;
    }

    .footer {
      height: @footer-height;
    }
  }
}

</style>
