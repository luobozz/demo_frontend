/**
 * @author chenlingyu
 */
const getUrl = () => {
    const processUrl = {
        development: {
            // apiUrl: 'http://122.112.142.111/s/edu/',
            apiUrl: 'http://localhost:3000',
        },
        test: {
            apiUrl: 'http://119.3.108.48:8001',
        },
        production: {
            apiUrl: 'http://119.3.108.48:8001',
        },
    }

    return processUrl[process.env.NODE_ENV]

}

export default {
    url: getUrl(),
    responseMessage: {
        code: 0,
        msg: '',
        data: null,
        succeed: true
    },
    header: {
        Authorization: "Authorization",
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