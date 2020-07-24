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
        dataArr = [],
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
        }else{
            xhr.send(params);
        }
        
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