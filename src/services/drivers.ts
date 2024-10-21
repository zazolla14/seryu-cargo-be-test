import driversModel from "../models/drivers.js";
import { Request, Response } from "../interfaces/driverSalaryList.js";
import { ShippingCostStatus } from "../enums/status.js";
import { QueryBuilder } from "objection";

async function getListDriverSalary({
  page_size,
  current,
  month,
  year,
  driver_code,
  status,
  name,
}: Request): Promise<any> {
  // The index of the first page is 0.
  const page = current - 1;

  const newMonth = mappingMonthParam(month);
  const filterDate = `${year}${newMonth}`;

  const query = driversModel
    .query()
    .modify("listDriverSalary", filterDate)
    .where((builder) => {
      if (status) filterStatus(builder, status);
      if (driver_code) builder.where("drivers.driver_code", driver_code);
      if (name) builder.whereRaw("drivers.name ILIKE ?", [`%${name}%`]);
    })
    .page(page, page_size);

  const data: any = await query;

  return {
    current,
    page_size,
    total_row: data.total,
    result: data.results.map((item: Response) => ({
      driver_code: item.driver_code,
      name: item.name,
      total_pending: item.total_pending,
      total_confirmed: item.total_confirmed,
      total_paid: item.total_paid,
      total_attendance_salary: item.total_attendance_salary,
      total_salary: item.total_salary,
      count_shipment: item.count_shipment,
    })),
  };
}

function filterStatus(builder: QueryBuilder<driversModel>, status: string) {
  switch (status) {
    case ShippingCostStatus.PENDING:
      builder.where("total_pending.total_cost", ">", 0);
      break;
    case ShippingCostStatus.CONFIRMED:
      builder.where("total_confirmed.total_cost", ">", 0);
      break;
    case ShippingCostStatus.PAID:
      builder.where("total_paid.total_cost", ">", 0);
      builder.andWhere("total_pending.total_cost", 0);
      builder.andWhere("total_confirmed.total_cost", 0);

      break;

    default:
      break;
  }
}

function mappingMonthParam(month: string): string {
  return month.length === 1 ? `0${month}` : month;
}

export { getListDriverSalary };
