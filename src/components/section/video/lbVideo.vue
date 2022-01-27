<template>
  <div :id="getId" :class="{'lb-video':true,'fullscreen':player.fullscreen.web||player.fullscreen.window}" ref="lbVideo"
       :style="{'height':`${height}`}" @mouseleave="enter(false)"
       @mouseenter="enter(true)">
    <div :class="{'video-ui':true,'mask':player.paused}" @click="play">
      <div v-show="!player.loading&&player.paused" class="bottom-paused-sign flex al-ct jc-ct">
        <lb-icon type="fa-play" size="24"></lb-icon>
      </div>
      <div class="video-error flex al-ct jc-ct" v-show="player.isError"
           @click="common().blockPropagation($event)">{{ player.errorMsg }}
      </div>
      <div class="video-loading flex al-ct jc-ct" v-show="player.loading"
           @click="common().blockPropagation($event)">
        <a-spin/>
      </div>
      <div class="video-volume-source" v-show="player.keyMap.volume.onVolume">
        <lb-icon class="cur-pointer mg-r-min" type="fa-volume-up"></lb-icon>
        {{ player.volume }}%
      </div>
      <div v-show="!player.loading&&ctl&&player.showBtCtl" class="bottom-ctl"
           @click="common().blockPropagation($event)">
        <div class="progress-bar cur-pointer" @click="progressClick($event).duration()">
          <div class="current-bar" :style="{'width':`${currentPercent}%`}"></div>
          <lb-icon class="current-sign fa-spin" type="fa-dot-circle-o"
                   :style="{'left':`calc(${currentPercent}% - 2px)`}"></lb-icon>
        </div>
        <div class="ctl-bar flex al-ct jc-sb">
          <div class="play-ctl-group flex al-ct">
            <lb-icon @click="play" class="cur-pointer" type="fa-play" v-show="player.paused"></lb-icon>
            <lb-icon @click="play" class="cur-pointer" type="fa-pause" v-show="!player.paused"></lb-icon>
            <div>{{ $util.data.time.msToHMS(player.currentDuration) }} /
              {{ isLive ? "直播" : $util.data.time.msToHMS(player.duration) }}
            </div>
          </div>
          <div :id="getIdSettingCtr" class="setting-ctl-group flex al-ct">
            <a-tooltip
                :getPopupContainer="common().getModalContainer(getIdSettingCtr)">
              <div class="volume-pop flex column al-ct" slot="title">
                <div>{{ player.volume }}</div>
                <div class="volume-line mg-t-min cur-pointer flex column al-ct jc-fe"
                     @click="progressClick($event).volume()">
                  <div class="volume-line-current" :style="{'height':`${player.volume}%`}"></div>
                </div>
              </div>
              <lb-icon class="cur-pointer"
                       :type="player.volume<50?player.volume==0?'fa-volume-off':'fa-volume-down':'fa-volume-up'"></lb-icon>
            </a-tooltip>
            <a-tooltip
                :getPopupContainer="common().getModalContainer(getIdSettingCtr)">
              <span slot="title">网页全屏</span>
              <lb-icon @click="fullscreen().web()" class="cur-pointer" type="fa-arrows-alt"></lb-icon>
            </a-tooltip>
            <a-tooltip
                :getPopupContainer="common().getModalContainer(getIdSettingCtr)">
              <span slot="title">窗口全屏</span>
              <lb-icon @click="fullscreen().window()" class="cur-pointer" type="fa-tv"></lb-icon>
            </a-tooltip>

          </div>
        </div>
      </div>
    </div>
    <video
        id="myvideo"
        class="video-player"
        ref="lbVideoPlayer"
        @ended="ended($event)"
        @timeupdate="timeupdate($event)"
        @canplay="canplay($event)"
        @error="error($event)"></video>
  </div>
</template>

<script>
import flvJs from 'flv.js'
import lodash from "lodash";

