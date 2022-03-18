<template>
  <div ref="scrollBody" :class="{'layout-main scroll':true,'collapse':layout.menuCollapse}">
    <layout-main-head></layout-main-head>
    <layout-main-body :class="[slideOut&&'slide-out']"></layout-main-body>
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
  data() {
    return {
      slideOut: true
    }
  },
  mixins: [layoutMixin],
  components: {
    "layout-main-head": LayoutMainHead,
    "layout-main-body": LayoutMainBody,
    "layout-main-foot": LayoutMainFoot
  },
  watch: {
    $route() {
      this.$refs["scrollBody"].scrollTo(0, 0);
      this.slideOut = false;
      setTimeout(() => {
        this.slideOut = true
      }, 50)
    }
  }
}
</script>

<style lang="less" scoped>

.media-mobile {

  .layout-main {
    height: calc(100% - @head-height-mobile);
    margin-top: @head-height-mobile;

    & > * {
      width: 100%;
      min-width: @media-min-width-mobile !important;
    }

    .layout-main-head {
      width: 100% !important;
      left: 0 !important;
      min-width: @media-min-width-mobile !important;
      height: @head-height-mobile;
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

  @slide-width: 50px;
  @fade-start: 0;
  @animation-times:.3s;

  .layout-main-body {
    padding-top: @head-height;
    min-height: @body-height;
    padding: @padding-md;
    margin-left: -@slide-width;
    opacity: @fade-start;
  }

  .layout-main-body.slide-out {
    animation-timing-function: ease-in-out;
    animation: ani-main-body @animation-times;
    -webkit-animation: ani-main-body @animation-times;
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
  }

  @keyframes ani-main-body {
    from {
      opacity: @fade-start;
      margin-left: -@slide-width;
    }
    to {
      margin-left: 0;
      opacity: 1;
    }
  }

  @keyframes layout-main-body-fade-out {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .layout-main-foot {
    height: @foot-height;
  }
}

</style>
