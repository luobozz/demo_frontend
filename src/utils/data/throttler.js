const throttleTimer = {}, defaultThrottleTimes = 200

/**
 * 节流器
 *
 * @param times 可传入节流器节流时间或者默认
 * @returns {boolean|{throttle(*, *, ...[*]): boolean}}
 * @private
 */
const _ = (times) => {
    const throttleTimes = times || defaultThrottleTimes
    return {
        /**
         *
         * 节流方法
         *
         * @param keys
         * @param cb 非必须
         * @param params 非必须
         * @returns {boolean} true/false 被节流阻断/未被节流阻断
         */
        throttle(keys, cb, ...params) {
            if (!Object.prototype.hasOwnProperty.call(throttleTimer, keys)) {
                throttleTimer[keys] = "throttle"
                typeof cb === "function" && (() => {
                    cb(...params)
                })()
                setTimeout(() => {
                    delete throttleTimer[keys]
                }, throttleTimes)
                return false
            } else {
                console.warn(`[throttle] keys: '${keys}'`)
                return true
            }
        },
    }
}

export default _;