<template>
  <div class="content">
    <layout-card title="采集设备列表" title-icon="fa-th-list" :titleBtn="cardBtn">
      <a-table
          bordered
          :columns="columns"
          :dataSource="crudList.dataList"
          :loading="crudList.loading"
          :rowKey="record =>record.uuid"
          :pagination="crudList.pagination"
          :scroll="{ x: crudList.scrollWidth }">
        <span slot="status" slot-scope="record">
          <a-tag color="green" v-if="record==='success'">成功</a-tag>
          <a-tag color="red" v-if="record==='error'">失败</a-tag>
        </span>
        <span slot="action" slot-scope="record" class="btn-group">
          <a-button
              type="primary"
              size="small"
              @click="crudSingleHandle().edit(modal.captureDevice,record,editOpen(record))">编辑</a-button>
          <a-button
              type="primary"
              size="small"
              @click="reAddHandle(record.uuid)">重发</a-button>
          <a-button
              v-if="record.status==='success'"
              type="primary"
              size="small"
              @click="videoClickHandle(record)">
              <lb-icon type="fa-play-circle"></lb-icon>
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
        :title="modal.captureDevice.title"
        centered
        v-model="modal.captureDevice.switch"
        @ok="crudList.dataSub"
        :ok-button-props="{ props: { loading: modal.captureDevice.loading } }"
    >
      <a-form-model
          :ref="modal.captureDevice.form.ref"
          :model="crudList.data"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }">
        <a-form-model-item label="摄像头名称" prop="name"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-input v-model="crudList.data.name"/>
        </a-form-model-item>
        <a-form-model-item label="rtsp" prop="rtsp"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-input v-model="crudList.data.rtsp"/>
        </a-form-model-item>
        <a-form-model-item label="实验室" prop="labUuid"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-select
              :labelInValue="true"
              v-model="crudList.data.laboratorySelectInfo"
              @change="modalHandle().select(crudList.data.laboratorySelectInfo,crudList.data,'labUuid',true)"
              @dropdownVisibleChange="modalHandle().dropdownVisibleChange(labSelectList)">
            <a-spin v-if="modal.captureDevice.select.lab.loading" slot="notFoundContent" size="small"/>
            <a-select-option v-for="lab in modal.captureDevice.select.lab.data" :value="lab.uuid" :key="lab.uuid">
              {{ lab.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="psm" prop="psmUuid"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-select
              :labelInValue="true"
              v-model="crudList.data.psmSelectInfo"
              @change="modalHandle().select(crudList.data.psmSelectInfo,crudList.data,'psmUuid',true)"
              @dropdownVisibleChange="modalHandle().dropdownVisibleChange(psmSelectList)">
            <a-spin v-if="modal.captureDevice.select.psm.loading" slot="notFoundContent" size="small"/>
            <a-select-option v-for="psm in modal.captureDevice.select.psm.data" :value="psm.uuid" :key="psm.uuid">
              {{ psm.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <video-modal
        :title="modal.videoModal.title"
        :switch="modal.videoModal.switch"
        :videoRes="modal.videoModal.videoRes"
        :hasAudio="false"
        :lcdUuid="modal.videoModal.lcdUuid"
        :videoLoading="modal.videoModal.loading"
        :isLive="true"
        videoType="flv"
        :autoPlay="true"
        width="80%"
        @close="(e)=>{modal.videoModal.switch=e}">

    </video-modal>

  </div>
</template>

<script>
import methods from "./captureDevice.js";
import videoModal from "../../../components/section/video/videoModal";

const defaultCaptureDevice = {
  name: "",
  rtsp: "",
  labUuid: "",
  psmUuid: "",
}
export default {
  name: "captureDevice",
  components: {
    'video-modal': videoModal,
  },
  data() {
    return {
      modal: {
        videoModal: {
          title: "",
          switch: false,
          loading:false,
        },
        captureDevice: {
          name: "采集设备",
          title: "",
          switch: false,
          loading:false,
          select: {
            lab: {
              loading: false,
              current: 1,
              defaultPageSize: 10,
              data: []
            }, psm: {
              loading: false,
              current: 1,
              defaultPageSize: 10,
              data: []
            }
          },
          form: {
            ref: "captureDeviceModalForm",
          }
        }
      },
      cardBtn: [

        {
          title: "新增采集设备",
          action: () => {
            this.crudSingleHandle().add(this.modal.captureDevice, defaultCaptureDevice);
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
          title: "下发状态",
          dataIndex: 'status',
          scopedSlots: {customRender: 'status'},
        },
        {
          title: "摄像头名称",
          dataIndex: 'name',
        },
        {
          title: "rtsp",
          dataIndex: 'rtsp',
        },
        {
          title: "实验室",
          dataIndex: 'laboratoryInfo',
          customRender: (text) => {
            return text?.name;
          }
        },
        {
          title: "psm",
          dataIndex: 'psmInfo',
          customRender: (text) => {
            return text?.name;
          }
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
          width: "250px",
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
@import "./captureDevice.less";
</style>
