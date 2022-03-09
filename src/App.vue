<template>
  <div id="app" :class="getClass">
    <router-view/>
  </div>
</template>
<script>


import {mapActions, mapState} from "vuex";

export default {
  name: "LayoutMenu",
  data() {
    return {}
  },
  computed: {
    getClass(){
      return `media-${this.media}`
    }
  },
  methods: {
    ...mapActions(['responsive','responsiveDefault']),
  },
  mounted() {
    this.responsiveDefault()
    window.onresize = () => {
      // console.log(123)
      this.responsive()
    }
  }
}
</script>

<style lang="less">
@import "~@/assets/css/common.less";
</style>