<template>
  <div :class="{'layout-main scroll':true,'collapse':layout.menuCollapse}">
    <layout-main-head></layout-main-head>
    <layout-main-body></layout-main-body>
    <layout-main-foot></layout-main-foot>
  </div>
</template>

<script>
import LayoutMainBody from "@/components/layout/LayoutMainBody";
import LayoutMainHead from "@/components/layout/LayoutMainHead";
import LayoutMainFoot from "@/components/layout/LayoutMainFoot";
import layoutMixin from "@/mixin/section/layout.mixin";

export default {
  name: "LayoutMain",
  mixins:[layoutMixin],
  components:{
    LayoutMainBody,
    "layout-main-head":LayoutMainHead,
    "layout-main-body":LayoutMainBody,
    "layout-main-foot":LayoutMainFoot
  }
}
</script>

<style lang="scss" scoped>

.layout-main.collapse{
  .layout-main-head{
    width: $--main-collapse-width;
  }
}

.layout-main{
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $--background-color-base;

  &>*{
    width: 100%;
  }

  .layout-main-head{
    position: fixed;
    top: 0;
    right: 0;
    width: $--main-width;
    height: $--head-height;
    background-color: $--avatar-font-color;
    z-index: 2;
    box-shadow: 0 1px 2px #00152914;
  }

  .layout-main-body{
    padding-top: $--head-height;
    min-height: $--body-height;
    padding: $--head-height+$--padding-md $--padding-md $--padding-md $--padding-md
  }

  .layout-main-foot{
    height: $--foot-height;
  }
}

</style>