export default {
  name: 'lbVideo',
  props: {
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
      default: 1
    },
    isLive: {
      type: Boolean,
      default: false
    },
    hasAudio: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    lcdUuid: {
      type: String,
      default: ""
    },
    fix: {
      type: Boolean,
      default: false
    },
    ctl: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      offsetWidth: 0,
      player: {
        flvPlayer: null,
        paused: true,
        videoDom: null,
        showBtCtl: false,
        duration: 1,
        fullscreen: {
          web: false,
          window: false
        },
        volume: 50,
        isError: false,
        loading: false,
        errorMsg: "播放错误",
        currentDuration: 0,
        keyMap: {
          volume: {
            onVolume: false,
            volumeTimer: null,
            maxAdd: 5,
          },
          currentTime:{
            currentTimeTimer:null,
          },
          lastPush: "",
          pushTime: 0,
          pushTimeTimer: null
        }
      },
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  computed: {
    getId() {
      return `lbVideo_${this.videoRes}`
    },
    getIdSettingCtr() {
      return `lbVideo_setting_ctr_${this.videoRes}`
    },
    height() {
      return this.fix ? "100%" : `${this.offsetWidth * 3 / 5}px`;
    },
    currentPercent() {
      if (this.isLive) {
        return 100;
      } else {
        return (this.player.currentDuration / this.player.duration).toFixed(2) * 100;
      }
    },
    videoCanPlay() {
      return !(this.player.loading || this.player.isError)
    }
  },
  methods: {
    init() {
      this.player.videoDom = this.$refs["lbVideoPlayer"];
      this.offsetWidth = this.$refs["lbVideo"]?.offsetWidth;
      this.player.loading = this.loading;
      if (!this.player.loading) {
        this.addVideoRes({
          type: this.videoType,
          url: this.videoRes,
          duration: this.duration
        })
      }
      this.keyMapBind();
    },
    keyMapBind() {
      document.onkeydown = (e) => {
        const {key} = e;
        if (key === this.player.keyMap.lastPush) {
          this.player.keyMap.pushTime++;
        } else {
          this.player.keyMap.pushTime = 1;
        }

        if (this.videoCanPlay) {
          switch (key) {
            case "ArrowUp":
              this.player.volume += this.player.keyMap.pushTime > this.player.keyMap.volume.maxAdd ? this.player.keyMap.volume.maxAdd : this.player.keyMap.pushTime;
              this.setVolume();
              this.player.keyMap.volume.onVolume = true
              break;
            case "ArrowDown":
              this.player.volume -= this.player.keyMap.pushTime > this.player.keyMap.volume.maxAdd ? this.player.keyMap.volume.maxAdd : this.player.keyMap.pushTime;
              this.setVolume();
              this.player.keyMap.volume.onVolume = true
              break;
            case "ArrowRight":
              window.clearTimeout(this.player.keyMap.currentTime.currentTimeTimer);
              this.player.keyMap.currentTime.currentTimeTimer = setTimeout(() => {
                this.setCurrentTime(this.player.videoDom.currentTime + this.player.keyMap.pushTime*5 )
              }, 100)
              break;
            case "ArrowLeft":
              window.clearTimeout(this.player.keyMap.currentTime.currentTimeTimer);
              this.player.keyMap.currentTime.currentTimeTimer = setTimeout(() => {
                this.setCurrentTime(this.player.videoDom.currentTime - this.player.keyMap.pushTime*5 )
              }, 100)
              break;
            case " ":
              this.play()
          }
        }
        if (this.player.keyMap.volume.onVolume) {
          window.clearTimeout(this.player.keyMap.volume.volumeTimer);
          this.player.keyMap.volume.volumeTimer = setTimeout(() => {
            this.player.keyMap.volume.onVolume = false;
          }, 1000)
        }

        window.clearTimeout(this.player.keyMap.pushTimeTimer);
        this.player.keyMap.pushTimeTimer = setTimeout(() => {
          this.player.keyMap.pushTime = 0;
        }, 100)

        this.player.keyMap.lastPush = key;
      }
    },
    addVideoRes(res) {
      if (flvJs.isSupported()) {
        this.player.flvPlayer = flvJs.createPlayer({
          type: res.type,
          url: this.isLive ? res.url : this.$httpApi.ews.resources.viewRes(res.url),
          isLive: this.isLive,
          hasAudio: this.hasAudio,

        });

        this.player.flvPlayer.attachMediaElement(this.player.videoDom);
        this.player.flvPlayer.on('error', err => {

          this.error(err)
        });
        this.player.flvPlayer.load();
        if (this.autoPlay) {
          this.play();
        }
      }
    },
    enter(tf) {
      this.player.showBtCtl = tf;
    },
    play() {
      if (this.player.videoDom.paused) {
        this.player.flvPlayer.play();
        this.player.paused = false;
      } else {
        this.player.flvPlayer.pause();
        this.player.paused = true;
      }
    },
    fullscreen() {
      return {
        window: () => {
          if (this.player.fullscreen.window) {
            this.$util.ui.fullscreen().close()
          } else {
            this.$util.ui.fullscreen().full()
          }
          this.player.fullscreen.window = !this.player.fullscreen.window
        },
        web: () => {
          if (this.player.fullscreen.window) {
            this.player.fullscreen.window = false
            this.player.fullscreen.web = true
            this.$util.ui.fullscreen().close()
            return;
          }
          this.player.fullscreen.web = !this.player.fullscreen.web
        }
      }
    },
    progressClick(e) {
      return {
        duration: () => {
          this.player.videoDom.currentTime = e.offsetX / e.target.offsetWidth * this.player.flvPlayer.duration;
        },
        volume: () => {
          this.player.volume = Math.round((e.target.offsetHeight - e.offsetY) / e.target.offsetHeight * 100);
          this.setVolume();
        }
      }
    },
    setCurrentTime(time) {
      time = time < 0 ? 0 : time > this.player.flvPlayer.duration ? this.player.flvPlayer.duration : time;
      this.player.videoDom.currentTime = time;
    },
    setVolume() {
      this.player.volume = this.player.volume < 0 ? 0 : this.player.volume > 100 ? 100 : this.player.volume
      this.player.videoDom.volume = this.player.volume / 100;
    },
    timeupdate(e) {
      if (this.player.flvPlayer) {
        this.player.currentDuration = this.player.flvPlayer.currentTime * 1000;
      }
    },
    canplay(e) {
      this.player.loading = false;
      this.player.isError = false;
      if (!this.isLive) {
        this.player.duration = this.player.flvPlayer.duration * 1000;
      }
    },
    ended(e) {
      this.player.paused = true;
    },
    error(e) {
      this.player.isError = true;
      if (this.isLive) {
        this.destroy()
      }
    },
    destroy() {
      if (this.player.flvPlayer) {
        this.player.flvPlayer.pause();
        this.player.flvPlayer.unload();
        this.player.flvPlayer.detachMediaElement();
        this.player.flvPlayer.destroy();
        this.player.flvPlayer = null;

      }
      //TODO 在混入内增加keydown复原器以防前置页面按键冲突
      document.onkeydown = () => {
      }
    },
  },
  watch: {
    videoRes() {
      if (!lodash.isEmpty(this.videoRes)) {
        this.addVideoRes({
          type: this.videoType,
          url: this.videoRes,
        })
      }
    },
    loading() {
      this.player.loading = this.loading
    }
  }
}
</script>

