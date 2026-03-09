class ApiError extends Error {
  constructor(status, message, errors = [], data = {}) {
    super(message);
    this.status = status;
    this.message = message;
    this.errors = errors;
    this.data = data;
  }

  static badRequest(message, path = null, location = null) {
    const errors = path
      ? [{ msg: message, path, location }]
      : [{ msg: message }];
    return new ApiError(400, message, errors);
  }

  static notFound(message, path = null, location = null) {
    const errors = path
      ? [{ msg: message, path, location }]
      : [{ msg: message }];
    return new ApiError(404, message, errors);
  }

  static internal(message) {
    return new ApiError(500, message, [{ msg: message }]);
  }

  static forbidden(message) {
    return new ApiError(403, message, [{ msg: message }]);
  }

  toJSON() {
    return {
      status: "error",
      message: this.message,
      errors: this.errors,
      data: this.data,
    };
  }
}

export default ApiError;
