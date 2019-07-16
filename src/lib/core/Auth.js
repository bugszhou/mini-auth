import { defaultSign } from 'mksign';
import Base from '../interface';
import login from '../bridge/login';
import request from '../bridge/request';
import { setStorageSync, getStorageSync, removeStorageSync} from "../bridge/storage";

class MiniAuth extends Base {
  // 配置
  #config = {};

  // 等待队列
  #waitQueues = [];

  // 获取token时的中间件
  #tokenMiddles = [];

  // 获取userInfo时的中间件
  #userMiddles = [];

  // token存储有效期(ms)
  #expires = 6800 * 1000;

  constructor(config = {}) {
    super();
    this.#config = config;
  }

  // 获取配置
  get config() {
    return this.#config;
  }

  // 获取缓存队列
  get queue() {
    return this.waitQueues;
  }

  /**
   *  增加中间件
   * @param type enum [ token, user ]
   * @param middleFn function
   */
  use(type = '', middleFn = () => {
  }) {
    if (typeof middleFn === 'function') {
      if (type === 'token') {
      } else if (type === 'user') {
        this.#userMiddles.push(middleFn);
      }
    }
  }

  /**
   * 存储token
   */
  set2Storage(type = 'token', data = {}) {
    const storageData = this.#storageModel(type, data);
    let retry = 3;
    selfSet2Storage(retry);
    function selfSet2Storage(retry) {
      try {
        setStorageSync(storageData.key, storageData.data);
      } catch (e) {
        console.error(e);
        if (retry > 0) {
          selfSet2Storage(retry - 1);
        }
      }
    }
  }

  /**
   * 获取token
   */
  getDataFromStorage(type = 'token') {
    let data = {};
    try {
      data = getStorageSync(this.#storageKey(type));
    } catch (e) {
      console.error(e);
    }
    return data;
  }

  /**
   * 清除storage
   */
  clearStorage(type = 'token') {
    try {
      removeStorageSync(this.#storageKey(type));
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * 获取storage的key
   * @param type
   * @returns {string}
   */
  #storageKey(type = 'token') {
    return `MINI_AUTH:${type}:${this.#config.appid}`;
  }

  /**
   * 存储token格式
   * key: TOKEN:{appid}
   * {
   *    token: '',
   *    expires: 6800000,
   *    expirationTime: Date.now() + 6800000
   * }
   */
  #storageModel(type = 'token', data = {}) {
    return {
      key: this.#storageKey(type),
      data: {
        data,
        expires: this.#expires,
        expirationTime: Date.now() + this.#expires,
      }
    }
  }

  /**
   * 请求服务端获取token
   */
  getToken({ isRefresh, withCredentials } = { isRefresh: false, withCredentials: true }) {
    // get code
    // request token
    // 检测storage有没有token，没有则直接请求后端
    // 有，则判断是否过期
    // 过期则清理缓存，请求后端
    // 没有过去则返回
    // 如果强制刷新token,则执行token获取流程
    const env = this.#config.env,
      tokenReqConfig = this.#config.tokenReqConfig,
      url = tokenReqConfig.url,
      method = tokenReqConfig.method;

    return login({
      env,
    })
      .then(({ jsCode }) => {
        // 执行req中间
        return request({
          env,
          url,
          method,
          data: {
            js_code: jsCode,
          }
        });
      })
      .then((res) => {
        // 执行res中间
        return res;
      });

    // login({
    //   env: this.#config.env
    // });
  }
}

export default MiniAuth;
