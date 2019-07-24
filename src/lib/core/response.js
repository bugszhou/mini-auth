/**
 * 统一返回的数据格式
 * errCode 错误码 0 为成功
 * errMsg 错误信息
 * status http status
 * headers http headers
 * data 服务端数据
 */

export default function response(res = {}) {
  const errCode = res.errCode || 0;
  return {
    errCode: res.errCode || 0,
    errMsg: errCode === 0 ? '' : (res.errMsg || JSON.stringify(res)),
    status: res.statusCode || res.status || -1,
    headers: res.header || null,
    data: res.data || null,
  };
}
