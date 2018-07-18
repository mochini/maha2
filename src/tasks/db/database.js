import '../../lib/environment'
import { action } from '../../utils/console'
import Knex from 'knex'

const [, connection, database] = process.env.DATABASE_URL.match(/(.*)\/(.*)/)

const knex = new Knex({
  client: 'postgresql',
  connection: `${connection}/postgres`,
  useNullAsDefault: true,
  pool: {
    min: 1,
    max: 1
  }
})

export const create = async (flags, args) => {

  action('createdb', database)

  await knex.raw(`CREATE DATABASE ${database}`)

}

export const drop = async (flags, args) => {

  action('dropdb', database)

  await knex.raw(`DROP DATABASE ${database}`)

}
