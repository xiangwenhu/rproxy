# rproxy
专门用来代理请求的项目， 现在很多的公网的请求都做了cors限定，贼烦。 就酱紫。


最初是做了一个简单的京东历史价格查询的插件，比如
https://tool.manmanbuy.com/history.aspx?DA=1&action=gethistory&url=https%3A//item.jd.com/7019143.html&bjid=&spbh=&cxid=&zkid=&w=951&token=f89x908ef78c38e5a6d80b3a59111b0b0ed2arsox38。

刚开始还能好好的使用，后来出现：
Cross-Origin Read Blocking (CORB) blocked cross-origin response， 外加自己需要一个http代理的小服务。  

就简单写了一个。

## 使用

headers参数
* _appid   
    应用id, secret.js 里面配置
* _key   
    应用key, secret.js 里面配置
* _target   
  GET请求时生效，代理到的目标域名
* _useBody
  是否使用自定义的proxy配置选项   
  GET 时使用header的_proxy，服务会把_proxy转为JSON。  
  POST,PUT等时，body的格式应该为`{proxy:..., data:...}`, 会把proxy作为代理选项，data作为实际的数据传递。目前支持`application/json`与`application/x-www-form-urlencoded`
* _proxy   
  _useBody 配置了并且是GET请求时生效，   
  代理配置的字符串， 具体配置参考
  https://github.com/chimurai/http-proxy-middleware



localhost 修改为自己的域名或者地址

GET请求
```js
$.ajax({
    url:"http://localhost:6006/api/history.aspx?DA=1&action=gethistory&url=https%3A//item.jd.com/7019143.html&bjid=&spbh=&cxid=&zkid=&w=951&token=f89x908ef78c38e5a6d80b3a59111b0b0ed2arsox38",
    headers:{
        _appId: "jd-h-price",
        _key: "jj-dd-pp",
        _target: "https://tool.manmanbuy.com"
    }
})
```


POST请求