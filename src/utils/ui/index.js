import {Message, Notification} from "element-ui";
import throttler from "@/utils/data/throttler"

import("element-ui/packages/theme-chalk/src/message.scss")
import("element-ui/packages/theme-chalk/src/message-box.scss")

const _this = {
    toast(opt) {
            const componentHandle = {
            success: Message.success,
            error: Message.error,
            warning: Message.warning,
            info: Message.info
        }, componentParamsTransHandle = (o) => {
            const duration = o?.duration || 3000,
                msg = typeof o === "string" ? o : o.message;
            return {
                message: msg,
                duration: duration
            }
        }
        const cp=componentParamsTransHandle(opt),ct=opt.type||"info",timerKeys=`toast_${ct}_${cp.message}`,ch=componentHandle[opt.type||"info"]
        throttler().throttle(timerKeys,ch,cp)

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
    }
}

export default _this