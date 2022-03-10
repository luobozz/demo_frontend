<template>
  <div class="content">
    <a-layout>
      <a-layout-sider :class="{'collapse':layout.menuCollapse}">
        <layout-menu/>
      </a-layout-sider>
      <a-layout :class="{'collapse':layout.menuCollapse}">
        <layout-main/>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import methods from "./home.js";
import layoutMain from "@/components/layout/LayoutMain";
import layoutMenu from "@/components/layout/LayoutMenu";
import layoutMixin from "@/mixin/section/layout.mixin";

export default {
  name: "home",
  components: {
    'layout-main': layoutMain,
    'layout-menu': layoutMenu,
  },
  mixins: [layoutMixin],
  data() {
    return {}
  },
  created() {
  },
  computed: {},
  methods: methods
}
</script>

<style lang="less" scoped>
@import "./home";
</style>