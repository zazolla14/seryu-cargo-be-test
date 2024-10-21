import {Model, QueryBuilder, raw} from 'objection'
import knex from './knex.js';


Model.knex(knex);


class Shipments extends Model {

  static get tableName() {
    return 'shipments';
  }

  static modifiers = {
    totalShipment(
      query: QueryBuilder<Shipments>,
      date: string
    ) {
      query.select(
        'sc.driver_code',
        raw('COUNT(s.shipment_no)').as('count_shipment')
      )
        .alias('s')
        .leftJoin(
          'shipment_costs as sc',
          'sc.shipment_no',
          's.shipment_no',

        )
        .whereNot('s.shipment_status', 'CANCELLED')
        .whereRaw(`TO_CHAR(s.shipment_date, 'yyyymm') = ?`, date)
        .groupBy('sc.driver_code')
    },

  };

}

export default Shipments