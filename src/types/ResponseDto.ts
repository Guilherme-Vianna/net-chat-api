export class ResponseDto<T> {
  data: T;
  actual_page: number;
  actual_take: number;
  total: number;
  remaining: number;

  constructor(params: {
    data: T;
    actual_page: number;
    actual_take: number;
    total: number;
    remaining: number;
  }) {
    const { data, actual_page, actual_take, total, remaining } = params;
    this.data = data;
    this.actual_page = actual_page;
    this.actual_take = actual_take;
    this.total = total;
    this.remaining = remaining;
  }
}
