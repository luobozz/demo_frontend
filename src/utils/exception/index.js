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
    toastError: (msg, onlyToast) => {
        if (!onlyToast) {
            console.error(`error:${msg}`)
        }
        uiUtils.toast({
            type: "error",
            message: msg
        })
    }
}