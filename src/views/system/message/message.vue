<template>
  <div class="content">
    <layout-card :disable="false" >
      <a-tabs default-active-key="messageAll" @change="messageCheckChangeHandle">
        <a-tab-pane key="messageAll" tab="全部消息">
          <message-list
              ref="messageAll"
          :read-type="-1"></message-list>
        </a-tab-pane>
        <a-tab-pane key="messageUnRead" tab="未读消息">
          <message-list
              ref="messageUnRead"
              :read-type="0"></message-list>
        </a-tab-pane>
      </a-tabs>
    </layout-card>
  </div>
</template>

<script>
import methods from "./message.js";
import messageList from "@/views/system/message/messageList/messageList.vue";

export default {
  name: "demo",
  components: {
    "message-list": messageList
  },
  data() {
    return {
      current:"messageAll"
    }
  },
  created() {
    this.init()
  },
  computed: {},
  methods: methods
}
</script>

<style lang="less" scoped>
@import "./message.less";
</style>