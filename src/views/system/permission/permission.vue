<template>
  <div class="content">
    <layout-card title="权限列表" title-icon="fa-th-list" :titleBtn="cardBtn">
      <a-table
          bordered
          :columns="columns"
          :dataSource="crudList.dataList"
          :loading="crudList.loading"
          :rowKey="record =>record.id"
          :pagination="crudList.pagination"
          :scroll="{ x: crudList.scrollWidth }">
        <span slot="action" slot-scope="record" class="btn-group">
          <a-button
              type="primary"
              size="small"
              @click="crudSingleHandle().edit(modal.permission,record)">编辑</a-button>
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
        :title="modal.permission.title"
        centered
        v-model="modal.permission.switch"
        @ok="crudList.dataSub"
        :ok-button-props="{ props: { loading: modal.permission.loading } }"
    >
      <a-form-model
          :ref="modal.permission.form.ref"
          :model="crudList.data"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }">
        <a-form-model-item label="权限集" prop="title"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-input v-model="crudList.data.title"/>
        </a-form-model-item>
        <a-form-model-item label="权限标识" prop="sign"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <list-container>
            <a-list slot="list"
                    :data-source="modal.permission.form.addSignList">
              <a-list-item slot="renderItem" slot-scope="item,index">
                {{ item }}
                <div slot="actions">
                  <lb-icon type="fa-trash-o" @click="addSignListHandle().delete(index)"></lb-icon>
                </div>
              </a-list-item>
            </a-list>
            <div slot="footer" class="cur-pointer flex al-ct">
              <div class="flex al-ct" @click="addSignListHandle().add()">
                <lb-icon type="fa-plus-circle" class="mg-r-min"></lb-icon>
                增加
              </div>
              <input class="hollow lg mg-l-sm" v-model="modal.permission.form.addInputSign"/>
            </div>
          </list-container>
        </a-form-model-item>

      </a-form-model>
    </a-modal>

  </div>
</template>

<script>
import methods from "./permission.js";
import listContainer from "../../../components/section/listContainer/listContainer"

const defaultPermissionData = {
  title: "ces",
  sign: "all,ces",
}

export default {
  name: "permission",
  components: {
    'list-container': listContainer,
  },
  data() {
    return {
      modal: {
        permission: {
          name: "权限",
          title: "",
          switch: false,
          loading:false,
          form: {
            ref: "permissionModalForm",
            addSignList: [],
            addUuidList: [],
            addInputSign: "",
          }
        }
      },
      cardBtn: [
        {
          title: "仅全局",
          action: () => {
            this.crudList.conditions.onlyGlobal = !this.crudList.conditions.onlyGlobal;
            this.cardBtn[0].icon = this.crudList.conditions.onlyGlobal ? "fa-check-square-o" : "fa-square-o"
            this.crudBatchHandle().list();
          },
          type: "link",
          icon: "fa-square-o"
        },
        {
          title: "新增权限集",
          action: () => {
            this.crudSingleHandle().add(this.modal.permission, defaultPermissionData);
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
          title: "权限集",
          dataIndex: 'title',
        },
        {
          title: "权限描述",
          dataIndex: 'sign',
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
    curdListDataSign() {
      return this.crudList.data.sign;
    },
    modalPermissionFormAddSignList() {
      return this.modal.permission.form.addSignList;
    },
    curdListDataUuid() {
      return this.crudList.data.uuid;
    },
    modalPermissionFormAddUuidList() {
      return this.modal.permission.form.addUuidList;
    }
  },
  methods: methods,
  watch: {
    curdListDataSign(n, o) {
      this.modal.permission.form.addSignList = this.$util.data.split(n, ',');
    },
    modalPermissionFormAddSignList(n, o) {
      this.crudList.data.sign = n.toString()
    },
    curdListDataUuid(n, o) {
      this.modal.permission.form.addUuidList = this.$util.data.split(n, ',');
    },
    modalPermissionFormAddUuidList(n, o) {
      this.crudList.data.uuid = n.toString()
    }
  }
}
</script>

<style lang="less" scoped>
@import "./permission.less";
</style>