<template>
  <a-modal
      class="video-mulitple-modal"
      :title="title"
      centered
      v-model="modalSwitch"

      @cancel="onclose()"
      :getContainer="common().getModalContainer()"
      footer=""
  >
    <div class="video-modal-loding flex al-ct jc-ct" v-show="loading">
      <a-spin :spinning="loading"/>
    </div>
    <!--    TODO 切换变成前端切换 就是不重绘video-->
    <div class="video-list flex">
      <div class="video-main">
        <lb-video
            :isLive="currentVideo.isLive"
            :hasAudio="currentVideo.hasAudio"
            :videoRes="currentVideo.videoRes"
            :loading="currentVideo.loading"
            :videoType="currentVideo.videoType"
            :autoPlay="currentVideo.autoPlay"
            :lcdUuid="currentVideo.lcdUuid"
            :fix="true"></lb-video>

      </div>
      <div class="video-all flex column al-ct jc-sb scroll">
        <div :class="{'video cur-pointer':true,'current':i==current}" v-for="(video,i) in videoData" :key="video.uuid"
             @click="current=i">
          <div class="mask" v-show="i!=current"></div>
          <lb-video
              :isLive="video.isLive"
              :hasAudio="video.hasAudio"
              :videoRes="video.videoRes"
              :loading="video.loading"
              :videoType="video.videoType"
              :autoPlay="video.autoPlay"
              :lcdUuid="video.lcdUuid"
              :ctl="false"
              :fix="true"></lb-video>
        </div>
      </div>

    </div>
  </a-modal>
</template>

<script>
import lbVideo from "./lbVideo"

const defaultVideo = {
  hasAudio: false,
  isLive: true,
  videoRes: "",
  loading: true,
  videoType: "flv",
  autoPlay: true,
  lcdUuid: "",
}

export default {
  name: 'videoModalMultiple',
  components: {
    'lb-video': lbVideo,
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    switch: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    videoList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    openHandle: {
      type: Function,
      default: null
    },
  },
  computed: {
    currentVideo() {
      return this.videoData[this.current] || defaultVideo
    }
  },
  data() {
    return {
      modalSwitch: false,
      current: 0,
      videoData: [],
    }
  },
  mounted() {
    this.$nextTick(() => {
    })
  },
  created() {
  },
  methods: {
    init() {
    },
    onclose() {
      this.$emit("close", false)
    },
    setVideo(index, data) {
      this.$set(this.videoData, index, data);
    }
  },
  watch: {
    switch() {
      this.modalSwitch = this.switch;
    },
    videoList() {
      this.videoData = this.videoList
    }
  }
}
</script>

<style lang="less" scoped>
@videoAllWidth: 280px;
.video-mulitple-modal {
  position: relative;

  .video-modal-loding {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 11;
    background-color: @modal-mask-bg;
  }

  .video-list {
    position: relative;
    width: 100%;
    height: 100%;

    .video-main {
      position: relative;
      overflow: hidden;
      width: calc(100% - @videoAllWidth - @padding-md);
      margin-right: @padding-md;
      height: 100%;
      border-radius: @border-radius-base*2;
    }

    .video-all {
      background-color: @modal-mask-bg;
      border-radius: @border-radius-base*2;
      padding: @padding-md;
      height: 100%;
      width: @videoAllWidth;

      .video {
        position: relative;
        border-radius: @border-radius-base;
        height: 24%;

        .lb-video {
          border-radius: @border-radius-base;
        }
      }

      .video.current {
        border: 2px solid @primary-color;
      }

      .video.current::before {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: -8px;
        height: 0;
        width: 0;
        border-right: 8px solid #23ade5;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
      }

      .video:hover {
        border: 2px solid @primary-color;
      }
    }
  }
}

</style>
