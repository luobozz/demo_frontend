import Vue from "vue";
import comNotification from "./notification";
import comNotificationContainer from "./notificationContainer";

const notificationContainer = Vue.extend(comNotificationContainer)
const notification = Vue.extend(comNotification)
const defaultDuration=4.5;

let notCon = null;
let notList=[];

const createContainer = (v) => {
    if (!notCon) {
        const div = document.createElement('div')
        notCon = new notificationContainer({el: div})
        document.body.appendChild(notCon.$el)
        notCon.show = true
        if(v.bottom){
            notCon.bottom=v.bottom
        }
        if(v.width){
            notCon.width=v.width
        }
        if(v.mLeft){
            notCon.mLeft=v.mLeft
        }
    }
}

const createnotification = (v) => {
    const duration=v.duration||defaultDuration
    const div = document.createElement('div')
    const not = new notification({el: div})
    document.getElementsByClassName("lb-notification-Container")[0].appendChild(not.$el)
    not.index=notList.length;
    not.show = true
    not.description=v.description;
    not.message=v.message;
    not.btn=v.btn||[];
    if(v.bottom){
        not.bottom=v.bottom
    }
    setTimeout(()=>{
        not.show=false
    },duration*1000)
}

export default {
    open: async (v) => {
        if (!notCon) {
            await createContainer(v)
        }
        if(!notCon.show){
            notCon.show=true
        }
        createnotification(v);
    }
}