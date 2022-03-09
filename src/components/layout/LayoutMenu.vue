<template>
  <div :class="{'layout-menu':true,'collapse':layout.menuCollapse}">
    <div class="system-name flex al-ct jc-ct">
      <div v-show="!layout.menuCollapse">{{ system.name }}</div>
    </div>
    <div class="menu scroll">
      <a-menu
          :collapse="layout.menuCollapse"
          :collapse-transition="false">
        <a-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">导航一</span>
          </template>
          <a-menu-item index="1-1">选项1</a-menu-item>
          <a-menu-item index="1-2">选项2</a-menu-item>
        </a-submenu>
        <a-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </a-menu-item>
        <a-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </a-menu-item>
        <a-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </a-menu-item>
      </a-menu>
    </div>
    <div class="collapse flex al-ct jc-ct" @click="menuCollapse" v-show="isSuitMedia('mobile')">
      <lb-icon :type="layout.menuCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></lb-icon>
    </div>
  </div>
</template>

<script>
import systemMixin from "@/mixin/section/system.mixin";
import layoutMixin from "@/mixin/section/layout.mixin";

export default {
  name: "LayoutMenu",
  data() {
    return {}
  },
  mixins: [systemMixin, layoutMixin],
  created() {
  }
}
</script>

<style lang="less" scoped>
@collapse-height: 50px;

.media-mobile {
  .menu {
    height: calc(100% - @head-top-height - @collapse-height) !important;
  }

  .collapse {
    height: @collapse-height !important;
  }
}

.layout-menu.collapse {

}

.layout-menu {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: @background-color-menu;
  overflow: hidden;

  .system-name {
    height: @head-top-height;
    font-size: 150%;
    font-weight: bold;
    color: @primary-color;
  }

  .menu {
    height: calc(100% - @head-top-height);

    .el-menu {
      border-right: none;

      .el-menu-item, /deep/ .el-submenu__title {
        height: 45px;
        line-height: 45px;
      }

    }
  }

  .collapse {
    height: 0;
    font-size: 150%;
    border-top: 1px solid @border-color-base;
  }
}
</style>