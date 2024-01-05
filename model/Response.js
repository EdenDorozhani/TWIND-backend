class Response {
  constructor(success, message, data = null) {
    this.success = success;
    this.message = message;
    this.response = data;
  }
}

module.exports = Response;
