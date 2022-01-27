<template>
  <div class="content">
    <layout-card title="账号列表" title-icon="fa-th-list" :titleBtn="cardBtn">
      <a-table
          bordered
          :columns="columns"
          :dataSource="crudList.dataList"
          :loading="crudList.loading"
          :rowKey="record =>record.uuid"
          :pagination="crudList.pagination"
          :scroll="{ x: crudList.scrollWidth }">
        <span slot="image" slot-scope="record">
              <auth-image error-icon="svg-iconheadimg" class="img-size-base" :src="record"/>
        </span>
        <span slot="action" slot-scope="record" class="btn-group">
          <a-button
              type="primary"
              size="small"
              @click="crudSingleHandle().edit(modal.account,record,editOpen(record))">编辑</a-button>
           <a-button
               type="danger"
               size="small">
            <lb-icon type="fa-trash-o"></lb-icon>
          </a-button>
           </span>
      </a-table>
    </layout-card>

    <a-modal
        :title="modal.account.title"
        centered
        v-model="modal.account.switch"
        @ok="crudList.dataSub"
        :ok-button-props="{ props: { loading: modal.account.loading } }"
    >
      <a-form-model
          :ref="modal.account.form.ref"
          :model="crudList.data"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }">
        <a-form-model-item v-if="!crudList.data.uuid" label="账号" prop="account"
                           :rules="[{ required: true, validator:common().validator.azOrNumber, trigger: 'blur' }]">
          <a-input v-model="crudList.data.account"/>
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
              @change="curdUploadHandle().image().change($event,modal.account,'image')"
          >
            <auth-image class="img-size-lg" v-if="crudList.data.image" :src="crudList.data.image" alt="image"/>
            <div v-else>
              <a-icon :type="modal.account.uploading ? 'loading' : 'plus'"/>
              <div class="ant-upload-text">
                上传
              </div>
            </div>
          </a-upload>
        </a-form-model-item>
        <a-form-model-item v-if="!crudList.data.uuid" label="电话" prop="tel"
                           :rules="[{ required: true, validator:common().validator.tel, trigger: 'blur' }]">
          <a-input v-model="crudList.data.tel"/>
        </a-form-model-item>
        <a-form-model-item v-if="!crudList.data.uuid" label="密码" prop="password"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-input v-model="crudList.data.password"/>
        </a-form-model-item>
        <a-form-model-item v-if="!crudList.data.uuid" label="密码确认" prop="passwordConfirm"
                           :rules="[{ required: true, validator:validatorPwdConfirm, trigger: 'blur' }]">
          <a-input v-model="crudList.data.passwordConfirm"/>
        </a-form-model-item>
        <a-form-model-item label="角色" prop="roleUuids"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-select
              mode="multiple"
              :labelInValue="true"
              v-model="crudList.data.roles"
              @change="modalHandle().selectMultiple(crudList.data.roles,crudList.data,'roleUuids',true)"
              @dropdownVisibleChange="modalHandle().dropdownVisibleChange(accountSelectList)">
            <a-spin v-if="modal.account.select.roles.loading" slot="notFoundContent" size="small"/>
            <a-select-option v-for="role in modal.account.select.roles.data" :value="role.uuid" :key="role.uuid">
              {{ role.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

  </div>
</template>

<script>
import methods from "./account.js";
import lodash from "lodash";

const defaultAccount = {
  account: "",
  tel: "",
  password: "",
  image: "",
  roleVos: []
}
export default {
  name: "account",
  data() {
    return {
      modal: {
        account: {
          name: "账号",
          title: "",
          switch: false,
          uploading: false,
          loading:false,
          form: {
            ref: "accountModalForm",
          },
          select: {
            roles: {
              loading: false,
              current: 1,
              defaultPageSize: 10,
              data: [],
            }
          },
        }
      },
      cardBtn: [

        {
          title: "新增账号",
          action: () => {
            this.crudSingleHandle().add(this.modal.account, defaultAccount, this.editOpen(defaultAccount));
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
          title: "照片",
          dataIndex: 'image',
          scopedSlots: {customRender: 'image'},
          width: "80px",
        },
        {
          title: "账号",
          dataIndex: 'account',
        },
        {
          title: "电话",
          dataIndex: 'tel',
        },
        {
          title: "角色",
          dataIndex: 'roleVos',
          customRender: (text) => {
            return text.map(p => p.name).toString();
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
  computed: {},
  methods: methods
}
</script>

<style lang="less" scoped>
@import "./account.less";
</style>