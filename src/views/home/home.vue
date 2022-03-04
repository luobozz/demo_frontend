<template>
  <div class="content">
    <el-container>
      <el-aside width="220px">
        <layout-menu/>
      </el-aside>
      <el-container>
        <layout-main/>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import methods from "./home.js";
import layoutMain from "@/components/layout/LayoutMain";
import layoutMenu from "@/components/layout/LayoutMenu";

export default {
  name: "home",
  components: {
    'layout-main': layoutMain,
    'layout-menu': layoutMenu,
  },
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