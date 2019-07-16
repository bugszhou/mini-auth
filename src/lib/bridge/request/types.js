import PropTypes from 'prop-types';

export default function checkOpts(opts = {}) {
  return PropTypes.checkPropTypes({
    url: PropTypes.string,
    data: PropTypes.object,
    headers: PropTypes.object,
    timeout: PropTypes.number,
    method: PropTypes.string,
  }, opts);
}
