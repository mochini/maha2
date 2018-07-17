import collectObjects from '../../../utils/collect_objects'
import _ from 'lodash'
import os from 'os'

const files = collectObjects('public/domains.js')

const ifaces = os.networkInterfaces()

const ips = Object.keys(ifaces).reduce((ips, iface) => [
  ...ips,
  ...ifaces[iface].map(adapter => adapter.address)
], [])

const domain_regex = /^([\w-.]*):?(\d*)?$/

export const adminDomainMiddleware = (middleware) => async (req, res, next) => {

  if(!req.headers.host) return next()

  const [,hostname] = req.headers.host.match(domain_regex)

  if(!_.includes([ process.env.DOMAIN, 'localhost', 'dev.mahaplatform.com', ...ips ], hostname)) return next()

  middleware(req, res, next)

}

export const publicDomainMiddleware = (middleware) => async (req, res, next) => {

  const domains = await Promise.reduce(files, async (domains, domain) => {

    const appDomains = await require(domain.filepath).default()

    return [
      ...domains,
      ...appDomains
    ]

  }, [])

  const [,hostname] = req.headers.host.match(domain_regex)

  if(!_.includes(domains, hostname)) return next()

  middleware(req, res, next)

}
