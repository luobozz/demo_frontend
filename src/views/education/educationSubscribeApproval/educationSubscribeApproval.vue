<template>
  <div class="content">
    <layout-card title="预约审批列表" title-icon="fa-th-list" :titleBtn="cardBtn">
      <a-table
          bordered
          :columns="columns"
          :dataSource="crudList.dataList"
          :loading="crudList.loading"
          :rowKey="(record) => record.uuid"
          :pagination="crudList.pagination"
          :scroll="{ x: crudList.scrollWidth }"
      >
        <span
            class="labName"
            slot="labName"
            slot-scope="record"
            @click="crudSingleHandle().details(modal.detail,record.uuid)"
        >
          {{ record.labName }}
        </span>
        <span slot="approvalStatus" slot-scope="record">
             <a-tag
                 :color=" approvalStatusEnum.getLabelByValue(record.approvalStatus).color ">{{
                 approvalStatusEnum.getLabelByValue(record.approvalStatus).name
               }}</a-tag>
          <div class="text-color-sub text-sm mg-t-min" v-if="record.approvalStatus==2">原因:{{record.rejectReason}}</div>
        </span>
        <span
            v-if="record.approvalStatus == '1'"
            slot="action"
            slot-scope="record"
            class="btn-group"
        >
          <a-button
              type="primary"
              size="small"
              :loading="modal.reject.loading"
              @click="updateApproval(record, '0')"
          >
            <lb-icon v-if="!modal.reject.loading" type="fa-check"></lb-icon>
          </a-button
          >
          <a-button
              type="danger"
              size="small"
              @click="crudSingleHandle().edit(modal.reject, record,editOpen(record,'2'))"
          >
            <lb-icon type="fa-close"></lb-icon>
          </a-button
          >
        </span>
      </a-table>
    </layout-card>
    <a-modal
        title="填写拒绝原因"
        centered
        v-model="modal.reject.switch"
        @ok="crudList.dataSub"
        :ok-button-props="{ props: { loading: modal.reject.loading } }"
    >

      <a-form-model
          :ref="modal.reject.form.ref"
          :model="crudList.data"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 17 }">
        <a-form-model-item label="拒绝原因" prop="rejectReason"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-textarea v-model="crudList.data.rejectReason"/>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import methods from "./educationSubscribeApproval.js";
import expTypeEnum from "../../../enums/api/useBook/expTypeEnum";
import expReqEnum from "../../../enums/api/useBook/expReqEnum";
import classTimeEnum from "../../../enums/api/useBook/classTimeEnum";
import gradeEnum from "../../../enums/api/classCollective/gradeEnum";
import moment from "moment";
import momentConfig from "@/config/moment.config";
import approvalStatusEnum from "../../../enums/api/useBook/approvalStatusEnum"

export default {
  name: "educationSubscribeApproval",
  data() {
    return {
      expTypeEnum,
      expReqEnum,
      classTimeEnum,
      gradeEnum,
      moment,
      momentConfig,
      approvalStatusEnum,
      cardBtn: [
        {
          action: () => {
            this.crudBatchHandle().list();
          },
          icon: "fa-refresh",
        },
      ],
      modal: {
        reject: {
          name: "拒绝原因",
          title: "",
          content: "",
          switch: false,
          loading: false,
          form: {
            ref: "rejectModalForm",
          },
        },
        detail: {
          name: "预约审批",
          title: "",
          content: "",
          switch: false,
          uploading: false,
          form: {
            ref: "detailModalForm",
          },
        },
      },
      columns: [
        {
          title: "序号",
          dataIndex: 'id',
          width: "75px",
        },
        {
          title: "实验室名称",
          scopedSlots: {customRender: "labName"},
        },
        {
          title: "申请人",
          dataIndex: "applicant",
        },
        {
          title: "任课老师",
          dataIndex: "teacherName",
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
          dataIndex: "exptypeUuid",
          customRender(val) {
            return expTypeEnum.getLabelByValue(val);
          },
        },
        {
          title: "要求",
          dataIndex: "expreqUuid",
          customRender(val) {
            return expReqEnum.getLabelByValue(val);
          },
        },
        {
          title: "班级",
          dataIndex: 'gradeclassInfo',
          customRender: (text) => {
            return this.common().assemblyClassName(text);
          }
        },
        {
          title: "器材",
          dataIndex: "expDevice",
        },
        {
          title: "操作",
          key: "action",
          width: "110px",
          fixed: "right",
          scopedSlots: {customRender: "action"},
        },
        {

          title: "结果",
          width: "100px",
          fixed: 'right',
          scopedSlots: {customRender: 'approvalStatus'},
        },
      ],
    };
  },
  created() {
    this.init();
  },
  computed: {},
  methods: methods,
};
</script>

<style lang="less" scoped>
@import "./educationSubscribeApproval.less";
</style>