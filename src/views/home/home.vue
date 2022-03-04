<template>
  <div class="content">
    <el-container>
      <el-aside :class="{'collapse':layout.menuCollapse}">
        <layout-menu/>
      </el-aside>
      <el-container :class="{'collapse':layout.menuCollapse}">
        <layout-main/>
      </el-container>
    </el-container>
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

<style lang="scss" scoped>
@import "src/views/home/home";
</style>