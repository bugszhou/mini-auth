import getGlobal from '../../utils/getGlobal';

const gloableObj = getGlobal();

export default {
  setStorageSync: gloableObj.setStorageSync.bind(gloableObj),
  getStorageSync: gloableObj.getStorageSync.bind(gloableObj),
  removeStorageSync: gloableObj.removeStorageSync.bind(gloableObj),
};
