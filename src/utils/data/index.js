import moment from "moment";
import Clipboard from 'clipboard';
import ui from "../ui"
import exception from "../exception"
import lodash from "lodash";
import regular from "./regular"
import momentConfig from "../../config/moment.config"

export default {
    regular,
    dataFormat: (timestamp, format) => {
        format = format ? format : momentConfig.format.normal
        return moment(timestamp).format(format)
    },
    split(String, separator) {
        return lodash.isEmpty(String) ? [] : lodash.split(String, separator)
    },
    copyText: (value) => {
        var clipboard = new Clipboard(".clipboard", {
            text: function () {
                return value;
            }
        })
        clipboard.on('success', function (e) {
            ui.toast({
                type: 200,
                message: "复制成功"
            })
            clipboard.destroy();
        });

        clipboard.on('error', function (e) {
            exception.toastError("复制失败");
            clipboard.destroy();
        });
    },
    object: {
        Merger: (object, supplement) => {
            for (let i in supplement) {
                object[i] = supplement[i];
            }
        },
    },
    time: {
        msToHMS(val) {
            const sm = 1000;
            const mm = 60 * sm;
            const hm = 60 * mm;
            const fix = (t) => {
                if (typeof t == "number") {
                    t = t + "";
                }
                if (t.length <= 0) {
                    return "00";
                }
                return t.length < 2 ? "0" + t : t;
            }
            const h = Math.floor(val / hm), m = Math.floor(val % hm / mm), s = Math.floor(val % hm % mm / sm);
            return `${h > 0 ? `${fix(h)}:` : ""}${fix(m)}:${fix(s)}`;
        },
        timeFromNow(time) {
            const sm = 1000;
            const mm = 60 * sm;
            const hm = 60 * mm;
            const Dm = 24 * hm;
            const Mm = 30 * Dm;
            const Ym = 12 * Mm;

            let timeStr="";

            let ms=moment().diff(moment(time), 'millisecond')

            if(ms>=Ym){
                return `${Math.floor(ms / Ym)}年前`
            }else if(ms>Mm){
                return `${Math.floor(ms / Mm)}月前`
            }else if(ms>Dm){
                return `${Math.floor(ms / Dm)}日前`
            }else if(ms>hm){
                return `${Math.floor(ms / hm)}小时前`
            }else if(ms>mm){
                return `${Math.floor(ms / mm)}分前`
            }else if(ms>sm){
                return `${Math.floor(ms / sm)}秒前`
            }
        }
    }

}