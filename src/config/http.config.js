/**
 * @author chenlingyu
 */
const getUrl = () => {
    switch (process.env.NODE_ENV) {
        case 'development':
            return {
                // apiUrl: 'http://192.168.31.15:8001/',
                apiUrl: 'http://192.168.1.37:8002/',
                // apiUrl: 'http://127.0.0.1:8001/',
                // apiUrl: 'http://112.19.161.99:3780/s/edu/',
            }
        case 'test':
            return {
                apiUrl: 'http://192.168.1.38/s/edu/',
            }
        case 'production':
            return {
                apiUrl: 'http://122.112.142.111/s/edu/',
            }
    }
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
        messageListen:{
            name: "messageListen",
            timeOut:10*1000
        }
    }

}