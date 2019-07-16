/**
 * login参数列表
 * @param timeout  超时时间，单位ms
 * @param success  接口调用成功的回调函数
 * @param fail  接口调用失败的回调函数
 * @param complete  接口调用结束的回调函数（调用成功、失败都会执行）
 */

export default function({ timeout } = { timeout: 20000 }) {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout,
      success: (res) => {
        resolve({
          errCode: 0,
          errMsg: '',
          jsCode: res.code,
        });
      },
      fail: (err) => {
        reject({
          errCode: 5000,
          errMsg: err.errMsg || JSON.stringify(err),
          jsCode: '',
        });
      },
    });
  });
}
