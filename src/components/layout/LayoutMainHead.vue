<template>
  <div class="layout-main-head flex column al-ct">
    <div class="head-top flex al-ct jc-sb">
      <div class="left flex al-ct">
        <div class="collapse btn" @click="menuCollapse">
          <lb-icon :type="layout.menuCollapse?'if-icon-dedent':'if-icon-indent'"></lb-icon>
        </div>
        <div class="breadcrumb flex al-ct pd-l-sm pd-r-sm" v-show="isSuitMedia('pc')">
          <a-breadcrumb separator="/">
            <a-breadcrumb-item>
              首页
            </a-breadcrumb-item>
            <a-breadcrumb-item>
              活动管理
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>
      </div>
      <div class="right flex al-ct al-end">
        <div class="btn">
          <lb-icon type="if-icon-bell"></lb-icon>
        </div>
        <div class="btn" v-show="isSuitMedia('pc')">
          <lb-icon type="if-icon-fullscreen"></lb-icon>
        </div>
        <div class="btn">
          <lb-icon type="if-icon-setting"></lb-icon>
        </div>

        <a-dropdown placement="bottomCenter">
          <div class="account-info flex al-ct pd-l-sm pd-r-sm">
            <lb-avatar class="mg-r-sm head-pic" type="img"
                       error-icon="svg-iconheadimg"
                       src="http://122.112.142.111/s/edu/res/v/image/2021/6/24/1915e3584b158cc6cda4c9774615ab04.jpg"
                       size="small"/>
            <div class="name">LUOBO</div>
          </div>
          <a-menu class="mg-r-md" slot="overlay">
            <a-menu-item class="flex">
              <lb-icon class="mg-r-sm" type="if-icon-setting"></lb-icon>
              <span>用户设置</span>
            </a-menu-item>
            <a-menu-divider/>
            <a-menu-item class="flex" @click="logoutHandle">
              <lb-icon class="mg-r-sm" type="if-icon-logout"></lb-icon>
              <span>退出登录</span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>

    <!--    <div class="head-carousel flex al-ct pd-r-md pd-l-md  text-color-sub">-->
    <!--      <lb-icon class="mg-r-sm" type="svg-icon-cl"></lb-icon>-->
    <!--      通知: 下午好！-->
    <!--    </div>-->

    <div class="head-tabs flex al-fe pd-l-md no-shrink scroll x hide" v-show="isSuitMedia('pc')">
      <div :class="['tab flex al-ct',tab.path===$route.path?'active':'']" v-for="(tab,i) in tabs"
           :key="`tab_${tab.name}_${i}`" @click="activeTabHandle($event,tab)">
        <lb-icon class="tab-icon mg-r-sm" :type="tab.meta.icon"/>
        <div class="tab-name">
          {{ tab.meta.title }}
        </div>
        <div v-if="!tab.meta.locked&&tabs.length>1" class="mg-l-sm close-btn" @click="closeTabHandle($event,tab)">
          <lb-icon class="text-color-sub" type="fa-close"/>
        </div>
        <div class="active-decoration left">
          <div class="fillet"></div>
        </div>
        <div class="active-decoration right">
          <div class="fillet"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import layoutMixin from "@/mixin/section/layout.mixin";
import {mapActions} from "vuex";

export default {
  name: "LayoutMainHead",
  mixins: [layoutMixin],
  data() {
    return {}
  },
  computed: {},
  methods: {
    ...mapActions(["logout", "clearTabs", "removeTab"]),
    logoutHandle() {
      this.logout()
      this.clearTabs()
    },
    activeTabHandle(e, tab) {
      this.$router.push({path: tab.path})
    },
    closeTabHandle(e, tab) {
      e.stopPropagation()
      this.removeTab({tab: tab, currentPath: this.$route.path})
    }
  },
  created() {

  }
}
</script>

