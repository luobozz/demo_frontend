/**
 * @author chenlingyu
 */
const getUrl = () => {
    const processUrl = {
        development: {
            apiUrl: 'http://119.3.108.48:8001/',
        },
        test: {
            apiUrl: 'http://119.3.108.48:8001/',
        },
        production: {
            apiUrl: 'http://119.3.108.48:8001/',
        },
    }

    return processUrl[process.env.NODE_ENV]

}

export default {
    url: getUrl(),
    responseMessage: {
        code: 0,
        msg: '',
        data: [],
        total: 0,
        timestamp: new Date().getTime()
    },
    header: {
        ACCESS_TOKEN: "ACCESS_TOKEN",
        ACCESS_ORIGIN: "ACCESS_ORIGIN"
    },
    httpTimer: {
        heartbeat: {
            name: "heartbeat",
        },
        messageListen: {
            name: "messageListen",
            timeOut: 10 * 1000
        }
    }

}