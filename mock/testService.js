const express = require('express'); //1
const server = express(); //2


server.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    // //允许的header类型
    res.header("Access-Control-Allow-Headers", "*");
    // //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // 可以带cookies
    res.header("Access-Control-Allow-Credentials", true);
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
})

server.get('/auth/login', (request, response) => { //3
    response.end('success');
});

server.get('/auth/role', (request, response) => { //3
    response.writeHead(500, 'Current password does not match', { 'content-type': 'text/plain' });
    response.end('Current value does not match');
});

server.listen(3000); //4