<template>
  <div class="content">
    <layout-card
        title="实验课件列表"
        title-icon="fa-th-list"
        :titleBtn="cardBtn"
    >
      <a-table
          bordered
          :columns="columns"
          :dataSource="crudList.dataList"
          :loading="crudList.loading"
          :rowKey="(record) => record.uuid"
          :pagination="crudList.pagination"
          :scroll="{ x: crudList.scrollWidth }"
      >
        <span slot="description" slot-scope="record">
          <div v-html="record.description"></div>
        </span>
        <span slot="attachment" slot-scope="record" class="btn-group">
          <a-button size="small" :loading="download.loading" @click="curdDownHandle(record.attachment,download,`${record.title}.${getAttachmentSuffix(record.attachment)}`)" type="dashed" v-if="record.attachment"> <lb-icon v-show="!download.loading" type="fa-cloud-download" class="mg-r-min"/> <span :class="{'mg-l-min':download.loading}">下载  {{`${getAttachmentName(record.attachment)}`}}</span> <lb-icon class="mg-l-min" :type="fileIconEnum.getLabelByValue(getAttachmentSuffix(record.attachment))"></lb-icon></a-button>
        </span>
        <span slot="action" slot-scope="record" class="btn-group">
          <a-button
              type="primary"
              size="small"
              @click="crudSingleHandle().edit(modal.courseEdit, record,editOpen(record))"
          >编辑</a-button
          >
          <a-button type="danger" size="small">
            <lb-icon
                type="fa-trash-o"
                @click="crudSingleHandle().delete(record.uuid)"
            ></lb-icon>
          </a-button>
        </span>
      </a-table>
    </layout-card>
    <a-modal
        :title="modal.courseEdit.title"
        centered
        width="90%"
        v-model="modal.courseEdit.switch"
        @ok="crudList.dataSub"
        :ok-button-props="{ props: { loading: modal.courseEdit.loading } }"
    >

      <div class="course-edit scroll">
        <a-form-model
            :ref="modal.courseEdit.form.ref"
            :model="crudList.data"
            layout="inline"
        >
          <div class="selecter">
            <layout-form-row>
              <a-col :md="12" :sm="24">
                <a-form-model-item
                    label="实验科目"
                    prop="title"
                    :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]"
                >
                  <a-input v-model="crudList.data.title"/>
                </a-form-model-item>
              </a-col>
              <a-col :md="12" :sm="24">
                <a-form-model-item
                    label="教师"
                    prop="teacher"
                    :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]"
                >
                  <a-select
                      :labelInValue="true"
                      v-model="crudList.data.teacherSelectInfo"
                      @change="modalHandle().select(crudList.data.teacherSelectInfo,crudList.data,'teacher',true)"
                      @dropdownVisibleChange="modalHandle().dropdownVisibleChange(teacherSelectList)">
                    <a-spin v-if="select.teacher.loading" slot="notFoundContent" size="small"/>
                    <a-select-option v-for="teacher in select.teacher.data" :value="teacher.uuid" :key="teacher.uuid">
                      {{ teacher.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
            </layout-form-row>
            <layout-form-row last>
              <a-col :span="24">
                <a-form-model-item label="附件" class="beyond">
                  <a-upload
                      :showUploadList="false"
                      :disabled="modal.courseEdit.uploading"
                      name="file"
                      :headers="$util.api.getSystemHeader()"
                      :action="$httpApi.ews.resources.postAttachment"
                      :before-upload="curdUploadHandle().file().before"
                      @change="curdUploadHandle().file().change($event,modal.courseEdit,'attachment')"
                  >
                    <a-button type="dashed" :loading="modal.courseEdit.uploading"> <lb-icon type="fa-cloud-upload" class="mg-r-min"/> 添加附件  {{`${crudList.data.attachment}`}}</a-button>
                  </a-upload>
                </a-form-model-item>
              </a-col>
            </layout-form-row>
          </div>
          <a-spin :spinning="crudList.data.quillLoading">
            <div class="editer">
              <quill-editor
                  v-if="!crudList.data.quillLoading"
                  v-model="crudList.data.description"
                  ref="myQuillEditor"
                  :options="editorOption"
              >
              </quill-editor>
            </div>
          </a-spin>

        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>

<script>
import methods from "./courseware.js";
import editorOption from "../../../config/quillEditor.config";
import teacher from '../../../api/edu.web.service/teacher/index.js';
import layoutFormRow from "@/components/section/layoutFormRow/layoutFormRow";
import fileIconEnum from "@/enums/common/fileIconEnum";

const defaultCourse = {
  uuid: "",
  title: "",
  description: "",
  teacher: "",
  teacherSelectInfo: {},
  icon: "",
  attachment: "",
};
export default {
  name: "courseware",
  components: {
    "layout-form-row": layoutFormRow
  },
  data() {
    return {
      fileIconEnum,
      editorOption,
      download:{
        loading:false
      },
      select: {
        teacher: {
          data: [],
          loading: false,
          current: 1,
          defaultPageSize: 10,
        },
      },
      modal: {
        courseEdit: {
          name: "实验课件",
          title: "",
          content: "",
          switch: false,
          uploading: false,
          loading: false,
          fileList:[],
          form: {
            ref: "coursewareEditModalForm",
          },
        },
      },
      cardBtn: [
        {
          title: "新增实验课件",
          action: () => {
            this.crudSingleHandle().add(this.modal.courseEdit, defaultCourse,this.editOpen(defaultCourse));
          },
          icon: "fa-plus",
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
          title: "实验课件名称",
          dataIndex:"title",
        },
        {
          title: "描述",
          key: "description",
          scopedSlots: {customRender: "description"},
        },
        {
          title: "提供教师",
          dataIndex: "teacherInfo",
          customRender: (text) =>{
            return text?.name||""
          }
        },
        {
          title: "附件",
          key: "attachment",
          width: '230px',
          fixed: "right",
          scopedSlots: {customRender: "attachment"},
        },
        {
          title: "操作",
          key: "action",
          width: '120px',
          align: 'center',
          fixed: "right",
          scopedSlots: {customRender: "action"},
        },
      ],
    };
  },
  created() {
    this.init();
  },
  computed: {},
  // TODO 文件上传
  // TODO 文件下载
  methods: methods,
};
</script>

<style lang="less" scoped>
@import "./courseware.less";
</style>