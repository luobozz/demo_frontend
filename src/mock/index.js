import Mock from 'mockjs'

if (process.env.NODE_ENV === 'development'||process.env.NODE_ENV ==='test') {
    console.log('[DEVELOP_MOCK] mock starting...')

    Mock.Random.extend({
        phone: function () {
            let phonePre = ['132', '135', '189']
            return this.pick(phonePre) + Mock.mock(/\d{8}/)
        }
    })

    // 修复 mockjs 相关 bug
    Mock.XHR.prototype.send = (() => {
        const _send = Mock.XHR.prototype.send
        return function() {
            if (!this.match) {
                this.custom.xhr.responseType = this.responseType || ''
                this.custom.xhr.timeout = this.timeout || 0
                this.custom.xhr.withCredentials = this.withCredentials || false
                this.custom.xhr.onabort = this.onabort || null
                this.custom.xhr.onerror = this.onerror || null
                this.custom.xhr.onload = this.onload || null
                this.custom.xhr.onloadend = this.onloadend || null
                this.custom.xhr.onloadstart = this.onloadstart || null
                this.custom.xhr.onprogress = this.onprogress || null
                this.custom.xhr.onreadystatechange = this.onreadystatechange || null
                this.custom.xhr.ontimeout = this.ontimeout || null
            }
            return _send.apply(this, arguments)
        }
    })()

    Mock.setup({
        timeout: 800 // setter delay time
    })

    require('./services/test-mock')

    console.log('[DEVELOP_MOCK] mock has mounted...')
}