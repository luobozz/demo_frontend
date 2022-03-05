<template>
  <div class="layout-main-head flex al-ct jc-sb">
    <div class="left flex al-ct">
      <div class="collapse btn" @click="menuCollapse">
        <lb-icon :type="layout.menuCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></lb-icon>
      </div>
      <div class="breadcrumb flex al-ct pd-l-sm pd-r-sm">
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
    <div class="right flex al-ct">
      <div class="btn">
        <lb-icon type="el-icon-bell"></lb-icon>
      </div>
      <div class="btn">
        <lb-icon type="el-icon-full-screen"></lb-icon>
      </div>
      <div class="btn">
        <lb-icon type="el-icon-setting"></lb-icon>
      </div>
      <div class="account-info flex al-ct pd-l-sm pd-r-sm">
        <lb-avatar class="mg-r-sm head-pic" type="img"
                   error-icon="svg-iconheadimg"
                   src="http://122.112.142.111/s/edu/res/v/image/2021/6/24/1915e3584b158cc6cda4c9774615ab04.jpg"
                   size="small"/>
        <div class="">LUOBO</div>
<!--        <lb-icon type="el-icon-arrow-down"></lb-icon>-->
      </div>
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

    .btn:hover,.account-info:hover {
      background-color: $--background-color-head-btn-hover;
    }

    .account-info{
      cursor: pointer;
    }

  }
}

</style>