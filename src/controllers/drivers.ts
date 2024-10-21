import SuccessResult from "../utils/successResult.js";
import { getListDriverSalary } from "../services/drivers.js";
import { Request, Response } from "express";

interface DriverSalaryQuery {
  page_size: number;
  current: number;
  month: string;
  year: string;
  driver_code: string;
  status: string;
  name: string;
}

async function listDriverSalary(req: Request, res: Response): Promise<void> {
  const query = req.query;

  const payload: DriverSalaryQuery = {
    page_size: Number(query.page) || 10,
    current: Number(query.current) || 1,
    month: query.month as string,
    year: query.year as string,
    driver_code: query.driver_code as string,
    status: query.status as string,
    name: query.name as string,
  };

  try {
    const { result, current, page_size, total_row } = await getListDriverSalary(
      payload
    );

    SuccessResult.make(res).send(result, total_row, current, page_size);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export { listDriverSalary };
