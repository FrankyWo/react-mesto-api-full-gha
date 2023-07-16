const errorStatus = require('./errorStatuses');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = errorStatus.badRequest;
  }
}

module.exports = ValidationError;
