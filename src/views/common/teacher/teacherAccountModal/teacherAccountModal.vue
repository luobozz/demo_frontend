<template>
  <a-modal
      title="分配账号"
      centered
      v-model="modalSwitch"

      width="90%"
      @cancel="onclose()"
      footer=""
  >
    <div class="content scroll">
      <layout-card title="可分配账号列表"
                   title-icon="fa-th-list" :titleBtn="cardBtn">
        <a-table
            bordered
            :columns="columns"
            :dataSource="crudList.dataList"
            :loading="crudList.loading"
            :rowKey="record =>record.uuid"
            :pagination="crudList.pagination">
   <span slot="action" slot-scope="record" class="btn-group">
          <a-button
              type="primary"
              size="small"
              @click="editAccountHandle(record)">分配</a-button>
           </span>
        </a-table>
      </layout-card>
    </div>


  </a-modal>

</template>

<script>
import methods from "./teacherAccountModal.js";

export default {
  name: "teacherAccountModal",
  props: {
    taData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    switchData: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      teacher:{},
      modalSwitch:false,
      cardBtn: [
      ],
      columns: [
        {
          title: "序号",
          width: "10%",
          dataIndex: 'id',
        },
        {
          title: "账号",
          dataIndex: 'account',
        },
        {
          title: "电话",
          dataIndex: 'tel',
        },
        {
          title: "角色",
          dataIndex: 'roleVos',
          customRender: (text) => {
            return text.map(p => p.name).toString();
          }
        },
        {
          title: '操作',
          key: 'action',
          width: "10%",
          scopedSlots: {customRender: 'action'},
        }
      ],
    }
  },
  created() {
    this.init()
  },
  computed: {

  },
  methods: methods,
  watch: {
    switchData() {
      if (this.switchData) {
        this.teacher = {
          ...this.taData
        }
        this.crudBatchHandle().list();
      }
      this.modalSwitch = this.switchData
    }
  }
}
</script>

<style lang="less" scoped>
@import "./teacherAccountModal.less";
</style>