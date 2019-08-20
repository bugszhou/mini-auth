/**
 * request参数列表
 * @param url  接口地址
 * @param data  请求的参数
 * @param method  接口调用成功的回调函数
 * @param success  接口调用成功的回调函数
 * @param fail  接口调用失败的回调函数
 * @param complete  接口调用结束的回调函数（调用成功、失败都会执行）
 */
import getGlobal from '../../utils/getGlobal';
import response from '../../core/response';
import evtEmit from '../../utils/evt';
import { TOKEN_ALI_BEFORE_REQUEST, TOKEN_ALI_SUCCESS_REQUEST, TOKEN_ALI_FAIL_REQUEST } from '../../core/tokenEvent';

const gloableObj = getGlobal();

export default function({
  url, data, headers, method, timeout, self,
} = { method: 'GET', data: {} }) {
  return new Promise((resolve, reject) => {
    gloableObj.request({
      url,
      data,
      headers,
      method,
      timeout,
      success: (res) => {
        resolve(response({ errCode: 0, ...res }));
        evtEmit(self, TOKEN_ALI_SUCCESS_REQUEST, {
          res,
        });
      },
      fail: (err) => {
        let errCode = 5006;
        if (err.errMsg) {
          const errMsg = err.errMsg.toLowerCase();
          if (errMsg.indexOf('timeout') > -1) {
            errCode = 5007;
          } else {
            errCode = 5008;
          }
        } else {
          errCode = 5006;
        }
        reject(response({ errCode, ...err }));
        evtEmit(self, TOKEN_ALI_FAIL_REQUEST, {
          err,
        });
      },
    });
    evtEmit(self, TOKEN_ALI_BEFORE_REQUEST, {
      url, data, headers, method, timeout,
    });
  });
}
