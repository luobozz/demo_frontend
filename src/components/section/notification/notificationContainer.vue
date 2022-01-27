<template>
  <div class="lb-notification-Container flex al-ct jc-ct"
       :style="{'bottom':`${bottom}px`,'margin-right':`${mLeft}px`,'width':`${width}px`}" v-if="show">
  </div>
</template>

<script>
export default {
  name: 'notificationContainer',
  data() {
    return {}
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    btn: {
      type: Object,
      default: () => {
        return {};
      }
    },
    bottom: {
      type: Number,
      default: 20
    },
    mLeft: {
      type: Number,
      default: 20
    },
    width: {
      type: Number,
      default: 384
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {

  },
  methods: {}
}
</script>

<style lang="less" scoped>
.lb-notification-Container {
  position: fixed;
  box-sizing: border-box;
  padding: 0;
  z-index: 1010;
  margin: 0;
  right: 0;

  & > .lb-notification:last-child {
    margin-bottom: 0 !important;
  }
}
</style>
