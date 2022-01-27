<template>
  <div class="content">
    <layout-card title="教学过程列表" title-icon="fa-th-list" :titleBtn="cardBtn">
      <a-table
          bordered
          :columns="columns"
          :dataSource="crudList.dataList"
          :loading="crudList.loading"
          :rowKey="record =>record.uuid"
          :pagination="crudList.pagination"
          :scroll="{ x: crudList.scrollWidth }">
          <span slot="video" slot-scope="record" class="btn-group">
            <video-preview :path="record.previewImgPath" size="sm"
                           :footInfo="[{icon:'fa-youtube-play',content:record.views},{content:formatTimeLength(record.timeLength)}]"
                           @click="videoClickHandle(record)"></video-preview>
           </span>
        <span slot="action" slot-scope="record" class="btn-group">
           <a-button
               class="warning"
               size="small"
               title="标记教学资源"
               @click="videoStarHandle(record)">
            <lb-icon :type="record.stared==1?'fa-star':'fa-star-o'" color=""></lb-icon>
          </a-button>
           </span>
      </a-table>
    </layout-card>
    <a-modal
        :title="modal.educationProcess.title"
        centered
        v-model="modal.educationProcess.switch"
        footer=""
    >
      <a-form-model
          :ref="modal.educationProcess.form.ref"
          :model="crudList.data"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }">
        <a-form-model-item label="id" prop="id"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-input v-model="crudList.data.title"/>
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" @click="crudList.dataSub">
            提交
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <video-modal
        :title="modal.videoModal.title"
        :switch="modal.videoModal.switch"
        :videoRes="modal.videoModal.videoRes"
        :duration="modal.videoModal.duration"
        width="80%"
        @close="(e)=>{modal.videoModal.switch=e,crudBatchHandle().list();}">

    </video-modal>

  </div>
</template>

<script>
import methods from "./educationProcess.js";
import videoPreview from "../../../components/section/video/videoPreview";
import videoModal from "../../../components/section/video/videoModal";
import gradeEnum from "../../../enums/api/classCollective/gradeEnum";

const defaultEducationProcess = {}
export default {
  name: "educationProcess",
  components: {
    'video-preview': videoPreview,
    'video-modal': videoModal,
  },
  data() {
    return {
      modal: {
        videoModal: {
          title: "",
          switch: false,
          videoRes: "",
          duration: 0,
        },
        educationProcess: {
          name: "教学过程",
          title: "",
          switch: false,
          form: {
            ref: "educationProcessModalForm",
          }
        }
      },
      cardBtn: [
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
          title: "视频",
          scopedSlots: {customRender: 'video'},
          width: "185px",
        },
        {
          title: "实验教师",
          dataIndex: 'teacherInfo',
          customRender: (text) => {
            return text?.name;
          }
        },
        {
          title: "实验名称",
          dataIndex: 'labUseBookInfo',
          customRender: (text) => {
            return text?.name;
          }
        },
        {
          title: "实验室",
          dataIndex: 'laboratoryInfo',
          customRender: (text) => {
            return text?.name;
          }
        },
        {
          title: "班级",
          dataIndex: 'classCollectiveInfo',
          customRender: (text) => {
            return this.common().assemblyClassName(text);
          }
        },
        {
          title: '操作',
          key: 'action',
          width: "70px",
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
    formatTimeLength() {
      return (val) => {
        return this.$util.data.time.msToHMS(val);
      }
    }
  },
  methods: methods,
  watch: {
    $route() {
      this.init()
    }
  }
}
</script>

<style lang="less" scoped>
@import "./educationProcess.less";
</style>
