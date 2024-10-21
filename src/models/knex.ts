import knexFile from '../../knexfile.js'
import knex from 'knex'

const config = knexFile['development']

export default knex(config)
