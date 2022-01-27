<template>
  <div class="content">
    <layout-card title="预约记录列表" title-icon="fa-th-list" :titleBtn="cardBtn">
      <a-table
          bordered
          :columns="columns"
          :dataSource="crudList.dataList"
          :loading="crudList.loading"
          :rowKey="record =>record.uuid"
          :pagination="crudList.pagination"
          :scroll="{ x: crudList.scrollWidth }">
        <span slot="approvalStatus" slot-scope="record">
             <a-tag
                 :color=" approvalStatusEnum.getLabelByValue(record).color ">{{ approvalStatusEnum.getLabelByValue(record).name }}</a-tag>

        </span>
        <span slot="action" slot-scope="record" class="btn-group">
          <a-button
              v-if="record.approvalStatus==2||record.approvalStatus==1"
              type="primary"
              size="small"
              @click="editBookHandle(record)">重填</a-button>
           </span>
      </a-table>
    </layout-card>


    <book-modal
        :bookData="book.data"
        :switchData="book.switch"
        @close="(e)=>{book.switch=e;crudBatchHandle().list()}">

    </book-modal>

  </div>
</template>

<script>
import methods from "./subscribeRecord.js";
import moment from "moment";
import momentConfig from "../../../../config/moment.config"
import classTimeEnum from "../../../../enums/api/useBook/classTimeEnum"
import expReqEnum from "../../../../enums/api/useBook/expReqEnum"
import expTypeEnum from "../../../../enums/api/useBook/expTypeEnum"
import approvalStatusEnum from "../../../../enums/api/useBook/approvalStatusEnum"
import gradeEnum from "../../../../enums/api/classCollective/gradeEnum";
import bookModal from "@/views/education/educationSubscribe/bookModal/bookModal.vue";

const defaultSubscribeRecord = {}
export default {
  name: "subscribeRecord",
  components: {
    'book-modal': bookModal,
  },
  data() {
    return {
      approvalStatusEnum,
      book: {
        data: {},
        switch: false
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
          title: "申请实验室",
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
          dataIndex:'name'
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

          title: "结果",
          width: "100px",
          fixed: 'right',
          dataIndex: 'approvalStatus',
          scopedSlots: {customRender: 'approvalStatus'},
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
@import "./subscribeRecord.less";
</style>