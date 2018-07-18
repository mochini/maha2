import '../../lib/environment'
import { action } from '../../utils/console'
import knex from '../../lib/knex'
import mkdirp from 'mkdirp'
import path from 'path'
import _ from 'lodash'
import ejs from 'ejs'
import fs from 'fs'

export const dump = async (flags, args) => {

  action('dump', 'schema')

  const constraints = await _getConstraints()

  const foreign_keys = _.groupBy(constraints.foreign, (constraint) => constraint.table)

  const tables = await _getTables(constraints)

  const template = fs.readFileSync(path.join(__dirname, 'schema.js.ejs'), 'utf8')

  const platform = _.camelCase(path.basename(path.resolve()))

  const data = ejs.render(template, { platform, tables, foreign_keys })

  mkdirp.sync(path.join('db'))

  fs.writeFileSync(path.join('db', 'schema.js'), data)

}

export const load = async (flags, args) => {

  action('load', 'schema')

  await knex.transaction(async trx => {

    const schema = require(path.resolve('db', 'schema.js')).default

    await schema.load(trx)

  })

}

const _getTables = async (constraints) => {

  const tables = await knex.raw('select tablename from pg_catalog.pg_tables where schemaname=\'public\'')

  return await Promise.mapSeries(tables.rows, async(table) => {

    const fields = await knex.raw(`select * from information_schema.columns where table_name='${table.tablename}'`)

    return {
      name: table.tablename,
      fields: fields.rows.map(field => ({
        name: field.column_name,
        definition: _getFieldType(field, constraints),
        nullable: _getNullable(field),
        default: _getDefault(field)
      }))
    }

  })

}

const _getConstraints = async () => {

  const constraints = await knex.raw('SELECT tc.constraint_name, tc.constraint_type, tc.table_name, kcu.column_name, ccu.table_name AS foreign_table_name, ccu.column_name AS foreign_column_name  FROM information_schema.table_constraints tc JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name AND ccu.table_schema = tc.table_schema')

  return constraints.rows.reduce((constraints, constraint) => ({
    ...constraints,
    primary: (constraint.constraint_type === 'PRIMARY KEY') ? [
      ...constraints.primary,
      {
        name: constraint.constraint_name,
        table: constraint.table_name,
        column: constraint.column_name
      }
    ] : constraints.primary,
    foreign: (constraint.constraint_type === 'FOREIGN KEY') ? [
      ...constraints.foreign,
      {
        name: constraint.constraint_name,
        table: constraint.table_name,
        column: constraint.column_name,
        foreign_table: constraint.foreign_table_name,
        foreign_column: constraint.foreign_column_name
      }
    ] : constraints.foreign
  }), { primary: [], foreign: []})

}

const _getFieldType = (field, constraints) => {
  const primary = _.find(constraints.primary, { table: field.table_name, column: field.column_name })
  const foreign = _.find(constraints.foreign, { table: field.table_name, column: field.column_name })
  if(primary) return `.increments('${field.column_name}').primary()`
  if(foreign) return `.integer('${field.column_name}').unsigned()`
  if(field.data_type === 'character varying') return `.string('${field.column_name}', ${field.character_maximum_length})`
  if(field.data_type === 'text') return `.text('${field.column_name}')`
  if(field.data_type === 'timestamp with time zone') return `.timestamp('${field.column_name}')`
  if(field.data_type === 'ARRAY') return `.specificType('${field.column_name}', '${field.udt_name.substr(1)}[]')`
  return `.${field.data_type}('${field.column_name}')`
}

const _getNullable = (field) => {
  return field.is_nullable ? '': '.notNullable()'
}

const _getDefault = (field) => {
  return field.column_default && field.column_default.substr(0,7) !== 'nextval' ? `.defaultsTo('${field.column_default}')`: ''
}
