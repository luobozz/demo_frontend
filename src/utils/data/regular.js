/**
 * @author chenlingyu
 */

export default {
    ip: /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}($|:\d{1,8}$)/,
    tel: /^1\d{10}$/,
    azOrNumber:/^[A-Za-z0-9]+$/,
    number:{
        GTZero:/^[1-9]\d*$/
    }
}