<template>
  <div class="layout-main-head flex al-ct jc-sb">
    <div class="left flex al-ct">
      <div class="collapse btn" @click="menuCollapse">
        <lb-icon :type="layout.menuCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></lb-icon>
      </div>
    </div>
    <div class="right flex al-ct">2</div>
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
      .lb-icon{
        font-size: 120%;
      }
    }

    .btn:hover {
      background-color: $--background-color-head-btn-hover;
    }

  }
}

</style>