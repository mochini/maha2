import imagecache from 'imagecachejs'
import _ from 'lodash'

const imagecacheMiddleware = imagecache({
  webRoot: 'public',
  sources: _.uniq(_.compact([
    process.env.DATA_ASSET_HOST,
    process.env.WEB_ASSET_HOST,
    process.env.WEB_HOST
  ]))
})

export default imagecacheMiddleware
