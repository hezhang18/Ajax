const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// CORS 解决同源限制的配置方法
/* app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin','http://localhost:3001'); //当允许携带cookies此处的白名单不能写’*’
    res.header('Access-Control-Allow-Headers','content-type,Content-Length, Authorization,Origin,Accept,X-Requested-With'); //允许的请求头
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT'); //允许的请求方法
    res.header('Access-Control-Allow-Credentials',true);  //允许携带cookies
    next();
}); */

// 测试页面请求接口
app.get('/', (req, res)=>{
    res.send('Server 2 Start Success');
})

// server1 中 13_Ajax请求限制测试 请求接口
app.get('/test', (req, res)=>{
    res.send('ok');
})

// server1 中 14_JSONP解决同源限制 请求接口
app.get('/jsonp', (req, res)=>{
    const result = 'fn({name: "Jeff",age: 20})';
    res.send(result);
})

// server1 中 14_JSONP解决同源限制 请求接口
app.get('/better', (req, res)=>{
    // 2. JSONP 代码优化 请求接口
    // const callback = req.query.callback;
    // const result = callback + '({name: "Pony",age: 30})';
    // res.send(result);

    // 3. JSONP 代码封装 请求接口
    let result = req.query;
    res.jsonp(result);
})


app.listen(3002);
console.log('Server 2 Start Success');