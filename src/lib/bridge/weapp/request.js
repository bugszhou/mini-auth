/**
 * request参数列表
 * @param url  接口地址
 * @param data  请求的参数
 * @param method  接口调用成功的回调函数
 * @param success  接口调用成功的回调函数
 * @param fail  接口调用失败的回调函数
 * @param complete  接口调用结束的回调函数（调用成功、失败都会执行）
 */
import response from '../request/response';

export default function({
  url, data, headers, method,
} = { method: 'GET', data: {} }) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      header: headers,
      method,
      success: (res) => {
        resolve(response({ errCode: 0, ...res }));
      },
      fail: (err) => {
        let errCode = 5003;
        if (err.errMsg) {
          const errMsg = err.errMsg.toLowerCase();
          if (errMsg.indexOf('timeout') > -1) {
            errCode = 5001;
          } else {
            errCode = 5002;
          }
        } else {
          errCode = 5003;
        }
        reject(response({ errCode, ...err }));
      },
    });
  });
}
