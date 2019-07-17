# mini-auth使用文档

先安装包：

```bash
npm install -S mini-auth
```

在需要使用的文件里面引入包：

```javascript
import { miniAuth } from 'mini-auth';
```

初始化`mini-auth`:

```javascript
const auth = miniAuth.create({
  appid: 'mock_appid',
  env: 'weapp', // [ weapp, aliapp, ttapp, swan]
  // 获取token配置
  tokenReqConfig: {
    url: 'https://xxx.xxxx.com/login', // 服务端接口url
    method: 'POST',
  },
});
```

添加请求`token`前的中间件，在发送请求前执行

```javascript
auth.use('token', (ctx, next) => {
  // tokenReqData为请求token传递给服务端的参数
  const { jsCode } = ctx.tokenReqData;
  if (jsCode) {
    // 修改参数
    ctx.tokenReqData = {
      code: jsCode,
      sign: 'mock_sign',
    };
  }
  next();
});
```

添加请求到`token`后的中间件，在接收请求成功后执行

```javascript
auth.use('afterToken', (ctx, next) => {
  // tokenResData为请求token后传递给小程序的参数
  const tokenResData = ctx.tokenResData;
  if (tokenResData.code === 200) {
    // 修改数据
    ctx.tokenResData = 'demo';
    return next();
  }
  return next(new Error('error msg'));
});
```

小程序内使用方法

```javascript
auth.getToken()
      .then((res) => {
        console.log('getToken ===> ', res);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        console.log('finally');
      });
```

