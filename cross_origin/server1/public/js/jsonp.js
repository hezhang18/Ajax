function jsonp(options) {
    let params = '';
    for(let attr in options.data){
        params += '&' + attr + '=' + options.data[attr];
    }
    
    let callback = 'jsonp' + Math.random().toString().substring(2);
    window[callback] = options.success;

    let script = document.createElement('script');
    script.src = options.url + '?callback=' + callback + params;
    document.body.appendChild(script);
    script.onload = function() {
        document.body.removeChild(script);
    }
}