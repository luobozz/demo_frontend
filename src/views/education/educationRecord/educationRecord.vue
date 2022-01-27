<template>
  <div class="content">
    <layout-card title="教学记录" title-icon="fa-th-list" :titleBtn="cardBtn">
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
              @click="onEditOpen(record)">记录</a-button>
           </span>
      </a-table>
    </layout-card>
    <a-modal
        title="预约记录"
        centered
        v-model="modal.subscribeRecord.switch"
        @ok="crudList.dataSub"
        :ok-button-props="{ props: { loading: modal.subscribeRecord.loading } }"
    >
      <a-spin :spinning="modal.subscribeRecord.loading">
        <a-form-model
            :ref="modal.subscribeRecord.form.ref"
            :model="crudList.data"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }">
          <a-form-model-item label="记录人员" prop="recorder"
                             :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
            <a-input v-model="crudList.data.recorder"/>
          </a-form-model-item>
          <a-form-model-item label="实验情况" prop="description"
                             :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
            <a-textarea v-model="crudList.data.description"
                        :autoSize="{minRows: 4, maxRows: 4}"/>
          </a-form-model-item>
        </a-form-model>
      </a-spin>
    </a-modal>

  </div>
</template>

<script>
import methods from "./educationRecord.js";
import moment from "moment";
import momentConfig from "../../../config/moment.config"
import classTimeEnum from "../../../enums/api/useBook/classTimeEnum"
import expReqEnum from "../../../enums/api/useBook/expReqEnum"
import expTypeEnum from "../../../enums/api/useBook/expTypeEnum"

const defaultSubscribeRecord = {
  recorder: "",
  description: ""
}
export default {
  name: "educationRecord",
  data() {
    return {
      defaultSubscribeRecord,
      modal: {
        subscribeRecord: {
          name: "预约记录",
          title: "",
          switch: false,
          loading: false,
          form: {
            ref: "subscribeRecordModalForm",
          }
        }
      },
      cardBtn: [
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
          title: "实验室名称",
          dataIndex: 'labName',
        },
        {
          title: "申请人",
          dataIndex: 'applicant',
        },
        {
          title: "任课老师",
          dataIndex: 'teacherName',
        },
        {
          title: "实验名称",
          dataIndex: "name",
        },
        {
          title: "预约时间",
          customRender: (record) => {
            const time = moment(record.useDay)
            return `${time.format(momentConfig.format.onlyDate)} | ${time.format(momentConfig.format.week)} | ${classTimeEnum.getLabelByValue(record.classtimeUuid).name}`
          }
        },
        {
          title: "类型",
          dataIndex: 'exptypeUuid',
          customRender: (record) => {
            return `${expTypeEnum.getLabelByValue(record)}`
          }
        },
        {
          title: "要求",
          dataIndex: 'expreqUuid',
          customRender: (record) => {
            return `${expReqEnum.getLabelByValue(record)}`
          }
        },
        {
          title: "班级",
          dataIndex: 'gradeclassInfo',
          customRender:(text)=>{
            return  this.common().assemblyClassName(text);
          }
        },
        {
          title: "器材",
          dataIndex: 'expDevice',
        },
        {
          title: '操作',
          key: 'action',
          width: "80px",
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
@import "./educationRecord.less";
</style>