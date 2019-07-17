import Base from '../interface';
import {
  TOKEN_BEFORE_REFRESH,
  TOKEN_AFTER_REFRESH,
  TOKEN_BEFORE_CACHE,
  TOKEN_AFTER_CACHE,
  TOKEN_EXPIRED,
  TOKEN_BEFORE_LOGIN,
  TOKEN_AFTER_LOGIN,
  TOKEN_BEFORE_REQUEST,
  TOKEN_AFTER_REQUEST
} from './tokenEvent';
import Middleware from './Middleware';
import login from '../bridge/login';
import request from '../bridge/request';
import { setStorageSync, getStorageSync, removeStorageSync } from "../bridge/storage";

const TOKEN_TYPE = 'token',
  AFTER_TOKEN_TYPE = 'afterToken',
  USER_TYPE = 'user';

class MiniAuth extends Base {
  // 配置
  #config = {};

  // 等待队列
  #waitQueues = [];

  // 获取token时的中间件
  #tokenMiddles = [];

  // 获取token后的中间件
  #afterMiddles = [];

  // 获取userInfo时的中间件
  #userMiddles = [];

  // token存储有效期(ms)
  #expires = 6800 * 1000;

  // 是否正在请求
  #isTokenReq = false;

  // 请求token数据
  tokenReqData = {};

  // token响应数据
  tokenResData = {};

  constructor(config = {}) {
    super();
    this.middleware = new Middleware();
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
      switch (type) {
        case AFTER_TOKEN_TYPE:
          this.#afterMiddles.push(middleFn);
          break;
        case USER_TYPE:
          this.#userMiddles.push(middleFn);
          break;
        case TOKEN_TYPE:
        default:
          this.#tokenMiddles.push(middleFn);
      }
    }
  }

  /**
   * 存储token
   */
  set2Storage(type = TOKEN_TYPE, data = {}) {
    const storageData = this.#storageModel(type, data);
    let retry = 3;
    return selfSet2Storage.call(this, retry);

    function selfSet2Storage(retry) {
      try {
        setStorageSync(this.#config.env)(storageData.key, storageData.data);
      } catch (e) {
        console.error(e);
        if (retry > 0) {
          selfSet2Storage.call(this, retry - 1);
        }
      }
      return storageData.data;
    }
  }

  /**
   * 获取token
   */
  getDataFromStorage(type = TOKEN_TYPE) {
    let data = null;
    try {
      data = getStorageSync(this.#config.env)(this.#storageKey(type));
    } catch (e) {
      console.error(e);
    }
    return data;
  }

  /**
   * 清除storage
   */
  clearStorage(type = TOKEN_TYPE) {
    try {
      removeStorageSync(this.#config.env)(this.#storageKey(type));
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * 获取storage的key
   * @param type
   * @returns {string}
   */
  #storageKey(type = TOKEN_TYPE) {
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
  #storageModel(type = TOKEN_TYPE, data = {}) {
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
   * 判断storage内数据是否过期
   * @param data
   * @returns {boolean} true为过期，false为未过期
   */
  isExpired(data = {}) {
    if (data) {
      const { expirationTime } = data;
      if (expirationTime && expirationTime > Date.now()) {
        return false;
      }
      return true;
    }
    return true;
  }

  /**
   * 执行队列
   */
  runQueues(err, data) {
    if (this.#waitQueues && Array.isArray(this.#waitQueues)) {
      const len = this.#waitQueues.length;
      this.#waitQueues.splice(0, len).forEach(({ resolve, reject}) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    }
  }

  /**
   * 请求服务端获取token
   */
  getToken({ isRefresh } = { isRefresh: false }) {
    return new Promise((resolve, reject) => {
      //
      if (this.#isTokenReq) {
        return this.#waitQueues.push({ resolve, reject });
      }
      const env = this.#config.env,
        tokenReqConfig = this.#config.tokenReqConfig,
        url = tokenReqConfig.url,
        method = tokenReqConfig.method;

      let storageData = null;

      if (isRefresh) {
        this.emit(TOKEN_BEFORE_REFRESH);
        this.clearStorage(TOKEN_TYPE);
        this.emit(TOKEN_AFTER_REFRESH);
      } else {
        storageData = this.getDataFromStorage(TOKEN_TYPE);

        if (storageData && !this.isExpired(storageData)) {
          this.emit(TOKEN_BEFORE_CACHE, storageData);
          return setTimeout(() => {
            resolve(storageData);
            this.emit(TOKEN_AFTER_CACHE, storageData);
          });
        }
        this.emit(TOKEN_EXPIRED);
        this.clearStorage(TOKEN_TYPE);
      }

      this.emit(TOKEN_BEFORE_LOGIN);
      this.#isTokenReq = true;
      login({
        env,
      })
        .then(res => {
          this.tokenReqData.jsCode = res.jsCode;
          this.emit(TOKEN_AFTER_LOGIN, res);
          return this.middleware
            .dispatch(this, this.#tokenMiddles);
        })
        .then((ctx) => {
          this.emit(TOKEN_BEFORE_REQUEST);
          return request({
            env,
            url,
            method,
            data: {
              ...ctx.tokenReqData,
            }
          });
        })
        .then((res) => {
          this.tokenResData = res;
          return this.middleware
            .dispatch(this, this.#afterMiddles);
        })
        .then((ctx) => {
          this.emit(TOKEN_AFTER_REQUEST, ctx.tokenResData);
          return this.set2Storage(TOKEN_TYPE, ctx.tokenResData);
        })
        .then(resData => {
          resolve(resData);
          this.runQueues(null, resData);
        })
        .catch(err => {
          reject(err);
          this.runQueues(err);
        })
        .finally(() => {
          this.#isTokenReq = false;
          this.#waitQueues = [];
        });
    });
  }
}

export default MiniAuth;
