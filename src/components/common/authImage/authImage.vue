<template>
  <img v-if="!errorChecked" :src="responseSrc" type="" @error="onerror">
  <div v-else>
    <div class="error-img-content flex al-ct jc-ct">
      <div class="error-img flex al-ct jc-ct">
        <lb-icon :type="errorIcon!==''?errorIcon:'svg-icontupianjiazaishibai'"></lb-icon>
      </div>
    </div>

  </div>

</template>

<script>
//TODO 预留后续做预览图片权限验证
import appConfig from "../../../config/app.config"

export default {
  name: 'authImage',
  props: {
    src: {
      type: String,
      default: ""
    },
    errorIcon: {
      type: String,
      default: ""
    },
    error: {
      type: Function,
      default: () => {
      }
    }
  },
  data() {
    return {
      errorChecked: false,
      responseSrc: "",
    }
  },
  computed: {},
  mounted() {
    this.getResponseSrc();
  },
  methods: {
    getResponseSrc() {
      this.errorChecked = false
      this.responseSrc = this.$httpApi.ews.resources.viewRes(this.src);
    },
    onerror() {
      if (!this.errorChecked) {
        this.errorChecked = true;
      }
    },
  },
  watch: {
    src() {
      this.getResponseSrc()
    },
  },
}
</script>

<style lang="less" scoped>
.error-img-content {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: #eef3f8;

  .error-img {
    background-color: #eef3f8;
    //color: @color-font-base;
    border: 1px solid white;
    width: 95%;
    height: 95%;
    box-shadow: @shadow-1-down;

    & > svg {
      width: 100%;
      height: 100%;
    }
  }
}

</style>
