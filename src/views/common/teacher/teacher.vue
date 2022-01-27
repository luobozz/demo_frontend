<template>
  <div class="content">
    <layout-card title="教师列表" title-icon="fa-th-list" :titleBtn="cardBtn">
      <a-table
          bordered
          :columns="columns"
          :dataSource="crudList.dataList"
          :loading="crudList.loading"
          :rowKey="record =>record.uuid"
          :pagination="crudList.pagination"
          :scroll="{ x: crudList.scrollWidth }">
        <span slot="image" slot-scope="record">
              <auth-image :errorIcon="record.sex==='02'?'svg-iconwoman':'svg-iconman'" class="img-size-base"
                          :src="record.image"/>
        </span>
        <span slot="bindAccount" slot-scope="record">
          <a-tag v-if="record.bindAccount" color="cyan">已绑定账号 {{ record.bindAccount.account }}</a-tag>
          <a-tag v-else color="orange">尚未绑定账号</a-tag>
        </span>
        <span slot="action" slot-scope="record" class="btn-group">
          <a-button
              type="primary"
              size="small"
              @click="crudSingleHandle().edit(modal.teacher,record,onOpen(record))">编辑</a-button>
          <a-button
              v-if="record.bindAccount==null"
              type="primary"
              size="small"
              @click="assignAccountHandle(record)">分配账号</a-button>
           <a-button
               type="danger"
               size="small"
               @click="crudSingleHandle().delete(record.uuid,'确定删除教师'+record.name+'吗,删除后不可恢复')">
            <lb-icon type="fa-trash-o"></lb-icon>
          </a-button>
           </span>
      </a-table>
    </layout-card>
    <a-modal
        :title="modal.teacher.title"
        centered
        v-model="modal.teacher.switch"
        @ok="crudList.dataSub"
        :ok-button-props="{ props: { loading: modal.teacher.loading } }"
    >
      <a-form-model
          :ref="modal.teacher.form.ref"
          :model="crudList.data"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }">
        <a-form-model-item label="编号" prop="teacherNo"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-input v-model="crudList.data.teacherNo"/>
        </a-form-model-item>
        <a-form-model-item label="姓名" prop="name"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-input v-model="crudList.data.name"/>
        </a-form-model-item>
        <a-form-model-item label="照片" prop="image">
          <a-upload
              name="file"
              list-type="picture-card"
              :show-upload-list="false"
              :action="$httpApi.ews.resources.postImage"
              :headers="$util.api.getSystemHeader()"
              :before-upload="curdUploadHandle().image().before"
              @change="curdUploadHandle().image().change($event,modal.teacher,'image')"
          >
            <auth-image class="img-size-lg" v-if="crudList.data.image" :src="crudList.data.image" alt="image"/>
            <div v-else>
              <a-icon :type="modal.teacher.uploading ? 'loading' : 'plus'"/>
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

    <teacher-account-modal
        :taData="modal.account.data"
        :switchData="modal.account.switch"
        @close="(e)=>{modal.account.switch=e}">

    </teacher-account-modal>

  </div>
</template>

<script>
import methods from "./teacher.js";
import sexEnums from "../../../enums/common/sex"
import momentConfig from "@/config/moment.config";
import moment from "moment";
import teacherAccountModal from "./teacherAccountModal/teacherAccountModal.vue"

const defaultTeacher = {
  name: "",
  sex: "",
  birthday: "",
  image: "",
  nativePlace: "",
  tel: "",
  idNumber: ""
}
export default {
  name: "teacher",
  components: {
    'teacher-account-modal': teacherAccountModal,
  },
  data() {
    return {
      sexEnums,
      modal: {
        teacher: {
          name: "教师",
          title: "",
          switch: false,
          uploading: false,
          loading: false,
          form: {
            ref: "teacherModalForm",
          }
        }, account: {
          title: "分配账号",
          switch: false,
          loading: false,
          data: {},
          pagination: {
            current: 1,
            defaultPageSize: 10,
          },
        }
      },
      cardBtn: [
        {
          title: "新增教师",
          action: () => {
            this.crudSingleHandle().add(this.modal.teacher, defaultTeacher);
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
          dataIndex: "teacherNo",
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
          title: "年龄",
          dataIndex: 'birthday',
          customRender: (text) => {
            return `${text ? `${moment().diff(moment(text), 'years')}岁` : ""}`
          }
        },
        {
          title: "籍贯",
          dataIndex: 'nativePlace',
        },
        {
          title: "电话",
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
          title: '绑定账号',
          key: 'bindAccount',
          width: "170px",
          scopedSlots: {customRender: 'bindAccount'},
          fixed: 'right'
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
  computed: {},
  methods: methods
}
</script>

<style lang="less" scoped>
@import "./teacher.less";
</style>
