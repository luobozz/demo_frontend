import uiUtils from "@/utils/ui";

/**
 * @author chenlingyu
 */
export default {
    silentError: (error, vm, info) => {
        if (info.indexOf("Promise") > -1) {
            console.warn(error)
        } else {
            console.error(error)
        }
    },
    toastError: (msg, noToast) => {
        console.error(`error:${msg}`)
        if (!(noToast?.all||noToast?.error)) {
            uiUtils.toast({
                type: 500,
                message: msg
            })
        }
    }
}