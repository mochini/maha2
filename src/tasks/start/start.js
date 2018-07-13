import server from '../../entities/server'
import socket from '../../entities/socket'
import worker from '../../entities/worker'
import cron from '../../entities/cron'
import _ from 'lodash'

export const start = async (entities = 'all') => {

  if(_.includes(['all','server'], entities)) await server()

  if(_.includes(['all','socket'], entities)) await socket()

  if(_.includes(['all','worker'], entities)) await worker()

  if(_.includes(['all','cron'], entities)) await cron()

}
