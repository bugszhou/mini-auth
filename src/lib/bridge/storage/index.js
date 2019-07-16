import weappStorage from '../weapp/storage';

export function setStorageSync({ env } = { env: 'weapp' }) {
  return function selfSetStorageSync(key = '', data = '') {
    try {
      switch (env) {
      case 'aliapp':
      case 'swan':
      case 'ttapp':
      case 'weapp':
      default:
        weappStorage.setStorageSync(key, data);
      }
    } catch (e) {
      throw e;
    }
  };
}

export function getStorageSync({ env } = { env: 'weapp' }) {
  return function selfGetStorageSync(key = '') {
    try {
      switch (env) {
      case 'aliapp':
      case 'swan':
      case 'ttapp':
      case 'weapp':
      default:
        weappStorage.getStorageSync(key);
      }
    } catch (e) {
      throw e;
    }
  };
}

export function removeStorageSync({ env } = { env: 'weapp' }) {
  return function selfRemoveStorageSync(key = '') {
    try {
      switch (env) {
      case 'aliapp':
      case 'swan':
      case 'ttapp':
      case 'weapp':
      default:
        weappStorage.removeStorageSync(key);
      }
    } catch (e) {
      throw e;
    }
  };
}
