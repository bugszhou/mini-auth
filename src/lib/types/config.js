/**
 * 默认配置
 * @type {{}}
 */

const defaultConfig = {
  withCredentials: false,
  env: 'weapp',
  appid: 'mockAppid',
  tokenReqConfig: {
    url: '',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    timeout: 10000,
  },
  userInfoReqConfig: {
    url: '',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    timeout: 10000,
  },
};

export default defaultConfig;
