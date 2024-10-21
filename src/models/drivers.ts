import { Model, QueryBuilder } from 'objection';
import knex from './knex.js';

import shipmentCostsModel from './shipmentCosts.js';
import driverAttendancesModel from './driverAttendances.js';
import shipmentsModel from './shipments.js';


Model.knex(knex);


class Drivers extends Model {

  static get tableName() {
    return 'drivers';
  }

  static modifiers = {
    listDriverSalary(
      query: QueryBuilder<Drivers>,
      filterDate: string,
    ) {
      query.select(
        'drivers.driver_code',
        'drivers.name',
        'total_pending.total_cost as total_pending',
        'total_confirmed.total_cost as total_confirmed',
        'total_paid.total_cost as total_paid',
        'attend_salary.total_attendance_salary',
        'total_salary.total_salary',
        'shipment.count_shipment'
      )
        .leftJoin(shipmentCostsModel.query()
          .as('total_pending')
          .modify('getByStatus', 'PENDING', filterDate), (join) => {
            join.on(
              'drivers.driver_code',
              'total_pending.driver_code'
            )
          }
        )
        .leftJoin(shipmentCostsModel.query()
          .as('total_paid')
          .modify('getByStatus', 'PAID', filterDate), (join) => {
            join.on(
              'drivers.driver_code',
              'total_paid.driver_code'
            )
          }
        )
        .leftJoin(shipmentCostsModel.query()
          .as('total_confirmed')
          .modify('getByStatus', 'CONFIRMED', filterDate), (join) => {
            join.on(
              'drivers.driver_code',
              'total_confirmed.driver_code'
            )
          }
        )
        .leftJoin(driverAttendancesModel.query()
          .as('attend_salary')
          .modify('totalAttendanceSalary', filterDate), (join) => {
            join.on(
              'drivers.driver_code',
              'attend_salary.driver_code'
            )
          }
        )
        .leftJoin(driverAttendancesModel.query()
          .as('total_salary')
          .modify('totalSalary', filterDate), (join) => {
            join.on(
              'drivers.driver_code',
              'total_salary.driver_code'
            )
          }
        )
        .leftJoin(shipmentsModel.query()
          .as('shipment')
          .modify('totalShipment', filterDate), (join) => {
            join.on(
              'drivers.driver_code',
              'shipment.driver_code'
            )
          }
        )
        .where('total_salary.total_salary', '>', 0)
    }
  }

}

export default Drivers