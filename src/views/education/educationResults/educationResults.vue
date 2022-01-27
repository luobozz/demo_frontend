<template>
  <div class="content">
    <layout-card title="查询条件" title-icon="fa-th-list" :titleBtn="cardBtn">
      <a-form-model
          v-model="crudList.conditions"
          layout="inline">
        <layout-form-row>
          <a-col :md="8" :sm="24">
            <a-form-model-item
                label="选择学年"
                prop="year"
            >
              <a-select v-model="crudList.conditions.year"
                        @change="resetClassCollectiveSelect">>
                <a-select-option
                    :value="item"
                    v-for="(item, i) in dateYearSection"
                    :key="`year_${i}`"
                >
                  {{ item }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item
                label="实验室"
                prop="name"
            >
              <a-select
                  :labelInValue="true"
                  v-model="crudList.conditions.laboratorySelectInfo"
                  @change="modalHandle().select(crudList.conditions.laboratorySelectInfo,crudList.conditions,'laboratoryUuid',true)"
                  @dropdownVisibleChange="modalHandle().dropdownVisibleChange(labSelectList)">
                <a-spin v-if="conditionSelect.laboratory.loading" slot="notFoundContent" size="small"/>
                <a-select-option v-for="lab in conditionSelect.laboratory.data" :value="lab.uuid"
                                 :key="`lab_con_select_${lab.uuid}`">
                  {{ lab.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item
                label="实验时间"
                prop="name"
            >
              <a-range-picker v-model="crudList.conditions.pickTime">
                <a-icon slot="suffixIcon" type="calendar"/>
              </a-range-picker>
            </a-form-model-item>
          </a-col>
        </layout-form-row>

        <layout-form-row>
          <a-col :md="8" :sm="24">
            <a-form-model-item
                label="实验年级"
                prop="gradeUuid"
            >
              <a-select v-model="crudList.conditions.gradeUuid"
                        @change="resetClassCollectiveSelect">
                <a-select-option v-for="(type,i) in gradeEnum" :value="i" :key="`gradeEnum_${i}`">
                  {{ type.label }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item
                label="实验班级"
                prop="classCollectiveUuid"
            >
              <a-select
                  :disabled="lodash.isEmpty(crudList.conditions.gradeUuid)||lodash.isEmpty(crudList.conditions.year)"
                  :labelInValue="true"
                  v-model="crudList.conditions.classCollectiveSelectInfo"
                  @change="modalHandle().select(crudList.conditions.classCollectiveSelectInfo,crudList.conditions,'classCollectiveUuid',true)"
                  @dropdownVisibleChange="modalHandle().dropdownVisibleChange(classCollectiveSelectList)">
                <a-spin v-if="conditionSelect.classCollective.loading" slot="notFoundContent" size="small"/>
                <a-select-option v-for="classCollective in conditionSelect.classCollective.data" :value="classCollective.uuid"
                                 :key="`classCollective_con_select_${classCollective.uuid}`">
                  {{ classCollective.gradeName }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item
                label="实验教师"
                prop="name"
            >
              <a-select
                  :labelInValue="true"
                  v-model="crudList.conditions.teacherSelectInfo"
                  @change="modalHandle().select(crudList.conditions.teacherSelectInfo,crudList.conditions,'teacherUuid',true)"
                  @dropdownVisibleChange="modalHandle().dropdownVisibleChange(teacherSelectList)">
                <a-spin v-if="conditionSelect.teacher.loading" slot="notFoundContent" size="small"/>
                <a-select-option v-for="teacher in conditionSelect.teacher.data" :value="teacher.uuid"
                                 :key="`teacher_con_select_${teacher.uuid}`">
                  {{ teacher.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </layout-form-row>

        <layout-form-row last>
          <a-col :md="8" :sm="24">
            <a-form-model-item
                label="实验科目"
                prop="name"
            >
              <a-select
                  :labelInValue="true"
                  v-model="crudList.conditions.subjectSelectInfo"
                  @change="modalHandle().select(crudList.conditions.subjectSelectInfo,crudList.conditions,'subjectUuid',true)"
                  @dropdownVisibleChange="modalHandle().dropdownVisibleChange(subjectSelectList)">
                <a-spin v-if="conditionSelect.subject.loading" slot="notFoundContent" size="small"/>
                <a-select-option v-for="subject in conditionSelect.subject.data" :value="subject.uuid"
                                 :key="`subject_con_select_${subject.uuid}`">
                  {{ subject.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item
                label="学生学号"
                prop="name"
            >
              <a-input v-model="crudList.conditions.studentNo"/>
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item
                label="学生姓名"
                prop="name"
            >
              <a-input v-model="crudList.conditions.studentName"/>
            </a-form-model-item>
          </a-col>
        </layout-form-row>
      </a-form-model>

    </layout-card>
    <layout-card title="实验成绩列表" title-icon="fa-th-list">
      <a-table
          bordered
          :columns="columns"
          :dataSource="crudList.dataList"
          :loading="crudList.loading"
          :rowKey="(record) => record.uuid"
          :pagination="crudList.pagination"
          :scroll="{ x: crudList.scrollWidth }"
      >
        <span slot="action" slot-scope="record" class="btn-group">
        </span>
      </a-table>
    </layout-card>
  </div>
</template>

<script>
import methods from "./educationResults.js";
import expTypeEnum from "../../../enums/api/useBook/expTypeEnum";
import expReqEnum from "../../../enums/api/useBook/expReqEnum";
import gradeEnum from "../../../enums/api/classCollective/gradeEnum";
import videoModal from "../../../components/section/video/videoModal";
import layoutFormRow from "@/components/section/layoutFormRow/layoutFormRow";
import moment from "moment";
import momentConfig from "@/config/moment.config";
import classTimeEnum from "@/enums/api/useBook/classTimeEnum";
import lodash from "lodash";

export default {
  name: "educationResults",
  components: {
    "video-modal": videoModal,
    "layout-form-row": layoutFormRow
  },
  data() {
    return {
      lodash,
      expTypeEnum,
      expReqEnum,
      gradeEnum,
      cardBtn: [
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
        },
        {
          title: "查询",
          action: () => {
            this.crudConditionsHandle().resetPage();
          },
          icon: "fa-search"
        },
      ],
      modal: {
        videoModal: {
          title: "",
          switch: false,
          videoRes: "",
          duration: 0,
        },
      },
      columns: [
        {
          title: "序号",
          dataIndex: 'id',
          width: "75px",
        },
        {
          title: "学号",
          dataIndex: "studentNo",
        },
        {
          title: "姓名",
          dataIndex: "studentName",
        },
        {
          title: "分数",
          dataIndex: "score",
        },
        {
          title: "实验室",
          dataIndex: "laboratoryName",
        },
        {
          title: "授课老师",
          dataIndex: "teacherName",
        },
        {
          title: "实验名称",
          dataIndex: "subjectName",
        },
        {
          title: "实验时间",
          width: "200px",
          customRender: (record) => {
            const time = moment(record.useDay)
            return `${time.format(momentConfig.format.onlyDate)} | ${time.format(momentConfig.format.week)} | ${classTimeEnum.getLabelByValue(record.classtimeUuid).name}`
          },
        },
        {
          title: "类型",
          dataIndex: "type",
          width: "80px",
          customRender(val) {
            return expTypeEnum.getLabelByValue(val);
          },
        },
        {
          title: "要求",
          dataIndex: "requirement",
          width: "80px",
          customRender(val) {
            return expReqEnum.getLabelByValue(val);
          },
        },
        {
          title: "分组",
          dataIndex: "groupName",
          width: "80px",
          customRender(val) {
            return val + "组";
          },
        },
        {
          title: "评语",
          dataIndex: "description",
        },
        {
          title: "器材",
          dataIndex: "device",
        },
        {
          title: "操作",
          key: "action",
          width: "120px",
          align: "center",
          fixed: "right",
          scopedSlots: {customRender: "action"},
        },
      ],
      conditionSelect: {
        classCollective: {
          loading: false,
          current: 1,
          defaultPageSize: 10,
          data: []
        },
        teacher: {
          loading: false,
          current: 1,
          defaultPageSize: 10,
          data: []
        },
        laboratory: {
          loading: false,
          current: 1,
          defaultPageSize: 10,
          data: []
        },
        subject: {
          loading: false,
          current: 1,
          defaultPageSize: 10,
          data: []
        },
      }
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
@import "./educationResults.less";
</style>