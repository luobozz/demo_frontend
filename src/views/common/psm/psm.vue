<template>
  <div class="content">
    <layout-card title="psm盒子列表" title-icon="fa-th-list" :titleBtn="cardBtn">
      <a-table
          bordered
          :columns="columns"
          :dataSource="crudList.dataList"
          :loading="crudList.loading"
          :rowKey="record =>record.uuid"
          :pagination="crudList.pagination"
          :scroll="{ x: crudList.scrollWidth }">
        <span slot="action" slot-scope="record" class="btn-group">
          <a-button
              type="primary"
              size="small"
              @click="crudSingleHandle().edit(modal.psm,record)">编辑</a-button>
          <a-button
              type="primary"
              size="small"
              @click="$util.api.ping(`${record.ipAddr}/stat`)">ping</a-button>
           <a-button
               type="danger"
               size="small"
               @click="crudSingleHandle().delete(record.uuid)">
            <lb-icon type="fa-trash-o"></lb-icon>
          </a-button>
           </span>
      </a-table>
    </layout-card>
    <a-modal
        :title="modal.psm.title"
        centered
        v-model="modal.psm.switch"
        @ok="crudList.dataSub"
        :ok-button-props="{ props: { loading: modal.psm.loading } }"
    >
      <a-form-model
          :ref="modal.psm.form.ref"
          :model="crudList.data"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }">
        <a-form-model-item label="PSM别名" prop="name"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-input v-model="crudList.data.name"/>
        </a-form-model-item>
        <a-form-model-item label="IP地址" prop="ipAddr"
                           :rules="[{ required: true,validator:common().validator.ip, trigger: 'blur' }]">
          <a-input v-model="crudList.data.ipAddr"/>
        </a-form-model-item>


      </a-form-model>
    </a-modal>

  </div>
</template>

<script>
import methods from "./psm.js";

const defaultPsm = {
  name: "",
  ipAddr: ""
}
export default {
  name: "psm",
  data() {
    return {
      modal: {
        psm: {
          name: "psm盒子",
          title: "",
          switch: false,
          loading:false,
          form: {
            ref: "psmModalForm",
          }
        }
      },
      cardBtn: [

        {
          title: "新增psm盒子",
          action: () => {
            this.crudSingleHandle().add(this.modal.psm, defaultPsm);
          },
          icon: "fa-plus"
        },
        {
          action: () => {
            this.crudConditionsHandle().reset();
          },
          icon: "fa-eraser"
        },
        {
          action: () => {
            this.crudBatchHandle().list();
          },
          icon: "fa-refresh"
        }
      ],
      columns: [
        {
          title: "序号",
          dataIndex: 'id',
          width: "75px",
        },
        {
          title: "PSM别名",
          dataIndex: 'name',
        },
        {
          title: "IP地址",
          dataIndex: 'ipAddr',
        },
        {
          title: '创建时间',
          dataIndex: 'createdTime',
          customRender: (text) => {
            return this.$util.data.dataFormat(text);
          }
        },
        {
          title: '操作',
          key: 'action',
          width: "180px",
          scopedSlots: {customRender: 'action'},
          fixed: 'right'
        }
      ]
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
@import "./psm.less";
</style>