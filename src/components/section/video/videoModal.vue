<template>
  <a-modal
      class="video-modal"
      :title="title"
      centered
      v-model="modalSwitch"
      :width=width

      @cancel="onclose()"
      :getContainer="common().getModalContainer()"
      footer=""
  >
    <lb-video
        ref="modalLbVideo"
        :isLive="isLive"
        :hasAudio="hasAudio"
        :videoRes="videoRes"
        :loading="videoLoading"
        :videoType="videoType"
        :autoPlay="autoPlay"
        :lcdUuid="lcdUuid"
        :duration="duration"></lb-video>
  </a-modal>
</template>

<script>
import lbVideo from "./lbVideo"

export default {
  name: 'videoModal',
  components: {
    'lb-video': lbVideo,
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    lcdUuid: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: "520px"
    },
    switch: {
      type: Boolean,
      default: false
    },
    videoRes: {
      type: String,
      default: ""
    },
    videoType: {
      type: String,
      default: "mp4"
    },
    duration: {
      type: Number,
      default: 0
    },
    isLive: {
      type: Boolean,
      default: false
    },
    hasAudio: {
      type: Boolean,
      default: true
    },
    videoLoading: {
      type: Boolean,
      default: false
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
  },
  computed: {
  },
  data() {
    return {
      modalSwitch: false,
    }
  },
  created() {
  },
  methods: {
    onclose() {
      this.$emit("close", false)
      this.$refs["modalLbVideo"].destroy()
    }
  },
  watch: {
    switch() {
      this.modalSwitch = this.switch;
    },
    videoRes() {

    }
  }
}
</script>

<style lang="less" scoped>



</style>
