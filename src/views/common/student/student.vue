<template>
  <div class="content">
    <layout-card title="学生列表" title-icon="fa-th-list" :titleBtn="cardBtn">
      <a-table
          bordered
          :columns="columns"
          :dataSource="crudList.dataList"
          :loading="crudList.loading"
          :rowKey="record =>record.uuid"
          :pagination="crudList.pagination"
          :scroll="{ x: crudList.scrollWidth }">
        <span slot="image" slot-scope="record">
              <auth-image :errorIcon="record.sex==='02'?'svg-iconchildren-2':'svg-iconchildren-1'" class="img-size-base" :src="record.image"/>
        </span>
        <span slot="action" slot-scope="record" class="btn-group">
          <a-button
              type="primary"
              size="small"
              @click="crudSingleHandle().edit(modal.student,record,onOpen(record))">编辑</a-button>
           <a-button
               type="danger"
               size="small"
               @click="crudSingleHandle().delete(record.uuid,'确定删除学生'+record.name+'吗,删除后不可恢复')">
            <lb-icon type="fa-trash-o"></lb-icon>
          </a-button>
           </span>
      </a-table>
    </layout-card>
    <a-modal
        :title="modal.student.title"
        centered
        v-model="modal.student.switch"
        @ok="crudList.dataSub"
        :ok-button-props="{ props: { loading: modal.student.loading } }"
    >
      <a-form-model
          :ref="modal.student.form.ref"
          :model="crudList.data"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }">
        <a-form-model-item label="学号" prop="studentNo"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-input v-model="crudList.data.studentNo"/>
        </a-form-model-item>
        <a-form-model-item label="姓名" prop="name"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-input v-model="crudList.data.name"/>
        </a-form-model-item>
        <a-form-model-item label="照片" prop="image">
          <a-upload
              name="file"
              list-type="picture-card"
              class="image-uploader"
              :show-upload-list="false"
              :action="$httpApi.ews.resources.postImage"
              :headers="$util.api.getSystemHeader()"
              :before-upload="curdUploadHandle().image().before"
              @change="curdUploadHandle().image().change($event,modal.student,'image')"
          >
            <auth-image class="img-size-lg" v-if="crudList.data.image" :src="crudList.data.image" alt="image"/>
            <div v-else>
              <a-icon :type="modal.student.uploading ? 'loading' : 'plus'"/>
              <div class="ant-upload-text">
                上传
              </div>
            </div>
          </a-upload>
        </a-form-model-item>
        <a-form-model-item label="性别" prop="sex"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-select v-model="crudList.data.sex">
            <a-select-option
                :value="item.value"
                v-for="(item, i) in sexEnums"
                :key="i"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="出生日期" prop="birthday">
          <a-date-picker placeholder="选择时间" v-model="crudList.data.birthday"/>
        </a-form-model-item>
        <a-form-model-item label="入学年份" prop="admissionTime"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-select v-model="crudList.data.admissionTime">
            <a-select-option
                :value="item"
                v-for="(item, i) in dateYearSection"
                :key="`admissionTime_${i}`"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="籍贯" prop="nativePlace">
          <a-input v-model="crudList.data.nativePlace"/>
        </a-form-model-item>
        <a-form-model-item label="电话" prop="tel">
          <a-input v-model="crudList.data.tel"/>
        </a-form-model-item>
        <a-form-model-item label="身份证号" prop="idNumber">
          <a-input v-model="crudList.data.idNumber"/>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

  </div>
</template>

<script>
import methods from "./student.js";
import sexEnums from "../../../enums/common/sex"
import momentConfig from "@/config/moment.config";
import moment from "moment";

const defaultStudent = {
  name: "",
  sex: "",
  birthday: "",
  image: "",
  admissionTime: "",
  nativePlace: "",
  tel: "",
  idNumber: ""
}
export default {
  name: "student",
  data() {
    return {
      sexEnums,
      modal: {
        student: {
          name: "学生",
          title: "",
          switch: false,
          uploading: false,
          loading:false,
          form: {
            ref: "studentModalForm",
          }
        }
      },
      cardBtn: [

        {
          title: "新增学生",
          action: () => {
            this.crudSingleHandle().add(this.modal.student, defaultStudent);
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
          title: "学号",
          dataIndex: "studentNo",
          width: "75px",
        },
        {
          title: "照片",
          scopedSlots: {customRender: 'image'},
          width: "80px",
        },
        {
          title: "姓名",
          dataIndex: 'name',
        },
        {
          title: "性别",
          dataIndex: 'sex',
          customRender(val) {
            return sexEnums.getLabelByValue(val);
          }
        },
        {
          title: "入学年份",
          dataIndex: 'admissionTime',
          customRender: (text) => {
            return moment(text).format(momentConfig.format.onlyYear);
          }
        },
        {
          title: "年龄",
          dataIndex: 'birthday',
          customRender: (text) => {
            return `${text ?`${moment().diff(moment(text),'years')}岁`:""}`
          }
        },
        {
          title: "籍贯",
          dataIndex: 'nativePlace',
        },
        {
          title: "联系电话",
          dataIndex: 'tel',
        },
        {
          title: "身份证号",
          dataIndex: 'idNumber',
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
          width: "120px",
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
  },
  methods: methods,
}
</script>

<style lang="less" scoped>
@import "./student.less";
</style>
