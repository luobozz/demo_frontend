<template>
  <div :class="getClass">
    <lb-icon v-if="type==='icon'" :type="src"></lb-icon>
    <auth-image :errorIcon="errorIcon" v-if="type==='img'" :src="src"/>
  </div>
</template>

<script>
//TODO 错误图片修正
import authImage from "@/components/global/authImage/authImage";

export default {
  name: 'lbAvatar',
  components:{
    "auth-image":authImage
  },
  data() {
    return {
    }
  },
  props: {
    /*icon img*/
    type: {
      String,
      default: "icon"
    },
    /*circle square*/
    shape: {
      String,
      default: "circle"
    },
    border: {
      String,
      default: ""
    },
    /*64 large 40 middle 32 normal 24 small*/
    size: {
      String,
      default: "normal"
    },
    icon: {
      String,
      default: "fa-user"
    },
    src: {
      String,
      default: ""
    },
    color: {
      String,
      default: "base"
    },
    errorIcon: {
      String,
      default: ""
    },
  },
  created() {
  },
  computed: {
    getClass() {
      return `lb-avatar flexRowCt ${this.shape} ${this.size} ${this.color} ${this.border}`;
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.lb-avatar {
  box-sizing: border-box;
  font-family: tabular-nums;
  white-space: nowrap;
  position: relative;
  color: #fff;
  width: 32px;
  height: 32px;
  line-height: 32px;
  overflow: hidden;

  img,&>div {
    display: block;
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
  }
}

/*circle square*/
.lb-avatar.circle {
  border-radius: 50%;
}

.lb-avatar.border {
  border: 1px solid @border-color-base;
}

.lb-avatar.square {
  border-radius: @border-radius-base;
}

/*64 large 40 middle 32 normal 24 small*/
.lb-avatar.large {
  width: 64px;
  height: 64px;
  line-height: 64px;
}

.lb-avatar.middle {
  width: 40px;
  height: 40px;
  line-height: 40px;
}

.lb-avatar.small {
  width: 24px;
  height: 24px;
  line-height: 24px;
}


</style>
