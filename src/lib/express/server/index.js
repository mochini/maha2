import collectObjects from '../../../utils/collect_objects'
import { Router } from 'express'
import path from 'path'

// this gets run when the platform first boots
// it searches through the apps for server.js files
// and combines all segments into a public router

const _apiSegment = async (pathPrefix, portal, auth) => {

  const apiFiles = collectObjects(`${portal}/api`)

  return await Promise.reduce(apiFiles, async (segments, apiFile) => {

    const router = await require(path.resolve(apiFile)).default.mount(`${pathPrefix}`, {
      authenticated: auth,
      ownedByTeam: auth
    })

    return [
      ...segments,
      router
    ]

  }, [])

}

const _serverSegment = (portal) => {

  const serverFiles = collectObjects(`${portal}/server.js`)

  return serverFiles.reduce((router, serverFile) => {

    return require(serverFile.filepath).default(router)

  }, new Router({ mergeParams: true }))

}

export const adminMiddleware = async () => {

  const api = await _apiSegment('/api', 'admin', true)

  const server = _serverSegment('admin')

  const router = new Router({ mergeParams: true })

  router.use(api)

  router.use(server)

  return router

}


export const publicMiddleware = async () => {

  const api = await _apiSegment('/api', 'public', false)

  const server = _serverSegment('public')

  const router = new Router({ mergeParams: true })

  router.use(api)

  router.use(server)

  return router

}
