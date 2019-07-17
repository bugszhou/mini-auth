import response from './response';

class Middleware {

  context = {};

  middleware = [];

  /**
   * 复制上下文
   * @param context
   * @returns {any}
   */
  createContext(context = {}) {
    const ctx = Object.create(this.context);
    return Object.assign(ctx, context);
  }

  /**
   * 触发函数
   * @param {Object} message  消息体
   */
  dispatch(ctx = {}, middleware) {
    const context = this.createContext(ctx),
      fnMiddleware = this.runMiddleware(middleware || this.middleware);
    return fnMiddleware(context);
  }

  runMiddleware(middleware = []) {
    return function(ctx, next) {
      let index = -1;
      return new Promise((resolve, reject) => {
        dispatch(0, null);

        function dispatch(idx, error) {
          if (idx <= index) {
            return reject(response({
              errCode: 5004,
              errMsg: 'next() called multiple times',
            }));
          }

          if (error) {
            return reject(error);
          }

          index = idx;
          let middle = middleware[index];
          if (index === middleware.length) {
            middle = next;
          }
          if (!middle) {
            return resolve(ctx);
          }
          try {
            return middle(ctx, dispatch.bind(null, index + 1));
          } catch (err) {
            return reject(response({
              errCode: 5005,
              errMsg: JSON.stringify(err),
            }));
          }
        }
      });
    }
  }

  /**
   * 添加中间件
   * @param middle function
   */
  use(middle = () => {
  }) {
    if (typeof middle !== 'function') {
      throw new Error('middle must be function!');
    }
    this.middleware.push(middle);
  }

  /**
   * 批量添加中间件
   * @param middles function array
   */
  useBatch(middles = []) {
    middles.forEach(middle => {
      this.use(middle);
    });
  }
}

export default Middleware;
