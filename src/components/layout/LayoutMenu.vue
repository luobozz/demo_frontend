<template>
  <div :class="{'layout-menu':true,'collapse':layout.menuCollapse}" @click="(e)=>{   e.stopPropagation()}">
    <div class="system-name flex al-ct jc-ct no-shrink">
      <div v-show="!layout.menuCollapse">{{ system.name }}</div>
    </div>
    <div class="menu scroll y hover-type">
      <a-menu
          class=""
          mode="inline"
          :openKeys="openKeys"
          :selectedKeys="selectMenu"
          @openChange="openChangeHandle"
          :inline-collapsed="layout.menuCollapse"
      >
        <template v-for="(menuItem) in routes.filter(fi=>fi.type==='route')">
          <a-sub-menu v-if="(menuItem.children||[]).length>0" :key="'menu_'+menuItem.name">
            <div slot="title">
              <div class="menu-content">
                <lb-icon class="mg-r-sm" :type="menuItem.meta.icon"/>
                <span class="title">{{ menuItem.meta.title }}</span>
              </div>
            </div>
            <a-menu-item v-for="subMenuItem in menuItem.children.filter(fi=>fi.type==='route')"
                         :key="'subMenu_'+menuItem.name+'_'+subMenuItem.name">
              <router-link :to="subMenuItem.path">
                <div class="menu-content">
                  <span class="title">{{ subMenuItem.meta.title }}</span>
                </div>
              </router-link>
            </a-menu-item>
          </a-sub-menu>

          <a-menu-item v-else :key="'menu_'+menuItem.name">
            <router-link :to="menuItem.path">
              <div class="menu-content">
                <lb-icon class="mg-r-sm" :type="menuItem.meta.icon"/>
                <span class="title">{{ menuItem.meta.title }}</span>
              </div>
            </router-link>
          </a-menu-item>
        </template>
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
import {mapState} from "vuex";

export default {
  name: "LayoutMenu",
  data() {
    return {
      selectMenu: [],
      openKeys: [],
    }
  },
  mixins: [systemMixin, layoutMixin],
  computed: {
    ...mapState({
      routes: state => state.accountStore.routes,
    }),
  },
  created() {
    this.initRoute()
  },
  methods: {
    openChangeHandle(e) {
      this.openKeys = e.slice(-1)
    },
    checkRoute() {
      let routes = [];
      let routeMenus = {};

      this.$route.matched.forEach(item => {
        if (item.name != "home") {
          routes.push(item.name)
        }
      })

      if (routes != []) {
        if (routes.length == 2) {
          routeMenus = {
            selectMenu: [`subMenu_${routes[0]}_${routes[1]}`],
            openKeys: [`menu_${routes[0]}`]
          }
        } else if (routes.length == 1) {
          routeMenus = {
            selectMenu: [`menu_${routes[0]}`],
            openKeys: []
          }
        }
      }
      return routeMenus;
    },
    initRouterMenu(routeMenus) {
      const {
        $router,
        $route
      } = this;
      // console.log(this.menu[0])
      let firstMenu = this.routes.filter(fi => fi.type === 'route')[0];

      let isSub = firstMenu.children.length > 0;
      let path = firstMenu.path
      //判断是登录吗(当前路由不是home或者session获取不到)
      if ($route.name == "home" || routeMenus == []) {
        //默认第一个菜单
        this.selectMenu = isSub ? ["subMenu_" + firstMenu.name + "_" + firstMenu.subs[0].name] : ["menu_" + firstMenu.name];
        if (isSub) {
          this.openKeys = ["menu_" + firstMenu.name];
          path = firstMenu.subs[0].path
        }
      } else {
        this.selectMenu = routeMenus.selectMenu;
        this.openKeys = routeMenus.openKeys;
        path = $route.path
      }
      if (path != $route.path) {
        $router.push({path: path});
      }
    },
    initRoute() {
      const routeMenus = this.checkRoute();
      this.initRouterMenu(routeMenus);
    }
  },
  watch: {
    $route() {
      this.initRoute()
    }
  }
}
</script>

<style lang="less" scoped>
@collapse-height: 40px;

.media-mobile {
  .layout-menu {
    width: @menu-width;

    .menu {
      height: calc(100% - @head-top-height - @collapse-height) !important;
    }

    .collapse {
      height: @collapse-height !important;
    }
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
  box-shadow: 2px 0 8px #1d23290d;

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
      border-right: none !important;

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
