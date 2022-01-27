<template>
  <a-modal
      title="班级成员"
      centered
      v-model="modalSwitch"

      width="90%"
      @cancel="onclose()"
      footer=""
  >
    <div class="content scroll"
         id="classCollectiveMemberModalContent">
      <layout-card :title="`${common().assemblyClassName(classCollective)} 成员列表`"
                   title-icon="fa-th-list" :titleBtn="cardBtn">
        <a-table
            bordered
            :columns="columns"
            :dataSource="crudList.dataList"
            :loading="crudList.loading"
            :rowKey="record =>record.uuid"
            :pagination="crudList.pagination">
          <span slot="type" slot-scope="record" class="btn-group">
            <a-tag
                :color="classCollectiveMemberTypeEnum.getLabelByValue(record).tagColor">{{
                classCollectiveMemberTypeEnum.getLabelByValue(record).title
              }}</a-tag>
          </span>
          <span slot="action" slot-scope="record" class="btn-group">
          <a-button
              type="danger"
              size="small"
              @click="crudSingleHandle().delete(record.uuid)">
            <lb-icon type="fa-trash-o"></lb-icon>
          </a-button>
           </span>
        </a-table>
      </layout-card>
    </div>

    <a-modal
        :title="modal.addMember.title"
        centered
        :getContainer="common().getModalContainer('classCollectiveMemberModalContent')"
        v-model="modal.addMember.switch"
        width="70%"
        @ok="addMemberHandle"
        :ok-button-props="{ props: { loading: modal.addMember.loading } }">
      <div class="add-student">
        <div class="head">
          <a-form-model
              v-model="modal.addMember.conditions"
              layout="inline">
            <layout-form-row last>
              <a-col :md="12" :sm="24">
                <a-form-model-item label="性别">
                  <a-select v-model="modal.addMember.conditions.sex">
                    <a-select-option
                        :value="item.value"
                        v-for="(item, i) in sexEnums"
                        :key="i"
                    >
                      {{ item.label }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="12" :sm="24">
                <a-form-model-item label="姓名">
                  <a-input v-model="modal.addMember.conditions.name">
                      <lb-icon class="cur-pointer" type="fa-search"  slot="addonAfter"  @click="getStudent()"></lb-icon>
                  </a-input>
                </a-form-model-item>
              </a-col>
            </layout-form-row>
          </a-form-model>

        </div>
        <div class="body">
          <list-container>
            <a-list slot="list"
                    :data-source="modal.addMember.data"
                    :loading="modal.addMember.loading">
              <a-list-item slot="renderItem" slot-scope="item,index">
                <a-checkbox
                    :checked="checkedMember(item.uuid)"
                    @change="checkMemberHandle(item.uuid)"
                    class="mg-r-md">
                </a-checkbox>
                {{ item.name }}
              </a-list-item>
            </a-list>
          </list-container>
        </div>
      </div>


    </a-modal>

  </a-modal>

</template>

<script>
import methods from "./classCollectiveMemberModal.js";
import gradeEnum from "../../../../enums/api/classCollective/gradeEnum";
import classCollectiveMemberTypeEnum from "../../../../enums/api/classCollective/classCollectiveMemberTypeEnum";
import sexEnums from "@/enums/common/sex"
import listContainer from "@/components/section/listContainer/listContainer";
import lodash from "lodash";
import layoutFormRow from "@/components/section/layoutFormRow/layoutFormRow";

export default {
  name: "classCollectiveMemberModal",
  components: {
    'list-container': listContainer,
    "layout-form-row": layoutFormRow
  },
  props: {
    ccData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    switchData: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      gradeEnum,
      sexEnums,
      classCollectiveMemberTypeEnum,
      modal: {
        addMember: {
          title: "添加成员",
          switch: false,
          loading: false,
          data: [],
          type: 0,
          addMemberUuid: [],
          conditions:{},
          current: 1,
          defaultPageSize: 10,
          form: {
            ref: "classCollectiveMemberModalForm",
          }
        }
      },
      cardBtn: [
        {
          title: "添加学生",
          action: () => {
            this.modal.addMember.switch = true;
            this.modal.addMember.type = 1;
            this.modal.addMember.addMemberUuid = []
            this.modal.addMember.conditions={}
            this.getStudent()
          },
          icon: "fa-plus"
        },
        {
          action: () => {
            this.crudConditionsHandle().reset();
          },
          icon: "fa-eraser"
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
          title: "成员类型",
          width: "40%",
          dataIndex: 'type',
          scopedSlots: {customRender: 'type'},
        },
        {
          title: "名称",
          width: "40%",
          dataIndex: 'memberName',
        },
        {
          title: '操作',
          key: 'action',
          width: "10%",
          scopedSlots: {customRender: 'action'},
        }
      ],
      classCollective: {},
      modalSwitch: false,
    }
  },
  created() {
    this.init()
  },
  computed: {
    checkedMember() {
      return (uuid) => {
        return lodash.includes(this.modal.addMember.addMemberUuid, uuid)
      }
    }
  },
  methods: methods,
  watch: {
    switchData() {
      if (this.switchData) {
        this.classCollective = {
          ...this.ccData
        }
        this.crudBatchHandle().list();
      }
      this.modalSwitch = this.switchData
    }
  }
}
</script>

<style lang="less" scoped>
@import "./classCollectiveMemberModal.less";
</style>