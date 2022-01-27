<template>
  <div :class="{'list-container':true,'border':border}" :style="{'height':`${height}px`}">
    <div
        ref="listScroll"
        class="content scroll"
        :style="{'height':`calc(100% - ${footerHeight}px)`}"
        v-infinite-scroll="scrollHandle"
        :infinite-scroll-disabled="scrollDisabled"
        :infinite-scroll-distance="scrollDistance">

      <slot name="list"/>
      <div v-if="scrollLoading && !scrollDisabled" class="loader">
        <a-spin/>
      </div>
    </div>

    <div class="footer" v-show="footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
import infiniteScroll from "vue-infinite-scroll/vue-infinite-scroll";
export default {
  directives: { infiniteScroll },
  name: 'listContainer',
  props: {
    height:{
      type:Number,
      default:300
    },
    scrollHandle: {
      type: Function,
      default: () => {
      }
    },
    scrollDisabled: {
      type: Boolean,
      default: true
    },
    scrollDistance: {
      type: Number,
      default: 0
    },
    scrollLoading: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    footer: {
      type: Boolean,
      default: true
    }

  },
  created() {
    // console.log(this.scrollHandle)
  },
  computed:{
    footerHeight(){
      return this.footer?this.footerHeightSetting:0;
    },
  },
  data() {
    return {
      footerHeightSetting:30
    }
  },
  methods:{
    resetScroll(){
      this.$refs["listScroll"].scrollTo(0, 0)
    },
  }
}
</script>

<style lang="less" scoped>

.list-container.border{
  border: @border-base;
}

.list-container {
  position: relative;
  border-radius: @border-radius-base;
  padding: @padding-md;

  .content{
    padding: 0;
  }

  .footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0 @padding-md ;
  }

  .loader {
    position: absolute;
    bottom: 40px;
    left: 0;
    padding: 0 @padding-md;
    width: 100%;
    text-align: center;
  }
}
</style>
