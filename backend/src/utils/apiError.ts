interface ApiErrorParams {
  message: string;
  statusCode?: number;
  errors?: string[];
  stack?: string;
}

export class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean = true;
  public success: boolean = false;
  public data: null = null;
  public errors: any[];

  constructor({ message, statusCode = 500, errors = [], stack }: ApiErrorParams) {
    super(message);

    this.statusCode = statusCode;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
