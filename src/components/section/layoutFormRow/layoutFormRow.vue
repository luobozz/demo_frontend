<template>
  <div :class="['layoutFormRow', lastCls]">
    <a-row :gutter="48">
      <slot/>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'layoutFormRow',
  props: {
    last: {
      type: Boolean
    }
  },
  computed: {
    lastCls() {
      return this.last ? 'last' : null
    }
  }
}
</script>

<style lang="less">
.ant-form-inline {
  .layoutFormRow {
    .ant-form-item.beyond{
      .ant-form-item-control {
        height: auto;
      }
    }
    .ant-form-item {
      display: flex;
      margin-top: 2px;
      margin-bottom: @padding-xs;
      margin-right: 0;

      .ant-form-item-control-wrapper {
        flex: 1 1;
        display: inline-block;
        vertical-align: middle;
      }

      > .ant-form-item-label {
        line-height: 32px;
        padding-right: 8px;
        width: auto;
      }

      .ant-form-item-control {
        height: 32px;
        line-height: 32px;
      }

    }
  }

  .table-page-search-submitButtons {
    display: block;
    margin-bottom: 24px;
    white-space: nowrap;
  }


}

.layoutFormRow:not(.last) {
  padding-bottom: @padding-md;
  margin-bottom: @padding-md;
  border-bottom: @border-dashed-base;
}
</style>
