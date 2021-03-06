const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err))
}

class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

module.exports = { catchAsync, ApiError }
