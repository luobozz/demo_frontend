<template>
  <div class="layout-main-body">
    <router-view ref="routerView" class="router"/>
  </div>
</template>

<script>
export default {
  name: "LayoutMainBody",
  created() {
    // console.log(1)
  },
  mounted() {
    // console.log(2)
  }
}
</script>

<style scoped>

</style>
