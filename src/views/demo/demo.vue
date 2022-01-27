<template>
  <div class="content">
    <layout-card :title="`测试`"
                 title-icon="fa-th-list">
      <layout-form-row >
        <a-col :md="8" :sm="24">

        </a-col>
        <a-col :md="8" :sm="24">

        </a-col>
        <a-col :md="8" :sm="24">

        </a-col>
      </layout-form-row>
    </layout-card>
  </div>
</template>

<script>
import methods from "./demo.js";
import layoutFormRow from "@/components/section/layoutFormRow/layoutFormRow";

export default {
  name: "about",
  components: {
    "layout-form-row": layoutFormRow
  },
  data() {
    return {}
  },
  created() {
    this.init()
  },
  computed: {},
  methods: methods
}
</script>

<style lang="less" scoped>
@import "./demo.less";
</style>