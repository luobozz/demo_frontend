import Vue from 'vue';
import moment from 'moment';
import momentConfig from "../config/moment.config"

Vue.filter('dateFormat', function(dataStr) {
    return moment(dataStr).format(momentConfig.format.normal)
})

Vue.filter('dateFormatNoHMS', function(dataStr) {
    return moment(dataStr).format(momentConfig.format.onlyDate)
})

export default {
};
