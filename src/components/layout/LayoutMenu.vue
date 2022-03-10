<template>
  <div :class="{'layout-menu':true,'collapse':layout.menuCollapse}">
    <div class="system-name flex al-ct jc-ct no-shrink">
      <div v-show="!layout.menuCollapse">{{ system.name }}</div>
    </div>
    <div class="menu scroll y hover-type">
      <a-menu
          class=""
          mode="inline"
          :inline-collapsed="layout.menuCollapse"
      >
        <a-menu-item key="1">
          <div class="menu-content">
            <lb-icon class="mg-r-sm" type="fa-qq"/>
            <span class="title">Option 1</span>
          </div>
        </a-menu-item>
        <a-sub-menu key="sub2">
          <div slot="title">
            <div class="menu-content">
              <lb-icon class="mg-r-sm" type="fa-qq"/>
              <span class="title">Option 1</span>
            </div>
          </div>
          <a-menu-item key="9">
            <div class="menu-content">
              <lb-icon class="mg-r-sm" type="fa-qq"/>
              <span class="title">Option 1</span>
            </div>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
    <div class="collapse flex al-ct jc-ct" @click="menuCollapse" v-show="isSuitMedia('mobile')">
      <lb-icon :type="layout.menuCollapse?'if-icon-dedent':'if-icon-indent'"></lb-icon>
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
@collapse-height: 40px;

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

    .ant-menu {
      background: inherit !important;

      /deep/ * {
        background: inherit !important;
      }

      .ant-menu-item, /deep/ .ant-menu-submenu-title {
        .menu-content {
          display: flex;
          align-items: center;
          z-index: 2;

          .lb-icon {
            font-size: 120%;
          }
        }
      }

      .ant-menu-item-selected::after {
        z-index: 1;
        content: "";
        background-color: @primary-color-select-bg;
        position: absolute;
        left: 8px;
        right: 8px;
        top: 0;
        bottom: 0;
        pointer-events: none;
        border-radius: @border-radius-base;
        //transition: background-color .3s var(--n-bezier);
        border-right: none;
      }
    }

    .ant-menu-inline-collapsed {
      width: @menu-collapse-width !important;

      .ant-menu-item, /deep/ .ant-menu-submenu-title {
        text-align: center;
        padding: 0 !important;
        width: @menu-collapse-width !important;
        //height: @menu-collapse-width !important;

        .menu-content {
          width: @menu-collapse-width;
          height: 40px;
          justify-content: center;

          .lb-icon {
            margin-right: 0 !important;
          }
        }

        .title {
          display: none !important;
        }
      }
    }
  }

  .collapse {
    height: 0;
    font-size: 110%;
    border-top: 1px solid @border-color-base;
  }

}
</style>