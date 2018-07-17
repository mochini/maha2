import { adminDomainMiddleware, publicDomainMiddleware } from '../lib/express/domain'
import imagecache from '../lib/express/imagecache'
import toureiro from '../lib/express/toureiro'
import { info } from '../utils/console'
import ping from '../lib/express/ping'
import express from 'express'
import path from 'path'

const server = () => {

  const server = express()

  server.use('/ping', ping)

  server.use('/jobs', toureiro)

  server.use('/imagecache', imagecache)

  // server.use(emailMiddleware)
  //
  // server.use(mailboxMiddleware)
  //
  // router.use(await helpMiddleware())
  //
  // server.use(adminDomainMiddleware(await adminMiddleware()))
  //
  // server.use(publicDomainMiddleware(await publicMiddleware()))

  server.use('/admin', express.static(path.join(__dirname,'..','admin','public'), { redirect: false }))

  // server.use(/^(\/admin)?\/(css|assets|audio|imagecache|images|js)/, (req, res) => res.status(404).send('Cannot locate asset'))

  server.use((req, res) => res.status(404).send('not found'))

  server.listen(3001, () => {
    info('server', 'Listening on 3001')
  })

}

export default server
