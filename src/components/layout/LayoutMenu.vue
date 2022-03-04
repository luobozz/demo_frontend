<template>
  <div :class="{'layout-menu':true,'collapse':layout.menuCollapse}">
    <div class="system-name flex al-ct jc-ct">
      <div v-show="!layout.menuCollapse">{{ system.name }}</div>
    </div>
    <div class="menu">
      <el-menu
          :collapse="layout.menuCollapse"
          :collapse-transition = "false">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import systemMixin from "@/mixin/section/system.mixin";
import layoutMixin from "@/mixin/section/layout.mixin";

export default {
  name: "LayoutMenu",
  data(){
    return {

    }
  },
  mixins:[systemMixin,layoutMixin],
  created() {
  }
}
</script>

<style lang="scss" scoped>
.layout-menu.collapse{

}
.layout-menu {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $--background-color-menu;

  .system-name {
    height: $--head-height;
    font-size: 150%;
    font-weight: bold;
    color: $--color-primary;
  }

  .menu {
    height: calc(100% - #{$--head-height});

    .el-menu {
      border-right: none;

      .el-menu-item, /deep/ .el-submenu__title {
        height: 45px;
        line-height: 45px;
      }

    }
  }
}
</style>