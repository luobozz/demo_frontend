<template>
  <div class="layout-card">
    <div class="header-line" v-if="disable"></div>
    <div class="header flex jc-sb al-ct" v-if="disable">
            <span class="title">
                <lb-icon class="mg-r-md" :type="titleIcon"/>
                <span>{{ title }}</span>
            </span>
      <div v-if="titleBtn.length>0" class="title-btn">
        <a-button-group>
          <a-button v-for="(btn,i) in titleBtn" :key="i" @click="clickTitleBtn(btn)"
                    :disabled="btn.disabled?btn.disabled:false" :loading="btn.loading?btn.loading:false"
                    :type="btn.type?btn.type:''">
            <lb-icon v-if="btn.icon&&!btn.loading" :type="btn.icon" :class="{'mg-r-min':checkTitle(btn)}"></lb-icon>
            {{ btn.title }}
          </a-button>
        </a-button-group>
      </div>
    </div>
    <div :class="{'content':true}">
      <slot/>
    </div>

    <!--TODO 预留footer需要的时候设计下-->
    <!--<div v-if="footer" class="footer">-->
    <!--  footer-->
    <!--</div>-->

  </div>
</template>

<script>
import lodash from "lodash";

export default {
  name: "layoutCard",
  props: {
    title: String,
    titleIcon: String,
    spaceContent: {
      type: Boolean,
      default: false,
    },
    borderContent: {
      type: Boolean,
      default: false,
    },
    titleBtn: {
      type: Array,
      default: () => []
    },
    disable: {
      type: Boolean,
      default: true
    }
  },
  computed:{
    checkTitle(){
      return (btn)=>{
        return !lodash.isEmpty(btn.title)
      }
    }
  },
  methods: {
    clickTitleBtn(btn) {
      if (typeof (btn.action) == "function") {
        btn.action();
      }
    }
  }
}
</script>

<style lang="less" scoped>
.layout-card {
  background-color: @color-bg-base;
  position: relative;
  padding: @padding-lg+8px @padding-lg @padding-lg @padding-lg;
  transition: .3s;
  overflow: hidden;

  & > div {
    width: 100%;
  }

  .header-line {
    height: @border-width-base;
    background-color: @border-color-base;
    margin: 0 0 @padding-lg + 5px 0;
  }

  .header {
    position: absolute;
    top: @font-size-base - 3px;
    left: 0;
    height: 40px;

    .title {
      background-color: @color-bg-base;
      font-size: @font-size-lg;
      padding-right: 8px;
      margin-left: @padding-lg;
    }

    .title-btn {
      background-color: @color-bg-base;
      padding-left: 8px;
      margin-right: @padding-lg;
    }
  }

  .content {

  }
}

.layout-card:not(:last-child) {
  margin-bottom: @padding-lg;
}
</style>