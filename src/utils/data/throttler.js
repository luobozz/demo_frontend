const throttleTimer = {}, defaultThrottleTimes = 200

/**
 * 节流器工具集
 * @type {{throttleQuit(*): void}}
 */
export const throttlerTools = {
    /**
     * 主动退出节流方法，在异步线程里可以主动退出不等待
     * @param keys
     */
    throttleQuit(keys) {
        if (Object.prototype.hasOwnProperty.call(throttleTimer, keys)) {
            delete throttleTimer[keys]
        }
    }
}

/**
 * 节流器
 *
 * @param times 可传入节流器节流时间或者默认
 * @returns {boolean|{throttle(*, *, ...[*]): boolean}}
 * @private
 */
export const throttler = (times) => {
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
                    throttlerTools.throttleQuit(keys)
                }, throttleTimes)
                return false
            } else {
                console.warn(`[throttle] keys: '${keys}'`)
                return true
            }
        },
    }
}

// export default {
//     throttler,
//     throttlerTools
// };