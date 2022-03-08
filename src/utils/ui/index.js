import {Message, Notification} from "element-ui";

import("element-ui/packages/theme-chalk/src/message.scss")
import("element-ui/packages/theme-chalk/src/message-box.scss")

const _this = {
    toast(opt) {
        //     handle = (m, d) => {
        //         const o = {
        //             message: m,
        //             duration: d
        //         },tmHandle={
        //             success:Message.success,
        //             error:Message.error,
        //             warning:Message.warning,
        //             info:Message.info
        //         },timer={}
        //         //加入一个简单的防抖
        //         const dt=timer[opt.type]
        //
        //         // switch (opt.type) {
        //         //     case 200:
        //         //         return Message.success(o);
        //         //     case 500:
        //         //         return Message.error(o);
        //         //     case 404:
        //         //         return Message.warning(o);
        //         //     default:
        //         //         return Message.info(o);
        //         // }
        //     };
        // handle(msg, duration);
        const componentHandle = {
            success: Message.success,
            error: Message.error,
            warning: Message.warning,
            info: Message.info
        }, componentParamsTransHandle = (o) => {
            const duration = o?.duration || 3000,
                msg = typeof o === "string" ? o : o.message,
                throttleTimes = 200;
            return {
                message: msg,
                duration: duration
            }
        }
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