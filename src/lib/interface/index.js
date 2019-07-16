import EventEmitter from 'events';

class Base extends EventEmitter {
  // 配置
  #config = {};

  // 等待队列
  #waitQueues = [];

  // 获取token时的中间件
  #tokenMiddles = [];

  // 获取userInfo时的中间件
  #userMiddles = [];

  constructor() {
    super();
  }

  // 获取配置
  config() {}

  // 获取缓存队列
  queue() {}

  // 增加中间件
  use(type = '', middleFn = () => {}) {}

  // 获取token
  getToken({ isRefresh, withCredentials } = { isRefresh: false, withCredentials: true }) {}

  // 获取用户信息
  getUserInfo({
    rawData, signature, encryptedData, iv,
  } = {}) {}

  // 订阅事件
  addEventListener(evt, cb = () => {}) {}
}

export default Base;
