import Vue from "vue";
import comToast from "./toast";
import comToastContainer from "./toastContainer";
import router from "@/router";

const toastContainer = Vue.extend(comToastContainer)
const toast = Vue.extend(comToast)
const defaultDuration = 3;

let notCon = null;
let toastLength= 0;

const createContainer = (v) => {
    if (!notCon) {
        const div = document.createElement('div')
        notCon = new toastContainer({el: div})
        document.body.appendChild(notCon.$el)
        notCon.show = true
    }
}

const createToast = (v) => {
    const duration = v.duration || defaultDuration
    const div = document.createElement('div')
    const not = new toast({el: div})
    document.getElementsByClassName("lb-toast-Container")[0].appendChild(not.$el)
    toastLength++;
    not.index=toastLength;
    not.type = v.type
    not.message = v.message;
    not.show()

    setTimeout(() => {
        not.hide()
    }, duration * 1000)
}

const open = async (v) => {
    if (!notCon) {
        await createContainer(v)
    }
    if (!notCon.show) {
        notCon.show = true
    }
    createToast(v);
}

export default {
    info(m, d) {
        open({
            type: "info",
            message: m,
            duration: d
        })
    },
    warning(m, d) {
        open({
            type: "warning",
            message: m,
            duration: d
        })
    },
    error(m, d) {
        open({
            type: "error",
            message: m,
            duration: d
        })
    },
    success(m, d) {
        open({
            type: "success",
            message: m,
            duration: d
        })
    }
}