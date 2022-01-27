import {Modal} from 'ant-design-vue'
import notification from "../../components/section/notification";
import toast from "../../components/section/toast";
import dataUtils from '../data'
import timer from "../../utils/data/timer";
import Vue from 'vue'

const _this = {
    toast(opt) {
        const duration = opt?.duration / 1000 || 3,
            msg = typeof opt === "string" ? opt : opt.message,
            handle = (m, d) => {
                switch (opt.type) {
                    case 200:
                        return toast.success(m, d);
                    case 500:
                        return toast.error(m, d);
                    case 404:
                        return toast.warning(m, d);
                    default:
                        return toast.info(m, d);
                }
            };
        handle(msg, duration);
    },
    notification(opt) {
        const optC = {
            duration: opt.duration || null,
            message: opt.message || "",
            description: opt.description || "",
            bottom: opt.bottom || null,
            width: opt.width || null,
            mLeft: opt.mLeft || null,
            btn: opt.btn || null,
        }
        notification.open(optC)
    },
    confirm(opt) {
        let optC = {
            content:"警告",
            okText: "确认",
            cancelText: "取消",
            keyboard:true,
            centered:true,
            onOk:()=>{},
            onCancel:()=>{},
        }
        dataUtils.object.Merger(optC, opt)
        Modal.confirm(optC);
    },
    modalDelayClose: (modal, handle, opt) => {
        let timeOut = opt?.timeout || 2000

        _this.toast({
            duration: timeOut,
            message: `${timeOut / 1000}后关闭`
        })

        timer.addTimer({
            name: "modalDelayCloseTimeOut",
            handle: () => {
                if (handle) {
                    handle()
                }
                // modal.swith = false
                Vue.set(modal, "switch", false);
                timer.removeTimerByName("modalDelayCloseInterval")
                timer.removeTimerByName("modalDelayCloseTimeOut")
            },
            timeout: timeOut,
            type: "timeout",
        }).start()
    },fullscreen(el) {
        var docElm = el||document.documentElement;
        return{
            full:()=>{
                if (docElm.requestFullscreen) {
                    docElm.requestFullscreen();
                } else if (docElm.mozRequestFullScreen) {
                    docElm.mozRequestFullScreen();
                } else if (docElm.webkitRequestFullScreen) {
                    docElm.webkitRequestFullScreen();
                } else if (docElm.msRequestFullscreen) {
                    docElm.msRequestFullscreen();
                }
            },
            close:()=>{
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        }
    }
}

export default _this