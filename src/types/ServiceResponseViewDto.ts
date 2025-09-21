export class ServiceResponseViewDto<T> {
  constructor(data: T, total: number, remaining: number) {
    this.data_view = data;
    this.total = total;
    this.remaining = remaining;
  }
  data_view: T;
  total: number;
  remaining: number;
}
