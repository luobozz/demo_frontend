<template>
  <div class="layout-main-head flex column al-ct">
    <div class="head-top flex al-ct jc-sb">
      <div class="left flex al-ct">
        <div class="collapse btn" @click="menuCollapse">
          <lb-icon :type="layout.menuCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></lb-icon>
        </div>
        <div class="breadcrumb flex al-ct pd-l-sm pd-r-sm" v-show="isSuitMedia('pc')">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              活动管理
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="right flex al-ct al-end">
        <div class="btn">
          <lb-icon type="el-icon-bell"></lb-icon>
        </div>
        <div class="btn" v-show="isSuitMedia('pc')">
          <lb-icon type="el-icon-full-screen"></lb-icon>
        </div>
        <div class="btn">
          <lb-icon type="el-icon-setting"></lb-icon>
        </div>

        <el-dropdown size="medium">
          <div class="account-info flex al-ct pd-l-sm pd-r-sm">
            <lb-avatar class="mg-r-sm head-pic" type="img"
                       error-icon="svg-iconheadimg"
                       src="http://122.112.142.111/s/edu/res/v/image/2021/6/24/1915e3584b158cc6cda4c9774615ab04.jpg"
                       size="small"/>
            <div class="">LUOBO</div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <lb-icon type="el-icon-setting"></lb-icon>
              <span>用户设置</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <lb-icon type="el-icon-switch-button"></lb-icon>
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="head-carousel flex al-ct pd-r-md pd-l-md  text-color-sub">
      <lb-icon class="mg-r-sm" type="svg-icon-cl"></lb-icon>
      通知
    </div>

  </div>
</template>

<script>
import layoutMixin from "@/mixin/section/layout.mixin";

export default {
  name: "LayoutMainHead",
  mixins: [layoutMixin],
  methods: {}
}
</script>

<style lang="scss" scoped>
.layout-main-head {
  &>.head-top{
    height: $--head-top-height;
    box-shadow: 0 1px 2px #00152914;
    & > * {
      height: 100%;

      & > * {
        height: 100%;
      }

      .btn {
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        .lb-icon {
          font-size: 120%;
        }
      }

      .btn:hover, .account-info:hover {
        background-color: $--background-color-head-btn-hover;
      }

      .account-info {
        cursor: pointer;
        height: 100%;
      }
    }

  }

  &>.head-carousel{
    height: $--head-carousel-height;

    .lb-icon{
      font-size: 110% !important;
    }
  }
  & > * {
    width: 100%;
    box-shadow: 0 1px 2px #00152914;
  }
}

</style>