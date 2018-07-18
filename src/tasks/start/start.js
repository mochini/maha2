import '../../lib/environment'
import server from '../../entities/server'
import socket from '../../entities/socket'
import worker from '../../entities/worker'
import cron from '../../entities/cron'
import _ from 'lodash'

const entities = ['all','server','socket','worker','cron']

export const start = async (flags, args) => {

  const entity = args.entity || 'all'

  if(!_.includes(entities, entity)) throw new Error(`'${entity}' is not a valid entity`)

  if(_.includes(['all','server'], entity)) await server()

  if(_.includes(['all','socket'], entity)) await socket()

  if(_.includes(['all','worker'], entity)) await worker()

  if(_.includes(['all','cron'], entity)) await cron()

}
