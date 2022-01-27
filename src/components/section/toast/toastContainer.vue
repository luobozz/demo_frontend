<template>
  <div class="lb-toast-Container flexCol-ct-ct" v-if="show">
  </div>
</template>

<script>
export default {
  name: 'toastContainer',
  data() {
    return {}
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Number,
      default: 20
    },
    width: {
      type: Number,
      default: 230
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

.lb-toast-Container {
  z-index: 9999991;
  position: absolute;
  width: 230px;
  height: 300px;
  bottom: 5px;
  left: 0;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  font-size: 12px !important;

  & > .lb-toast:last-child {
    margin-bottom: 0 !important;
  }
}
</style>
