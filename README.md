## mini-auth
----------------------------
author: bugszhou | Email:bugszhou@outlook.com <br>
description: 小程序获取openid登录流程

### 获取openid过程

1. 调用`wx.login`得到`code`
2. 将`code`通过接口传递给服务端
3. 服务端根据`code`请求微信服务端获取到`openid`和`session_key`等信息(有可能有`unionid`)
4. `session_key`主要用来解密小程序端通过`getUserInfo`接口获取到的加密数据
5. 获取到微信服务端的数据后，服务端返回一个`ticket`作为用户的唯一标识，为后续请求接口提供凭证

### 解密`getUserInfo`获取到的`encryptedData`

1. `wx.checkSession`来判断`session_key`是否过期
2. 执行`success`回调，则`session_key`未过期
3. 执行`fail`回调，则已过期，需要重新执行`获取openid过程`来刷新服务端缓存的`session_key`
4. 将`rawData、signature、encryptedData、iv`传递给服务端解密获得数据

- **并发队列控制**

ticket是所有需要认证的接口的凭证，可能在一个页面存在多个请求。如果A请求的时候，服务端鉴定ticket失效，这个时候需要重新执行`获取openid过程`
假设这个页面还有B接口请求，同样也会出现ticket失效的错，此时，很有可能执行两次`获取openid过程`生成两次ticket，造成服务端资源浪费
为了避免这个种情况，我们在`mini-auth`库中增加了锁了队列控制，只要有执行`获取openid过程`，则后续的调用将存放在一个队列内，等待ticket重新生成后，
执行队列内的所有等待的函数

### 返回码

| 返回码 | 说明 |
| --- | --- |
| 0 | 成功 |
| 5000 | 微信小程序code获取失败 |
| 5001 | 微信小程序发送请求超时 |
| 5002 | 微信小程序发送请求服务端无法连接 |
| 5003 | 微信小程序发送请求未知异常 |

