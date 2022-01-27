import {themeJSON} from '../../config/echarts.theme.config'
import eCharts from 'echarts'
export default {
    init(dom){
        eCharts.registerTheme('walden', themeJSON)
        return eCharts.init(dom,'walden')
    }
}