<style lang="less" scoped>
@bottom-ctl-height: 45px;
@current-bar-height: 6px;
.lb-video {
  position: relative;
  overflow: hidden;
  width: 100%;
  background-color: black;

  & > * {
    width: 100%;
    height: 100%;
  }

  .video-player {
    z-index: 8;
  }

  .video-ui {
    position: absolute;
    z-index: 8;
    top: 0;
    left: 0;

    .video-error {
      color: white;
      z-index: 10;
      width: 100%;
      height: 100%;
    }

    .video-volume-source {
      color: white;
      z-index: 10;
      font-size: 110%;
      font-weight: bold;
      position: absolute;
      left: 2%;
      top: 2%;
      transition: .3s;
      text-shadow: 1px 1px 1px @shadow-color;
    }

    .video-loading {
      color: white;
      z-index: 10;
      width: 100%;
      height: 100%;
    }

    .bottom-paused-sign {
      position: absolute;
      right: @padding-lg;
      bottom: @bottom-ctl-height+@padding-md;
      width: 70px;
      height: 50px;
      background-color: white;
      opacity: .8;
      z-index: 8;
      border-radius: @border-radius-base*2;
    }

    .bottom-ctl {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 9;
      height: @bottom-ctl-height;
      background-color: rgba(0, 0, 0, 0.1);
      padding: @padding-min @padding-sm 0 @padding-sm;


      .progress-bar {
        position: relative;
        width: 100%;
        height: @current-bar-height;
        background-color: rgba(110, 110, 110, 0.45);
        border-radius: 2px;

        .current-bar {
          height: 100%;
          background-color: @primary-5;
          opacity: .8;
          border-radius: 2px;
          pointer-events: none;
        }

        .current-sign {
          position: absolute;
          font-size: 15px;
          top: -5px;
          color: @primary-5;
          pointer-events: none;
        }
      }

      .ctl-bar {
        width: 100%;
        height: calc(100% - @current-bar-height);
        color: white;
        padding: 0 @padding-sm 0 0;
        font-size: 80%;

        .lb-icon {
          width: 15px;
        }

        & > * {
          & > * {
            margin-left: @padding-md;
          }
        }

        .play-ctl-group {

        }

        .setting-ctl-group {
          .volume-pop {
            width: 20px;

            .volume-line {
              width: 100%;
              height: 100px;

              .volume-line-current {
                width: 2px;
                background-color: white;
                pointer-events: none;
              }
            }
          }
        }
      }
    }
  }

  .video-ui.mask {
    background-color: @modal-mask-bg;
  }
}

.lb-video.fullscreen {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  height: 100vh !important;
  width: 100vw !important;
  max-height: 100vh !important;
  max-width: 100vw !important;
}
</style>
