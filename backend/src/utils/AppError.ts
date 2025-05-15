export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public success: boolean;
  public data: null;
  public errors: string[];
  public message: string;

  constructor(message: string, statusCode: number = 500, errors = [], stack = "") {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = true;
    this.message = message;
    this.success = false;
    this.data = null;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
