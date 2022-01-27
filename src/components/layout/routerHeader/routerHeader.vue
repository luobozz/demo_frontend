<template>
  <div>
    <a-breadcrumb class="lb-breadcrumb">
      <a-breadcrumb-item v-for="item in breadcrumbs" :key="item.name">
        <span @click="linkTo(item.path)">{{ item.meta.title }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "routerHeader",
  data() {
    return {
      breadcrumbs: []
    }
  }, created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      this.breadcrumbs = []
      this.$route.matched.forEach(item => {
        if (item.name != "home") {
          this.breadcrumbs.push(item)
        }
      })
      //console.log(this.breadcrumbs)
    },
    linkTo(path) {
      console.log(path)
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  }
}
</script>

<style scoped>

</style>