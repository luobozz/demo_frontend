import dataUtils from '../utils/data/index'
/**
 * 枚举类
 * @author wanghengjin
 */
export class Enum {
    length() {
        return Object.keys(this).length
    }
    /**
     * 添加枚举字段
     * field: 枚举字段
     * label: 界面显示
     * value: 枚举值
     */
    add (field, label, value) {
        this[field] = {label, value}
        return this
    }

    /**
     * 获取默认
     */
    getIndex(index){
        let i=index?index:0;
        let keys = Object.keys(this);
        return this[keys[i]]
    }

    /**
     * 根据枚举value获取其label
     */
    getLabelByValue (value) {
        // 字段不存在返回‘’
        if (value === undefined || value === null) {
            return ''
        }
        for (let i in this) {
            let e = this[i]
            if (e && e.value === value) {
                return e.label
            }
        }

        return ''
    }

    /**
     *
     * @returns {[]}
     */
    getValueArray(){
        let array=[];
        for (let i in this) {
            array.push(this[i].value)
        }
        return array;
    }

    /**
     * 根据枚举value获取其label(转JSON)
     */
    getJsonLabelByValue (value,isArray) {
        // 字段不存在返回‘’
        if (value === undefined || value === null) {
            return dataUtils.jsonParse(value,isArray)
        }
        for (let i in this) {
            let e = this[i]
            if (e && e.value === value) {
                return dataUtils.jsonParse(e.label,isArray)
            }
        }

        return dataUtils.jsonParse('',isArray)
    }
}

export default Enum