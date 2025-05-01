export class ApiResponse<T> {
  public success: boolean;
  public message: string;
  public data?: T;

  constructor({ success = true, message, data }: { success?: boolean; message: string; data?: T }) {
    this.success = success;
    this.message = message;
    if (data) this.data = data;
  }
}
