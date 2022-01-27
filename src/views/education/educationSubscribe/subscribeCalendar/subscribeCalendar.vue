<template>
  <div class="content">
    <layout-card title="预约日历" title-icon="fa-th-list" :titleBtn="cardBtn">
      <a-spin :spinning="lab.loading">
        <div class="switch-lab flex column">
          <div class="lab-list scroll x flex al-ct no-shrink">
            <div
                :class="{'lab flex al-ct jc-ct cur-pointer':true,'current':labItem.uuid===currentLab.uuid}"
                v-for="(labItem,i) in lab.data"
                :key="`lab_${i}`"
                @click="changeLab(labItem)">
              {{ labItem.name }}
            </div>
          </div>
          <div class="mg-t-md" v-if="hasLab">
            <a-tag>{{ dateSectionStr.beginTime }} - {{ dateSectionStr.endTime }} 预约表</a-tag>
          </div>
        </div>
        <div class="calendar-content mg-t-md">
          <a-spin :spinning="loading">
            <a-empty
                class="mg-t-lg"
                v-if="!hasLab||this.error"
                :description="msg"/>
            <div v-else class="calendar">
              <div class="table-col-head title table-line flex jc-fe" :style="{'min-height':getHeight}">
                <div class="date"></div>
                <div class="date flex al-ct jc-ct" v-for="(date,i) in dateSection" :key="`data_${i}`">
                  {{ date.format(momentConfig.format.onlyDate) }} {{ date.format(momentConfig.format.week) }}
                </div>
              </div>

              <div class="table-line flex jc-fe" :style="{'min-height':getHeight}"
                   v-for="(classTime,i) in classTimeEnum"
                   :key="`classTime_${i}`">
                <div class="title calendar-item flex column al-ct jc-ct">
                  <div>{{ classTime.label.name }}</div>
                  <div>{{ classTime.label.periodTime }}</div>
                </div>
                <div class="calendar-item" v-for="(num,j) in 7" :key="`calendar_${i}_${j}`">
                  <div class="booked"
                       v-if="labSubRecord[dateSection[j].format(momentConfig.format.onlyDate)]&&labSubRecord[dateSection[j].format(momentConfig.format.onlyDate)][i]">
                    <a-tag class="mg-erase" color="red">已被预约</a-tag>
                    <div>
                      <lb-icon class="mg-r-min" type="fa-user"></lb-icon>
                      {{ labSubRecord[dateSection[j].format(momentConfig.format.onlyDate)] && labSubRecord[dateSection[j].format(momentConfig.format.onlyDate)][i].applicant }}
                    </div>
                    <div>
                      <lb-icon class="mg-r-min" type="fa-tag"></lb-icon>
                      {{ expTypeEnum.getLabelByValue(labSubRecord[dateSection[j].format(momentConfig.format.onlyDate)] && labSubRecord[dateSection[j].format(momentConfig.format.onlyDate)][i].exptypeUuid) }}
                    </div>
                    <div>
                      <lb-icon class="mg-r-min" type="fa-map-signs"></lb-icon>
                      {{ expReqEnum.getLabelByValue(labSubRecord[dateSection[j].format(momentConfig.format.onlyDate)] && labSubRecord[dateSection[j].format(momentConfig.format.onlyDate)][i].expreqUuid) }}
                    </div>
                  </div>
                  <div @click="bookHandle(dateSection[j].format(momentConfig.format.onlyDate),i)" class="open" v-else-if="checkDate(classTime.label.periodTime,dateSection[j].format(momentConfig.format.onlyDate))">
                    <a-tag class="mg-erase" color="green">预约</a-tag>
                  </div>
                  <div class="booked" v-else>
                  </div>
                </div>
              </div>
            </div>
          </a-spin>

        </div>
      </a-spin>
    </layout-card>

    <book-modal
        :bookData="book.data"
        :switchData="book.switch"
        @close="(e)=>{book.switch=e;changeLab(this.currentLab)}">

    </book-modal>

  </div>

</template>

<script>
import methods from "./subscribeCalendar.js";
import moment from "moment";
import lodash from "lodash";
import momentConfig from "../../../../config/moment.config"
import classTimeEnum from "../../../../enums/api/useBook/classTimeEnum"
import expTypeEnum from "../../../../enums/api/useBook/expTypeEnum"
import expReqEnum from "../../../../enums/api/useBook/expReqEnum"
import bookModal from "../bookModal/bookModal.vue";

const defaultBook = {
  useDay: "",
  classtimeUuid: "",
  labUuid: "",
  labName: "",
  name: "",
  teacherUuid: "",
  gradeclassUuid: "",
  groupsInfo: "",
  exptypeUuid: "",
  expreqUuid: "",
  expDevice: "",
  subjectUuid: " "
}

export default {
  name: "subscribeCalendar",
  components: {
    'book-modal': bookModal,
  },
  data() {
    return {
      momentConfig,
      classTimeEnum,
      expTypeEnum,
      expReqEnum,
      defaultBook,
      cardBtn: [
        {
          action: () => {
            this.currentChangeHandle(-7)
          },
          icon: "fa-chevron-left"
        },
        {
          action: () => {
            this.currentChangeHandle(7)
          },
          icon: "fa-chevron-right"
        },
        {
          title: "本周",
          action: () => {
            this.currentChangeHandle()
          },
        },
        {
          action: () => {
            this.changeLab(this.currentLab);
          },
          icon: "fa-refresh"
        }
      ],
      lab: {
        loading: false,
        data: [],
        current: 1,
        defaultPageSize: 10,
      },
      currentLab: {},
      labSubRecord: {},
      loading: false,
      error: false,
      book: {
        data: {},
        switch: false
      },
      weekStart: moment().startOf('isoWeek'),
    }
  },
  created() {
    this.init()
  },
  computed: {
    msg() {
      return this.error ? "发生错误请重试" : "请先选择一个实验室"
    },
    dateSection() {
      const momentArr = [];
      for (let i = 0; i < 7; i++) {
        const clWeekStart = lodash.cloneDeep(this.weekStart)
        clWeekStart.add(i, "day")
        momentArr.push(clWeekStart)
      }
      return momentArr
    },
    dateSectionStr() {
      const clWeekStart = lodash.cloneDeep(this.weekStart);
      return {
        beginTime: clWeekStart.format(momentConfig.format.onlyDate),
        endTime: clWeekStart.add(6, 'day').format(momentConfig.format.onlyDate)
      }
    },
    hasLab() {
      return !lodash.isEmpty(this.currentLab);
    },
    getHeight() {
      return `calc(53vh / ${classTimeEnum.length() + 1})`
    }
  },
  methods: methods
}
</script>

<style lang="less" scoped>
@import "./subscribeCalendar.less";
</style>