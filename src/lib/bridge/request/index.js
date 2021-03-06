import merge from 'lodash/merge';
import checkOpts from './types';
import defaultConfig from './config';
import weappReq from '../weapp/request';
import myReq from '../aliapp/request';

export default function request({
  url, timeout, data, headers, method, env, self,
} = { env: 'weapp' }) {
  let reqPromise = null;
  checkOpts(merge(defaultConfig, {
    url,
    timeout,
    data,
    headers,
    method,
  }));

  switch (env) {
  case 'aliapp':
    reqPromise = myReq({
      self,
      url,
      data,
      headers,
      method,
    });
    break;
  case 'swan':
  case 'ttapp':
  case 'weapp':
  default:
    reqPromise = weappReq({
      self,
      url,
      data,
      headers,
      method,
    });
  }
  return reqPromise;
}
