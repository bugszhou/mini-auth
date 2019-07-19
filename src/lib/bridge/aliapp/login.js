/**
 * login参数列表
 * @param timeout  超时时间，单位ms
 * @param success  接口调用成功的回调函数
 * @param fail  接口调用失败的回调函数
 * @param complete  接口调用结束的回调函数（调用成功、失败都会执行）
 */
import getGlobal from '../../utils/getGlobal';

const gloableObj = getGlobal();

export default function({ scopes } = { scopes: ['auth_base'] }) {
  return new Promise((resolve, reject) => {
    gloableObj.getAuthCode({
      scopes,
      success: (res) => {
        resolve({
          errCode: 0,
          errMsg: '',
          jsCode: res.authCode,
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
