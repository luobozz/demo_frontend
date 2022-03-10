<template>
  <div class="layout-main-foot flex column al-ct jc-ct">
    <div class="copyright">
      Copyright
      <lb-icon type="fa-copyright"/>
      2022
      <a href="https://github.com/luobozz/demo_frontend" rel="noreferrer"
         target="_blank"> {{ system.name }} </a>
    </div>
  </div>
</template>

<script>
import systemMixin from "@/mixin/section/system.mixin";

export default {
  name: "LayoutMainFoot",
  mixins: [systemMixin]
}
</script>

<style lang="less" scoped>
.layout-main-foot {
  font-size: 85%;

  & > div:not(:last-child) {
    margin-bottom: 10px;
  }

  .info {
    * {
      color: rgba(0, 0, 0, 0.45);

      &:not(:last-child) {
        margin-right: 10px;
      }
    }

    a {
      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }
    }
  }

  .links {
    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }

      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }

  .copyright {
    color: rgba(0, 0, 0, 0.45);

    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }
    }
  }
}
</style>