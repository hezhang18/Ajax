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

// 12 页面请求接口, 需要使用 formidable
// 1. FormData 的使用
app.post('/formData', (req, res)=>{
    // 创建 formidable 表单解析对象
    const form = new formidable.IncomingForm();
    // 解析客户端传过来的 FormData 对象
    form.parse(req, (err, fields, files) => {
        res.send(fields);
    })
})

// 12 页面请求接口, 需要使用 formidable
// 2. FormData 二进制文件上传
app.post('/upload', (req, res)=>{
    // 创建 formidable 表单解析对象
    const form = new formidable.IncomingForm();
    // 设置上传文件的存储路径
    form.uploadDir = path.join(__dirname, 'public', 'uploads');
    // 保留上传文件的后缀名
    form.keepExtensions = true;
    // 解析客户端传过来的 FormData 对象
    form.parse(req, (err, fields, files) => {
        // 2. FormData 二进制文件上传
        // res.send('ok');
        
        // 3. 图片文件上传实时预览，attrName 来自前端代码：formData.append('attrName', this.files[0]);
        res.send({
            path: files.attrName.path.split('public')[1]
        });
    })
})



app.listen(3000);
console.log('Server Start Success');