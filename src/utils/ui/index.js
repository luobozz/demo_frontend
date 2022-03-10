import message from "ant-design-vue/lib/message";

import(`ant-design-vue/lib/message/style`)
import throttler from "@/utils/data/throttler"


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
        throttler().throttle(timerKeys, ch, cp.message, cp.duration, opt.onclose)

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