const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// 测试页面请求接口
app.get('/', (req, res)=>{
    res.send('Server Start Success');
})

// 02 页面请求接口
app.get('/first', (req, res)=>{
    res.send('Hello Ajax');
})

// 03 页面请求接口
app.get('/jsonGet', (req, res)=>{
    res.send({'name': 'Jeff'});
})

// 04 页面请求接口
app.get('/get', (req, res)=>{
    res.send(req.query);
})

// 05 页面请求接口
app.post('/post', (req, res)=>{
    res.send(req.body);
})

// 06 页面请求接口
app.post('/jsonPost', (req, res)=>{
    res.send(req.body);
})

// 07 页面请求接口
app.get('/readyState', (req, res)=>{
    res.send('Hello');
})

// 08 页面请求接口
app.get('/error', (req, res)=>{
    res.status(400).send('not ok');
})

// 09 页面请求接口
app.get('/cache', (req, res)=>{
    fs.readFile('./test.txt', (err, result)=>{
        res.send(result);
    }) 
})

app.listen(3000);
console.log('Server Start Success');