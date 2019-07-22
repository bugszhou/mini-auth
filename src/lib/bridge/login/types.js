import PropTypes from 'prop-types';

export default function checkOpts(opts = {}) {
  return PropTypes.checkPropTypes({
    timeout: PropTypes.number,
    scopes: PropTypes.array,
    force: PropTypes.bool,
  }, opts);
}
