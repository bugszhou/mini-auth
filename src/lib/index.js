import merge from 'lodash/merge';
import checkOpts from './types/configType';
import MiniAuth from './core/Auth';
import defaultConfig from './types/config';

export const MODULE_NAME = 'mini-auth';

function createInstance(config = {}) {
  const opts = merge(defaultConfig, config);
  checkOpts(opts);
  return new MiniAuth(opts);
}

const miniAuth = createInstance(defaultConfig);

miniAuth.create = createInstance;

export { miniAuth };

export default MiniAuth;