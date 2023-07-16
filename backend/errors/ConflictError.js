const errorStatus = require('./errorStatuses');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = errorStatus.conflict;
  }
}

module.exports = ConflictError;
