import backframe from '../lib/backframe'
import appPaths from '../utils/app_paths'
import App from '../models/app'
import _ from 'lodash'

class Api {

  constructor(options) {

    this.options = options

    this.router = null

  }

  async mount(path, options = {}) {

    if(this.router) return this.router

    const appPath = path.split('/').pop()

    const app_id = await this._getAppId(`/${appPath}`)

    const routes = backframe.segment({
      pathPrefix: path,
      app_id,
      ...options,
      ...this.options
    })

    this.router = backframe.router({ routes, notFound: false })

    return this.router

  }

  async _getAppId(path) {

    if(process.env.NODE_ENV === 'test' || path === '') return null

    const appFile = _.find(appPaths, { config: { path } })

    if(!appFile) return null

    const app = await App.where({ title: appFile.config.title }).fetch()

    return app ? app.get('id') : null

  }

}

export default Api
