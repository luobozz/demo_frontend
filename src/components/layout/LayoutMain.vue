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
  mixins: [layoutMixin],
  components: {
    "layout-main-head": LayoutMainHead,
    "layout-main-body": LayoutMainBody,
    "layout-main-foot": LayoutMainFoot
  }
}
</script>

<style lang="less" scoped>

.media-mobile {

  .layout-main {
    & > * {
      width: 100%;
      min-width: @media-min-width-mobile !important;
    }

    .layout-main-head {
      width: 100% !important;
      left: 0 !important;
      min-width: @media-min-width-mobile !important;
    }

    .layout-main-body {
      padding: @padding-sm;
    }
  }
}

.layout-main.collapse {
  .layout-main-head {
    //padding-left: @menu-collapse-width;
    left: @menu-collapse-width;
    width: @main-collapse-width;
  }
}

.layout-main {
  position: relative;
  width: 100%;
  height: calc(100% - @head-height);
  margin-top: @head-height;

  & > * {
    width: 100%;
    min-width: @media-min-width-pc;
  }

  .layout-main-head {
    position: fixed;
    top: 0;
    left: @menu-width;
    width: @main-width;
    height: @head-height;
    min-width: @media-min-width-pc;
    background-color: @background-color-menu;
    z-index: 2;
  }

  .layout-main-body {
    padding-top: @head-height;
    min-height: @body-height;
    padding: @padding-md;
  }

  .layout-main-foot {
    height: @foot-height;
  }
}

</style>