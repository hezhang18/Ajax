# Ajax

项目文件介绍：Ajax 相关内容的介绍及演示代码存放于 public 文件夹中。app.js 文件为服务器环境，可使用 node 或 pm2 开启。

Ajax 技术需要运行在网站环境中才能生效，使用前需提前搭建网站环境。

1 使用该项目中已经搭建好的服务器环境

（1）克隆该项目到本地

（2）命令行工具进入 Ajax 文件夹，输入 cnpm install 命令安装依赖

（3）输入 node app 开启本地服务器，浏览器访问本地 3000 端口即可访问到项目

2 自己手动搭建服务器环境（以 express 为例）

（1）创建项目文件夹 Ajax

（2）进入 Ajax 文件夹，创建 public 文件夹用于存放前端项目文件

（3）创建 app.js 文件，搭建本地服务器代码如下：

```
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);
console.log('server start success');
```
3 Ajax 封装源码
```
ajax({
    type: 'get',
    url: 'http://localhost:3000',
    data: {
        name: 'Jeff',
        age: '20'
    },
    header: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function(data) {
        console.log(data);
    },
    error: function(data) {
        console.log(data);
    }
});

function ajax(options) {
    // 设置默认参数，用户新传入的参数可以覆盖默认参数
    let defaults = {
        type: 'get',
        url: '',
        data: {},
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function() {},
        error: function() {}
    }
    Object.assign(defaults, options);

    // 定义变量
    let type = defaults.type.toUpperCase(),
        url = defaults.url,
        data = defaults.data,
        header = defaults.header,
        success = defaults.success,
        error = defaults.error,
        dataArr = []，
        params = '';
    
    // 创建 Ajax，兼容 IE 的写法
    let xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    
    // 将 data 中要传递的对象类型参数转换为 & 连接的字符串类型参数
    for(let key in data){
        dataArr.push(key + '=' +data[key]);
    }
    params = dataArr.join('&');

    // GET 请求：将参数拼接到 URL 后边并发送请求
    if(type == 'GET'){
        url = url + '?' + params;
        xhr.open(type, url.replace(/\?$/g,''), true); //true表示异步
        xhr.send();
    }
    
    // POST 请求：获取参数请求格式类型，JSON 格式需先将对象类型转换为对象字符串类型
    if(type === 'POST') {
        let contentType = header['Content-Type'];
        xhr.open(type, url, true); // true 表示异步
        xhr.setRequestHeader('Content-Type', contentType);
        if(contentType === 'application/json') {
            xhr.send(JSON.stringify(data))
        }
        xhr.send(params);
    }
    
    // 获取响应数据的格式类型，JSON 格式的需将对象字符串类型转换为对象类型
    xhr.onload = function() {
        let contentType = xhr.getResponseHeader('Content-Type');
        let responseText = xhr.responseText;
        
        if(contentType.includes('application/json')) {
            responseText = JSON.parse(responseText)
        }

        if((xhr.status>=200 && xhr.status<300) || xhr.status==304) {
            success(responseText);
        }else{
            error(responseText);
        }
        
    }
} 
```