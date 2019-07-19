import merge from 'lodash/merge';
import checkOpts from './types';
import defaultConfig from './config';
import weappLogin from '../weapp/login';
import myLogin from '../aliapp/login';

export default function getJsCode({
  timeout, env, scopes, force,
} = { env: 'weapp' }) {
  let reqPromise = null;
  checkOpts(merge(defaultConfig, {
    timeout,
    scopes,
    force,
  }));

  switch (env) {
  case 'aliapp':
    reqPromise = myLogin({ scopes });
    break;
  case 'swan':
  case 'ttapp':
  case 'weapp':
  default:
    reqPromise = weappLogin({ timeout });
  }
  return reqPromise;
}
