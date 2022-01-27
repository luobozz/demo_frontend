<template>
  <a-layout-sider
      :collapsed="collapsed"
      class="menu"
      width="230">
    <a-menu class="lb-menu scroll hover-type" mode="inline" :selectedKeys="[selectMenu]"
            @openChange="openChangeHandle"
            :openKeys="openKeys?[openKeys]:[]">
      <!--menus 循环体-->
      <template v-for="menuItem in menu">
        <!--menu subMenu(有下级列表)-->
        <a-sub-menu v-if="menuItem.subs.length>0" :key="'menu_'+menuItem.name"
                    >
                  <span slot="title">
                    <lb-icon v-if="menuItem.meta.icon" :type="menuItem.meta.icon"></lb-icon>
                    <span v-if="!collapsed">{{ menuItem.meta.title }}</span>
                  </span>
          <a-menu-item v-for="subMenuItem in menuItem.subs"
                       :key="'subMenu_'+menuItem.name+'_'+subMenuItem.name">
            <router-link :to="subMenuItem.path">
              <lb-icon v-if="menuItem.meta.icon" :type="subMenuItem.meta.icon"></lb-icon>
              <span>{{ subMenuItem.meta.title }}</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>
        <!--menu menu(无下级列表)-->
        <a-menu-item v-else :key="'menu_'+menuItem.name">
          <router-link :to="menuItem.path">
            <lb-icon v-if="menuItem.meta.icon" :type="menuItem.meta.icon"></lb-icon>
            <span v-if="!collapsed">{{ menuItem.meta.title }}</span>
          </router-link>
        </a-menu-item>

      </template>
    </a-menu>
    <div class="menu-collapsed flex al-ct" @click="collapsedHandle">
      <lb-icon class="mg-r-sm" :type="!collapsed?'fa-arrow-left':'fa-arrow-right'"/>
      <span v-show="!collapsed">收起菜单栏</span>
    </div>
  </a-layout-sider>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'layoutBodyMenu',
  props: {},
  data() {
    return {
      collapsed: false,
      selectMenu: "",
      openKeys: "",
      menu: [],
    }
  },
  computed: {
    ...mapState({
      routes: state => state.loginStore.routes,
    })
  },
  created() {
    this.init();
  },
  methods: {
    openChangeHandle(e) {
      this.openKeys=e[e.length-1]
    },
    collapsedHandle() {
      this.collapsed = !this.collapsed;
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
            selectMenu: `subMenu_${routes[0]}_${routes[1]}`,
            openKeys: `menu_${routes[0]}`
          }
        } else if (routes.length == 1) {
          routeMenus = {
            selectMenu: `menu_${routes[0]}`,
            openKeys: ''
          }

        }
      }

      return routeMenus;
    },
    init() {
      const {
        routes,
        checkRoute,
        initRouterMenu
      } = this
      const routeMenus = checkRoute();
      this.menu = routes
      //有菜单
      if (this.menu.length > 0) {
        initRouterMenu(routeMenus);
      } else {
        //无菜单返回
      }
    },
    initRouterMenu(routeMenus) {
      const {
        $router,
        $route
      } = this;
      // console.log(this.menu[0])
      let firstMenu = this.menu[0];

      let isSub = firstMenu.subs.length > 0;
      let path = firstMenu.path
      //判断是登录吗(当前路由不是home或者session获取不到)
      if ($route.name == "home" || routeMenus == []) {
        //默认第一个菜单
        this.selectMenu = isSub ? "subMenu_" + firstMenu.name + "_" + firstMenu.subs[0].name : "menu_" + firstMenu.name;
        if (isSub) {
          this.openKeys = "menu_" + firstMenu.name;
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
    }
  },
  watch: {
    $route() {
      const {
        checkRoute,
        initRouterMenu
      } = this
      initRouterMenu(checkRoute());
    }
  }
}
</script>

<style lang="less" scoped>
.menu {
  background: @color-bg-base;
  height: 100%;

  .lb-menu {
    height: calc(100% - @home-head-height);
    overflow: hidden;
  }

  .menu-collapsed {
    height: @home-head-height;
    border-top: @border-base;
    padding: 0 @padding-lg;
    cursor: pointer;
    z-index: 9;

    & > span {
      white-space: nowrap;
      overflow: hidden;
    }
  }

  .ant-menu-item:first-child {
    margin-top: 0;
  }
}
</style>
