<template>
  <a-modal
      title="实验报告"
      centered
      v-model="modalSwitch"
      width="90%"
      @cancel="onclose()"
      footer=""
  >
    <div class="content scroll"
         id="laboratoryReportSourceModalContent">
      <layout-card :title="`学生成绩列表`"
                   title-icon="fa-th-list" :titleBtn="cardBtn">
        <a-table
            bordered
            :columns="columns"
            :dataSource="getDataList"
            :loading="crudList.loading"
            :rowKey="record =>record.uuid"
            :pagination="crudList.pagination">
          <span slot="score" slot-scope="record">
            <a-form-model :ref="`scoreForm_${record.uuid}_score`" v-if="record.type==='newAdd'||record.type==='edit'"
                          :model="record">
                <a-form-model-item prop="score"
                                   :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
                  <a-input v-model="record.score"/>
                </a-form-model-item>
            </a-form-model>
            <p v-else>{{ record.score }}</p>
          </span>
          <span slot="groupsInfo" slot-scope="record">
            <a-form-model :ref="`scoreForm_${record.uuid}_groupsInfo`"
                          v-if="record.type==='newAdd'||record.type==='edit'" :model="record">
                <a-form-model-item prop="groupsInfo"
                                   :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
                  <a-input v-model="record.groupsInfo"/>
                </a-form-model-item>
            </a-form-model>
            <p v-else>{{ record.groupsInfo }}</p>
          </span>
          <span slot="description" slot-scope="record">
            <a-form-model v-if="record.type==='newAdd'||record.type==='edit'" :model="record">
                <a-form-model-item prop="description">
                  <a-input v-model="record.description"/>
                </a-form-model-item>
            </a-form-model>
            <p v-else>{{ record.description }}</p>
          </span>
          <span slot="action" slot-scope="record" class="btn-group">
          <a-button
              v-if="record.type=='edit'"
              type="primary"
              size="small"
              :loading="record.loading"
              @click="editSubHandle(record)">确定</a-button>
          <a-button
              v-if="record.type=='newAdd'"
              type="primary"
              size="small"
              :loading="record.loading"
              @click="addHandle(record)">确定</a-button>
          <a-button
              v-if="record.type!='normal'"
              type="danger"
              size="small"
              @click="cancelHandle(record)">
             <lb-icon type="fa-ban"></lb-icon>
          </a-button>
          <a-button
              v-if="record.type=='normal'"
              type="primary"
              size="small"
              @click="editOpenHandle(record)">编辑</a-button>
           </span>
        </a-table>
      </layout-card>
    </div>


    <a-modal
        :title="modal.addStudent.title"
        centered
        v-model="modal.addStudent.switch"
        :getContainer="common().getModalContainer('laboratoryReportSourceModalContent')"
        :bodyStyle="{
          padding:0
        }"
        width="70%"
        footer="">
      <a-spin :spinning="modal.addStudent.loading">
        <div class="add-student">
          <div class="head">
            <a-form-model
            v-model="modal.addStudent.conditions"
            layout="inline">
              <layout-form-row last>
                <a-col :md="12" :sm="24">
                  <a-form-model-item label="选择学年">
                    <a-select class="width-lg"
                              v-model="modal.addStudent.conditions.classYear"
                              @change="getData">
                      <a-select-option
                          :value="item"
                          v-for="(item, i) in dateYearSection"
                          :key="`admissionTime_${i}`"
                      >
                        {{ item }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :md="12" :sm="24">

                </a-col>
              </layout-form-row>
            </a-form-model>

          </div>

          <div class="body flex al-ct jc-ct">
            <div class="class-list scroll">
              <a-empty
                  :image="Empty.PRESENTED_IMAGE_SIMPLE"
                  class="mg-t-lg"
                  v-if="this.modal.addStudent.classData.length==0"
                  description="没有班级"/>
              <div :class="{'class-item':true,'active':classCollective.uuid===modal.addStudent.currentClass.uuid}"
                   v-for="classCollective in this.modal.addStudent.classData"
                   :key="`addStudentClass_${classCollective.uuid}`"
                   @click="changeClass(classCollective)">
                {{ common().assemblyClassName(classCollective) }}
              </div>
            </div>
            <div class="student-list">
              <a-empty
                  :image="Empty.PRESENTED_IMAGE_SIMPLE"
                  class="mg-t-lg"
                  v-if="this.modal.addStudent.studentData.length==0"
                  description="没有学生"/>
              <a-checkbox
                  :checked="checkStudentChecked(student.uuid)"
                  @change="checkStudentHandle(student)"
                  v-for="student in this.modal.addStudent.studentData"
                  :key="`addStudent_${student.uuid}`">
                {{ student.name }}
              </a-checkbox>
            </div>
          </div>

        </div>
      </a-spin>
    </a-modal>

  </a-modal>

</template>

<script>
import methods from "./laboratoryReportScoreModal.js";
import gradeEnum from "../../../../enums/api/classCollective/gradeEnum";
import classCollectiveMemberTypeEnum from "../../../../enums/api/classCollective/classCollectiveMemberTypeEnum";
import listContainer from "@/components/section/listContainer/listContainer";
import layoutFormRow from "@/components/section/layoutFormRow/layoutFormRow"
import lodash from "lodash";
import {Empty} from 'ant-design-vue';

export default {
  name: "laboratoryReportScoreModal",
  components: {
    "layout-form-row": layoutFormRow
  },
  props: {
    bkData: {
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
      Empty,
      gradeEnum,
      classCollectiveMemberTypeEnum,
      modal: {
        addStudent: {
          title: "添加学生",
          switch: false,
          loading: false,
          studentData: [],
          classData: [],
          currentClass: "",
          type: 0,
          addStudentUuid: [],
          addStudentScoreInfo: [],
          conditions: {
            classYear: ""
          },
          current: 1,
          defaultPageSize: 10,
          form: {
            ref: "classCollectiveMemberModalForm",
          }
        }
      },
      cardBtn: [
        {
          title: "添加学生",
          action: () => {
            this.modal.addStudent.switch = true;
            this.modal.addStudent.type = 1;
            // this.modal.addStudent.addStudentUuid = [];
            this.getData();
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
          title: "学生",
          width: "10%",
          dataIndex: 'studentInfo',
          customRender: (text) => {
            return text?.name || ""
          }
        },
        {
          title: "班级",
          width: "15%",
          dataIndex: 'classCollectiveInfo',
          customRender: (text) => {
            return this.common().assemblyClassName(text)
          }
        },
        {
          title: "分组",
          width: "20%",
          scopedSlots: {customRender: 'groupsInfo'},
        },
        {
          title: "分数",
          width: "20%",
          scopedSlots: {customRender: 'score'},
        },
        {
          title: "备注",
          width: "20%",
          scopedSlots: {customRender: 'description'},
        },
        {
          title: '操作',
          key: 'action',
          width: "15%",
          scopedSlots: {customRender: 'action'},
        }
      ],
      useBook: {},
      modalSwitch: false,
    }
  },
  created() {
    this.init()
  },
  computed: {
    checkStudent() {
      return (uuid) => {
        return lodash.includes(this.modal.addStudent.addStudentUuid, uuid)
      }
    }, getDataList() {
      this.crudList.dataList.forEach(p => {
        if (!p.type) {
          p.type = "normal"
          p.loading=false
        }
      })
      return this.crudList.dataList.concat(this.modal.addStudent.addStudentScoreInfo)
    }, checkStudentChecked() {
      return (uuid) => {
        return lodash.includes(this.modal.addStudent.addStudentUuid, uuid)
      }

    }
  },
  methods: methods,
  watch: {
    switchData() {
      if (this.switchData) {
        this.useBook = {
          ...this.bkData
        }
        this.modal.addStudent.addStudentUuid=[]
        this.modal.addStudent.addStudentScoreInfo=[]
        this.crudBatchHandle().list();
      }
      this.modalSwitch = this.switchData
    }
  }
}
</script>

<style lang="less" scoped>
@import "./laboratoryReportScoreModal.less";
</style>