<template>
  <div class="content">
    <layout-card title="实验室列表" title-icon="fa-th-list" :titleBtn="cardBtn">
      <a-table
          bordered
          :columns="columns"
          :dataSource="crudList.dataList"
          :loading="crudList.loading"
          :rowKey="(record) => record.uuid"
          :pagination="crudList.pagination"
          :scroll="{ x: crudList.scrollWidth }"
      >
        <span slot="labSubjects" slot-scope="record">
          <div class="laboratory-subject-list flex column">
             <a-tag v-for="(subject, i) in record" :key="`labSubject_${subject.uuid}`">
            {{subject.name}}
          </a-tag>
          </div>

        </span>
        <span slot="action" slot-scope="record" class="btn-group">
          <a-button
              type="primary"
              size="small"
              @click="crudSingleHandle().edit(modal.laboratory, record,editOpen(record))"
          >编辑</a-button
          >
          <a-button
              type="primary"
              size="small"
              @click="videoClickHandle(record)"
          >
            <lb-icon type="fa-play-circle"></lb-icon>
          </a-button>
          <a-button
              type="danger"
              size="small"
              @click="
              crudSingleHandle().delete(
                record.uuid,
                '确定删除' + record.name + '吗,删除后不可恢复'
              )
            "
          >
            <lb-icon type="fa-trash-o"></lb-icon>
          </a-button>
        </span>
      </a-table>
    </layout-card>
    <a-modal
        :title="modal.laboratory.title"
        centered
        v-model="modal.laboratory.switch"
        @ok="crudList.dataSub"
        :ok-button-props="{ props: { loading: modal.laboratory.loading } }"
    >
      <a-form-model
          :ref="modal.laboratory.form.ref"
          :model="crudList.data"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
      >
        <a-form-model-item
            label="名称"
            prop="name"
            :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]"
        >
          <a-input v-model="crudList.data.name"/>
        </a-form-model-item>
        <a-form-model-item
            label="位置"
            prop="location"
            :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]"
        >
          <a-input v-model="crudList.data.location"/>
        </a-form-model-item>
        <a-form-model-item
            label="管理员"
            prop="assistant"
            :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]"
        >
          <a-input v-model="crudList.data.assistant"/>
        </a-form-model-item>
        <a-form-model-item label="实验科目" prop="subjectsUUid">
          <a-select
              mode="multiple"
              :labelInValue="true"
              v-model="crudList.data.labSubjects"
              @change="modalHandle().selectMultiple(crudList.data.labSubjects,crudList.data,'subjectUuids',true)"
              @dropdownVisibleChange="modalHandle().dropdownVisibleChange(subjectsSelectList)">
            <a-spin v-if="modal.laboratory.select.subjects.loading" slot="notFoundContent" size="small"/>
            <a-select-option v-for="subject in modal.laboratory.select.subjects.data" :value="subject.uuid" :key="subject.uuid">
              {{ subject.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
            label="状态"
            prop="status"
            :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]"
        >
          <a-select v-model="crudList.data.status">
            <a-select-option
                :value="item.value"
                v-for="(item, i) in StatusEnums"
                :key="i"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <video-modal-multiple
        ref="videoModalMultiple"
        :title="modal.videoModal.title"
        :switch="modal.videoModal.switch"
        :loading="modal.videoModal.loading"
        :videoList="modal.videoModal.data"
        @close="vmmCloseHandle"
    >
    </video-modal-multiple>
  </div>
</template>

<script>
import methods from "./laboratorySetting.js";
import videoModalMultiple from "../../../components/section/video/videoModalMultiple";
import StatusEnums from "../../../enums/common/status";

const defaultLaboratory = {
  name: "",
  location: "",
  assistant: "",
  status: "",
};
export default {
  name: "laboratorySetting",
  components: {
    "video-modal-multiple": videoModalMultiple,
  },
  data() {
    return {
      StatusEnums,
      modal: {
        videoModal: {
          title: "",
          switch: false,
          loading: false,
          data: [],
        },
        laboratory: {
          name: "实验室",
          title: "",
          switch: false,
          loading:false,
          select: {
            subjects: {
              loading: false,
              current: 1,
              defaultPageSize: 10,
              data: [],
            }
          },
          form: {
            ref: "laboratoryModalForm",
          },
        },
      },
      cardBtn: [
        {
          title: "新增实验室",
          action: () => {
            this.crudSingleHandle().add(
                this.modal.laboratory,
                defaultLaboratory
            );
          },
          icon: "fa-plus",
        },
        {
          action: () => {
            this.crudBatchHandle().list();
          },
          icon: "fa-refresh",
        },
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
        },
        {
          title: "位置",
          dataIndex: "location",
        },
        {
          title: "实验科目",
          dataIndex: "labSubjectsList",
          scopedSlots: {customRender: "labSubjects"},
        },
        {
          title: "状态",
          dataIndex: "status",
          customRender: (text) => {
            return StatusEnums.getLabelByValue(text);
          },
        },
        {
          title: "创建时间",
          dataIndex: "createdTime",
          customRender: (text) => {
            return this.$util.data.dataFormat(text);
          },
        },
        {
          title: "操作",
          key: "action",
          width: "180px",
          scopedSlots: {customRender: "action"},
          fixed: "right",
        },
      ],
    };
  },
  created() {
    this.init();
  },
  computed: {
  },
  watch: {
  },
  methods: methods,
};
</script>

<style lang="less" scoped>
@import "./laboratorySetting.less";
</style>