import { Model, raw } from "objection";
import knex from "./knex.js";
import { QueryBuilder } from "objection";

Model.knex(knex);

class DriverAttendances extends Model {
  static get tableName() {
    return "driver_attendances";
  }

  static modifiers = {
    totalAttendanceSalary(
      query: QueryBuilder<DriverAttendances>,
      date: string
    ) {
      query
        .select(
          "da.driver_code",
          raw("COUNT(da.driver_code)*vc.value").as("total_attendance_salary ")
        )
        .alias("da")
        .leftJoin(raw("variable_configs as vc ON 1 = 1"))
        .where("da.attendance_status", true)
        .where("vc.key", "DRIVER_MONTHLY_ATTENDANCE_SALARY")
        .whereRaw(`TO_CHAR(da.attendance_date, 'yyyymm') = ?`, date)
        .groupBy("da.driver_code", "vc.value");
    },
    totalSalary(query: QueryBuilder<DriverAttendances>, date: string) {
      query
        .select(
          "da.driver_code",
          raw("COUNT(da.driver_code)*vc.value").as("total_salary ")
        )
        .alias("da")
        .leftJoin(raw("variable_configs as vc ON 1 = 1"))
        .where("da.attendance_status", true)
        .where("vc.key", "DRIVER_MONTHLY_ATTENDANCE_SALARY")
        .groupBy("da.driver_code", "vc.value");
    },
  };
}

export default DriverAttendances;
