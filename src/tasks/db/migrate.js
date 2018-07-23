import '../../lib/environment'
import collectObjects from '../../utils/collect_objects'
import { action } from '../../utils/console'
import knex from '../../lib/knex'
import { dump } from './schema'
import path from 'path'
import _ from 'lodash'

export const migrateUp = (flags, args) => _migrate('up')

export const migrateDown = (flags, args) => _migrate('down')

export const fixturesLoad = (flags, args) => _loadData('fixtures')

export const seedsLoad = (flags, args) => _loadData('seeds')

export const migrateRedo = async (flags, args) => {

  await _migrate('down')

  await _migrate('up')

}

const _loadData = async (type) => {

  const files = _getSortedFiles(type)

  await Promise.mapSeries(files, async file => {

    const fixture = require(path.resolve(file.path)).default

    await knex.transaction(async trx => {

      await trx.raw('set session_replication_role = replica')

      await trx(fixture.tableName).del()

      const chunks = _.chunk(fixture.records, 50)

      await Promise.mapSeries(chunks, async chunk => await trx(fixture.tableName).insert(chunk)).catch(console.log)

      try {

        const idColumn = await trx.raw(`SELECT column_name FROM information_schema.columns WHERE table_name='${fixture.tableName}' and column_name='id'`)

        if(idColumn.rowCount > 0) await trx.raw(`SELECT pg_catalog.setval(pg_get_serial_sequence('${fixture.tableName}', 'id'), MAX(id)) FROM ${fixture.tableName}`)

      } catch(err) {}

      await trx.raw('set session_replication_role = default')

      action('import', fixture.tableName)

    })

  })

}

const _migrate = async (direction) => {

  await _findOrCreateSchema()

  const allMigrations = _getSortedFiles('migrations')

  const migrations = await _filterScripts(allMigrations, direction === 'down')

  await _runMigrations(migrations, direction)

  if(direction === 'down') await _dropSchema()

  await dump()

}

const _findOrCreateSchema = async () => {

  const exists = await knex.schema.hasTable('schema_migrations')

  if(exists) return

  await knex.schema.createTable('schema_migrations', (table) => {

    table.string('migration')

  })

}

const _getSortedFiles = (targetPath) => {

  return collectObjects(`db/${targetPath}/*`).filter(file => {

    return !_.isNil(file.match(/.*\.js$/))

  }).sort((a, b) => {

    const aMigration = a.split('/').pop()

    const bMigration = b.split('/').pop()

    if(aMigration > bMigration) return 1

    if(aMigration < bMigration) return -1

    return 0

  }).map(file => ({

    path: file,

    name: path.basename(file)

  }))

}

const _filterScripts = async (scripts, down) => {

  const sorted = down ? scripts.reverse() : scripts

  return await Promise.filter(sorted, async script => {

    return await _hasScriptBeenRun(script.name) === down

  })

}

const _hasScriptBeenRun = async (migration, run) => {

  const result = await knex('schema_migrations').count('*').where({ migration })

  return parseInt(result[0].count) === 1

}

const _runMigrations = (migrations, direction) => {

  return Promise.mapSeries(migrations, async migration => {

    await knex.transaction(async trx => {

      action('run', migration.name)

      const runner = require(path.resolve(migration.path)).default

      await runner[direction](trx)

      const _logMigration = direction === 'up' ? _recordMigration : _removeMigration

      await _logMigration(migration.name, trx)

    })

  })

}

const _recordMigration = (migration, trx) => {

  return trx('schema_migrations').insert({ migration })

}

const _removeMigration = (migration, trx) => {

  return trx('schema_migrations').where({ migration }).delete()

}

const _dropSchema = async () => {

  return await knex.schema.dropTableIfExists('schema_migrations')

}
