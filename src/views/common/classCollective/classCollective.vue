<template>
  <div class="content">
    <layout-card title="班级列表" title-icon="fa-th-list" :titleBtn="cardBtn">
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
              @click="crudSingleHandle().edit(modal.classCollective,record,onOpen(record))">编辑</a-button>
          <a-button
              type="primary"
              size="small"
              @click="classCollectiveMemberModalHandle(record)">
            查看成员
          </a-button>
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
        :title="modal.classCollective.title"
        centered
        v-model="modal.classCollective.switch"
        @ok="crudList.dataSub"
        :ok-button-props="{ props: { loading: modal.classCollective.loading } }"
    >
      <a-form-model
          :ref="modal.classCollective.form.ref"
          :model="crudList.data"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }">
        <a-form-model-item label="班级编号" prop="classNumber"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-input v-model="crudList.data.classNumber"/>
        </a-form-model-item>
        <a-form-model-item label="班级别名" prop="gradeName"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-input v-model="crudList.data.gradeName"/>
        </a-form-model-item>
        <a-form-model-item label="年级" prop="gradeUuid"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-select v-model="crudList.data.gradeUuid">
            <a-select-option v-for="(type,i) in gradeEnum" :value="i" :key="`gradeEnum_${i}`">
              {{ type.label }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="学年" prop="year"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-select v-model="crudList.data.year">
            <a-select-option
                :value="item"
                v-for="(item, i) in dateYearSection"
                :key="`admissionTime_${i}`"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="班主任" prop="headTeacherUuid"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-select
              :labelInValue="true"
              v-model="crudList.data.headTeacher"
              @change="modalHandle().select(crudList.data.headTeacher,crudList.data,'headTeacherUuid',true)"
              @dropdownVisibleChange="modalHandle().dropdownVisibleChange(teacherSelectList)">
            <a-spin v-if="modal.classCollective.select.teacher.loading" slot="notFoundContent" size="small"/>
            <a-select-option v-for="teacher in modal.classCollective.select.teacher.data" :value="teacher.uuid" :key="teacher.uuid">
              {{ teacher.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <class-collective-member-modal
        :ccData="modal.classCollectiveMember.data"
        :switchData="modal.classCollectiveMember.switch"
        @close="(e)=>{modal.classCollectiveMember.switch=e}">

    </class-collective-member-modal>

  </div>
</template>

<script>
import methods from "./classCollective.js";
import moment from "moment";
import momentConfig from "../../../config/moment.config"
import gradeEnum from "../../../enums/api/classCollective/gradeEnum";
import classCollectiveMemberModal from "./classCollectiveMemberModal/classCollectiveMemberModal.vue"

const defaultClassCollective = {
  classNumber:"",
  gradeUuid:"",
  headTeacherUuid: "",
  year: "",
  gradeName:""
}

export default {
  name: "classCollective",
  components: {
    'class-collective-member-modal': classCollectiveMemberModal,
  },
  data() {
    return {
      gradeEnum,
      modal: {
        classCollectiveMember: {
          switch: false,
          data: {},
        },
        classCollective: {
          name: "班级",
          title: "",
          switch: false,
          loading:false,
          admissionTimeMoment: "",
          form: {
            ref: "classCollectiveModalForm",
          }, select: {
            teacher: {
              selectTeacher:[],
              loading: false,
              current: 1,
              defaultPageSize: 10,
              data: []
            },
          }
        }
      },
      cardBtn: [

        {
          title: "新增班级",
          action: () => {
            this.crudSingleHandle().add(this.modal.classCollective, defaultClassCollective);
          },
          icon: "fa-plus"
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
          title: "编号",
          dataIndex: 'classNumber',
          width: "75px",
        },
        {
          title: '学年',
          dataIndex: 'year',
          customRender: (text) => {
            return moment(text).format(momentConfig.format.onlyYear);
          }
        },
        {
          title: "年级",
          dataIndex: 'gradeUuid',
          customRender: (record) => {
            return `${gradeEnum.getLabelByValue(record)}`
          }
        },
        {
          title: "班级",
          dataIndex: 'gradeName',
        },
        {
          title: "班主任",
          dataIndex: 'headTeacherInfo',
          customRender: (text) => {
            return text?.name||""
          }
        },
        {
          title: '操作',
          key: 'action',
          width: "210px",
          scopedSlots: {customRender: 'action'},
          fixed: 'right'
        }
      ]
    }
  },
  created() {
    this.init()
  },
  computed: {
    modalClassCollectiveAdmissionTimeMoment() {
      return this.modal.classCollective.admissionTimeMoment;
    },
  },
  methods: methods,
  watch: {
    modalClassCollectiveAdmissionTimeMoment(n, o) {
      this.crudList.data.admissionTime = moment(this.modal.classCollective.admissionTimeMoment.format(momentConfig.format.eraseHMS)).valueOf()
    },
  }
}
</script>

<style lang="less" scoped>
@import "./classCollective.less";
</style>