<style lang="less" scoped>
.layout-main-head {
  & > .head-top {
    height: @head-top-height;
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
        background-color: @background-color-head-btn-hover;
      }

      .account-info {
        cursor: pointer;
        height: 100%;

        .name {
          font-size: 115%;
        }
      }
    }

  }

  & > .head-carousel {
    height: @head-carousel-height;

    .lb-icon {
      font-size: 110% !important;
    }
  }

  & > .head-tabs {
    position: relative;
    height: @head-tabs-height;

    @tab-radius: 10px;
    @outside-fillet-wh: 10px;

    .tab {
      height: 80%;
      padding: 0 @padding-md;
      border-radius: @tab-radius;
      cursor: pointer;
      position: relative;
      z-index: 1;

      .tab-icon {
        font-size: 90%;
      }

      .tab-name {
        margin-bottom: 3px;
      }

      .close-btn {
        border-radius: 50%;
        width: 15px;
        height: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        transition: .5s;

        .lb-icon {
          //margin-top: 1px;
        }
      }

      .close-btn:hover {
        background-color: shade(@background-color-head-btn-hover, 20%);

        .lb-icon {
          color: @background-color-head-btn-hover !important;
        }
      }

      .active-decoration {
        position: absolute;
        width: @outside-fillet-wh*2;
        height: @outside-fillet-wh;
        background-color: initial;
        bottom: 0;
        overflow: hidden;
        display: flex;

        .fillet {
          width: @outside-fillet-wh;
          height: @outside-fillet-wh;
        }
      }

      .active-decoration.left {
        left: -@outside-fillet-wh;
        right: auto;

        .fillet {
          border-bottom-right-radius: @tab-radius;
          box-shadow: @tab-radius @tab-radius 0 @tab-radius initial;
        }
      }

      .active-decoration.right {
        right: -@outside-fillet-wh;
        left: auto;
        justify-content: flex-end;

        .fillet {
          border-bottom-left-radius: @tab-radius;
          box-shadow: -@tab-radius @tab-radius 0 @tab-radius initial;
        }
      }
    }

    .tab:hover {
      background-color: @background-color-head-btn-hover;

      .active-decoration.left {
        .fillet {
          box-shadow: @tab-radius @tab-radius 0 @tab-radius @background-color-head-btn-hover;
        }
      }

      .active-decoration.right {
        .fillet {
          box-shadow: -@tab-radius @tab-radius 0 @tab-radius @background-color-head-btn-hover;
        }
      }

    }

    .tab.active {
      background-color: @primary-color-select-bg;
      color: @primary-color;
      z-index: 2;

      .close-btn {
        .lb-icon {
          color: @primary-color !important;
        }
      }

      .close-btn:hover {
        background-color: @primary-color !important;

        .lb-icon {
          color: @primary-color-select-bg !important;
        }
      }

      .active-decoration.left {
        .fillet {
          box-shadow: @tab-radius @tab-radius 0 @tab-radius @primary-color-select-bg;
        }
      }

      .active-decoration.right {
        .fillet {
          box-shadow: -@tab-radius @tab-radius 0 @tab-radius @primary-color-select-bg;
        }
      }

    }

    .tab:not(:first-child)::after {
      position: absolute;
      content: "";
      left: 0;
      height: 50%;
      width: 1px;
      background-color: @text-color-secondary;
    }


    //.tab.active::after {
    //  position: absolute;
    //  content: "";
    //  width: @outside-fillet-wh;
    //  height: @outside-fillet-wh;
    //  right: -@outside-fillet-wh;
    //  left: auto;
    //  bottom: 0;
    //  background-color: initial;
    //  border-bottom-left-radius: @tab-radius;
    //  box-shadow: @tab-radius @tab-radius 0 @tab-radius @primary-color-select-bg;
    //  overflow: hidden;
    //}
    //
    //.tab.active::before {
    //  position: absolute;
    //  content: "";
    //  width: @outside-fillet-wh;
    //  height: @outside-fillet-wh;
    //  left: -@outside-fillet-wh;
    //  right: auto;
    //  bottom: 0;
    //  background-color: initial;
    //  border-bottom-right-radius: @tab-radius;
    //}

    .tab.active::after, .tab:hover::after {
      width: 0 !important;
    }

    .tab.active + .tab::after, .tab:hover + .tab::after {
      width: 0 !important;
    }

  }

  & > * {
    width: 100%;
    box-shadow: 0 1px 2px #00152914;
  }
}

</style>
