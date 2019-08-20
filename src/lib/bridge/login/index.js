import merge from 'lodash/merge';
import checkOpts from './types';
import defaultConfig from './config';
import weappLogin from '../weapp/login';
import myLogin from '../aliapp/login';

export default function getJsCode({
  timeout, env, scopes, force, self,
} = { env: 'weapp' }) {
  let reqPromise = null;
  checkOpts(merge(defaultConfig, {
    timeout,
    scopes,
    force,
  }));

  switch (env) {
  case 'aliapp':
    reqPromise = myLogin({ scopes, self });
    break;
  case 'swan':
  case 'ttapp':
  case 'weapp':
  default:
    reqPromise = weappLogin({ timeout, self });
  }
  return reqPromise;
}
