<template>
  <div :class='getClass' v-if="isShow">
    <lb-icon class="mg-r-min" :type="getType"></lb-icon>
    <div class="toast-message">{{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'toast',
  data() {
    return {
      isShow: false,
      aniShow: false,
    }
  },
  props: {
    message: {
      type: String,
      default: ""
    },
    index: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: ""
    },

  },
  computed: {
    getClass() {
      return `toast-card ${this.type} flex al-ct ${this.aniShow ? 'show' : 'hide'}`
    },
    getType() {
      switch (this.type) {
        case "error":
          return "fa-bug"
        case "warning":
          return "fa-warning"
        case "success":
          return "fa-check-circle"
        default:
          return "fa-envelope"
      }
    }
  },
  watch: {},
  created() {
  },
  mounted() {

  },
  methods: {
    show() {
      this.isShow = true;
      this.aniShow = true;
    },
    hide() {
      this.aniShow=false;
      setTimeout(()=>{
        this.isShow = false;
      },300)
    }
  }
}
</script>

<style lang="less" scoped>
.toast-card:not(:last-child) {
  margin-bottom: @padding-min;
}

.toast-card {
  max-width: 210px;
  width: max-content;
  background-color: @primary-color;
  font-weight: bold;
  color: white;
  padding: 7px 14px 7px 7px;
  border-radius: 0 4px 4px 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  margin-left: -100%;

  .toast-message {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.toast-card.show {
  animation: show .3s forwards;
}

.toast-card.hide {
  animation: hide .3s forwards;
}

@keyframes show {
  from {
    margin-left: -100%;
  }
  to {
    margin-left: 0;
  }
}

@keyframes hide {
  from {
    margin-left: 0;
  }
  to {
    margin-left: -100%;
  }
}

.toast-card.success {
  background-color: #51a351 !important;
}

.toast-card.warning {
  background-color: #f89406 !important;
}

.toast-card.error {
  background-color: #da4f49 !important;
}
</style>
