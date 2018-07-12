// import { beginLogger, endLogger, printCronLogger } from '../utils/logger'
import knex from '../lib/knex'
import _ from 'lodash'

const cron = (options) => {

  return {
    schedule: options.schedule,
    handler: () => withLogger({
      name: options.name,
      processor: options.processor,
      afterCommit: options.afterCommit,
      beforeRollback: options.beforeRollback
    })
  }

}

const withLogger = async ({ name, processor, afterCommit, beforeRollback }) => {

  // const requestId = _.random(100000, 999999).toString(36)
  //
  // beginLogger(requestId)

  await withTransaction({ processor, afterCommit, beforeRollback })

  // printCronLogger(name, requestId)
  //
  // endLogger(requestId)

}

const withTransaction = async ({ processor, afterCommit, beforeRollback }) => {

  await knex.transaction(async trx => {

    try {

      const result = await processor(trx)

      await trx.commit()

      if(afterCommit) await afterCommit(trx, result)

    } catch(err) {

      console.log(err)

      if(beforeRollback) await beforeRollback(trx)

      await trx.rollback(err)

    }

  })

}

export default cron
