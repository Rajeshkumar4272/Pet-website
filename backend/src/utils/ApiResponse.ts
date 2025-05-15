interface IApiResponse<T> {
  success?: boolean;
  message?: string;
  data?: T;
  statusCode?: number;
}

export class ApiResponse<T> {
  public statusCode: number;
  public data?: T;
  public message: string;
  public success: boolean;

  constructor({ success = true, message = "", data, statusCode = 200 }: IApiResponse<T>) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }
}
