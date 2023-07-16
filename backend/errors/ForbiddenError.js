const errorStatus = require('./errorStatuses');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = errorStatus.forbidden;
  }
}

module.exports = ForbiddenError;
