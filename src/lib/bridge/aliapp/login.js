/**
 * login参数列表
 * @param timeout  超时时间，单位ms
 * @param success  接口调用成功的回调函数
 * @param fail  接口调用失败的回调函数
 * @param complete  接口调用结束的回调函数（调用成功、失败都会执行）
 */
import getGlobal from '../../utils/getGlobal';
import evtEmit from '../../utils/evt';
import { TOKEN_ALI_BEFORE_LOGIN, TOKEN_ALI_SUCCESS_LOGIN, TOKEN_ALI_FAIL_LOGIN } from '../../core/tokenEvent';

const gloableObj = getGlobal();

export default function({ scopes, self } = { scopes: ['auth_base'] }) {
  return new Promise((resolve, reject) => {
    gloableObj.getAuthCode({
      scopes,
      success: (res) => {
        resolve({
          errCode: 0,
          errMsg: '',
          jsCode: res.authCode,
        });
        evtEmit(self, TOKEN_ALI_SUCCESS_LOGIN, { res });
      },
      fail: (err) => {
        reject({
          errCode: 5009,
          errMsg: err.errMsg || JSON.stringify(err),
          jsCode: '',
        });
        evtEmit(self, TOKEN_ALI_FAIL_LOGIN, { err });
      },
    });
    evtEmit(self, TOKEN_ALI_BEFORE_LOGIN, { scopes });
  });
}
