import {Model} from 'objection'
import knex from './knex.js';

Model.knex(knex);


class VariableConfigs extends Model {

  static get tableName() {
    return 'variable_configs';
  }

}

export default VariableConfigs