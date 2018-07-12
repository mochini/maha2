import redis from 'ioredis'
import Bull from 'bull'
import _ from 'lodash'

class Queue {

  constructor(options) {

    this._enqueue = options.enqueue

    this.name = options.name

    this.processor = options.processor

    this.failed = options.failed

    this.completed = options.completed

    this.queue = new Bull(this.name, null, null, { createClient })

  }

  async start(options) {

    if(this.processor) this.queue.process(wrapped(this.name, this.processor))

    if(this.failed) this.queue.on('failed', this.failed)

    if(this.completed) this.queue.on('completed', this.completed)

  }

  async enqueue(req, trx, options) {

    const job = await this._enqueue(req, trx, options)

    if(process.env.NODE_ENV === 'test') return

    await new Promise((resolve, reject) => {

      setTimeout(() => {

        this.queue.add(job, { delay: 2000, attempts: 3, backoff: 5000 })

        resolve()

      }, 500)

    })

  }

  async clean(type) {

    return await this.queue.clean(0, type)

  }

  async getJob(job_id) {

    return await this.queue.getJob(job_id)

  }

}

const wrapped = (name, processor) => async (job, done) => {

  const processorWithTransaction = withTransaction(processor, job)

  const processorWithLogger = withLogger(name, processorWithTransaction, job)

  const is_prod = process.env.NODE_ENV === 'production'

  const envProcessor = !is_prod ? processorWithLogger : processorWithTransaction

  try {

    await envProcessor()

    done()

  } catch(err) {

    done(err)

  }

}

const withLogger = (name, processor, job) => async () => {

  // const requestId = _.random(100000, 999999).toString(36)
  //
  // beginLogger(requestId)

  await processor()

  // printQueueLogger(name, job, requestId)
  //
  // endLogger(requestId)

}

const withTransaction = (processor, job) => async () => {

  await knex.transaction(async trx => {

    try {

      await processor(job, trx)

      await trx.commit()

    } catch(err) {

      await trx.rollback(err)

    }

  })

}

const client = new redis(process.env.REDIS_URL)

const subscriber = new redis(process.env.REDIS_URL)

const createClient = (type) => {

  if(type === 'client') return client

  if(type === 'subscriber') return subscriber

  return new redis(process.env.REDIS_URL)

}

export default Queue
