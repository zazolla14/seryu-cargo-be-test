import { Model, QueryBuilder } from 'objection'
import knex from './knex.js';
import { raw } from 'objection';

Model.knex(knex);


class ShipmentCosts extends Model {

  static get tableName() {
    return 'shipment_costs';
  }

  static modifiers = {
    getByStatus(
      query: QueryBuilder<ShipmentCosts>,
      status: string,
      date: string
    ) {
      query.select(
        'sc.driver_code',
        raw('SUM(sc.total_costs)').as('total_cost')
      )
        .alias('sc')
        .leftJoin(
          'shipments as s',
          'sc.shipment_no',
          's.shipment_no',

        )
        .where('sc.cost_status', status)
        .whereNot('s.shipment_status', 'CANCELLED')
        .whereRaw(`TO_CHAR(s.shipment_date, 'yyyymm') = ?`, date)
        .groupBy('sc.driver_code')
    },

  };
}

export default ShipmentCosts