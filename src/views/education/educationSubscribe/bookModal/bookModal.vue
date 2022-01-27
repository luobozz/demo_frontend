<template>
  <a-modal
      title="实验室预约单"
      centered
      v-model="modalSwitch"
      @ok="subBook()"
      @cancel="onclose()"
      :ok-button-props="{ props: { loading: loading } }"
  >
    <a-spin :spinning="loading">
      <a-form-model
          ref="useBookModal"
          :model="book"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }">
        <a-form-model-item label="预定时间" prop="useDay"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          {{ book.useDay }} {{ classTimeEnum.getLabelByValue(book.classtimeUuid).name }}
        </a-form-model-item>
        <a-form-model-item label="预定实验室" prop="labUuid"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          {{ book.labName }}
        </a-form-model-item>
        <a-form-model-item label="实验名称" prop="name"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-input v-model="book.name"/>
        </a-form-model-item>
        <a-form-model-item label="任课老师" prop="teacherUuid"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">

          <a-select
              :labelInValue="true"
              v-model="book.teacherInfo"
              @change="modalHandle().select(book.teacherInfo,book,'teacherUuid',true)"
              @dropdownVisibleChange="modalHandle().dropdownVisibleChange(teacherSelectList)">
            <a-spin v-if="select.teacher.loading" slot="notFoundContent" size="small"/>
            <a-select-option v-for="teacher in select.teacher.data" :value="teacher.uuid" :key="teacher.uuid">
              {{ teacher.name }}
            </a-select-option>
          </a-select>

        </a-form-model-item>
        <a-form-model-item label="实验班级" prop="gradeclassUuid"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-select
              :labelInValue="true"
              v-model="book.gradeclassInfo"
              @change="modalHandle().select(book.gradeclassInfo,book,'gradeclassUuid',true)"
              @dropdownVisibleChange="modalHandle().dropdownVisibleChange(gradeclassSelectList)">
            <a-spin v-if="select.gradeclass.loading" slot="notFoundContent" size="small"/>
            <a-select-option v-for="gradeclass in select.gradeclass.data" :value="gradeclass.uuid"
                             :key="gradeclass.uuid">
              {{ common().assemblyClassName(gradeclass) }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="开设组别" prop="groupsInfo"
                           :rules="[{ required: true, validator:common().validator.numberGTZero, trigger: 'blur' }]">
          <a-input v-model="book.groupsInfo"/>
        </a-form-model-item>
        <a-form-model-item label="实验类型" prop="exptypeUuid"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-select v-model="book.exptypeUuid">
            <a-select-option v-for="(type,i) in expTypeEnum" :value="i" :key="`expType_${i}`">
              {{ type.label }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="实验要求" prop="expreqUuid"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-select v-model="book.expreqUuid">
            <a-select-option v-for="(req,i) in expReqEnum" :value="i" :key="`expReq_${i}`">
              {{ req.label }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="实验器材" prop="expDevice"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-input v-model="book.expDevice"/>
        </a-form-model-item>
      </a-form-model>
    </a-spin>

  </a-modal>

</template>

<script>
import methods from "./bookModal.js";
import classTimeEnum from "../../../../enums/api/useBook/classTimeEnum"
import expReqEnum from "../../../../enums/api/useBook/expReqEnum"
import expTypeEnum from "../../../../enums/api/useBook/expTypeEnum"
import gradeEnum from "../../../../enums/api/classCollective/gradeEnum"
import lodash from "lodash";

const defaultBook = {
  teacherInfo: {},
  gradeclassInfo: {},
  useDay: "",
  labUuid: "",
  name: "",
  teacherUuid: "",
  gradeclassUuid:"",
  groupsInfo: "",
  exptypeUuid: "",
  expreqUuid: "",
  expDevice: "",
}

export default {
  name: "bookModal",
  props: {
    bookData: {
      type: Object,
      default: () => {
        return {}
      }
    }, switchData: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultBook,
      gradeEnum,
      classTimeEnum,
      expTypeEnum,
      expReqEnum,
      book: {},
      modalSwitch: false,
      loading: false,
      select: {
        teacher: {
          data: [],
          loading: false,
          current: 1,
          defaultPageSize: 10,
        },
        gradeclass: {
          data: [],
          loading: false,
          current: 1,
          defaultPageSize: 10,
        }
      }
    }
  },
  created() {
    this.init()
  },
  computed: {},
  methods: methods,
  watch: {
    switchData() {
      if (this.switchData) {
        this.book = lodash.cloneDeep(defaultBook);
        this.$util.data.object.Merger(this.book, this.bookData)
        if (this.book.teacherUuid) {
          this.book.teacherInfo = {
            key: this.book.teacherUuid,
            label: this.book.teacherName
          }
        }
        if (this.book.gradeclassInfo.uuid) {
          this.book.gradeclassInfo = {
            key: this.book.gradeclassInfo.uuid,
            label: this.common().assemblyClassName(this.book.gradeclassInfo)
          }
        }
      }
      this.modalSwitch = this.switchData
    }
  }
}
</script>

<style lang="less" scoped>
@import "./bookModal.less";
</style>