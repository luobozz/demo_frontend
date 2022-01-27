<template>
  <div class="content">
    <layout-card
        title="规章制度列表"
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
              @click="crudSingleHandle().details(modal.regulationView,record.uuid,$httpApi.ews.laboratory.addRegulationViews({uuid:record.uuid}))"
          >查看</a-button
          >
          <a-button
              type="primary"
              size="small"
              @click="crudSingleHandle().edit(modal.regulationEdit, record,onEditOpen(record))"
          >编辑</a-button
          >
          <a-button type="danger" size="small">
            <lb-icon
                type="fa-trash-o"
                @click="crudSingleHandle().delete(record.uuid,'确定删除'+record.title+'吗,删除后不可恢复')"
            ></lb-icon>
          </a-button>
        </span>
      </a-table>
    </layout-card>


    <a-modal
        :title="modal.regulationView.title"
        centered
        width="90%"
        v-model="modal.regulationView.switch"
        footer=""
    >
      <div class="regulation-view">
        <a-skeleton :loading="modal.regulationView.loading" active>
          <div class="head flex column jc-sb">
            <div class="title">
              {{ crudList.data.title }}
            </div>
            <div class="details flex al-ct mg-b-min text-color-sub">
              <div class="flex al-ct">
                <lb-avatar class="mg-r-min" type="img"
                           :src="crudList.data.createByImage"
                           size="small"/>
                <div class="account-name"> {{ crudList.data.createByAccount }}</div>
              </div>
              <div>发布于 {{ crudList.data.createdTime | dateFormatNoHMS }}</div>
              <div>阅读 {{ crudList.data.viewCount }}</div>
            </div>
          </div>
          <div class="body scroll">
            <span class="ql-editor" v-html="crudList.data.content"></span>
          </div>
        </a-skeleton>
      </div>
    </a-modal>


    <a-modal
        :title="modal.regulationEdit.title"
        centered
        width="90%"
        v-model="modal.regulationEdit.switch"
        @ok="crudList.dataSub"
        :ok-button-props="{ props: { loading: modal.regulationEdit.loading } }"
    >
      <div class="regulation-edit scroll">
        <a-form-model
            :ref="modal.regulationEdit.form.ref"
            :model="crudList.data"
            layout="inline"
        >
          <layout-form-row class="selecter" last>
            <a-col :md="12" :sm="24">
              <a-form-model-item label="标题" prop="title"
                                 :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
                <a-input v-model="crudList.data.title"/>
              </a-form-model-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-model-item
                  label="类型"
                  prop="type"
                  :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
                <a-select v-model="crudList.data.type">
                  <a-select-option
                      :value="item.value"
                      v-for="(item, i) in regulationTypeEnums"
                      :key="i"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </layout-form-row>
          <a-spin tip="内容过多，正在加载中，请稍等，勿操作..." :spinning="crudList.data.quillLoading">
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
import methods from "./regulations.js";
import regulationTypeEnums from "../../../enums/api/regulations/regulationType";
import editorOption from "../../../config/quillEditor.config";
import layoutFormRow from "@/components/section/layoutFormRow/layoutFormRow";

const defaultRegulation = {
  uuid: "",
  type: "",
  title: "",
  content: "",
};
export default {
  name: "regulations",
  components: {
    "layout-form-row": layoutFormRow
  },
  data() {
    return {
      regulationTypeEnums,
      editorOption,
      modal: {
        regulationView: {
          name: "规章制度",
          title: "",
          content: "",
          switch: false,
          loading: false,
          form: {
            ref: "regulationViewModalForm",
          },
        },
        regulationEdit: {
          name: "规章制度",
          title: "",
          content: "",
          switch: false,
          loading: false,
          form: {
            ref: "regulationEditModalForm",
          },
        },
      },
      cardBtn: [
        {
          title: "新增规章制度",
          action: () => {
            this.crudSingleHandle().add(
                this.modal.regulationEdit,
                defaultRegulation,
                this.onEditOpen(defaultRegulation));
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
          title: "类型",
          dataIndex: "type",
          width: "200px",
          customRender(val) {
            return regulationTypeEnums.getLabelByValue(val);
          },
        },
        {
          title: "名称",
          dataIndex: "title",
        },
        {
          title: "操作",
          key: "action",
          width: "180px",
          align: "center",
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
  methods: methods,
};
</script>

<style lang="less" scoped>
@import "./regulations.less";
</style>