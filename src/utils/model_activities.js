import collectObjects from './collect_objects'

let mapped = null

const models = (table) => {

  if(mapped) return mapped[table]

  mapped = collectObjects('models/*').reduce((objects, model) => {

    const object = require(model.filepath).default

    const instance = object.extend().__super__

    return {
      ...objects,
      [instance.tableName]: {
        model: object,
        displayName: instance.displayName,
        displayAttribute: instance.displayAttribute
      }
    }

  }, {})

  return mapped[table]

}

export default models
