import backframe from '../lib/backframe'

class Resources {

  constructor(options) {

    return backframe.resources({
      ...options,
      dependents: [
        { relationship: 'activities', strategy: 'destroy' },
        { relationship: 'audit', strategy: 'destroy' },
        { relationship: 'comments', strategy: 'destroy' },
        { relationship: 'listenings', strategy: 'destroy' },
        ...options.dependents || []
      ]
    })

  }

}

export default Resources
