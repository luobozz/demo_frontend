<template>
  <div class="content">
    <layout-card title="实验报告" title-icon="fa-th-list" :titleBtn="cardBtn">
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
              @click="reportSourceHandle(record)">实验报告</a-button>
           </span>
      </a-table>
    </layout-card>

    <laboratory-report-score-modal
        :bkData="modal.reportSource.data"
        :switchData="modal.reportSource.switch"
        @close="(e)=>{modal.reportSource.switch=e}">

    </laboratory-report-score-modal>


  </div>
</template>

<script>
import methods from "./laboratoryReport.js";
import moment from "moment";
import momentConfig from "../../../config/moment.config"
import classTimeEnum from "../../../enums/api/useBook/classTimeEnum"
import expReqEnum from "../../../enums/api/useBook/expReqEnum"
import expTypeEnum from "../../../enums/api/useBook/expTypeEnum"
import laboratoryReportScoreModal from "./laboratoryReportScoreModal/laboratoryReportScoreModal.vue";

const defaultSubscribeRecord = {
  recorder: "",
  description: ""
}
export default {
  name: "laboratoryReport",
  components: {
    "laboratory-report-score-modal": laboratoryReportScoreModal
  },
  data() {
    return {
      modal: {
        reportSource: {
          switch: false,
          data: {}
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
          width: "100px",
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
@import "./laboratoryReport.less";
</style>