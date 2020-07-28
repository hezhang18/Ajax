const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// 测试页面请求接口
app.get('/', (req, res)=>{
    res.send('Server 1 Start Success');
})

app.get('/test', (req, res)=>{
    res.send('ok');
})

app.listen(3001);
console.log('Server 1 Start Success');