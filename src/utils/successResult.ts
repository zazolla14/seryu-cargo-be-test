import { Response } from "express";

class SuccessResult {
  private static res: Response;

  static make(res: Response): typeof SuccessResult {
    this.res = res;
    return this;
  }

  static send(
    data: any,
    total_row: number,
    current: number,
    page_size: number
  ): Response {
    return this.res.status(200).send({
      data,
      total_row,
      current,
      page_size,
    });
  }
}

export default SuccessResult;
