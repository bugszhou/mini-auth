/**
 * @param timeout  number 超时时间，单位ms [weapp. swan]
 * @param scopes  string 授权类型，默认 auth_base。支持 auth_base（静默授权）/ auth_user（主动授权） / auth_zhima（芝麻信用）。 [aliapp]
 * @param force  boolean 未登录时，是否强制调起登录框 [ttapp]
 * @type {{}}
 */
export default {
  timeout: 20000,
  scopes: 'auth_base',
  force: true,
};
