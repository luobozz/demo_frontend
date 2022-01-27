<template>
  <a-layout class="lb-body">
    <!--menu页面菜单渲染模块-->
    <layoutBodyMenu></layoutBodyMenu>
    <!--container页面渲染模块-->
    <a-layout>
      <layout-router ref="layoutRouter"></layout-router>
    </a-layout>
  </a-layout>
</template>

<script>
import layoutRouter from '../layoutBodyRouter/layoutRouter'
import layoutBodyMenu from '../layoutBodyMenu/layoutBodyMenu'

export default {
  name: 'layoutBody',
  components: {
    layoutRouter,
    layoutBodyMenu
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="less" scoped>
.lb-body {
  height: @home-content-height !important;
}
</style>
