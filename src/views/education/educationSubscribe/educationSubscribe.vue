<template>
  <div class="content">
    <layout-card :disable="false" >
      <a-tabs default-active-key="1" @change="tabChangeHandle">
        <a-tab-pane key="1" tab="预约">
          <subscribe-calendar></subscribe-calendar>
        </a-tab-pane>
        <a-tab-pane key="2" tab="预约记录" >
          <subscribe-record ref="subscribeRecord"></subscribe-record>
        </a-tab-pane>
      </a-tabs>
    </layout-card>

  </div>
</template>

<script>
import methods from "./educationSubscribe.js";
import subscribeRecord from "./subscribeRecord/subscribeRecord.vue"
import subscribeCalendar from "./subscribeCalendar/subscribeCalendar.vue"

export default {
  name: "educationSubscribe",
  components: {
    'subscribe-record': subscribeRecord,
    'subscribe-calendar': subscribeCalendar,
  },
  data() {
    return {
      cardBtn: [],
    }
  },
  created() {
    this.init()
  },
  computed: {
  },
  methods: methods
}
</script>

<style lang="less" scoped>
@import "./educationSubscribe.less";
</style>