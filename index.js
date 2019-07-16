if (process.env.NODE_ENV === 'development') {
  module.exports = require('./dist/mini-auth.js')
} else {
  module.exports = require('./dist/mini-auth.common.js')
}
