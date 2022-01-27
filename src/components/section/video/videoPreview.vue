<template>
  <div :class="getClass" @click="click()">
    <div class="preview-mask flex al-ct jc-ct">
      <lb-icon type="fa-play" color="white" size="24"></lb-icon>
      <div class="foot-info flex al-ct jc-sb">
        <span v-for="(ft,i) in footInfo" :key="`ft_${i}`" class=" line-no-warp" :style="{'max-width':`${100/footInfo.length}%`}">
          <lb-icon class="mg-r-min" v-if="ft.icon" :type="ft.icon"></lb-icon>
             {{ft.content}}
        </span>
      </div>
    </div>
    <auth-image class="img" :src="path"/>
  </div>
</template>

<script>
export default {
  name: 'videoPreview',
  props: {
    path: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "md"
    },
    footInfo: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  computed: {
    getClass() {
      return `video-preview cur-pointer hover ${this.size}`;
    }
  },
  data() {
    return {}
  },methods:{
    click(){
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>

.video-preview {
  position: relative;
  border-radius: @border-radius-base;
  overflow: hidden;

  & > * {
    width: 100%;
    height: 100%;
  }

  .preview-mask {
    background-color: @modal-mask-bg;
    position: absolute;
    z-index: 2;

    .foot-info {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 30%;
      padding: @padding-min @padding-sm;
      width: 100%;
      color: white;
      font-size: 65%;

      & > *:not(:last-child) {
        margin-right: @padding-md;
      }
    }
  }
}

@video-size: 500, 300, 200, 150, 100, 80;
.video-size-index(@i) when (@i <=length(@common-size-index)) {
  @size: extract(@video-size, @i);
  @h-size: @size * 3/5;
  @size-index-value: extract(@common-size-index, @i);
  @s-px: @size*1px;
  @s-h-px: @h-size*1px;
  .video-preview.@{size-index-value} {
    width: @s-px;
    height: @s-h-px;
  }
  .video-size-index((@i + 1));
}

.video-size-index(1);

</style>
