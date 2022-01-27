<template>
  <div class="content">
    <layout-card title="角色列表" title-icon="fa-th-list" :titleBtn="cardBtn">
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
              @click="crudSingleHandle().edit(modal.role,record)">编辑</a-button>
            <a-button
                type="primary"
                size="small"
                @click="assignRouteModalHandle(record.uuid)">分配菜单</a-button>
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
        :title="modal.role.title"
        centered
        v-model="modal.role.switch"
        @ok="crudList.dataSub"
        :ok-button-props="{ props: { loading: modal.role.loading } }"
    >
      <a-form-model
          :ref="modal.role.form.ref"
          :model="crudList.data"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }">
        <a-form-model-item label="名称" prop="name"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-input v-model="crudList.data.name"/>
        </a-form-model-item>
        <a-form-model-item label="sign" prop="sign"
                           :rules="[{ required: true, message: requiredMsg, trigger: 'blur' }]">
          <a-input v-model="crudList.data.sign"/>
        </a-form-model-item>

      </a-form-model>
    </a-modal>


    <a-modal
        :title="modal.assignRoute.title"
        centered
        v-model="modal.assignRoute.switch"
        @ok="assignRouteEditHandle"
        :ok-button-props="{ props: { loading: modal.assignRoute.loading } }"
    >
      <list-container
          :height="500">
        <a-list
            slot="list"
            :data-source="modal.assignRoute.data"
            :loading="modal.assignRoute.loading">
          <a-list-item slot="renderItem" slot-scope="item">
            <div class="route-group flex column">
              <div class="title">
                <a-checkbox
                    class="mg-r-md"
                    :checked="checkRoute(item.uuid)"
                    @change="assignRouteCheckHandle(item.uuid)">
                </a-checkbox>
                <a-tag color="blue">
                  {{ item.name }}
                </a-tag>
              </div>
              <div class="route-check-group flex al-ct jc-fe">
                <a-checkbox :checked="checkRoutePermission(item.routePermissions[pIndex])"
                            v-for="(permission,pIndex) in item.permissions"
                            :key="permission.uuid"
                            @change="assignRpCheckHandle(item.routePermissions[pIndex])">
                  {{ `${permission.title}:${permission.sign}` }}
                </a-checkbox>
              </div>

              <div class="child-list al-end" v-if="item.children&&item.children.length>0">
                <div class="route-group flex column" v-for="child in item.children" :key="child.uuid">
                  <div class="title">
                    <a-checkbox
                        class="mg-r-md"
                        :checked="checkRoute(child.uuid)"
                        @change="assignRouteCheckHandle(child.uuid)">
                    </a-checkbox>
                    <a-tag color="blue">
                      {{ child.name }}
                    </a-tag>
                  </div>

                  <div class="route-check-group flex al-ct jc-fe">
                    <a-checkbox :checked="checkRoutePermission(child.routePermissions[pIndex])"
                                v-for="(permission,pIndex) in child.permissions"
                                :key="permission.uuid"
                                @change="assignRpCheckHandle(child.routePermissions[pIndex])">
                      {{ `${permission.title}:${permission.sign}` }}
                    </a-checkbox>
                  </div>
                </div>
              </div>
            </div>

          </a-list-item>
        </a-list>
      </list-container>
    </a-modal>

  </div>
</template>

<script>
import methods from "./role.js";
import lodash from "lodash"
import listContainer from "../../../components/section/listContainer/listContainer";

const defaultRoleData = {
  name: "",
  sign: ""
}

export default {
  name: "role",
  components: {
    'list-container': listContainer,
  },
  data() {
    return {
      modal: {
        role: {
          name: "角色",
          title: "",
          switch: false,
          loading:false,
          form: {
            ref: "roleModalForm"
          }
        },
        assignRoute: {
          title: "分配路由",
          switch: false,
          loading: false,
          roleUuid: "",
          checkRpUuid: [],
          checkRouteUuid: [],
          data: [],
          pagination: {
            current: 1,
            defaultPageSize: 100,
          },
        }
      },
      cardBtn: [
        {
          title: "新增角色",
          action: () => {
            this.crudSingleHandle().add(this.modal.role, defaultRoleData);
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
          title: "sign",
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
          width: "210px",
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
    checkRoutePermission() {
      return (rpUuid) => {
        return lodash.includes(this.modal.assignRoute.checkRpUuid, rpUuid)
      }
    },
    checkRoute() {
      return (routeUuid) => {
        return lodash.includes(this.modal.assignRoute.checkRouteUuid, routeUuid)
      }
    }
  },
  methods: methods
}
</script>

<style lang="less" scoped>
@import "./role.less";
</style>