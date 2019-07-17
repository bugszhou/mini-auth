import weapp from '../weapp/storage';

export function setStorageSync({ env } = { env: 'weapp' }) {
  return function selfSetStorageSync(key = '', data = '') {
    try {
      switch (env) {
      case 'aliapp':
      case 'swan':
      case 'ttapp':
      case 'weapp':
      default:
        weapp.setStorageSync(key, data);
      }
    } catch (e) {
      throw e;
    }
  };
}

export function getStorageSync({ env } = { env: 'weapp' }) {
  return function selfGetStorageSync(key = '') {
    let data = null;
    try {
      switch (env) {
      case 'aliapp':
      case 'swan':
      case 'ttapp':
      case 'weapp':
      default:
        data = weapp.getStorageSync(key);
      }
    } catch (e) {
      throw e;
    }
    return data;
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
        weapp.removeStorageSync(key);
      }
    } catch (e) {
      throw e;
    }
  };
}
