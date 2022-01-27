<template>
  <div class="content">
    <layout-card
      title="实验科目列表"
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
        <span slot="action" slot-scope="record" class="btn-group">
          <a-button
            type="primary"
            size="small"
            @click="crudSingleHandle().details(modal.subjectView,record.uuid)"
            >查看</a-button
          >
          <a-button
            type="primary"
            size="small"
            @click="crudSingleHandle().edit(modal.subjectEdit, record,onEditOpen(record))"
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
      :title="modal.subjectView.title"
      centered
      width="90%"
      v-model="modal.subjectView.switch"
      footer=""
    >
      <div class="subject-view">
        <a-skeleton :loading="modal.subjectView.loading" active>
          <div class="head flex column jc-sb">
            <div class="title">
              {{ crudList.data.name }}
            </div>
            <div class="details flex al-ct mg-b-min text-color-sub">
              <div class="flex al-ct">
                <lb-avatar class="mg-r-min" type="img"
                           :src="crudList.data.createByImage"
                           size="small"/>
                <div class="account-name"> {{ crudList.data.createByAccount }}</div>
              </div>
              <div>发布于 {{ crudList.data.createdTime | dateFormatNoHMS }}</div>
            </div>
          </div>
          <div class="body scroll">
            <span class="ql-editor" v-html="crudList.data.content"></span>
          </div>
        </a-skeleton>
      </div>

    </a-modal>
    <a-modal
      :title="modal.subjectEdit.title"
      centered
      width="90%"
      v-model="modal.subjectEdit.switch"
      @ok="crudList.dataSub"
      :ok-button-props="{ props: { loading: modal.subjectEdit.loading } }"
    >

      <div class="subject-edit scroll">
        <a-form-model
            :ref="modal.subjectEdit.form.ref"
            :model="crudList.data"
            layout="inline"
        >
          <layout-form-row class="selecter" last>
            <a-col :md="12" :sm="24">
              <a-form-model-item label="标题" prop="name"
                                 :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
                <a-input v-model="crudList.data.name"/>
              </a-form-model-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-model-item
                  label="摘要"
                  prop="brief"
                  :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
                <a-input v-model="crudList.data.brief" />
              </a-form-model-item>
            </a-col>
          </layout-form-row>
          <a-spin :spinning="crudList.data.quillLoading">
            <div class="editer">
              <quill-editor
                  v-if="!crudList.data.quillLoading"
                  v-model="crudList.data.content"
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
import methods from "./subject.js";
import editorOption from "../../../config/quillEditor.config";
import layoutFormRow from "@/components/section/layoutFormRow/layoutFormRow";
const defaultSubject = {
  uuid: "",
  name: "",
  brief: "",
  content: "",
};
export default {
  name: "subject",
  components: {
    "layout-form-row": layoutFormRow
  },
  data() {
    return {
      editorOption,
      modal: {
        subjectView: {
          name: "实验科目",
          title: "",
          content: "",
          switch: false,
          loading: false,
          form: {
            ref: "subjectViewModalForm",
          },
        },
        subjectEdit: {
          name: "实验科目",
          title: "",
          content: "",
          switch: false,
          loading: false,
          form: {
            ref: "subjectEditModalForm",
          },
        },
      },
      cardBtn: [
        {
          title: "新增实验科目",
          action: () => {
            this.crudSingleHandle().add(this.modal.subjectEdit, defaultSubject,this.onEditOpen(defaultSubject));
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
          title: "名称",
          dataIndex: "name",
          width: "300px",
        },
        {
          title: "摘要",
          dataIndex: "brief",
        },
        {
          title: "操作",
          key: "action",
          width: "180px",
          align: "center",
          fixed: "right",
          scopedSlots: { customRender: "action" },
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

<style lang="less"  scoped>
@import "./subject.less";
</style>