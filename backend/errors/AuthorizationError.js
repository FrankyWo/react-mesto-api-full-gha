const errorStatus = require('./errorStatuses');

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = errorStatus.unauthorized;
  }
}

module.exports = AuthorizationError;
