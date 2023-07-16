const errorStatus = require('./errorStatuses');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = errorStatus.notFound;
  }
}

module.exports = NotFoundError;
