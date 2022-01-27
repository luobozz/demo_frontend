<template>
  <div class="content">
    <list-container class="message-body"
                    :footer="false"
                    :border="false"
                    :height="600">
      <a-list slot="list"
              :data-source="crudList.dataList"
              :loading="crudList.loading">
        <a-list-item class="cur-pointer message-item" slot="renderItem" slot-scope="item,index" @click="readMessageHandle(item)">
          <a-list-item-meta
              :description="item.content"
          >
            <lb-avatar
                type="img"
                slot="avatar"
                error-icon="svg-iconheadimg"
                :src="item.fromAccountImage"
                size="small"/>
            <div slot="title"> {{ item.title }}</div>
          </a-list-item-meta>
          <div class="text-sm">
            {{ $util.data.time.timeFromNow(item.createdTime) }}
          </div>
          <a-badge v-if="item.readStatus===0" class="dot" dot></a-badge>
        </a-list-item>
      </a-list>
    </list-container>
  </div>
</template>

<script>
import methods from "./messageList.js";
import listContainer from "@/components/section/listContainer/listContainer";

export default {
  name: "demo",
  props:{
    readType:{
      type:Number,
      default: 0
    }
  },
  components:{
    "list-container":listContainer
  },
  data() {
    return {
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
@import "./messageList.less";
</style>