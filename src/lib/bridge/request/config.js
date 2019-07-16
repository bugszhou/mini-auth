/**
 * @param url 开发者服务器接口地址
 * @param data 请求的参数
 * @param header 设置请求的 header，header 中不能设置 Referer。content-type 默认为 application/json
 * @param headers 设置请求的 HTTP 头对象，默认 {'content-type': 'application/json'}，该对象里面的 key 和 value 必须是 String 类型。 [ aliapp ]
 * @param timeout 超时时间，单位 ms，默认 30000 [ aliapp ]
 * @param method HTTP 请求方法
 */
export default {
  url: '',
  data: {},
  headers: {},
  timeout: 30000,
  method: 'GET',
};
