import message from "ant-design-vue/lib/message";
import {Modal} from 'ant-design-vue'

import(`ant-design-vue/lib/message/style`)
import {throttler} from "@/utils/data/throttler"
import dataUtil from "@/utils/data/index"


const _this = {
    toast(opt) {
        const componentHandle = {
            success: message.success,
            error: message.error,
            warning: message.warning,
            info: message.info
        }, componentParamsTransHandle = (o) => {
            const duration = o?.duration / 1000 || 2,
                msg = typeof o === "string" ? o : o.message;
            return {
                message: msg,
                duration: duration
            }
        }
        const cp = componentParamsTransHandle(opt), ct = opt.type || "info", timerKeys = `toast_${ct}_${cp.message}`,
            ch = componentHandle[opt.type || "info"]
        //0.8秒内同toast节流
        throttler(800).throttle(timerKeys, ch, cp.message, cp.duration, opt.onclose)

    },
    notification(opt) {
        const optC = {
            duration: opt.duration || null,
            title: opt.message || "",
            message: opt.description || "",
            dangerouslyUseHTMLString: opt.dangerouslyUseHTMLString || "",
            position: 'bottom-right',
            btn: opt.btn || null,
        }
        Notification(optC)
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
        dataUtil.object.Merger(optC, opt)
        Modal.confirm(optC);
    },
}

export default _this