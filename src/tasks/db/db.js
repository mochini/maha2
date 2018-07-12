import collectObjects from '../../utils/collect_objects'

const db = async () => {

  const fixtures = collectObjects('db/fixtures/*')

  console.log(fixtures)

  const migrations = collectObjects('db/migrations/*').sort((a, b) => {

    const aMigration = a.split('/').pop()

    const bMigration = b.split('/').pop()

    if(aMigration > bMigration) return 1

    if(aMigration < bMigration) return -1

    return 0

  })

  console.log(migrations)

  const seeds = collectObjects('db/seeds/*')

  console.log(seeds)

}

export default db
