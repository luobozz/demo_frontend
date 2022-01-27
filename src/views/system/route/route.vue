<template>
  <div class="content">
    <layout-card title="路由列表" title-icon="fa-th-list" :titleBtn="cardBtn">
      <a-table
          bordered
          :columns="columns"
          :dataSource="crudList.dataList"
          :loading="crudList.loading"
          :rowKey="record =>record.uuid"
          :pagination="crudList.pagination"
          :scroll="{ x: crudList.scrollWidth }">
        <span slot="action" slot-scope="record" class="btn-group">
          <a-button
              type="primary"
              size="small"
              @click="crudSingleHandle().edit(modal.route,record)">编辑</a-button>
            <a-button
                type="primary"
                size="small"
                @click="assignPermissionModalHandle(record.uuid)">编辑权限</a-button>
           <a-button
               type="primary"
               size="small"
               class="clipboard"
               @click="$util.data.copyText(record.uuid)">
             <lb-icon type="fa-copy"></lb-icon>
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
        :title="modal.route.title"
        centered
        v-model="modal.route.switch"
        @ok="crudList.dataSub"
        :ok-button-props="{ props: { loading: modal.route.loading } }"
    >
      <a-form-model
          :ref="modal.route.form.ref"
          :model="crudList.data"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }">
        <a-form-model-item label="名称" prop="name"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-input v-model="crudList.data.name"/>
        </a-form-model-item>
        <a-form-model-item label="icon" prop="icon"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-input v-model="crudList.data.icon"/>
        </a-form-model-item>
        <a-form-model-item label="sign" prop="sign"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-input v-model="crudList.data.sign"/>
        </a-form-model-item>
        <a-form-model-item label="path" prop="path"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-input v-model="crudList.data.path"/>
        </a-form-model-item>
        <a-form-model-item label="component" prop="component"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-input v-model="crudList.data.component"/>
        </a-form-model-item>
        <a-form-model-item label="parent" prop="parentUuid">
          <a-input v-model="crudList.data.parentUuid"/>
        </a-form-model-item>

      </a-form-model>
    </a-modal>

    <a-modal
        :title="modal.assignPermission.title"
        centered
        v-model="modal.assignPermission.switch"
        @ok="assignPermissionEditHandle"
        :ok-button-props="{ props: { loading: modal.assignPermission.loading } }"
    >
      <list-container
              :height="500">
        <a-list
                slot="list"
                :data-source="modal.assignPermission.data"
                :loading="modal.assignPermission.loading">
          <a-list-item slot="renderItem" slot-scope="item">
            <div class="permission-group flex column">
              <div class="title">
                <a-tag color="blue">
                  {{ item.title }}
                </a-tag>
              </div>
              <div class="sign-check-group flex al-ct jc-fe">
                <a-checkbox :checked="checkedSign(item.uuidSplit[index])" v-for="(sign,index) in item.signSplit"
                            :key="item.uuidSplit[index]"  @change="assignPermissionCheckHandle(item.uuidSplit[index])">
                  {{ sign }}
                </a-checkbox>
              </div>
            </div>

          </a-list-item>
        </a-list>
      </list-container>
    </a-modal>

  </div>
</template>

<script>
import methods from "./route.js";
import lodash from "lodash";
import listContainer from "../../../components/section/listContainer/listContainer"

const defaultRouteData = {
  name: "",
  icon: "",
  sign: "",
  path: "",
  component: "",
  parentUuid: ""
}

export default {
  name: "route",
  components: {
    'list-container': listContainer,
  },
  data() {
    return {
      modal: {
        route: {
          name: "路由",
          title: "",
          switch: false,
          loading:false,
          form: {
            ref: "routeModalForm"
          }
        },
        assignPermission: {
          title: "分配权限",
          switch: false,
          loading: false,
          checkSign:[],
          routeUuid: "",
          data: [],
          pagination: {
            current: 1,
            defaultPageSize: 10,
          },
        }
      },
      cardBtn: [
        {
          title: "新增路由",
          action: () => {
            this.crudSingleHandle().add(this.modal.route, defaultRouteData);
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
          title: "名称",
          dataIndex: 'name',
        },
        {
          title: "path",
          dataIndex: 'path',
        },
        {
          title: "sign",
          dataIndex: 'sign',
        },
        {
          title: "icon",
          dataIndex: 'icon',
        },
        {
          title: "component",
          dataIndex: 'component',
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
  mounted() {
  },
  created() {
    this.init()
  },
  computed: {
    splitSigns() {
      return (signs) => {
        return this.$util.data.split(signs, ',')
      }
    },
    checkedSign() {
      return (sign) => {
        return lodash.includes(this.modal.assignPermission.checkSign,sign)
      }
    }
  },
  methods: methods
}
</script>

<style lang="less" scoped>
@import "./route.less";
</style>