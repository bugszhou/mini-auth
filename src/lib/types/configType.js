
import PropTypes from 'prop-types';
import env from './env';
import method from './method';

export default function checkOpts(opts = {}) {
  return PropTypes.checkPropTypes({
    withCredentials: PropTypes.bool.isRequired,
    env: PropTypes.oneOf(env),
    appid: PropTypes.string,
    tokenReqConfig: PropTypes.shape({
      url: PropTypes.string,
      method: PropTypes.oneOf(method).isRequired,
      headers: PropTypes.object,
      timeout: PropTypes.number,
    }),
    userInfoReqConfig: PropTypes.shape({
      url: PropTypes.string,
      method: PropTypes.oneOf(method).isRequired,
      headers: PropTypes.object,
      timeout: PropTypes.number,
    }),
  }, opts);
}
