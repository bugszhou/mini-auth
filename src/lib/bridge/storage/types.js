import PropTypes from 'prop-types';

export default function checkOpts(opts = {}) {
  return PropTypes.checkPropTypes({
    timeout: PropTypes.number,
    scopes: PropTypes.string,
    force: PropTypes.bool,
  }, opts);
}
