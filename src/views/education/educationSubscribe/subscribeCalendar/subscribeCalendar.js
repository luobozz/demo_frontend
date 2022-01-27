import moment from "moment";
import lodash from "lodash";
import momentConfig from "@/config/moment.config";

const methods = {
    init() {
        this.getSelectList()
    },
    getSelectList() {
        this.lab.loading = true;
        this.$httpApi.ews.laboratory.getLaboratory({
            pageNo: this.lab.current,
            maxResults: this.lab.defaultPageSize,
        }).then(res => {
            // this.lab.data = this.lab.data.concat(res.data);
            res.data.forEach(item=>{
                if(item.status == 1){
                    this.lab.data.push(item)
                }
            })
            this.currentLab = this.lab.data[0]
            this.changeLab(this.currentLab)
        }).finally(f => {
            this.lab.loading = false;
        })
    },
    currentChangeHandle(changeNum) {

        if (!this.hasLab) {
            this.$util.exception.toastError(this.msg)
            return;
        }
        let clWeekStart = lodash.cloneDeep(this.weekStart)
        if(changeNum){
            clWeekStart.add(changeNum,"day");
        }else {
            clWeekStart=moment().startOf('isoWeek');
        }
        this.$set(this,"weekStart",clWeekStart);
        this.changeLab(this.currentLab)
    },
    changeLab(lab) {
        this.currentLab = lab;
        this.loading = true;
        this.labSubRecord=[];
        this.$httpApi.ews.laboratory.getSubscribeRecordCalendar({
            ...this.dateSectionStr,
            pageNo: 1,
            maxResults: 100,
            labUuid: this.currentLab.uuid,
            status: [0, 1]
        }).then(res => {
            res.data.forEach(p => {
                const date = moment(p.useDay).format(this.momentConfig.format.onlyDate)
                if (this.labSubRecord[date]) {
                    this.labSubRecord[date][p.classtimeUuid] = p;
                } else {
                    const classtime = {}
                    classtime[p.classtimeUuid] = p
                    this.labSubRecord[date] = classtime
                }
            })
        }).catch(e => {
            this.error = true
        }).finally(f => {
            this.loading = false;
        })
    },
    bookHandle(useDay,classtimeUuid) {
        this.book.switch = true;
        this.book.data = lodash.cloneDeep(this.defaultBook)

        this.book.data.useDay = useDay;
        this.book.data.classtimeUuid = classtimeUuid;
        this.book.data.labUuid=this.currentLab.uuid;
        this.book.data.labName = this.currentLab.name;

        if(!lodash.isEmpty(this.accountState.logicPersonInfo)){
            this.book.data.teacherUuid=this.accountState.logicPersonInfo.uuid;
            this.book.data.teacherName=this.accountState.logicPersonInfo.name
        }
    }, checkDate(time, date) {
        const mt=moment(`${date} ${time.split("-")[0]}`)
        return !mt.isBefore(moment())
    }

}

export default methods