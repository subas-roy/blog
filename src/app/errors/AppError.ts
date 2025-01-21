/**
 * Custom error class for handling application-specific errors.
 * This class extends the built-in JavaScript `Error` class and adds an HTTP status code for more granular error handling.
 */
class AppError extends Error {
  // HTTP status code for the error
  public statusCode: number;

  /**
   * Constructor for creating a new AppError instance.
   *
   * @param statusCode - The HTTP status code representing the type of error (e.g., 404 for Not Found, 500 for Internal Server Error).
   * @param message - A descriptive error message.
   * @param stack - (Optional) A custom stack trace string. If not provided, the stack trace will be automatically captured.
   */
  constructor(statusCode: number, message: string, stack = '') {
    // Call the parent class constructor with the error message
    super(message);

    // Assign the provided HTTP status code to the instance
    this.statusCode = statusCode;

    // If a custom stack trace is provided, use it
    if (stack) {
      this.stack = stack;
    } else {
      // Otherwise, capture the current stack trace
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
